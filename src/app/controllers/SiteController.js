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

let food_thumnails = [
    {img: "images/FoodThumnail/bun.png", name: "Bún", link: "thum_1.com", bder: true},
    {img: "images/FoodThumnail/pho.png", name: "Phở", link: "thum_2.com", bder: true},
    {img: "images/FoodThumnail/doannhanh.png", name: "Cơm", link: "thum_3.com", bder: true},
    {img: "images/FoodThumnail/dohan.png", name: "Đồ ăn nhanh", link: "thum_4.com", bder: true},
    {img: "images/FoodThumnail/donhat.png", name: "Đồ Hàn", link: "thum_5.com", bder: true},
    {img: "images/FoodThumnail/com.png", name: "Đồ Nhật", link: "thum_6.com", bder: true},
    {img: "images/FoodThumnail/donuong.png", name: "Đồ nướng", link: "thum_7.com", bder: true},
    {img: "images/FoodThumnail/lau.png", name: "Lẩu", link: "thum_8.com", bder: true}
]

let sale_thumnails = [
    {img: "images/FoodThumnail/bun.png", name: "Bún", link: "thum_1.com", bder: false},
    {img: "images/FoodThumnail/doannhanh.png", name: "Phở", link: "thum_2.com", bder: false},
    {img: "images/FoodThumnail/donhat.png", name: "Cơm", link: "thum_3.com", bder: false},
    {img: "images/FoodThumnail/com.png", name: "Đồ ăn nhanh", link: "thum_4.com", bder: false},
    {img: "images/FoodThumnail/donuong.png", name: "Đồ Hàn", link: "thum_5.com", bder: false}
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
            food_thumnails,
            sale_thumnails
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
