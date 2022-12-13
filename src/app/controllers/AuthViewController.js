// const catchAsync = require("../../src/utils/catchAsync");
// const Error = require("../utils/Error");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/AppError");
const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");
const Email = require("../../utils/Email");
const { promisify } = require("util");
const User = require("../models/User");
const crypto = require("crypto");

const signToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, req, res, redirect=false) => {
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
  if (!redirect) {
    res.status(200).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } else {
    res.redirect('/');
  }
  
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

  // 4) send email
  try {
    const verifyToken = storedUser.createVerifyToken();
    await storedUser.save({validateBeforeSave: false});
    const emailObj = new Email(storedUser, `${req.protocol}://${req.get('host')}/auth/verify/${verifyToken}`);
    await emailObj.send("WELCOME AND PLEASE VERIFY YOUR EMAIL");
  } catch(err) {
    storedUser.emailVerifyToken = undefined;
    storedUser.emailVerifyTokenExpires = undefined;
    await storedUser.save({validateBeforeSave: false});

    return next(new AppError(500, err.message));
  }
  
  // 5) send back to client
  res.status(200).json({
    status: "success",
    data: {
      storedUser,
    },
  });
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

  if (!user.active) {
    return next(new AppError(400, "your account has not been verified, please check our verify email"));
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

// verify
exports.verifyEmail = catchAsync(async (req, res, next) => {
  // req.params.token
  // 1) get verify token
  const hashedVerifyToken = crypto.createHash('sha256').update(req.params.verifyToken).digest('hex');
  
  // 2) if token has not expired, and there is user, activate account
  const user = await UserModel.findOne({
    emailVerifyToken: hashedVerifyToken,
    emailVerifyTokenExpires: { $gt: Date.now() },
  });

  // 3) select field to save
  user.active = true;
  user.emailVerifyToken = undefined;
  user.emailVerifyTokenExpires = undefined;
  await user.save({validateBeforeSave: false});

  // 4) redirect user to home page
  createSendToken(user, req, res, true);
});

exports.updateMe = catchAsync(async function (req, res, next) {
  // req.user
  if (req.body.password || req.body.confirmPassword) {
    return next(
      new AppError(
        'this route is for updating user name and email. Try /changePassword'
      )
    );
  }

  // filter updated fields (only allow name, email - avoid changing role)
  const allowUpdateFields = ['name', 'email'];
  const newUpdateObj = {};
  console.log(req.body);
  Object.keys(req.body).forEach((el) => {
    if (allowUpdateFields.includes(el)) {
      newUpdateObj[el] = req.body[el];
    }
  });

  console.log('update obj');
  console.log(newUpdateObj);
  // for uploading files
  // if (req.file) newUpdateObj.photo = `${req.file.filename}.jpg`;

  // khong co new: true thì trả về đối tượng cũ chưa update
  console.log(req.user);
  const updatedUser = await UserModel.findOneAndUpdate(
    {_id: req.user._id},
    newUpdateObj,
    {
      new: true,
      // chỉ validate các fields được update
      runValidators: true,
    }
  );
  console.log('updated');
  console.log(updatedUser);

  // remove password field from res data
  updatedUser.pasword = undefined;

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

// api
exports.updatePassword = catchAsync(async function (req, res, next) {
  // 1) find user
  const user = await UserModel.findById(req.user._id);
  // 2) check current password
  const isCorrectPassword = await user.isCorrectPassword(
    req.body.currentPassword,
    user.password
  );
  if (!isCorrectPassword) {
    return next(new AppError('current password is not correct'), 400);
  }

  // 3) update password (UserModel.findByIdAndUpdate se khong validate lai nen phai lam cach nay)
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  await user.save();

  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
});
