const catchAsync = require("../../utils/catchAsync");
const { conn, sql } = require("../../config/db");

exports.createSeller = catchAsync(async function (req, res, next) {
  const {
    restaurantName,
    restaurantEmail,
    restaurantOwner,
    restaurantDistrict,
    restaurantCity,
    restaurantBranch,
    restaurantQuantity,
    restaurantType,
    restaurantAddress,
    restaurantPhone,
    bankName,
    bankBranch,
    bankNumber,
    username,
    password,
  } = req.body;

  if (
    restaurantName.trim().length === 0 ||
    restaurantEmail.trim().length === 0 ||
    restaurantOwner.trim().length === 0 ||
    restaurantDistrict.trim().length === 0 ||
    restaurantCity.trim().length === 0 ||
    restaurantBranch.trim().length === 0 ||
    restaurantQuantity.trim().length === 0 ||
    restaurantType.trim().length === 0 ||
    restaurantAddress.trim().length === 0 ||
    bankName.trim().length === 0 ||
    bankBranch.trim().length === 0 ||
    bankNumber.trim().length === 0 ||
    username.trim().length === 0 ||
    password.trim().length === 0
  ) {
    return next(new AppError(400, "Missing fields"));
  }

  // create seller
  let seller = null;
  const createSellerQuery =
    "insert into DOITAC values(@id, @phone, @type, @quantity, @branch, @address, @name, @owner, @email, N'Chờ xử lí', @accountId)";
  const pool = await conn;
  const sellerId = `DT-${Date.now()}-${Math.ceil(Math.random() * 1000)}`;
  const accountId = sellerId.replace("DT", "TK");
  await pool
    .request()
    .input("id", sql.VarChar, sellerId)
    .input("phone", sql.VarChar, restaurantPhone)
    .input("type", sql.NVarChar, restaurantType)
    .input("quantity", sql.Int, restaurantQuantity)
    .input("branch", sql.Int, restaurantBranch)
    .input("address", sql.NVarChar, restaurantAddress)
    .input("name", sql.NVarChar, restaurantName)
    .input("owner", sql.NVarChar, restaurantOwner)
    .input("email", sql.VarChar, restaurantEmail)
    .input("accountId", sql.VarChar, accountId)
    .query(createSellerQuery, function (err, data) {
      console.log(err);
      seller = data.recordset;
    });

  // create account
  const accountResult = await pool
    .request()
    .input("accountId", sql.VarChar, accountId)
    .input("username", sql.VarChar, username)
    .input("password", sql.VarChar, password)
    .input("role", sql.NVarChar, "Đối tác")
    .query(
      "insert into taikhoan values(@accountId, @username, @password, @role)"
    );

  // create login
  const login = await pool
    .request()
    // .input("username", sql.VarChar, username)
    // .input("password", sql.VarChar, password)
    .query(
      `create login ${username} with password = '${password}'`,
      function (err, data) {
        console.log(err);
      }
    );

  // create user
  const user = await pool
    .request()
    // .input("sellerId", sql.VarChar, sellerId)
    // .input("username", sql.VarChar, username)
    .query(
      `create user ${sellerId.replaceAll("-", "_")} for login ${username}`
    );

  // add to role
  const role = await pool
    .request()
    // .input("seller", sql.VarChar, sellerId)
    .query(`alter role DoiTac add member ${sellerId.replaceAll("-", "_")}`);

  // create contract
  const result = await pool
    .request()
    .input(
      "MaHopDong",
      sql.VarChar,
      `HD-${Date.now()}-${Math.ceil(Math.random() * 1000)}`
    )
    .input("TenNganHang", sql.NVarChar, bankName)
    .input("ChiNhanh", sql.NVarChar, bankBranch)
    .input("SoTaiKhoan", sql.VarChar, bankNumber)
    .input("DiaChi", sql.NVarChar, restaurantAddress)
    .input("NguoiDaiDien", sql.NVarChar, restaurantOwner)
    .input("SoChiNhanh", sql.Int, restaurantBranch)
    .input("MaSoThue", sql.NVarChar, "TAX001")
    .input("ThoiHan", sql.Date, "2030-01-01")
    .input("PhiHoaHong", sql.Float, 0.1)
    .input("TinhTrang", sql.NVarChar, "Chưa xác nhận")
    .input("DoiTac", sql.VarChar, sellerId)
    .execute("USP_LAPHOPDONG");

  const contract = result.recordset;

  res.status(200).json({
    status: "success",
    data: {
      seller,
      contract,
      account: accountResult.recordset,
    },
  });
});

// lưu ý không được cập nhật tên trong vòng 30 ngày
// vẫn chưa bắt lỗi được cập nhật tên trong 30 ngày
exports.updateStore = catchAsync(async function (req, res, next) {
  const { name, address, open, close, status } = req.body;
  const storeId = req.params.id;
  if (
    name.trim().length === 0 ||
    address.trim().length === 0 ||
    open.trim().length === 0 ||
    close.trim().length === 0
  ) {
    return next(new AppError(400, "Missing fields in updating store"));
  }

  const pool = await conn;
  const result = await pool
    .request()
    .input("MADOITAC", sql.VarChar, req.user.MADOITAC)
    .input("MACUAHANG", sql.VarChar, storeId)
    .input("TENQUAN", sql.NVarChar, name)
    .input("GIOMOCUA", sql.VarChar, open)
    .input("GIODONGCUA", sql.VarChar, close)
    .input("DIACHI", sql.NVarChar, address)
    .input("TINHTRANG", sql.NVarChar, status)
    .execute("USP_QUANLICUAHANG", function (err, data) {
      console.log(err);
    });
  console.log(storeId, name, open, close, address, status);
  res.status(200).json({
    status: "success",
    data: {
      store: result.recordset,
    },
  });
});

exports.createMenuItem = catchAsync(async function (req, res, next) {
  const { name, address, open, close, status } = req.body;
  const storeId = req.params.id;
  if (
    name.trim().length === 0 ||
    address.trim().length === 0 ||
    open.trim().length === 0 ||
    close.trim().length === 0
  ) {
    return next(new AppError(400, "Missing fields in updating store"));
  }

  const pool = await conn;
  const result = await pool
    .request()
    .input("MADOITAC", sql.VarChar, req.user.MADOITAC)
    .input("MACUAHANG", sql.VarChar, storeId)
    .input("TENQUAN", sql.NVarChar, name)
    .input("GIOMOCUA", sql.VarChar, open)
    .input("GIODONGCUA", sql.VarChar, close)
    .input("DIACHI", sql.NVarChar, address)
    .input("TINHTRANG", sql.NVarChar, status)
    .execute("USP_QUANLICUAHANG", function (err, data) {
      console.log(err);
    });
  console.log(storeId, name, open, close, address, status);
  res.status(200).json({
    status: "success",
    data: {
      store: result.recordset,
    },
  });
});

exports.updateMenuItem = catchAsync(async function (req, res, next) {
  console.log("update menu item");
  const { menuId, name, desc, price, status, quantity, selectId, selectName } =
    req.body;
  const mamonan = req.params.id;
  if (
    menuId.trim().length === 0 ||
    selectId.trim().length === 0 ||
    selectName.trim().length === 0 ||
    name.trim().length === 0 ||
    desc.trim().length === 0 ||
    price.trim().length === 0 ||
    status.trim().length === 0 ||
    quantity.trim().length === 0
  ) {
    return next(new AppError(400, "Missing fields in updating menu item"));
  }

  const pool = await conn;
  const result = await pool
    .request()
    .input("MADOITAC", sql.VarChar, req.user.MADOITAC)
    .input("THUCDON", sql.VarChar, menuId)
    .input("MAMONAN", sql.VarChar, mamonan)
    .input("TENMON", sql.NVarChar, name)
    .input("MIEUTA", sql.NVarChar, desc)
    .input("GIA", sql.Float, +price)
    .input("TINHTRANG", sql.NVarChar, status)
    .input("SOLUONG", sql.Int, +quantity)
    .input("TUYCHON", sql.VarChar, selectId)
    .input("TENTUYCHON", sql.NVarChar, selectName)
    .execute("USP_QUANLITHUCDON", function (err, data) {
      console.log(err);
    });

  res.status(200).json({
    status: "success",
    data: {
      store: result.recordset,
    },
  });
});

exports.addMenuItem = catchAsync(async function (req, res, next) {
  console.log("add menu item");
  const { name, desc, price, status, quantity, selectId, selectName, itemId } =
    req.body;
  const menuId = req.params.id;
  if (
    menuId.trim().length === 0 ||
    selectId.trim().length === 0 ||
    selectName.trim().length === 0 ||
    name.trim().length === 0 ||
    desc.trim().length === 0 ||
    price.trim().length === 0 ||
    status.trim().length === 0 ||
    quantity.trim().length === 0
  ) {
    return next(new AppError(400, "Missing fields in updating menu item"));
  }

  // const pool = await conn;
  const pool = await sql.connect(req.config);
  console.log(
    req.user.MADOITAC,
    menuId,
    itemId,
    name,
    desc,
    price,
    status,
    quantity
  );
  const result = await pool
    .request()
    .input("MADOITAC", sql.VarChar, req.user.MADOITAC)
    .input("THUCDON", sql.VarChar, menuId)
    .input("MAMONAN", sql.VarChar, itemId)
    .input("TENMON", sql.NVarChar, name)
    .input("MIEUTA", sql.NVarChar, desc)
    .input("GIA", sql.Float, +price)
    .input("TINHTRANG", sql.NVarChar, status)
    .input("SOLUONG", sql.Int, +quantity)
    .input("TUYCHON", sql.VarChar, "TC002")
    .input("TENTUYCHON", sql.NVarChar, "Ít ớt")
    .execute("USP_THEMMONAN", function (err, data) {
      console.log(err);
      console.log("data add menu item", data);
    });

  res.status(200).json({
    status: "success",
    data: {
      store: result.recordset,
    },
  });
});

exports.updateOrderStatus = catchAsync(async function (req, res, next) {
  const customerId = req.params.customerId;
  const orderId = req.params.orderId;
  const updateOrderStatusQuery =
    "update DONDATHANG set TINHTRANG = N'Đang chuẩn bị' where madondathang = @madondathang and khachhang = @khachhang and doitac = @doitac";

  // const pool = await conn;
  const pool = await sql.connect(req.config);
  console.log(customerId);
  console.log(orderId);
  await pool
    .request()
    .input("madondathang", sql.VarChar, orderId)
    .input("khachhang", sql.VarChar, customerId)
    .input("doitac", sql.VarChar, req.user.MADOITAC)
    .query(updateOrderStatusQuery, function (err, data) {
      console.log(err);
      console.log(data);
      res.status(200).json({
        status: "success",
        data: {
          store: data.recordset,
        },
      });
    });
});
