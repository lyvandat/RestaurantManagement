var express = require('express');
var router = express.Router();

const buyController = require('../app/controllers/BuyController');

// buyController.index
router.get('/', buyController.get);

module.exports = router;