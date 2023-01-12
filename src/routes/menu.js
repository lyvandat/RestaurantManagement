const express = require("express");
const {
  createMenuItem,
  updateMenuItem,
  addMenuItem,
} = require("../app/controllers/SellerController");
const {
  isLoggedIn,
  protect,
  restrictTo,
} = require("../app/controllers/AuthController");
const router = express.Router();

router.route("/").post([protect, restrictTo("Đối tác"), createMenuItem]);
router
  .route("/:id")
  .patch([protect, restrictTo("Đối tác"), updateMenuItem])
  .post([protect, restrictTo("Đối tác"), addMenuItem]);

module.exports = router;
