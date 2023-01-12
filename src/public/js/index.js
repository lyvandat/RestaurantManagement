// import "@babel/polyfill";
import { signOut } from "./auth/sign-out.js";

import { signContract } from "./seller/signContract.js";
import { updateStore } from "./seller/updateStore.js";
import { updateMenuItem } from "./seller/updateMenuItem.js";
import { addMenuItem } from "./seller/addMenuItem.js";
import { updateOrderStatus } from "./seller/updateOrderStatus.js";
import { createOrder } from "./user/user-handler.js";
import { deleteOrder } from "./user/delete-order.js";

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

// sign Contract
const signContractButton = document.getElementById("sign-contract-btn");

// update store button
const updateStoreBtn = document.querySelector(".btn-update-store");

// update menu item
const updateMenuItemBtn = document.querySelector(".btn-update-menu-item");

// add menu item
const addMenuItemBtn = document.querySelector(".btn-add-menu-item");

// confirm order button
const confirmOrderBtn = document.querySelector(".confirm-order-btn");

// buy now button
const buyNowBtn = document.querySelector(".btn-buynow");

// drive accept order
const driverAcceptBtn = [...document.querySelectorAll(".driver-accept-order")];

if (signContractButton) {
  signContractButton.addEventListener("click", async function (e) {
    const contractId = e.target.dataset.contractId;
    await signContract(contractId);
  });
}

if (updateStoreBtn) {
  updateStoreBtn.addEventListener("click", async function (e) {
    const nameInput = document.getElementById("rest-detail-name").value;
    const addressInput = document.getElementById("rest-detail-address").value;
    const openTimeInput = document.getElementById("rest-detail-open").value;
    const closeTimeInput = document.getElementById("rest-detail-close").value;
    const statusInput = document.getElementById("rest-detail-status").value;
    const storeId = updateStoreBtn.dataset.storeId;

    if (
      nameInput.trim().length === 0 ||
      addressInput.trim().length === 0 ||
      openTimeInput.trim().length === 0 ||
      closeTimeInput.trim().length === 0 ||
      statusInput.trim().length === 0
    ) {
      alert("vui lòng nhập thông tin cập nhật");
      return;
    }

    const sentData = {
      name: nameInput,
      address: addressInput,
      open: openTimeInput,
      close: closeTimeInput,
      status: statusInput,
    };
    await updateStore(storeId, sentData);
  });
}

if (updateMenuItemBtn) {
  updateMenuItemBtn.addEventListener("click", async function (e) {
    const nameInput = document.getElementById("menu-item-name").value;
    const priceInput = document.getElementById("menu-item-price").value;
    const descInput = document.getElementById("menu-item-desc").value;
    const quantityInput = document.getElementById("menu-item-quantity").value;
    const statusInput = document.getElementById("menu-item-status").value;
    const menuId = updateMenuItemBtn.dataset.menuId;
    const itemId = updateMenuItemBtn.dataset.itemId;
    const selectId = updateMenuItemBtn.dataset.selectId;
    const selectName = updateMenuItemBtn.dataset.selectName;

    if (
      nameInput.trim().length === 0 ||
      priceInput.trim().length === 0 ||
      descInput.trim().length === 0 ||
      quantityInput.trim().length === 0 ||
      statusInput.trim().length === 0
    ) {
      alert("vui lòng nhập thông tin cập nhật");
      return;
    }

    const sentData = {
      menuId,
      selectId,
      selectName,
      name: nameInput,
      price: priceInput,
      desc: descInput,
      quantity: quantityInput,
      status: statusInput,
    };
    await updateMenuItem(itemId, sentData);
  });
}

if (addMenuItemBtn) {
  addMenuItemBtn.addEventListener("click", async function (e) {
    console.log("click");
    const nameInput = document.querySelector("input[name='food-name']").value;
    const priceInput = document.querySelector("input[name='food-price']").value;
    const descInput = document.querySelector("input[name='food-desc']").value;
    const quantityInput = document.querySelector(
      "input[name='food-quantity']"
    ).value;
    const statusInput = document.querySelector(
      "input[name='food-status']"
    ).value;
    const optionInput = document.querySelector(
      "input[name='food-option']"
    ).value;
    const menuId = addMenuItemBtn.dataset.menuId;
    const itemId = `MA-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const selectId = itemId.replace("MA", "TC");
    const selectName = optionInput;

    if (
      nameInput.trim().length === 0 ||
      priceInput.trim().length === 0 ||
      descInput.trim().length === 0 ||
      quantityInput.trim().length === 0 ||
      statusInput.trim().length === 0 ||
      optionInput.trim().length === 0
    ) {
      alert("vui lòng nhập đầy đủ thông tin để thêm món ăn");
      return;
    }

    const sentData = {
      itemId,
      selectId,
      selectName,
      name: nameInput,
      price: priceInput,
      desc: descInput,
      quantity: quantityInput,
      status: statusInput,
    };
    await addMenuItem(menuId, sentData);
  });
}

if (confirmOrderBtn) {
  const customerId = confirmOrderBtn.dataset.customerId;
  const orderId = confirmOrderBtn.dataset.orderId;

  confirmOrderBtn.addEventListener("click", async function (e) {
    await updateOrderStatus(customerId, orderId);
  });
}

if (buyNowBtn) {
  const menuId = buyNowBtn.dataset.menuId;
  const foodId = buyNowBtn.dataset.foodId;
  const sellerId = buyNowBtn.dataset.sellerId;
  const price = buyNowBtn.dataset.price;
  buyNowBtn.addEventListener("click", async function (e) {
    console.log("click");
    const paymentMethod = document.querySelector(
      "input[name='payment']:checked"
    );
    const quantity = document.getElementById("qty-itdetail").value;

    if (!paymentMethod) {
      return alert("vui lòng chọn phương thức thanh toán");
    }

    if (isNaN(+quantity) || +quantity < 0) {
      return alert("số lượng không hợp lệ");
    }

    await createOrder({
      menuId,
      foodId,
      sellerId,
      price,
      quantity,
    });
  });
}

const deleteOrderBtn = document.querySelectorAll(".delete-order-btn");
if (deleteOrderBtn.length > 0) {
  console.log("hello");
  [...deleteOrderBtn].forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", async function (e) {
      console.log("click");
      const orderId = deleteBtn.dataset.orderId;
      const sellerId = deleteBtn.dataset.sellerId;
      const status = deleteBtn.dataset.status;
      if (status === "Chờ nhận" || status === "Chờ xác nhận") {
        return await deleteOrder(sellerId, orderId);
      } else {
        alert("không thể hủy đơn hàng đã xác nhận");
      }
    });
  });
}

if (driverAcceptBtn.length !== 0) {
  driverAcceptBtn.forEach((btn) => {
    btn.addEventListener("click", async function (e) {
      const userId = this.dataset.userId;
      const sellerId = this.dataset.sellerId;
      const orderId = this.dataset.orderId;
      console.log("click");
      try {
        const url = `/api/v1/order`;
        let fetchOptions = {
          method: "PATCH",
          body: JSON.stringify({
            userId,
            sellerId,
            orderId,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await fetch(url, fetchOptions);
        if (!response.ok) {
          const errRes = await response.json();
          // showAlert('error', errRes.message);
          alert(errRes.message);
          return false;
        }

        const resData = await response.json();
        alert(`nhận đơn hàng thành công`);
        return true;
      } catch (err) {
        alert("error", err.message);
        return false;
      }
    });
  });
}
// end hqtcsdl
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
