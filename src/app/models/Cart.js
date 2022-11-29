const mongoose = require('mongoose');
const ProductQuantity = require('./ProductQuantity');

const Schema = mongoose.Schema;

const CartSchema = new Schema(
    {
        userID: { type: String, required: true },
        products: { type: [ProductQuantity] },
    },
    {
        timestamps: true,
    },
);

// Add plugin

module.exports = mongoose.model('Cart', CartSchema);
