const express = require("express");
const {
  signUp,
  signIn,
  signOut,
  verifyEmail,
  updateMe,
  updatePassword,
  protect
} = require("../app/controllers/AuthViewController");
const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.get("/sign-out", signOut);
router.get("/verify/:verifyToken", verifyEmail);
router.patch("/update-me", [protect, updateMe]);
router.patch("/update-password", [protect, updatePassword]);

module.exports = router;
