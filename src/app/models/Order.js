const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema(
    {
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: [true, "an item should have productId"],
        },
        quantity: {
            type: Number,
            required: true,
            min: [1, "Quantity must be greater than 1"]
        },
        total: {
            type: Number,
            min: [0, "total price cannot be less than 0"],
            default: 0,
        }
    },
    {
        timestamps: true,
    }
)

const OrderSchema = new Schema(
    {
        userId: { 
            type: Schema.Types.ObjectId, 
            required: true,
            ref: "User"
        },

        products: [ItemSchema],

        subTotal: {
            type: Number,
            default: 0,
            min: [0, "total price cannot be less than 0"]
        },

        payment: {
            type: String,
            default: "Cash",
            enum: {
                values: ["Cash", "Card"],
                message: '{VALUE} is not supported'
            }
        },

        status: {
            type: String,
            default: "progress"
        }
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Order', OrderSchema);
