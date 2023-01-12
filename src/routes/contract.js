const express = require("express");
const {
  createContract,
  updateContractStatus,
} = require("../app/controllers/ContractController");
const {
  isLoggedIn,
  protect,
  restrictTo,
} = require("../app/controllers/AuthController");
const router = express.Router();

router
  .route("/:id")
  .patch([protect, restrictTo("Đối tác"), updateContractStatus]);
router.route("/").post([protect, createContract]);

module.exports = router;
