const express = require("express");
const {
  addItemToCart
} = require("../app/controllers/ProductController");

const {
  protect
} = require("../app/controllers/AuthViewController");

const router = express.Router();

router.post("/:id", [protect, addItemToCart]);

module.exports = router;
