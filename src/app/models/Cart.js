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
        },
        selected: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
    }
)

const CartSchema = new Schema(
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
         }
    },
    {
        timestamps: true,
    },
);

CartSchema.methods.addItemToCart = async function(productId, quantity, price) {
    try {
        let productItemIndex = this.products.findIndex((prod) => {
            // parse ObjectId to String
            return String(prod.productId) === productId;
        });
        let newUpdatedItem = null;
        // if item exists
        if (productItemIndex !== -1) {
            newUpdatedItem = this.products[productItemIndex];
            newUpdatedItem.quantity += quantity;
            newUpdatedItem.total = newUpdatedItem.quantity * price;
            this.subTotal += newUpdatedItem.total;
            this.products[productItemIndex] = newUpdatedItem;
        } 
        // if item does not exist
        else {
            newUpdatedItem = {productId, quantity, total: price * quantity};
            this.subTotal += newUpdatedItem.total;
            this.products.push(newUpdatedItem);
        }

        const newCart = await this.save();
        return newCart;
    } catch(err) {
        return null;
    }
}

CartSchema.methods.removeItemFromCart = async function(productId, quantity, price) {
    try {
        let productItemIndex = this.products.findIndex((prod) => String(prod.productId) === productId);
        let newUpdatedItem = null;
        // if item exists
        if (productItemIndex !== -1) {
            newUpdatedItem = this.products[productItemIndex];
            newUpdatedItem.quantity -= quantity;
            newUpdatedItem.total -= quantity * price;
            this.products[productItemIndex] = newUpdatedItem;
        } 

        // nếu số lượng cập nhật lại <= 0 thì xóa khỏi products
        if (newUpdatedItem?.quantity <= 0) {
            this.products = this.products.shift(productItemIndex, 1);
        }

        const newCart = await this.save();
        return newCart;
    } catch(err) {
        console.log(err.message);
        return null;
    }
}

exports.itemSchema = ItemSchema;
module.exports = mongoose.model('Cart', CartSchema);
