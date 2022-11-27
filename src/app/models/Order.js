const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
    {
        userID: { type: String, required: true },
        itemIDs: { type: Array, required: true },        
        status: { type: String },
        totalPrice: { type: Number },
    },
    {
        timestamps: true,
    },
);

// Add plugin

module.exports = mongoose.model('Order', OrderSchema);