const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/AppError");
const CartModel = require("../models/Cart");

exports.updateItemQuantity = catchAsync(async (req, res, next) => {
  // for logged-in user
  const cart = await CartModel.findOne({userId: req.user._id});
  const productId = req.params.id;
  const quantity = req.body.quantity || 0;
  const price = req.body.price || 0;
  const type = req.body.type || "add";
  let newCart = null;

  if(!cart) {
    return next(new AppError("cannot find cart with that userId"));
  }

  if (type === "add") {
    newCart = await cart.addItemToCart(productId, quantity, price);
  } else {
    newCart  = await cart.setItemCart(productId, quantity, price);
  }

  res.status(200).json({
    status: "success",
    data: newCart
  })
});

exports.updateSelectFieldToItem = catchAsync(async (req, res, next) => {
  const productIds = req.body.productIds;
  const cart = await CartModel.findOne({userId: req.user._id});

  if (!productIds || productIds.length === 0) {
    return next(new AppError(400, "vui lòng chọn món ăn"));
  }

  cart.products.forEach((product, index) => {
    cart.products[index].selected = false;

    if (productIds.includes(String(product.productId))) {
      cart.products[index].selected = true;
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