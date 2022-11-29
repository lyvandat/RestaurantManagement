// const Course = require('../models/Course');
// const { multipleMongooseToObject } = require('../../util/mongoose');

let large_banner = [
    {img: "images/banners/banner-1.png", link: "banner1.com", index: 0},
    {img: "images/banners/banner-2.png", link: "banner2.com", index: 1},
    {img: "images/banners/banner-3.png", link: "banner3.com", index: 2}
]

let small_banners_1 = [
    {img: "images/banners/small-banner-3.png", link: "sm_banner1.com", index: 0},
    {img: "images/banners/small-banner-1.png", link: "sm_banner3.com", index: 1}
]

let small_banners_2 = [
    {img: "images/banners/small-banner-2.png", link: "sm_banner2.com", index: 0},
    {img: "images/banners/small-banner-4.png", link: "sm_banner4.com", index: 1}
]

let rect_banners = [
    {img: "images/banners/rect-banner-1.png", link: "re_banner1.com", index: 0},
    {img: "images/banners/rect-banner-2.png", link: "re_banner2.com", index: 1}
]

let recommend = [
    {img: "images/FoodThumnail/bun.png", name: "Bún Đậu Mắm Tôm chuẩn ngon", link: "/item", fstar: 4, hstar: 0, nstar: 1, rvcount: 12.567, price: 89},
    {img: "images/FoodThumnail/pho.png", name: "Cơm Tấm Hoàng Diệu 2", link: "/item", fstar: 3, hstar: 1, nstar: 1, rvcount: 8.291, price: 25},
    {img: "images/FoodThumnail/doannhanh.png", name: "Cá Viên Chiên Makima", link: "/item", fstar: 5, hstar: 0, nstar: 0, rvcount: 163.523, price: 999},
    {img: "images/FoodThumnail/dohan.png", name: "Nem Cuốn Hàn Xẻng", link: "/item", fstar: 3, hstar: 1, nstar: 1, rvcount: 1.286, price: 56},
    {img: "images/FoodThumnail/donhat.png", name: "Thập Cẩm Chả Biết Tên", link: "/item", fstar: 4, hstar: 0, nstar: 1, rvcount: 15.927, price: 102},
    {img: "images/FoodThumnail/pho.png", name: "Cơm Chay Chỉ Thiên", link: "/item", fstar: 3, hstar: 0, nstar: 2, rvcount: 26.546, price: 89}
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
    index(req, res, next) {
        // Course.find({})
        //     .then((courses) => {
        //         res.render('home', {
        //             courses: multipleMongooseToObject(courses),
        //         });
        //     })
        //     .catch(next);
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
    // search(req, res) {
    //     res.render('search');
    // }

    // [GET] /facebook
    facebook(req, res, next) {
        res.redirect('http://www.facebook.com/MinMinPD2211');
    }
}

module.exports = new SiteController();
