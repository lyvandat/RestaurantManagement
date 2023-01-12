const express = require("express");
const { updateOrderStatus } = require("../app/controllers/SellerController");
const {
  createOrder,
  deleteOrder,
} = require("../app/controllers/UserController");
const {
  restrictTo,
  isLoggedIn,
  protect,
} = require("../app/controllers/AuthController");

const { driverAcceptOrder } = require("../app/controllers/DriverController");

const router = express.Router();

router
  .route("/:customerId/:orderId")
  .patch([protect, updateOrderStatus])
  .delete([protect, deleteOrder]);
router
  .route("/")
  .post([protect, createOrder])
  .patch([protect, restrictTo("Tài xế"), driverAcceptOrder]);

module.exports = router;
