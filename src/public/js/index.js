// import "@babel/polyfill";
import { signOut } from "./auth/sign-out.js";
import {
  handleAddItemToCart,
  handleCartToOrder,
  handleSetItemQuantity,
  handleDeleteItemFromCart,
} from "./payment/cart.js";
import {
  handleSearchAndFilter,
  loadFilterFromSearchParams,
  handlePagination,
} from "./payment/product.js";
import { clickOrderButton } from "./payment/order.js";

// auth handling
const signOutBtnAdmin = document.getElementById("signout-admin");
const signOutBtnUser = document.getElementById("signout-user");

// filter, sort, pagination handling
const filterSortBtn = document.querySelector(".btn-filter");
const paginationItems = document.querySelectorAll(".page-item");

// cart handling
const addItemBtn = document.querySelector(".btn-addtocart");
const checkoutBtn = document.getElementById("checkout-btn-rtab");
const orderBtn = document.getElementById("buy-btn");
const quantityCartBtn = [
  ...document.querySelectorAll("input[name='quantity']"),
];
const deleteItemBtn = [
  ...document.querySelectorAll("button[name='delete-item-btn']"),
];

if (signOutBtnAdmin) {
  signOutBtnAdmin.addEventListener("click", signOut);
}

if (signOutBtnUser) {
  // alert("logout successfully");
  signOutBtnUser.addEventListener("click", signOut);
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
  });
}

if (deleteItemBtn.length > 0) {
  deleteItemBtn.forEach((btn) => {
    btn.addEventListener("click", handleDeleteItemFromCart);
  });
}

// filter, sort, pagination
if (filterSortBtn) {
  // check manufacturer
  const checkedManufacturerWrappers = [
    ...document.querySelectorAll("a[name='manufacturer']"),
  ];
  checkedManufacturerWrappers.forEach((wrapper) => {
    wrapper.addEventListener("click", function (e) {
      const childInput = wrapper.querySelector("input");
      childInput.checked = !childInput.checked;
    });
  });

  loadFilterFromSearchParams();
  filterSortBtn.addEventListener("click", handleSearchAndFilter);
}

if (paginationItems.length > 0) {
  paginationItems.forEach((item) => {
    item.addEventListener("click", handlePagination);
  });
}
