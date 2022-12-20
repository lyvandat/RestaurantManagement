const express = require("express");

const router = express.Router();

const {
  createCheckoutSession,
} = require("../app/controllers/PaymentController");

const { protect } = require("../app/controllers/AuthViewController");

router.post("/checkout-session", [protect, createCheckoutSession]);

module.exports = router;
