const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/AppError");
const OrderModel = require("../models/Order");
const CartModel = require("../models/Cart");
const UserModel = require("../models/User");

exports.createOrder = catchAsync(async (req, res, next) => {
  const { phone, address, note, payment } = req.body;
  const cart = await CartModel.findOne({userId: req.user._id});
  const user = await UserModel.findByIdAndUpdate(req.user._id, {phone, address}, {new: true, runValidators: true});

  if (!cart) {
    return next(new AppError(404, "cannot find your cart"));
  }

  if (!user) {
    return next(new AppError(404, "cannot find your account"));
  }

  const products = [...cart.products].filter((product) => {
    console.log(product.selected);
    return product.selected
  });
  console.log("selected", products);
  const order = await OrderModel.create({
    userId: cart.userId,
    products,
    subTotal: cart.subTotal + 20000,
    note,
    payment,
  });

  // remove all ordered products 
  const remainProducts = cart.products.filter((product) => {return product.selected === false});
  console.log("not selected", remainProducts);
  cart.products = remainProducts;
  const newCart = await cart.save();

  res.status(201).json({
    status: "success",
    data: {
      order,
      user,
      cart: newCart
    }
  });
});
