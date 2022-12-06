const Product = require('../models/Product');
// const { multipleMongooseToObject } = require('../../util/mongoose');

let large_banner = [
    {img: "images/banners/banner-1.png", link: "/products", index: 0},
    {img: "images/banners/banner-2.png", link: "/products", index: 1},
    {img: "images/banners/banner-3.png", link: "/products", index: 2}
]

let small_banners_1 = [
    {img: "images/banners/small-banner-3.png", link: "/products", index: 0},
    {img: "images/banners/small-banner-1.png", link: "/products", index: 1}
]

let small_banners_2 = [
    {img: "images/banners/small-banner-2.png", link: "/products", index: 0},
    {img: "images/banners/small-banner-4.png", link: "/products", index: 1}
]

let rect_banners = [
    {img: "images/banners/rect-banner-1.png", link: "/products", index: 0},
    {img: "images/banners/rect-banner-2.png", link: "/products", index: 1}
]

let sale_thumnails_1 = [
    {img: "images/FoodThumnail/bun.png", name: "Bún Đậu Mắm Tôm", link: "/item", brand: "Sunrise Foods", fstar: 4, hstar: 0, nstar: 1, rvcount: 12.567, price: 89, status: "Còn hàng"},
    {img: "images/FoodThumnail/pho.png", name: "Cơm Tấm Thôn Quê", link: "/item", brand: "Sunrise Foods", fstar: 3, hstar: 1, nstar: 1, rvcount: 8.291, price: 25, status: "Còn hàng"},
]

let sale_thumnails_2 = [
    {img: "images/FoodThumnail/donhat.png", name: "Thập Cẩm Chả Biết Tên", link: "/item", brand: "Sunrise Foods", fstar: 4, hstar: 0, nstar: 1, rvcount: 15.927, price: 102, status: "Còn hàng"},
    {img: "images/FoodThumnail/pho.png", name: "Cơm Chay Chỉ Thiên", link: "/item", brand: "Sunrise Foods", fstar: 3, hstar: 0, nstar: 2, rvcount: 26.546, price: 89, status: "Còn hàng"}
]

class SiteController {
    // [GET] /
    async index(req, res, next) {
        const recommend = await Product.aggregate([ { $sample: { size: 6 } } ]);

        res.render('home', {
            large_banner,
            small_banners_1, 
            small_banners_2, 
            rect_banners,
            recommend,
            sale_thumnails_1,
            sale_thumnails_2
        });
    }

    // [GET] /search
    search(req, res) {
        res.render('list');
    }

    // [GET] /facebook
    facebook(req, res, next) {
        res.redirect('http://www.facebook.com/MinMinPD2211');
    }
}

module.exports = new SiteController();
