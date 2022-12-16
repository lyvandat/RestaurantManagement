// import "@babel/polyfill";
import { signOut } from "./auth/sign-out.js";
import { handleSortPrice } from "./sort/price.js";
import { handleAddItemToCart, handleCartToOrder } from "./payment/cart.js";
import { clickOrderButton } from "./payment/order.js";

const signOutBtnAdmin = document.getElementById("signout-admin");
const signOutBtnUser = document.getElementById("signout-user");
const priceSortForm = document.getElementById("price-sort-form");
const addItemBtn = document.querySelector(".btn-addtocart");
const checkoutBtn = document.getElementById("checkout-btn-rtab");
const orderBtn = document.getElementById("buy-btn");

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
