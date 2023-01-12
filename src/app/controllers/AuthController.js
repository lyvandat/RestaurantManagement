// const catchAsync = require("../../src/utils/catchAsync");
// const Error = require("../utils/Error");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/AppError");
const UserModel = require("../models/User");
const CartModel = require("../models/Cart");
const jwt = require("jsonwebtoken");
const Email = require("../../utils/Email");
const { promisify } = require("util");
const crypto = require("crypto");
const { conn, sql } = require("../../config/db");

const signToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (
  mataikhoan,
  req,
  res,
  user = null,
  redirect = false
) => {
  // 1) create token
  const token = signToken(mataikhoan);

  // 2) add token to cookies
  const cookieOptions = {
    // milliseconds
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    cookieOptions["secure"] = true;
  }

  res.cookie("jwt", token, cookieOptions);

  // 3) send res through api
  if (!redirect) {
    res.status(200).json({
      status: "success",
      token,
      user,
    });
  } else {
    res.redirect("/");
  }
};

exports.signUp = catchAsync(async (req, res, next) => {
  // 1) validate email, password
  const { name, email, phone, address, role, username, password } = req.body;

  if (
    !name ||
    !email ||
    !address ||
    !role ||
    !password ||
    !phone ||
    !username ||
    !email.includes("@")
  ) {
    return next(new AppError(400, "Please enter all fields with valid value"));
  }

  // 2) check if email has existed
  const findUsernameQuery =
    "select * from taikhoan where tendangnhap = @username";
  const pool = await conn;
  const result = await pool
    .request()
    .input("username", sql.VarChar, name)
    .query(findUsernameQuery);
  const user = result.recordset[0];

  if (user) {
    return next(
      new AppError(
        400,
        "Email has already existed, please try another username"
      )
    );
  }

  if (role !== "Khách hàng") {
    return next(new AppError(400, "role must be 'Khách hàng'"));
  }

  // 3) store user
  const accountId = `TK-${Date.now()}-${Math.ceil(Math.random() * 1000)}`;
  const customerId = accountId.replace("TK", "KH");
  await pool
    .request()
    .input("accountId", sql.VarChar, accountId)
    .input("username", sql.VarChar, username)
    .input("password", sql.VarChar, password)
    .input("role", sql.NVarChar, role)
    .query(
      "insert into taikhoan values(@accountId, @username, @password, @role)"
    );

  await pool
    .request()
    .input("customerId", sql.VarChar, customerId)
    .input("name", sql.NVarChar, name)
    .input("phone", sql.VarChar, phone)
    .input("address", sql.NVarChar, address)
    .input("email", sql.VarChar, email)
    .input("accountId", sql.VarChar, accountId)
    .query(
      "insert into khachhang values(@customerId, @name, @phone, @address, @email, @accountId)"
    );

  // create login
  await pool
    .request()
    .query(
      `create login ${username} with password = '${password}'`,
      function (err, data) {
        console.log(err);
      }
    );

  // create user
  await pool
    .request()
    .query(
      `create user ${customerId.replaceAll("-", "_")} for login ${username}`
    );

  // add to role
  await pool
    .request()
    .query(
      `alter role KhachHang add member ${customerId.replaceAll("-", "_")}`
    );

  // 5) send back to client
  res.status(200).json({
    status: "success",
    data: null,
  });
});

exports.signUpDriver = catchAsync(async (req, res, next) => {
  // 1) validate email, password
  const {
    name,
    email,
    phone,
    address,
    role,
    area,
    motorbike,
    bank,
    bankNumber,
    username,
    password,
  } = req.body;

  if (
    !name ||
    !email ||
    !address ||
    !role ||
    !area ||
    !motorbike ||
    !bank ||
    !bankNumber ||
    !password ||
    !phone ||
    !username ||
    !email.includes("@")
  ) {
    return next(new AppError(400, "Please enter all fields with valid value"));
  }

  // 2) check if username has existed
  const findUsernameQuery =
    "select * from taikhoan where tendangnhap = @username";
  const pool = await conn;
  const result = await pool
    .request()
    .input("username", sql.VarChar, username)
    .query(findUsernameQuery);
  const user = result.recordset[0];

  if (user) {
    return next(
      new AppError(
        400,
        "Email has already existed, please try another username"
      )
    );
  }

  // 3) store user
  console.log(username);
  console.log(password);
  const accountId = `TK-${Date.now()}-${Math.ceil(Math.random() * 1000)}`;
  const driverId = accountId.replace("TK", "TX");
  await pool
    .request()
    .input("accountId", sql.VarChar, accountId)
    .input("username", sql.VarChar, username)
    .input("password", sql.VarChar, password)
    .input("role", sql.NVarChar, role)
    .query(
      "insert into taikhoan values(@accountId, @username, @password, @role)"
    );

  await pool
    .request()
    .input("driverId", sql.VarChar, driverId)
    .input("name", sql.NVarChar, name)
    .input("phone", sql.VarChar, phone)
    .input("address", sql.NVarChar, address)
    .input("motorbike", sql.VarChar, motorbike)
    .input("area", sql.VarChar, area)
    .input("email", sql.VarChar, email)
    .input("bankNumber", sql.VarChar, bankNumber)
    .input("bank", sql.VarChar, bank)
    .input("accountId", sql.VarChar, accountId)
    .query(
      "insert into taixe values(@driverId, @name, @phone, @address, @motorbike, @area, @email, @bankNumber, @bank, @accountId)"
    );

  // create login
  await pool
    .request()
    .query(
      `create login ${username} with password = '${password}'`,
      function (err, data) {
        console.log(err);
      }
    );

  // create user
  await pool
    .request()
    .query(
      `create user ${driverId.replaceAll("-", "_")} for login ${username}`
    );

  // add to role
  await pool
    .request()
    .query(`alter role TaiXe add member ${driverId.replaceAll("-", "_")}`);

  // 5) send back to client
  res.status(200).json({
    status: "success",
    data: null,
  });
});

exports.signIn = catchAsync(async (req, res, next) => {
  // 0) validate email, password
  const { name, password } = req.body;
  if (!name || !password) {
    return next(new AppError(400, "Please provide username and password"));
  }

  // 1) check if user has registered
  const pool = await conn;
  const accountResult = await pool
    .request()
    .input("username", sql.VarChar, name)
    .query("select * from taikhoan where tendangnhap = @username");

  if (!accountResult.recordset[0]) {
    return next(new AppError(400, "this username has not been registered"));
  }

  // 2) check if password is correct
  const passwordQueried = accountResult.recordset[0].MATKHAU;

  if (passwordQueried !== password) {
    return next(new AppError(400, "password is not correct"));
  }

  // 3) sign user in
  createSendToken(
    accountResult.recordset[0].MATAIKHOAN,
    req,
    res,
    accountResult.recordset[0]
  );
  // res.status(200).json({
  //   status: "success",
  //   data: {
  //     account: accountResult.recordset[0],
  //   },
  // });
});

exports.signOut = catchAsync(async (req, res, next) => {
  // 1) replace jwt
  const cookieOptions = {
    // expires in 10 mins
    expires: new Date(Date.now() + 10 * 60 * 1000),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    cookieOptions["secure"] = true;
  }

  res.cookie("jwt", "loggedout", cookieOptions);

  res.status(200).json({
    status: "success",
    message: "log out successfully",
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) check if user has signed in
  let token = null;
  const jsontoken = req.headers.authorization;
  if (jsontoken && jsontoken.startsWith("Bearer")) {
    token = jsontoken.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  // throw error if token is not valid
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 2) check if user has been deleted
  // const user = await UserModel.findOne({ _id: decoded.id });
  const pool = await conn;
  const roleResult = await pool
    .request()
    .input("accountId", sql.VarChar, decoded.id)
    .query("select * from taikhoan tk where tk.mataikhoan = @accountId");

  const role = roleResult.recordset[0].VAITRO;
  let accountTable = "khachhang";
  if (role === "Tài xế") {
    accountTable = "TAIXE";
  } else if (role === "Đối tác") {
    accountTable = "DOITAC";
  } else if (role === "Nhân viên") {
    accountTable = "NHANVIEN";
  }

  const accountResult = await pool
    .request()
    .input("accountId", sql.VarChar, decoded.id)
    .query(
      `select * from taikhoan tk left join ${accountTable} kh on tk.mataikhoan = kh.taikhoan where tk.mataikhoan = @accountId`
    );

  if (!accountResult.recordset[0]) {
    return next(new AppError(401, "the user has been deleted"));
  }

  // 3) user has logged in
  req.config = {
    server: "localhost",
    user: accountResult.recordset[0].TENDANGNHAP,
    password: accountResult.recordset[0].MATKHAU,
    database: "thuongmaidientu",
    driver: "msnodesqlv8",
  };

  req.user = accountResult.recordset[0];
  // res.locals.cartQuantity = cartQuantity;
  // res.locals.quantity = cartQuantity;
  res.locals.user = accountResult.recordset[0];
  next();
});

exports.isLoggedIn = async (req, res, next) => {
  try {
    // 1) check if user has signed in
    let token = null;
    const jsontoken = req.headers.authorization;
    if (jsontoken && jsontoken.startsWith("Bearer")) {
      token = jsontoken.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    // throw error if token is not valid
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 2) check if user has been deleted
    const pool = await conn;
    const roleResult = await pool
      .request()
      .input("accountId", sql.VarChar, decoded.id)
      .query("select * from taikhoan tk where tk.mataikhoan = @accountId");

    const role = roleResult.recordset[0].VAITRO;
    let accountTable = "khachhang";
    if (role === "Tài xế") {
      accountTable = "TAIXE";
    } else if (role === "Đối tác") {
      accountTable = "DOITAC";
    } else if (role === "Nhân viên") {
      accountTable = "NHANVIEN";
    }
    const accountResult = await pool
      .request()
      .input("accountId", sql.VarChar, decoded.id)
      .query(
        `select * from taikhoan tk left join ${accountTable} kh on tk.mataikhoan = kh.taikhoan where tk.mataikhoan = @accountId`
      );
    if (!accountResult.recordset[0]) {
      return next();
    }
    console.log("user log in", accountResult.recordset[0]);

    // 3) user has logged in
    // global user for hbs view engine
    req.config = {
      server: "localhost",
      user: accountResult.recordset[0].TENDANGNHAP,
      password: accountResult.recordset[0].MATKHAU,
      database: "thuongmaidientu",
      driver: "msnodesqlv8",
    };

    req.user = accountResult.recordset[0];
    // res.locals.cartQuantity = cartQuantity;
    // res.locals.quantity = cartQuantity;
    res.locals.user = accountResult.recordset[0];
    next();
  } catch (err) {
    // console.log(err);
    next();
  }
};

exports.restrictTo = (...roles) => {
  const allowedRoles = [
    "Khách hàng",
    "Đối tác",
    "Quản trị",
    "Nhân viên",
    "Tài xế",
  ];
  return catchAsync(async (req, res, next) => {
    // check if role is valid
    for (const role of roles) {
      console.log("role", role);
      if (!allowedRoles.includes(role)) {
        return next(
          new AppError(
            400,
            "role is either Khách hàng, Đối tác, Quản trị, Nhân viên, Tài xế"
          )
        );
      }
    }

    if (!roles.includes(req.user.VAITRO)) {
      return next(new AppError(403, "Bạn không được cấp quyền vào trang này"));
    }
    console.log(req.originalUrl);

    next();
  });
};

// verify
exports.verifyEmail = catchAsync(async (req, res, next) => {
  // req.params.token
  // 1) get verify token
  const hashedVerifyToken = crypto
    .createHash("sha256")
    .update(req.params.verifyToken)
    .digest("hex");

  // 2) if token has not expired, and there is user, activate account
  const user = await UserModel.findOne({
    emailVerifyToken: hashedVerifyToken,
    emailVerifyTokenExpires: { $gt: Date.now() },
  });

  // 3) select field to save
  user.active = true;
  user.emailVerifyToken = undefined;
  user.emailVerifyTokenExpires = undefined;
  await user.save({ validateBeforeSave: false });

  // 4) redirect user to home page
  createSendToken(user, req, res, true);
});

exports.updatePassword = catchAsync(async function (req, res, next) {
  // 1) find user
  const user = await UserModel.findById(req.user._id);
  // 2) check current password
  const isCorrectPassword = await user.isCorrectPassword(
    req.body.currentPassword,
    user.password
  );
  if (!isCorrectPassword) {
    return next(new AppError("current password is not correct"), 400);
  }

  // 3) update password (UserModel.findByIdAndUpdate se khong validate lai nen phai lam cach nay)
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  await user.save();

  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
});
