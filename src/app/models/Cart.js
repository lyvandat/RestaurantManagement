const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema(
    {
        userID: { 
            type: Schema.Types.ObjectId, required: true,
            ref: "User"
         },
         products: [{
            productId: Number,
            quantitiy: Number,
            name: String,
            manufacturer: String,
            price: Number,
         }],
         active: {
            type: Boolean,
            default: true
         },
         modifiedOn: {
            type: Date,
            default: Date.now()
         }
    },
    {
        timestamps: true,
    },
);

CartSchema.methods.addItemToCart = async function({productId, quantity, name, manufacturer, price}) {
    try {
        let productItemIndex = this.products.find((prod) => prod.productId === productId);
        let newUpdatedItem = null;
        // if item exists
        if (productItemIndex !== -1) {
            newUpdatedItem = this.products[productItemIndex];
            newUpdatedItem.quantity += quantity;
            this.products[productItemIndex] = newUpdatedItem;
        } 
        // if item does not exist
        else {
            newUpdatedItem = {productId, quantity, name, manufacturer, price}
            this.products.push(newUpdatedItem);
        }

        await this.save();
    } catch(err) {
        console.log(err.message);
    }
}

// Add plugin

module.exports = mongoose.model('Cart', CartSchema);
