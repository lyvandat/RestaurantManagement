const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/AppError");
const CartModel = require("../models/Cart");
const { ObjectId } = require("mongoose");

exports.addItemToCart = catchAsync(async (req, res, next) => {
  // for logged-in user
  const cart = await CartModel.findOne({userId: req.user._id});
  const productId = req.params.id;
  const quantity = req.body.quantity || 0;
  const price = req.body.price || 0;

  if(!cart) {
    return next(new AppError("cannot find cart with that userId"));
  }

  const newCart = await cart.addItemToCart(productId, quantity, price);

  res.status(200).json({
    status: "success",
    data: newCart
  })
});

exports.updateSelectFieldToItem = catchAsync(async (req, res, next) => {
  const productIds = req.body.productIds;

  const productObjectIds = productIds.map((id) => ObjectId(id));
  const cart = await CartModel.findOne({userId: req.user._id});

  cart.products.forEach((product) => {
    if (productObjectIds.includes(product._id)) {
      product.selected = true;
    }
  });

  const newCart = await cart.save();

  res.status(200).json({
    status: "success",
    data: {
      cart: newCart
    }
  })
})