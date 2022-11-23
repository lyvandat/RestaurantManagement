
class CartController {
    // [GET] /cart
    get(req, res, next) {
        res.render('cart');
    }
}

module.exports = new CartController();
