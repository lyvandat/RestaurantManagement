// const catchAsync = require("../../src/utils/catchAsync");
// const Error = require("../utils/Error");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/AppError");
const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const signToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, req, res) => {
  // 1) create token
  const token = signToken(user._id);

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
  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  // 1) validate email, password
  const { name, email, password } = req.body;

  if (
    !name ||
    name.trim().length === 0 ||
    !email.trim() ||
    !email.includes("@") ||
    password.length < 6 ||
    !password
  ) {
    return next(new AppError(400, "Invalid name, email and password"));
  }

  // 2) check if email has existed
  const user = await UserModel.findOne({ email });

  if (user) {
    return next(
      new AppError(400, "Email has already existed, please try another email")
    );
  }

  // 3) store user
  const storedUser = await UserModel.create({
    name,
    email,
    password,
  });

  // 4) send back to client
  createSendToken(storedUser, req, res);
});

exports.signIn = catchAsync(async (req, res, next) => {
  // 0) validate email, password
  const { email, password } = req.body;
  if (!email || !email.includes("@") || !password) {
    return next(new AppError(400, "Please provide email and password"));
  }

  // 1) check if user has registered
  const user = await UserModel.findOne({ email });

  if (!user) {
    return next(new AppError(400, "this email has not been registered"));
  }

  // 2) check if password is correct
  const isCorrectPassword = await user.isCorrectPassword(
    password,
    user.password
  );
  if (!isCorrectPassword) {
    return next(new AppError(400, "password is not correct"));
  }

  // 3) sign user in
  createSendToken(user, req, res);
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
  const user = await UserModel.findOne({ _id: decoded.id });

  if (!user) {
    return next(new AppError(401, "the user has been deleted"));
  }

  // 3) check if user changes password after token has been signed
  const isChangedPassword = user.changePasswordAfter(decoded.iat);

  if (isChangedPassword) {
    return next(
      new AppError(401, "password has been changed, please log in again")
    );
  }

  // 4) user has logged in
  req.user = user;
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
    const user = await UserModel.findOne({ _id: decoded.id });

    if (!user) {
      return next();
    }

    // 3) check if user changes password after token has been signed
    const isChangedPassword = user.changePasswordAfter(decoded.iat);

    if (isChangedPassword) {
      return next();
    }

    // 4) user has logged in
    // global user for hbs view engine
    res.locals.user = user;
    next();
  } catch (err) {
    // console.log(err);
    next();
  }
};

exports.restrictTo = (...roles) => {
  return catchAsync(async (req, res, next) => {
    // check if role is valid
    for (const role in roles) {
      if (!["buyer", "seller", "admin"].includes(role)) {
        return next(new AppError(400, "role is either buyer, seller or admin"));
      }
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError(403, "you cannot perform this action"));
    }

    next();
  });
};
