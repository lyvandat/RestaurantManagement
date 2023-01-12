const express = require("express");
const { createSeller } = require("../app/controllers/SellerController");
const {
  isLoggedIn,
  protect,
  restrictTo,
} = require("../app/controllers/AuthController");

const router = express.Router();

router.route("/").post(createSeller);

module.exports = router;
