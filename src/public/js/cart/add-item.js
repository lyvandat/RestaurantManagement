export const handleAddItemToCart = async function(e) {
  alert("click");
  const productId = e.target.dataset.productId;
  const price = +e.target.dataset.price || 0;
  const quantityInput = document.getElementById("qty-itdetail");
  console.log(price, quantityInput.value);
  try {
    const response = await fetch(`/products/${productId}`, {
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
    console.log(data);
  } catch(err) {
    alert(err.message);
  }
}

export const handleCartToOrder = async function(e) {
  const checkBoxes = [...document.querySelector(".form-check-input")];

  // fetch change select field in cart
}