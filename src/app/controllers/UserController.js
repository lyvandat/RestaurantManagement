const mongoose = require('mongoose');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { multipleMongooseToObject } = require('../../utils/mongoose');

const payment_methods = [
    {key:"momo-method", img: "/images/icons/momo.png", label: "Thanh toán Online bằng Momo (Có mã ưu đãi)"},
    {key:"banking-method", img: "/images/icons/debit-card.png", label: "Chuyển khoản ngân hàng (Miễn phí phí chuyển)"},
    {key:"cod-method", img: "/images/icons/cod.png", label: "Thanh toán khi nhận hàng (COD)"},
    {key:"visa-method", img: "/images/icons/visa.png", label: "Thanh toán Online bằng Visa, Master, JCB (Miễn phí phí chuyển)"}
]

const recommend = [
    {img: "/images/FoodThumnail/doannhanh.png", name: "Cá Viên Chiên Makima", link: "/item", fstar: 5, hstar: 0, nstar: 0, rvcount: 163.523, price: 999},
    {img: "/images/FoodThumnail/dohan.png", name: "Nem Cuốn Hàn Xẻng", link: "/item", fstar: 3, hstar: 1, nstar: 1, rvcount: 1.286, price: 56},
    {img: "/images/FoodThumnail/donhat.png", name: "Thập Cẩm Chả Biết Tên", link: "/item", fstar: 4, hstar: 0, nstar: 1, rvcount: 15.927, price: 102},
    {img: "/images/FoodThumnail/pho.png", name: "Cơm Chay Chỉ Thiên", link: "/item", fstar: 3, hstar: 0, nstar: 2, rvcount: 26.546, price: 89}
]

const items = [
    {key:"bbt001", img:"/images/FoodThumnail/lau.png", link:"/item", name:"Bò Bít Tết Hoàng Gia", status: "Còn hàng", brand: "Sunrise Foods", quantity: 1, price: 369},
]

class UserController {
  // [GET] /user/:id/cart
  cart(req, res, next) {
    Cart.findOne({ userID: req.params.id })
        .then((cart) => {
            const cartProducts = cart.products.map((item) =>
            mongoose.Types.ObjectId(item.productID)
            );

            Product.find({ _id: { $in: cartProducts } })
                .then((products) => {
                    const items = multipleMongooseToObject(products);
                    items.forEach((item) =>
                    Object.assign(item, {
                        status: item.stock > 0 ? "Còn hàng" : "Hết hàng",
                    })
                    );
                        Product.find({ '_id': { $in: cartProducts } })
                            .then((products) => {
                                const items = multipleMongooseToObject(products);
                                items.forEach(item => Object.assign(item, {
                                    status: item.stock > 0 ? 'Còn hàng' : 'Hết hàng'
                                }));

                                res.render('cart', {
                                    items,
                                    recommend,
                                });
                            })
                            .catch(next);
                    })
            .catch(next);
        });
    }

    // [GET] /user/:id/order
    order(req, res, next) {
        Order.findOne({ userID: req.params.id })
            .then((order) => {
                const orderProducts = order.products.map(item => mongoose.Types.ObjectId(item.productID));

                Product.find({ '_id': { $in: orderProducts } })
                    .then((products) => {
                        const items = multipleMongooseToObject(products);
                        items.forEach(item => Object.assign(item, {
                            status: item.stock > 0 ? 'Còn hàng' : 'Hết hàng'
                        }));

                        res.render('buy', {
                            items,
                            payment_methods,
                        });
                    })
                    .catch(next);
            })
            .catch(next);

        // res.render('buy', {
        //     items, payment_methods
        // });
    }
}

module.exports = new UserController();
