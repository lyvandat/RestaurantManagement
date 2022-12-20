const express = require("express");

const router = express.Router();

const { createOrder } = require("../app/controllers/OrderController");
const {
  protect,
  isLoggedIn,
} = require("../app/controllers/AuthViewController");

// router.post("/", [protect, createOrder]);

module.exports = router;
