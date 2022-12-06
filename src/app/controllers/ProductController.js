const Product = require('../models/Product');
const { multipleMongooseToObject, mongooseToObject } = require('../../utils/mongoose');

const recommend = [
    {photo: "/images/FoodThumnail/bun.png", name: "Bún Đậu Mắm Tôm chuẩn ngon", link: "/item", fstar: 4, hstar: 0, nstar: 1, rvcount: 12.567, price: 89000},
    {photo: "/images/FoodThumnail/pho.png", name: "Cơm Tấm Hoàng Diệu 2", link: "/item", fstar: 3, hstar: 1, nstar: 1, rvcount: 8.291, price: 25000},
    {photo: "/images/FoodThumnail/doannhanh.png", name: "Cá Viên Chiên Makima", link: "/item", fstar: 5, hstar: 0, nstar: 0, rvcount: 163.523, price: 999000},
    {photo: "/images/FoodThumnail/dohan.png", name: "Nem Cuốn Hàn Xẻng", link: "/item", fstar: 3, hstar: 1, nstar: 1, rvcount: 1.286, price: 56000},
    {photo: "/images/FoodThumnail/donhat.png", name: "Thập Cẩm Chả Biết Tên", link: "/item", fstar: 4, hstar: 0, nstar: 1, rvcount: 15.927, price: 102000},
    {photo: "/images/FoodThumnail/pho.png", name: "Cơm Chay Chỉ Thiên", link: "/item", fstar: 3, hstar: 0, nstar: 2, rvcount: 26.546, price: 89000}
];

const restaurant_logo = [
    {img: "/images/logo/logo.png", name: "Sunrise Foods", link: "/products"},
    {img: "/images/logo/FlavourOfIndia-logo.png", name: "Flavour of India", link: "/products"},
    {img: "/images/logo/PanzerHot-logo.png", name: "Panzer Hot", link: "/products"},
    {img: "/images/logo/Friggitoria-logo.png", name: "Friggitoria", link: "/products"}
];

class ProductController {
    // [GET] /products/:slug
    get(req, res, next) {
        Product.findOne({ slug: req.params.slug })
            .then((product) => {
                res.render('item', {
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
            restaurant_logo,
            selected: req.params
        });
    }
}

module.exports = new ProductController();
