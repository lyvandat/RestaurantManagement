var express = require('express');
var router = express.Router();


const itemController = require('../app/controllers/ItemController');

// itemController.index
// router.get('/:slug', itemController.show);

router.get('/', itemController.get);

module.exports = router;