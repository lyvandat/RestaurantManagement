var express = require('express');
var router = express.Router();

const productController = require('../app/controllers/ProductController');

// productController.index
router.get('/', productController.get);
//router.post('/', productController.store);

module.exports = router;