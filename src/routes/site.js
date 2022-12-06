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

router.get("/user/:id/cart", renderCart);
router.get("/buy", renderPayment);
router.get("/cart", renderCart);
router.get("/products", renderItems);
router.get("/products/:id", renderItemDetail);
// xài isLoggedIn trước các page cần login để có thể sử dụng biến {{user}} trong handle bar
router.get("/", [isLoggedIn, renderHome]);

module.exports = router;
