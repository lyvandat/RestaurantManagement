var express = require("express");
var router = express.Router();

const {
  isLoggedIn,
  protect,
} = require("../app/controllers/AuthViewController");
const {
  renderCart,
  renderHome,
  renderItems,
  renderItemDetail,
  renderPayment,
  renderMe,
  renderOrder,
  renderOrderDetail,
} = require("../app/controllers/UserViewController");
const { createOrder } = require("../app/controllers/OrderController");

router.get("/user/:id/cart", [isLoggedIn, renderCart]);
router.get("/user/:id/order", [protect, createOrder, renderPayment]);

router.get("/products/:slug", [isLoggedIn, renderItemDetail]);

router.get("/products", [isLoggedIn, renderItems]);

// xài isLoggedIn trước các page cần login để có thể sử dụng biến {{user}} trong handle bar
router.get("/", [isLoggedIn, renderHome]);
router.get("/me", [isLoggedIn, renderMe]);
router.get("/orders", [protect, renderOrder]);
router.get("/orders/:id", [protect, renderOrderDetail]);

module.exports = router;
