const catchAsync = require("../../utils/catchAsync");
const { conn, sql } = require("../../config/db");
const {
  multipleMongooseToObject,
  mongooseToObject,
} = require("../../utils/mongoose");
const AppError = require("../../utils/AppError");

let large_banner = [
  { img: "images/banners/banner-1.png", link: "banner1.com", index: 0 },
  { img: "images/banners/banner-2.png", link: "banner2.com", index: 1 },
  { img: "images/banners/banner-3.png", link: "banner3.com", index: 2 },
];

let small_banners_1 = [
  {
    img: "images/banners/small-banner-3.png",
    link: "sm_banner1.com",
    index: 0,
  },
  {
    img: "images/banners/small-banner-1.png",
    link: "sm_banner3.com",
    index: 1,
  },
];

let small_banners_2 = [
  {
    img: "images/banners/small-banner-2.png",
    link: "sm_banner2.com",
    index: 0,
  },
  {
    img: "images/banners/small-banner-4.png",
    link: "sm_banner4.com",
    index: 1,
  },
];

let rect_banners = [
  { img: "images/banners/rect-banner-1.png", link: "re_banner1.com", index: 0 },
  { img: "images/banners/rect-banner-2.png", link: "re_banner2.com", index: 1 },
];

let recommend = [
  {
    img: "images/FoodThumnail/bun.png",
    name: "Bún Đậu Mắm Tôm chuẩn ngon",
    link: "/item",
    fstar: 4,
    hstar: 0,
    nstar: 1,
    rvcount: 12.567,
    price: 89,
  },
  {
    img: "images/FoodThumnail/pho.png",
    name: "Cơm Tấm Hoàng Diệu 2",
    link: "/item",
    fstar: 3,
    hstar: 1,
    nstar: 1,
    rvcount: 8.291,
    price: 25,
  },
  {
    img: "images/FoodThumnail/doannhanh.png",
    name: "Cá Viên Chiên Makima",
    link: "/item",
    fstar: 5,
    hstar: 0,
    nstar: 0,
    rvcount: 163.523,
    price: 999,
  },
  {
    img: "images/FoodThumnail/dohan.png",
    name: "Nem Cuốn Hàn Xẻng",
    link: "/item",
    fstar: 3,
    hstar: 1,
    nstar: 1,
    rvcount: 1.286,
    price: 56,
  },
  {
    img: "images/FoodThumnail/donhat.png",
    name: "Thập Cẩm Chả Biết Tên",
    link: "/item",
    fstar: 4,
    hstar: 0,
    nstar: 1,
    rvcount: 15.927,
    price: 102,
  },
  {
    img: "images/FoodThumnail/pho.png",
    name: "Cơm Chay Chỉ Thiên",
    link: "/item",
    fstar: 3,
    hstar: 0,
    nstar: 2,
    rvcount: 26.546,
    price: 89,
  },
];

let sale_thumnails_1 = [
  {
    img: "images/FoodThumnail/bun.png",
    name: "Bún Đậu Mắm Tôm",
    link: "/item",
    brand: "Sunrise Foods",
    fstar: 4,
    hstar: 0,
    nstar: 1,
    rvcount: 12.567,
    price: 89,
    status: "Còn hàng",
  },
  {
    img: "images/FoodThumnail/pho.png",
    name: "Cơm Tấm Thôn Quê",
    link: "/item",
    brand: "Sunrise Foods",
    fstar: 3,
    hstar: 1,
    nstar: 1,
    rvcount: 8.291,
    price: 25,
    status: "Còn hàng",
  },
];

let sale_thumnails_2 = [
  {
    img: "images/FoodThumnail/donhat.png",
    name: "Thập Cẩm Chả Biết Tên",
    link: "/item",
    brand: "Sunrise Foods",
    fstar: 4,
    hstar: 0,
    nstar: 1,
    rvcount: 15.927,
    price: 102,
    status: "Còn hàng",
  },
  {
    img: "images/FoodThumnail/pho.png",
    name: "Cơm Chay Chỉ Thiên",
    link: "/item",
    brand: "Sunrise Foods",
    fstar: 3,
    hstar: 0,
    nstar: 2,
    rvcount: 26.546,
    price: 89,
    status: "Còn hàng",
  },
];

const restaurant_logo = [
  {
    img: "/images/logo/logo.png",
    name: "Sunrise Foods",
    slug: "Sunrise_Foods",
    link: "?manufacturer=Sunrise_Foods",
  },
  {
    img: "/images/logo/FlavourOfIndia-logo.png",
    name: "Flavour_of_India",
    slug: "Flavour_of_India",
    link: "?manufacturer=Flavour of India",
  },
  {
    img: "/images/logo/PanzerHot-logo.png",
    name: "Panzer Hot",
    slug: "Panzer_Hot",
    link: "?manufacturer=Panzer_Hot",
  },
  {
    img: "/images/logo/Friggitoria-logo.png",
    name: "Friggitoria",
    slug: "Friggitoria",
    link: "?manufacturer=Friggitoria",
  },
];

// cart
const items = [
  {
    key: "bbt001",
    img: "images/FoodThumnail/lau.png",
    link: "/item",
    name: "Bò Bít Tết Hoàng Gia",
    status: "Còn hàng",
    brand: "Sunrise Foods",
    notice: "Raw meet and clean decoration",
    price: 369,
  },
  {
    key: "ggt001",
    img: "images/FoodThumnail/pho.png",
    link: "/item",
    name: "Gỏi Gia Truyền Truyền Từ Thời Ông Cố Nội",
    status: "Còn hàng",
    brand: "Sunrise Foods",
    notice: "Raw meet and clean decoration",
    price: 171,
  },
];

// payment
const payment_methods = [
  // {
  //   key: "card",
  //   img: "/images/icons/momo.png",
  //   label: "Thanh toán Online bằng Momo (Có mã ưu đãi)",
  // },
  // {
  //   key: "card",
  //   img: "/images/icons/debit-card.png",
  //   label: "Chuyển khoản ngân hàng (Miễn phí phí chuyển)",
  // },
  {
    id: "COD__PAYMENT",
    key: "cash",
    img: "/images/icons/cod.png",
    label: "Thanh toán khi nhận hàng (COD)",
  },
  {
    id: "CARD__PAYMENT",
    key: "card",
    img: "/images/icons/visa.png",
    label: "Thanh toán Online bằng Visa, Master, JCB (Miễn phí phí chuyển)",
  },
];

exports.renderHome = async function index(req, res, next) {
  const recommend = await Product.aggregate([{ $sample: { size: 6 } }]);

  res.render("home", {
    large_banner,
    small_banners_1,
    small_banners_2,
    rect_banners,
    recommend,
    sale_thumnails_1,
    sale_thumnails_2,
  });
};

// [GET] /products
exports.renderItems = catchAsync(async function (req, res, next) {
  const pool = await sql.connect(req.config);
  const result = await pool.request().query("select * from doitac");
  const sellers = result.recordset;

  res.render("sellers", {
    sellers,
  });
});

exports.renderMenuClient = catchAsync(async (req, res, next) => {
  const madoitac = req.params.id;
  const findMenuQuery =
    "select * from MONAN where thucdon = (select mathucdon from thucdon where nhahang = @madoitac)";
  const pool = await sql.connect(req.config);
  await pool
    .request()
    .input("madoitac", sql.VarChar, madoitac)
    .query(findMenuQuery, function (err, data) {
      console.log(err);
      console.log(data);
      // const stores = data.recordset.map((store) => {
      //   return {
      //     ...store,
      //     GIOMOCUA: new Date(store.GIOMOCUA).toLocaleTimeString(),
      //     GIODONGCUA: new Date(store.GIODONGCUA).toLocaleTimeString(),
      //   };
      // });
      res.status(200).render("menuClient", { menu: data.recordset });
    });
});

exports.renderMe = catchAsync(async (req, res, next) => {
  res.status(200).render("profile");
});

exports.renderProfile = catchAsync(async (req, res, next) => {
  console.log(req.config);
  res.status(200).render("profile");
});

exports.renderContract = catchAsync(async (req, res, next) => {
  const findStoresQuery = "select * from HOPDONG where DOITAC = @madoitac";

  const pool = await sql.connect(req.config); // phân quyền dưới db
  await pool
    .request()
    .input("madoitac", sql.VarChar, req.user.MADOITAC)
    .query(findStoresQuery, function (err, data) {
      console.log("error", err);
      console.log(data);
      res.status(200).render("contract", data.recordset[0]);
    });
  // res.status(200).render("contract");
});

exports.renderStore = catchAsync(async (req, res, next) => {
  console.log("madoitac", req.user.MADOITAC);
  const findStoresQuery = "select * from CUAHANG where madoitac = @madoitac";

  const pool = await sql.connect(req.config);
  await pool
    .request()
    .input("madoitac", sql.VarChar, req.user.MADOITAC)
    .query(findStoresQuery, function (err, data) {
      console.log(err);
      console.log(data);
      // const stores = data.recordset.map((store) => {
      //   return {
      //     ...store,
      //     GIOMOCUA: new Date(store.GIOMOCUA).toLocaleTimeString(),
      //     GIODONGCUA: new Date(store.GIODONGCUA).toLocaleTimeString(),
      //   };
      // });
      res.status(200).render("stores", { stores: data.recordset });
    });
});

exports.renderStoreDetail = catchAsync(async (req, res, next) => {
  const macuahang = req.params.id;
  const findStoresQuery =
    "select * from CUAHANG where macuahang = @macuahang and madoitac = @madoitac";
  const pool = await conn;
  await pool
    .request()
    .input("macuahang", sql.VarChar, macuahang)
    .input("madoitac", sql.VarChar, req.user.MADOITAC)
    .query(findStoresQuery, function (err, data) {
      console.log(err);
      console.log(data);
      // const store = {
      //   ...data.recordset[0],
      //   GIOMOCUA: new Date(data.recordset[0].GIOMOCUA).toLocaleTimeString(),
      //   GIODONGCUA: new Date(data.recordset[0].GIODONGCUA).toLocaleTimeString(),
      // };
      res.status(200).render("storeDetail", { store: data.recordset[0] });
    });
});

exports.renderMenu = catchAsync(async (req, res, next) => {
  const findMenuQuery =
    "select * from MONAN where thucdon = (select mathucdon from thucdon where nhahang = @madoitac)";
  const pool = await conn;
  await pool
    .request()
    .input("madoitac", sql.VarChar, req.user.MADOITAC)
    .query(findMenuQuery, function (err, data) {
      console.log(err);
      console.log(data);
      // const stores = data.recordset.map((store) => {
      //   return {
      //     ...store,
      //     GIOMOCUA: new Date(store.GIOMOCUA).toLocaleTimeString(),
      //     GIODONGCUA: new Date(store.GIODONGCUA).toLocaleTimeString(),
      //   };
      // });
      res.status(200).render("menu", {
        menu: data.recordset,
        menuId: data.recordset[0].THUCDON,
      });
    });
});

exports.renderMenuDetail = catchAsync(async (req, res, next) => {
  const mamonan = req.params.id;
  const findMenuDetailQuery =
    "select * from MONAN where thucdon = (select mathucdon from thucdon where nhahang = @madoitac) and mamonan=@mamonan";
  const pool = await conn;
  await pool
    .request()
    .input("madoitac", sql.VarChar, req.user.MADOITAC)
    .input("mamonan", sql.VarChar, mamonan)
    .query(findMenuDetailQuery, function (err, data) {
      console.log(err);
      console.log(data);
      // const stores = data.recordset.map((store) => {
      //   return {
      //     ...store,
      //     GIOMOCUA: new Date(store.GIOMOCUA).toLocaleTimeString(),
      //     GIODONGCUA: new Date(store.GIODONGCUA).toLocaleTimeString(),
      //   };
      // });
      res.status(200).render("menuDetail", { menu: data.recordset[0] });
    });
});

exports.renderMenuDetailClient = catchAsync(async (req, res, next) => {
  const menuId = req.params.menuId;
  const foodId = req.params.foodId;
  const findMenuDetailQuery =
    "select * from MONAN where thucdon = @menuId and mamonan = @foodId";
  const pool = await conn;
  await pool
    .request()
    .input("menuId", sql.VarChar, menuId)
    .input("foodId", sql.VarChar, foodId)
    .query(findMenuDetailQuery, function (err, data) {
      console.log(err);
      console.log(data);
      // const stores = data.recordset.map((store) => {
      //   return {
      //     ...store,
      //     GIOMOCUA: new Date(store.GIOMOCUA).toLocaleTimeString(),
      //     GIODONGCUA: new Date(store.GIODONGCUA).toLocaleTimeString(),
      //   };
      // });
      data.recordset[0].DOITAC = data.recordset[0].THUCDON.replace("TD", "DT");
      console.log(data);
      res
        .status(200)
        .render("menuDetail", { menu: data.recordset[0], payment_methods });
    });
});

exports.renderOrder = catchAsync(async (req, res, next) => {
  const findOrderQuery = "select * from DONDATHANG where doitac = @madoitac";
  const pool = await conn;
  await pool
    .request()
    .input("madoitac", sql.VarChar, req.user.MADOITAC)
    .query(findOrderQuery, function (err, data) {
      console.log(err);
      console.log(data);
      // const stores = data.recordset.map((store) => {
      //   return {
      //     ...store,
      //     GIOMOCUA: new Date(store.GIOMOCUA).toLocaleTimeString(),
      //     GIODONGCUA: new Date(store.GIODONGCUA).toLocaleTimeString(),
      //   };
      // });
      res.status(200).render("order", { orders: data.recordset });
    });
});

exports.renderUserOrders = catchAsync(async (req, res, next) => {
  const findOrderQuery =
    "select * from DONDATHANG where khachhang = @khachhang";
  const pool = await sql.connect(req.config);
  await pool
    .request()
    .input("khachhang", sql.VarChar, req.user.MAKHACHHANG)
    .query(findOrderQuery, function (err, data) {
      console.log(err);
      console.log(data);
      // const stores = data.recordset.map((store) => {
      //   return {
      //     ...store,
      //     GIOMOCUA: new Date(store.GIOMOCUA).toLocaleTimeString(),
      //     GIODONGCUA: new Date(store.GIODONGCUA).toLocaleTimeString(),
      //   };
      // });
      res.status(200).render("order", { orders: data.recordset });
    });
});

exports.renderOrderDriver = catchAsync(async (req, res, next) => {
  const findOrderQuery = "select * from DONDATHANG where taixe=@null";
  const pool = await conn;
  await pool
    .request()
    .input("null", sql.VarChar, "TX001")
    .query(findOrderQuery, function (err, data) {
      console.log(err);
      console.log(data);
      // const stores = data.recordset.map((store) => {
      //   return {
      //     ...store,
      //     GIOMOCUA: new Date(store.GIOMOCUA).toLocaleTimeString(),
      //     GIODONGCUA: new Date(store.GIODONGCUA).toLocaleTimeString(),
      //   };
      // });
      res.status(200).render("orderDriver", { orders: data.recordset });
    });
});

exports.renderOrderDriverAccepted = catchAsync(async (req, res, next) => {
  const findOrderQuery = "select * from DONDATHANG where taixe=@taixe";
  const pool = await sql.connect(req.config);
  await pool
    .request()
    .input("taixe", sql.VarChar, req.user.MATAIXE)
    .query(findOrderQuery, function (err, data) {
      console.log(err);
      console.log(data);
      const total =
        [...data.recordset].reduce((accum, order) => {
          return accum + order.THANHTIEN;
        }, 0) || 0;
      const income = data.recordset.length * 10 || 0;
      // const stores = data.recordset.map((store) => {
      //   return {
      //     ...store,
      //     GIOMOCUA: new Date(store.GIOMOCUA).toLocaleTimeString(),
      //     GIODONGCUA: new Date(store.GIODONGCUA).toLocaleTimeString(),
      //   };
      // });
      res.status(200).render("orderDriverAccepted", {
        orders: data.recordset,
        total,
        income,
      });
    });
});

// staff
exports.renderContractStaff = catchAsync(async (req, res, next) => {
  const findOrderQuery = "select * from HOPDONG";
  const pool = await sql.connect(req.config);
  await pool.request().query(findOrderQuery, function (err, data) {
    console.log(err);
    console.log(data);
    // const stores = data.recordset.map((store) => {
    //   return {
    //     ...store,
    //     GIOMOCUA: new Date(store.GIOMOCUA).toLocaleTimeString(),
    //     GIODONGCUA: new Date(store.GIODONGCUA).toLocaleTimeString(),
    //   };
    // });
    res.status(200).render("contractStaff", { orders: data.recordset });
  });
});

exports.renderContractStaffAccepted = catchAsync(async (req, res, next) => {
  const findOrderQuery = "select * from HOPDONG where tinhtrang=@null";
  const pool = await sql.connect(req.config);
  await pool
    .request()
    .input("null", sql.NVarChar, "Đã kí")
    .query(findOrderQuery, function (err, data) {
      console.log(err);
      console.log(data);
      res
        .status(200)
        .render("contractStaffAccepted", { orders: data.recordset });
    });
});

// dondathang + chitietdonhang
exports.renderOrderDetail = catchAsync(async (req, res, next) => {
  const khachhang = req.params.customerId;
  const madondathang = req.params.id;
  const findOrderDetailQuery =
    "select ma.tenmon, ddh.tinhtrang, ctdh.soluong, ddh.thanhtien, ma.gia, ctdh.diachi, ddh.madondathang, ddh.khachhang from (dondathang ddh join chitietdonhang ctdh on ddh.khachhang = ctdh.khachhang and ddh.madondathang = ctdh.madondathang) join monan ma on ctdh.mamonan = ma.mamonan where ddh.doitac = @doitac and ma.thucdon = @thucdon and ddh.khachhang = @khachhang and ddh.madondathang = @madondathang";
  const pool = await conn;
  await pool
    .request()
    .input("doitac", sql.VarChar, req.user.MADOITAC)
    .input("thucdon", sql.VarChar, req.user.MADOITAC.replace("DT", "TD"))
    .input("khachhang", sql.VarChar, khachhang)
    .input("madondathang", sql.VarChar, madondathang)
    .query(findOrderDetailQuery, function (err, data) {
      console.log(err);
      console.log(data);
      // const stores = data.recordset.map((store) => {
      //   return {
      //     ...store,
      //     GIOMOCUA: new Date(store.GIOMOCUA).toLocaleTimeString(),
      //     GIODONGCUA: new Date(store.GIODONGCUA).toLocaleTimeString(),
      //   };
      // });
      res.status(200).render("orderDetail", { orderDetail: data.recordset });
    });
});

exports.renderSignIn = (req, res, next) => {
  res.render("./admin/sign-in", { layout: false });
};

exports.renderSignUp = (req, res, next) => {
  res.render("./admin/sign-up", { layout: false });
};
