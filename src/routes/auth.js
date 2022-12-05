const express = require("express");
const {
  signUp,
  signIn,
  signOut,
} = require("../app/controllers/AuthController");
const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.get("/sign-out", signOut);

module.exports = router;
