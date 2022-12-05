const express = require("express");
const { signUp } = require("../app/controllers/AuthController");
const router = express.Router();

router.post("/sign-up", signUp);

module.exports = router;
