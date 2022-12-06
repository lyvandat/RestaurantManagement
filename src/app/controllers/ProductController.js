const Product = require("../models/Product");
const {
  multipleMongooseToObject,
  mongooseToObject,
} = require("../../utils/mongoose");

const restaurant_logo = [
  { img: "/images/logo/logo.png", name: "Sunrise Foods", link: "/products" },
  {
    img: "/images/logo/FlavourOfIndia-logo.png",
    name: "Flavour of India",
    link: "/products",
  },
  {
    img: "/images/logo/PanzerHot-logo.png",
    name: "Panzer Hot",
    link: "/products",
  },
  {
    img: "/images/logo/Friggitoria-logo.png",
    name: "Friggitoria",
    link: "/products",
  },
];

class ProductController {
    // [GET] /products/:slug
    async get(req, res, next) {
        const recommend = Product.aggregate([ { $sample: { size: 6 } } ]);

        Product.findOne({ slug: req.params.slug })
            .then((product) => {
            res.render("item", {
                recommend,
                food: mongooseToObject(product),
            });
            })
            .catch(next);
    }

    // [GET] /products
    async show(req, res, next) {
        const products = await Product.find({}).sortable(req);

            res.render('products', {
                foods: multipleMongooseToObject(products),
                restaurant_logo
            });
    }

    // [POST] /products
    search(req, res, next) {
        Product.find({ name: { $regex: req.body.name } })
            .then((products) => {
                res.json(products);
            })
            .catch(next);
    }
}

module.exports = new ProductController();
