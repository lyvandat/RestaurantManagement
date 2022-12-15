const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/AppError");
const UserModel = require("../models/User");
const multer = require("multer");
const sharp = require("sharp");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError("only image files are supported"));
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
})

exports.uploadSingleImage = upload.single('photo');

exports.resizeUploadImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `ava-${req.user._id}-${Date.now()}`;

  await sharp(req.file.buffer).resize(500, 500).toFormat("jpg").jpeg({quality: 90}).toFile(`${process.cwd()}/src/public/images/avatar/${req.file.filename}.jpg`);
  next();
})

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
  Object.keys(req.body).forEach((el) => {
    if (allowUpdateFields.includes(el)) {
      newUpdateObj[el] = req.body[el];
    }
  });
  // for uploading files
  if (req.file) newUpdateObj.photo = `${req.file.filename}.jpg`;

  // khong co new: true thì trả về đối tượng cũ chưa update
  const updatedUser = await UserModel.findByIdAndUpdate(
    req.user._id,
    newUpdateObj,
    {
      new: true,
      // chỉ validate các fields được update
      runValidators: true,
    }
  );

  // remove password field from res data
  updatedUser.pasword = undefined;

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});