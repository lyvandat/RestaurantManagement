const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        category: { type: Array, required: true },
        manufacturer: { type: String },
        stock: { type: Number },
        suspended: { type: Boolean },
        photo: { type: Array, required: true },
        description: { type: String }
    },
    {
        timestamps: true,
    },
);

// Add plugin

module.exports = mongoose.model('Product', ProductSchema);
