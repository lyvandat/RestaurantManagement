export const handleAddItemToCart = async function (e) {
  const productId = e.target.dataset.productId;
  const price = +e.target.dataset.price || 0;
  const quantityInput = document.getElementById("qty-itdetail");
  const cartQuantity = document.querySelector(".cart-icon__quantity");

  const quantityInputValue = +quantityInput.value;
  if (
    quantityInputValue === "" ||
    isNaN(quantityInputValue) ||
    quantityInputValue <= 0
  ) {
    alert("Số lượng nhập không hợp lệ");
    return;
  }

  try {
    const response = await fetch(`/api/v1/products/${productId}`, {
      method: "PATCH",
      body: JSON.stringify({
        quantity: quantityInputValue,
        price,
        type: "add",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errRes = await response.json();
      alert(errRes.message);
      return;
    }

    const data = await response.json();
    if (data.status === "success") {
      const cart = data.data.cart;
      cartQuantity.textContent = cart.products.length || "";
    }
  } catch (err) {
    alert(err.message);
  }
};

export const handleSetItemQuantity = async function (e) {
  const productId = e.target.dataset.productId;
  const price = +e.target.dataset.price || 0;
  const quantityInput = e.target;
  const cartTotals = [...document.querySelectorAll(".cart-total")];
  try {
    const response = await fetch(`/api/v1/products/${productId}`, {
      method: "PATCH",
      body: JSON.stringify({
        quantity: +quantityInput?.value || 0,
        price,
        type: "set",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errRes = await response.json();
      alert(errRes.message);
      return;
    }

    const data = await response.json();

    // display new subtotal price when changing product quantity
    const subTotal = data.data.cart.subTotal;
    const formattedSubTotal = subTotal
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    cartTotals[0].textContent = `${formattedSubTotal} VNĐ`;
    cartTotals[1].textContent = `${formattedSubTotal} VNĐ`;
  } catch (err) {
    alert(err.message);
  }
};

export const handleCartToOrder = async function (e) {
  const checkBoxes = [...document.querySelectorAll(".form-check-input")];

  // remove select all checkbox
  checkBoxes.shift();
  let productIds = [];

  checkBoxes.forEach((check) => {
    if (check.checked) {
      productIds.push(check.dataset.productId);
    }
  });

  try {
    const response = await fetch(`/api/v1/products`, {
      method: "PATCH",
      body: JSON.stringify({
        productIds,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errRes = await response.json();
      alert(errRes.message);
      return;
    }

    const data = await response.json();
    if (data.status === "success") {
      let orderUrl = location.href.replace("cart", "order");
      location.assign(orderUrl);
    }
  } catch (err) {
    alert(err.message);
    console.log(err);
  }

  // fetch change select field in cart
};

export const handleDeleteItemFromCart = async function (e) {
  const productId = e.target.dataset.productId;
  const itemDeleted = document.getElementById(productId);
  const cartTotals = [...document.querySelectorAll(".cart-total")];
  const lengthItems = [...document.querySelectorAll(".items-length")];
  const cartQuantity = document.querySelector(".cart-icon__quantity");

  if (!productId) {
    alert("cannot find productId, fail to delete item from cart");
    return;
  }

  try {
    const response = await fetch(`/api/v1/products/${productId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errRes = await response.json();
      alert(errRes.message);
      return;
    }
    // lưu ý nếu trả về 204 no content thì chỗ này bị lỗi (^.^)
    const data = await response.json();

    // update subtotal and number of products in cart
    if (data.status === "success") {
      itemDeleted.parentElement.removeChild(itemDeleted);

      // prepare updating user interface data
      const cart = data.data.cart;
      const subTotal = cart?.subTotal || 0;
      const formattedSubTotal = subTotal
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

      // update user interface
      cartQuantity.textContent = cart.products.length || 0;
      cartTotals[0].textContent = `${formattedSubTotal} VNĐ`;
      cartTotals[1].textContent = `${formattedSubTotal} VNĐ`;
      lengthItems[0].textContent = `(${cart?.products.length})` || "0";
      lengthItems[1].textContent = `(${cart?.products.length})` || "0";
    }
  } catch (err) {
    alert(err.message);
    console.log(err);
  }
};
