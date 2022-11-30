// only for importing and deleting data
// NOTE:
// import script: node <file path> --import
// delete script: node <file path> --delete

const fs = require('fs');
const mongoose = require('mongoose');

const modelsPath = '../src/app/models';
const Cart = require(`${modelsPath}/Cart`);
const Order = require(`${modelsPath}/Order`);
const Product = require(`${modelsPath}/Product`);
const ProductReview = require(`${modelsPath}/ProductReview`);
const User = require(`${modelsPath}/User`);

mongoose.connect('mongodb+srv://cuongpham:211319539@cluster0.b87mt4q.mongodb.net/PTWeb_FinalProject_HCMUS');

// nếu để file json trong thư mục gốc thì khỏi cần đổi
const fileDataUsers = fs.readFileSync(`${__dirname}/users.json`, 'utf-8');
const fileDataProducts = fs.readFileSync(`${__dirname}/products.json`, 'utf-8');
const fileDataOrders = fs.readFileSync(`${__dirname}/orders.json`, 'utf-8');
const fileDataCarts = fs.readFileSync(`${__dirname}/carts.json`, 'utf-8');
const fileDataProductReviews = fs.readFileSync(`${__dirname}/product-reviews.json`, 'utf-8');

const users = JSON.parse(fileDataUsers);
const products = JSON.parse(fileDataProducts);
const orders = JSON.parse(fileDataOrders);
const carts = JSON.parse(fileDataCarts);
const productReviews = JSON.parse(fileDataProductReviews);

const importData = async () => {
  try {
    await User.create(users);
    await Product.create(products);
    await Order.create(orders);
    await Cart.create(carts);
    await ProductReview.create(productReviews);

    console.log('import successfully');
  } catch (err) {
    console.log(err.message);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    await Cart.deleteMany();
    await ProductReview.deleteMany();

    console.log('delete sucsessfully');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
