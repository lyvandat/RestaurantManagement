// import "@babel/polyfill";
const signOutBtnAdmin = document.getElementById("signout-admin");
const signOutBtnUser = document.getElementById("signout-user");
const priceSortForm = document.getElementById("price-sort-form");

import { signOut } from "./auth/sign-out.js";
import { handleSortPrice } from "./sort/price.js";

if (signOutBtnAdmin) {
  signOutBtnAdmin.addEventListener("click", signOut);
}

if (signOutBtnUser) {
  alert("logout successfully");
  signOutBtnUser.addEventListener("click", signOut);

}

if (priceSortForm) {
  priceSortForm.addEventListener("submit", handleSortPrice)
}
