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

  // 3) send res through api
  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  // 1) validate email, password
  const { email, password } = req.body;

  if (
    !email.trim() ||
    !email.includes("@") ||
    password.length < 6 ||
    !password
  ) {
    next(new AppError("fail", "Invalid email and password"));
  }

  // 2) check if email has existed
  const user = await UserModel.findOne({ email });

  if (user) {
    next(
      new AppError(
        "fail",
        "Email has already existed, please try another email"
      )
    );
  }

  // 3) create token
  const token = signToken;

  // 4) send back to client
});
