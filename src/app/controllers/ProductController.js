const Product = require('../models/Product');
const { multipleMongooseToObject } = require('../../util/mongoose');

class ProductController {
    // [GET] /products
    get(req, res, next) {
        Product.find({})
            .then((products) => {
                res.json(multipleMongooseToObject(products));
            })
            .catch(next);
    }
}

module.exports = new ProductController();
