// import "@babel/polyfill";
import { signOut } from "./auth/sign-out.js";
import { handleSortPrice } from "./sort/price.js";
import { handleAddItemToCart, handleCartToOrder, handleSetItemQuantity, handleDeleteItemFromCart } from "./payment/cart.js";
import { clickOrderButton } from "./payment/order.js";


// auth handling
const signOutBtnAdmin = document.getElementById("signout-admin");
const signOutBtnUser = document.getElementById("signout-user");

// sort handling
const priceSortForm = document.getElementById("price-sort-form");

// cart handling
const addItemBtn = document.querySelector(".btn-addtocart");
const checkoutBtn = document.getElementById("checkout-btn-rtab");
const orderBtn = document.getElementById("buy-btn");
const quantityCartBtn = [...document.querySelectorAll("input[name='quantity']")];
const deleteItemBtn = [...document.querySelectorAll("button[name='delete-item-btn']")];

if (signOutBtnAdmin) {
  signOutBtnAdmin.addEventListener("click", signOut);
}

if (signOutBtnUser) {
  // alert("logout successfully");
  signOutBtnUser.addEventListener("click", signOut);

}

if (priceSortForm) {
  priceSortForm.addEventListener("submit", handleSortPrice);
  
}

// add item to cart 

if (addItemBtn) {
  addItemBtn.addEventListener("click", handleAddItemToCart);
}

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", handleCartToOrder);
}

// order
if (orderBtn) {
  orderBtn.addEventListener("click", clickOrderButton);
}

if (quantityCartBtn.length > 0) {
  quantityCartBtn.forEach((btn) => {
    btn.addEventListener("change", handleSetItemQuantity);
  })
}

if (deleteItemBtn.length > 0) {
  deleteItemBtn.forEach((btn) => {
    btn.addEventListener("click", handleDeleteItemFromCart);
  })
}