const express = require("express");
const {
  signUp,
  signUpDriver,
  signIn,
  signOut,
  verifyEmail,
  updatePassword,
  protect,
} = require("../app/controllers/AuthController");

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-up-driver", signUpDriver);
router.post("/sign-in", signIn);
router.get("/sign-out", signOut);
// router.get("/verify/:verifyToken", verifyEmail);
// router.patch("/update-password", updatePassword);

module.exports = router;
