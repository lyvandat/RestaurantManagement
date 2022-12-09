const express = require("express");
const {
  signUp,
  signIn,
  signOut,
  verifyEmail
} = require("../app/controllers/AuthViewController");
const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.get("/sign-out", signOut);
router.get("/verify/:verifyToken", verifyEmail);

module.exports = router;
