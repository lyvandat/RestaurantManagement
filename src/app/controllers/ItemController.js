
const foods_img = 
    {img: "images/foods/food_1.png", name: "SALAD NGŨ VỊ HOÀNG GIA ANH", link: "/item"}
    // {img: "images/foods/food_2.png", name: "Bánh Kếp Ngọt Vê Lờ", link: "/item"},
    // {img: "images/foods/food_3.png", name: "Bánh Trứng Anh Quốc", link: "/item"},
    // {img: "images/foods/food_4.png", name: "Bánh Mì Yamete Kutasai", link: "/item"},
    // {img: "images/foods/food_5.png", name: "Mì Chay Cực Lạc", link: "/item"}
    // {img: "images/foods/food_1.png", name: "Salad Chay Giả Thịt", link: "/item"},
    // {img: "images/foods/food_6.png", name: "Salad Chay Giả Thịt", link: "/item"}


class ItemController {
    // [GET] /item
    get(req, res, next) {
        res.render('item', {
            foods_img
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