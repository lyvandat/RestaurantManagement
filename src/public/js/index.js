// import "@babel/polyfill";
console.log("hello world");
const signOutBtnAdmin = document.getElementById("signout-admin");
const signOutBtnUser = document.getElementById("signout-user");
import { signOut } from "./auth/sign-out.js";

if (signOutBtnAdmin) {
  signOutBtnAdmin.addEventListener("click", signOut);
}

if (signOutBtnUser) {
  signOutBtnUser.addEventListener("click", signOut);
}
