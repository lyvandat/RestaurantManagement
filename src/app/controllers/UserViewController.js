const mongoose = require("mongoose");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Order = require("../models/Order");
const catchAsync = require("../../utils/catchAsync");
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

exports.renderItemDetail = async function (req, res, next) {
  const product = await Product.findOne({ slug: req.params.slug });
  const recommend = await Product.find({
    category: { $regex: product.category[0], $options: "i" },
  });
  res.render("item", {
    recommend,
    food: mongooseToObject(product),
  });
};

// [GET] /products
exports.renderItems = async function (req, res, next) {
  const options = {};
  let page = 1;
  if (req.query.hasOwnProperty("_search"))
    Object.assign(options, {
      name: { $regex: req.query._search, $options: "i" },
    });

  if (req.query.hasOwnProperty("priceRange")) {
    const [from, to] = req.query.priceRange.split(",");
    options["price"] = { $gte: +from * 1000, $lte: +to * 1000 };
  }

  if (req.query.hasOwnProperty("manufacturer")) {
    const manufacturer = req.query.manufacturer;
    const manufacurerQuery = manufacturer.replaceAll("_", " ");
    const manufacturers = manufacurerQuery.split(",");
    options["manufacturer"] = {
      $in: manufacturers,
    };
  }

  if (req.query.hasOwnProperty("category")) {
    const category = req.query.category;
    const categoryQuery = category.replaceAll("_", " ");
    if (categoryQuery !== "All") {
      options["category"] = { $regex: categoryQuery, $options: "i" };
    }
  }

  if (req.query.hasOwnProperty("page")) {
    page = +req.query.page;

    if (isNaN(page)) {
      page = 1;
    }
  }

  const skipNum = (page - 1) * 6;

  // for pagination
  const allProducts = await Product.find(options);
  const productLength = Math.ceil(allProducts.length / 6);
  const productPage = [];
  for (let i = 0; i < productLength; ++i) {
    productPage[i] = {
      value: i + 1,
    };
  }
  //

  const products = await Product.find(options)
    .skip(skipNum)
    .limit(6)
    .sortable(req);

  res.render("products", {
    foods: multipleMongooseToObject(products),
    restaurant_logo,
    productPage,
  });
};

// [GET] /user/:id/cart
exports.renderCart = catchAsync(async (req, res, next) => {
  let cart = await Cart.findOne({ userId: req.params.id });
  const recommend = await Product.aggregate([{ $sample: { size: 6 } }]);
  if (cart) {
    // // populate product data in productId field
    // const cartPopulatedPromises = cart.products.map(async (product, index) => {
    //   return cart.populate(`products.${index}.productId`);
    // });
    // // [{}, {}, {}]: array of carts populated with product data
    // const carts = await Promise.all(cartPopulatedPromises);
    // cart = carts[0];

    cart = await cart.getPopulatedCart();
  }
  // create an empty cart
  else {
    cart = await Cart.create({
      userId: req.params.id,
      products: [],
    });
  }

  // render cart page
  res.render("cart", {
    items: cart?.products || [],
    recommend,
    totalPrice: cart?.subTotal || 0,
  });

  // res.status(200).json({
  //   status: 'success',
  //   data: cart[0],
  // })
});

// [GET] /user/:id/order
exports.renderPayment = catchAsync(async (req, res, next) => {
  let cart = await Cart.findOne({ userId: req.user._id });
  let totalPrice = 0;
  cart = await cart.getPopulatedCart();
  const items = cart.products.reduce((accumulator, product) => {
    if (product.selected) {
      accumulator.push(product);
      totalPrice += product.total;
    }
    return accumulator;
  }, []);

  res.render("buy", {
    items,
    payment_methods,
    subTotal: totalPrice,
    total: totalPrice + 20000,
  });
});

exports.renderMe = catchAsync(async (req, res, next) => {
  res.status(200).render("profile");
});

exports.renderOrder = catchAsync(async (req, res, next) => {
  let orders = await Order.find({ userId: req.user._id });
  const hasOrders = orders.length > 0 ? true : false;
  const orderPromises = orders.map((order) => {
    return order.getPopulatedOrder();
  });

  // populated orders
  orders = await Promise.all(orderPromises);
  res.status(200).render("order", {
    orders,
    hasOrders,
  });
});

exports.renderOrderDetail = catchAsync(async (req, res, next) => {
  let order = await Order.findById(req.params.id);

  if (!order) {
    return next(
      new AppError("Cannot find your order, may be order id is wrong")
    );
  }
  order = await order.getPopulatedOrder();
  const paymentMethod = payment_methods.find((pm) => pm.key === order.payment);
  res.render("order-detail", {
    items: order.products,
    payment_methods,
    subTotal: order.subTotal,
    total: order.subTotal + 20000,
    note: order.note,
    paymentMethod,
  });
});
