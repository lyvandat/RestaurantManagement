const items = [
    {key:"bbt001", img:"images/FoodThumnail/lau.png", link:"/item", name:"Bò Bít Tết Hoàng Gia", status: "Còn hàng", brand: "Sunrise Foods", notice: "Raw meet and clean decoration", price: 369},
    {key:"ggt001", img:"images/FoodThumnail/pho.png", link:"/item", name:"Gỏi Gia Truyền Truyền Từ Thời Ông Cố Nội", status: "Còn hàng", brand: "Sunrise Foods", notice: "Raw meet and clean decoration", price: 171}
]

const recommend = [
    {img: "images/FoodThumnail/doannhanh.png", name: "Cá Viên Chiên Makima", link: "/item", fstar: 5, hstar: 0, nstar: 0, rvcount: 163.523, price: 999},
    {img: "images/FoodThumnail/dohan.png", name: "Nem Cuốn Hàn Xẻng", link: "/item", fstar: 3, hstar: 1, nstar: 1, rvcount: 1.286, price: 56},
    {img: "images/FoodThumnail/donhat.png", name: "Thập Cẩm Chả Biết Tên", link: "/item", fstar: 4, hstar: 0, nstar: 1, rvcount: 15.927, price: 102},
    {img: "images/FoodThumnail/pho.png", name: "Cơm Chay Chỉ Thiên", link: "/item", fstar: 3, hstar: 0, nstar: 2, rvcount: 26.546, price: 89}
]

class CartController {
    // [GET] /cart
    get(req, res, next) {
        res.render('cart', {
            items,
            recommend
        });
    }
}

module.exports = new CartController();
