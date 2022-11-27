var express = require('express');
var router = express.Router();

const siteController = require('../app/controllers/SiteController');

// siteController.index

router.get('/facebook', siteController.facebook);
router.get('/twitter', siteController.facebook);

// router.get('/search', siteController.search);
router.get('/', siteController.index);

module.exports = router;
