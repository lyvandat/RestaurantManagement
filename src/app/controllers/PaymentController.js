const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/AppError");
const OrderModel = require("../models/Order");
const CartModel = require("../models/Cart");
const UserModel = require("../models/User");
const querystring = require("querystring");
const stripe = require("stripe")(
  "sk_test_51MA1y3LNa1ApPuqdtXHI2Sote5T3N2BUg6CnKaMIDjXJiV0kzoxnOTeulfMxVmgayucW1pPDaIiT2KHeEo0RmcWG00MVBNC5ti"
);

exports.createCheckoutSession = catchAsync(async (req, res, next) => {
  // for creating orders in db
  const { phone, address, note, payment } = req.body;
  const createOrderQuery = querystring.stringify({
    phone,
    address,
    note,
    payment,
  });
  // find cart
  let cart = await CartModel.findOne({ userId: req.user._id });
  cart = await cart.getPopulatedCart();
  const totalPay = cart.products.reduce((accumulator, prod) => {
    if (prod.selected) {
      accumulator += prod.total;
    }

    return accumulator;
  }, 0);

  const session = await stripe.checkout.sessions.create({
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 20000, currency: "vnd" },
          display_name: "Phí giao hàng",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 3 },
            maximum: { unit: "business_day", value: 7 },
          },
        },
      },
    ],
    line_items: [
      {
        price_data: {
          currency: "vnd",
          unit_amount: totalPay,
          product_data: {
            name: "Thanh toán",
            description: "Thanh toán với thẻ ngân hàng",
            images: [
              "https://cdn.dribbble.com/users/4323909/screenshots/15078287/sunrisefoodco_4x.png",
            ],
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    payment_method_types: ["card"],
    success_url: `${req.protocol}://${req.get("host")}/user/${
      req.user._id
    }/order?${createOrderQuery}`,
    cancel_url: `${req.protocol}://${req.get("host")}/user/${
      req.user._id
    }/order`,
    customer_email: req.user.email,
  });

  // payment page: session.url
  res.status(200).json({
    status: "success",
    data: {
      session,
    },
  });
});
