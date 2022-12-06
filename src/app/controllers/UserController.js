const mongoose = require("mongoose");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { multipleMongooseToObject } = require("../../util/mongoose");

const recommend = [
  {
    img: "/images/FoodThumnail/doannhanh.png",
    name: "Cá Viên Chiên Makima",
    link: "/item",
    fstar: 5,
    hstar: 0,
    nstar: 0,
    rvcount: 163.523,
    price: 999,
  },
  {
    img: "/images/FoodThumnail/dohan.png",
    name: "Nem Cuốn Hàn Xẻng",
    link: "/item",
    fstar: 3,
    hstar: 1,
    nstar: 1,
    rvcount: 1.286,
    price: 56,
  },
  {
    img: "/images/FoodThumnail/donhat.png",
    name: "Thập Cẩm Chả Biết Tên",
    link: "/item",
    fstar: 4,
    hstar: 0,
    nstar: 1,
    rvcount: 15.927,
    price: 102,
  },
  {
    img: "/images/FoodThumnail/pho.png",
    name: "Cơm Chay Chỉ Thiên",
    link: "/item",
    fstar: 3,
    hstar: 0,
    nstar: 2,
    rvcount: 26.546,
    price: 89,
  },
];

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

            res.render("cart", {
              items,
              recommend,
            });
          })
          .catch(next);
      })
      .catch(next);
  }
}

module.exports = new UserController();
