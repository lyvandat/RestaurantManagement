const express = require("express");
const {
  renderDashBoard,
  renderBilling,
  renderProfile,
  renderSignIn,
  renderSignUp,
  renderTables,
} = require("../app/controllers/AdminController");

const { isLoggedIn } = require("../app/controllers/AuthController");

const router = express.Router();
router.use("/dashboard", [isLoggedIn, renderDashBoard]);
router.use("/billing", renderBilling);
router.use("/profile", renderProfile);
router.use("/sign-in", renderSignIn);
router.use("/sign-up", renderSignUp);
router.use("/tables", renderTables);
router.use("/", renderDashBoard);

module.exports = router;
