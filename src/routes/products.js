var express = require('express');
var router = express.Router();

const productController = require('../app/controllers/ProductController');

// productController.index

router.get('/:slug', productController.get);
router.get('/', productController.show);

module.exports = router;