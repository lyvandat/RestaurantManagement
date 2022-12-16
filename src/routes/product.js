const express = require("express");
const {
  addItemToCart,
  updateSelectFieldToItem
} = require("../app/controllers/ProductController");

const {
  protect
} = require("../app/controllers/AuthViewController");

const router = express.Router();

router.post("/:id", [protect, addItemToCart]);
router.patch("/", [protect, updateSelectFieldToItem]);

module.exports = router;
