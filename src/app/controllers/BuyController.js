
class BuyController {
    // [GET] /buy
    get(req, res, next) {
        res.render('buy');
    }
}

module.exports = new BuyController();