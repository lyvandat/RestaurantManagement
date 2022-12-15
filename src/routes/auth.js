const express = require("express");
const {
  signUp,
  signIn,
  signOut,
  verifyEmail,
  updatePassword,
  protect
} = require("../app/controllers/AuthViewController");

const {
  updateMe,
  uploadSingleImage,
  resizeUploadImage
} = require("../app/controllers/UserController");
const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.get("/sign-out", signOut);
router.get("/verify/:verifyToken", verifyEmail);
router.patch("/update-me", [protect, uploadSingleImage, resizeUploadImage, updateMe]);
router.patch("/update-password", updatePassword);

module.exports = router;
