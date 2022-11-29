const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CartSchema = new Schema(
    {
        userID: { type: String, required: true },
        products: { type: Array },
    },
    {
        timestamps: true,
    },
);

// Add plugin

module.exports = mongoose.model('Cart', CartSchema);