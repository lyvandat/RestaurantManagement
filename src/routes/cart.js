var express = require('express');
var router = express.Router();

const cartController = require('../app/controllers/CartController');

// cartController.index
router.get('/', cartController.get);

module.exports = router;