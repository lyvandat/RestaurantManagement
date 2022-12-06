var express = require("express");
var router = express.Router();

const userController = require("../app/controllers/UserController");

// productController.index

router.get("/:id/cart", userController.cart);
router.get("/:id/order", userController.order);

module.exports = router;
