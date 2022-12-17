const express = require("express");
const {
  updateItemQuantity,
  updateSelectFieldToItem,
  deleteItem,
} = require("../app/controllers/ProductController");

const {
  protect,
  restrictTo,
} = require("../app/controllers/AuthViewController");

const router = express.Router();

router
  .route("/:id")
  .patch([protect, updateItemQuantity])
  .delete([protect, deleteItem]);
router.patch("/", [protect, updateSelectFieldToItem]);

module.exports = router;
