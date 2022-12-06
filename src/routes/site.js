var express = require("express");
var router = express.Router();

const { isLoggedIn } = require("../app/controllers/AuthViewController");
const {
  renderCart,
  renderHome,
  renderItems,
  renderItemDetail,
  renderPayment,
} = require("../app/controllers/UserViewController");

router.get("/user/:id/cart", [isLoggedIn, renderCart]);
router.get("/user/:id/order", [isLoggedIn, renderPayment]);

router.get("/products/:slug", renderItemDetail);

router.get("/products", renderItems);

// xài isLoggedIn trước các page cần login để có thể sử dụng biến {{user}} trong handle bar
router.get("/", [isLoggedIn, renderHome]);

module.exports = router;
