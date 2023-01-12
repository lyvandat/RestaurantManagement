const express = require("express");
const { updateStore } = require("../app/controllers/SellerController");
const {
  isLoggedIn,
  protect,
  restrictTo,
} = require("../app/controllers/AuthController");

const router = express.Router();

router.route("/:id").patch([protect, restrictTo("Đối tác"), updateStore]);

module.exports = router;
