const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductReviewSchema = new Schema(
    {
        userID: { type: String, required: true },
        productID: { type: String, required: true },        
        review: { type: String },
    },
    {
        timestamps: true,
    },
);

// Add plugin

module.exports = mongoose.model('ProductReview', ProductReviewSchema);
