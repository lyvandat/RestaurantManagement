const mongoose = require('mongoose');
const ProductQuantity = require('./ProductQuantitySchema');

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
    {
        userID: { type: String, required: true },
        products: { type: [ProductQuantity], required: true },        
        status: { type: String },
        totalPrice: { type: Number },
    },
    {
        timestamps: true,
    },
);

// Add plugin

module.exports = mongoose.model('Order', OrderSchema);
