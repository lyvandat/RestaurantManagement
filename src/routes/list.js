var express = require('express');
var router = express.Router();


const listController = require('../app/controllers/ListController');

// listController.index
// router.get('/:slug', listController.show);

router.get('/', listController.get);

module.exports = router;