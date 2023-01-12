const express = require("express");
const { getListSellers } = require("../app/controllers/UserController");

const router = express.Router();

router.route("/").post(getListSellers);

module.exports = router;
