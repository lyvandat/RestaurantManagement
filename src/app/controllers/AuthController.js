// TRANG
// const catchAsync = require("../../src/utils/catchAsync");
// const Error = require("../utils/Error");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/AppError");
const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");
const promisify = require("promisify");

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
  const { email, password } = req.body;

  if (
    !email.trim() ||
    !email.includes("@") ||
    password.length < 6 ||
    !password
  ) {
    return next(new AppError("fail", "Invalid email and password"));
  }

  // 2) check if email has existed
  const user = await UserModel.findOne({ email });

  if (user) {
    return next(
      new AppError(
        "fail",
        "Email has already existed, please try another email"
      )
    );
  }

  // 3) store user
  const storedUser = await UserModel.create({
    email,
    password,
  });

  // 4) send back to client
  createSendToken(storedUser, req, res);
});
