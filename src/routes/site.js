var express = require("express");
var router = express.Router();

const { isLoggedIn, protect } = require("../app/controllers/AuthViewController");
const {
  renderCart,
  renderHome,
  renderItems,
  renderItemDetail,
  renderPayment,
  renderMe,
} = require("../app/controllers/UserViewController");

router.get("/user/:id/cart", [isLoggedIn, renderCart]);
router.get("/user/:id/order", [isLoggedIn, renderPayment]);

router.get("/products/:slug", [isLoggedIn, renderItemDetail]);

router.get("/products", renderItems);

// xài isLoggedIn trước các page cần login để có thể sử dụng biến {{user}} trong handle bar
router.get("/", [isLoggedIn, renderHome]);
router.get("/me", [isLoggedIn, renderMe]);

module.exports = router;
