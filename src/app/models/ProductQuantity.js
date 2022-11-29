const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductQuantitySchema = new Schema(
    {
        productID: { type: String, require: true },
        quantity: { type: Number },
    },
);

module.exports = mongoose.model('ProductQuantity', ProductQuantitySchema);
