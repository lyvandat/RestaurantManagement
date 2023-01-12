var express = require("express");
var router = express.Router();

const {
  renderCart,
  renderHome,
  renderItems,
  renderUserOrders,
  renderItemDetail,
  renderPayment,
  renderMe,
  renderProfile,
  renderContract,
  renderStore,
  renderStoreDetail,
  renderMenu,
  renderMenuClient,
  renderMenuDetail,
  renderMenuDetailClient,
  renderOrder,
  renderOrderDetail,
  renderSignUp,
  renderSignIn,
  renderOrderDriver,
  renderOrderDriverAccepted,
  renderContractStaff,
  renderContractStaffAccepted,
} = require("../app/controllers/ViewController");

const {
  isLoggedIn,
  protect,
  restrictTo,
} = require("../app/controllers/AuthController");

router.get("/sign-up", renderSignUp);
router.get("/sign-in", renderSignIn);
router.get("/sign-up-seller", renderProfile);

// router.use(protect);

// seller - Đối tác
router.get("/seller/contract", [
  isLoggedIn,
  restrictTo("Đối tác"),
  renderContract,
]);
router.get("/seller/store", [isLoggedIn, restrictTo("Đối tác"), renderStore]);
router.get("/seller/store/:id", [
  isLoggedIn,
  restrictTo("Đối tác"),
  renderStoreDetail,
]);
router.get("/seller/menu", [isLoggedIn, restrictTo("Đối tác"), renderMenu]);
router.get("/seller/menu/:id", [
  isLoggedIn,
  restrictTo("Đối tác"),
  renderMenuDetail,
]);
router.get("/seller/order", [isLoggedIn, restrictTo("Đối tác"), renderOrder]);
router.get("/seller/order/:customerId/:id", [
  isLoggedIn,
  restrictTo("Đối tác"),
  renderOrderDetail,
]);

// driver - Tai xe
router.get("/driver", [isLoggedIn, restrictTo("Tài xế"), renderOrderDriver]);
router.get("/driver/accepted", [
  isLoggedIn,
  restrictTo("Tài xế"),
  renderOrderDriverAccepted,
]);
router.get("/driver/:customerId/:id", [
  isLoggedIn,
  restrictTo("Tài xế"),
  renderOrderDetail,
]);

// user - Khách hàng
router.get("/", [isLoggedIn, restrictTo("Khách hàng"), renderItems]);
router.get("/order", [isLoggedIn, restrictTo("Khách hàng"), renderUserOrders]);
router.get("/menu/:id", [
  isLoggedIn,
  restrictTo("Khách hàng"),
  renderMenuClient,
]);
router.get("/menu/:menuId/:foodId", [
  isLoggedIn,
  restrictTo("Khách hàng"),
  renderMenuDetailClient,
]);

// staff - Nhân viên
router.get("/staff", [
  isLoggedIn,
  restrictTo("Nhân viên"),
  renderContractStaff,
]);
router.get("/staff/accepted", [
  isLoggedIn,
  restrictTo("Nhân viên"),
  renderContractStaffAccepted,
]);

module.exports = router;
