export const handleAddItemToCart = async function(e) {
  const productId = e.target.dataset.productId;
  const price = +e.target.dataset.price || 0;
  const quantityInput = document.getElementById("qty-itdetail");
  try {
    const response = await fetch(`/api/v1/products/${productId}`, {
      method: "POST",
      body: JSON.stringify({
        quantity: +quantityInput?.value || 0,
        price
      }),
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (!response.ok) {
      const errRes = await response.json();
      alert(errRes.message);
      return;
    }

    const data = await response.json();
  } catch(err) {
    alert(err.message);
  }
}

export const handleCartToOrder = async function(e) {
  const checkBoxes = [...document.querySelectorAll(".form-check-input")];

  // remove select all checkbox
  checkBoxes.shift();
  let productIds = [];

  checkBoxes.forEach((check) => {
    if (check.checked) {
      productIds.push(check.dataset.productId);
    }
  })

  try {
    const response = await fetch(`/api/v1/products`, {
      method: "PATCH",
      body: JSON.stringify({
        productIds
      }),
      headers: {
        "Content-Type": "application/json",
      }
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
  } catch(err) {
    alert(err.message);
    console.log(err);
  }

  // fetch change select field in cart
}

