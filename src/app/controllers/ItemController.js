
const food = {
    img: "images/foods/food_1.png",
    name: "SALAD NGŨ VỊ HOÀNG GIA ANH",
    link: "/item",
    brand: "Sunrise Foods",
    fstar: 4, hstar: 1, nstar: 0, rvcount: "41.002", price: 49,
    status: "Còn hàng"
}

const recommend = [
    {img: "images/FoodThumnail/bun.png", name: "Bún Đậu Mắm Tôm chuẩn ngon", link: "/item", fstar: 4, hstar: 0, nstar: 1, rvcount: 12.567, price: 89},
    {img: "images/FoodThumnail/pho.png", name: "Cơm Tấm Hoàng Diệu 2", link: "/item", fstar: 3, hstar: 1, nstar: 1, rvcount: 8.291, price: 25},
    {img: "images/FoodThumnail/doannhanh.png", name: "Cá Viên Chiên Makima", link: "/item", fstar: 5, hstar: 0, nstar: 0, rvcount: 163.523, price: 999},
    {img: "images/FoodThumnail/dohan.png", name: "Nem Cuốn Hàn Xẻng", link: "/item", fstar: 3, hstar: 1, nstar: 1, rvcount: 1.286, price: 56},
    {img: "images/FoodThumnail/donhat.png", name: "Thập Cẩm Chả Biết Tên", link: "/item", fstar: 4, hstar: 0, nstar: 1, rvcount: 15.927, price: 102},
    {img: "images/FoodThumnail/pho.png", name: "Cơm Chay Chỉ Thiên", link: "/item", fstar: 3, hstar: 0, nstar: 2, rvcount: 26.546, price: 89}
]


class ItemController {
    // [GET] /item
    get(req, res, next) {
        res.render('item', {
            food, recommend
        });
    }

    // // [GET] /item/:slug
    // show(req, res, next) {
    //     res.json({
    //         message: 'huhuhu'
    //     });
    // }
}

module.exports = new ItemController();