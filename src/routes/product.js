const express = require("express");
const {
  updateItemQuantity,
  updateSelectFieldToItem
} = require("../app/controllers/ProductController");

const {
  protect
} = require("../app/controllers/AuthViewController");

const router = express.Router();

router.patch("/:id", [protect, updateItemQuantity]);
router.patch("/", [protect, updateSelectFieldToItem]);

module.exports = router;
