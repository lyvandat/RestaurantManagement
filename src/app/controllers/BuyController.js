const items = [
    {key:"bbt001", img:"images/FoodThumnail/lau.png", link:"/item", name:"Bò Bít Tết Hoàng Gia", status: "Còn hàng", brand: "Sunrise Foods", quantity: 1, price: 369},
]

const payment_methods = [
    {key:"momo-method", img: "images/icons/momo.png", label: "Thanh toán Online bằng Momo (Có mã ưu đãi)"},
    {key:"banking-method", img: "images/icons/debit-card.png", label: "Chuyển khoản ngân hàng (Miễn phí phí chuyển)"},
    {key:"cod-method", img: "images/icons/cod.png", label: "Thanh toán khi nhận hàng (COD)"},
    {key:"visa-method", img: "images/icons/visa.png", label: "Thanh toán Online bằng Visa, Master, JCB (Miễn phí phí chuyển)"}
]

class BuyController {
    // [GET] /buy
    get(req, res, next) {
        res.render('buy', {
            items, payment_methods
        });
    }
}

module.exports = new BuyController();