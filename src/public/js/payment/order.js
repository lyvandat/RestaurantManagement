export const clickOrderButton = async function(e) {
  const payments = [...document.querySelectorAll(".form-check-input")];
  const phoneInput = document.querySelector("input[name='phone']");
  const addressInput = document.querySelector("input[name='address']");
  const noteInput = document.querySelector("input[name='note']");

  const checkedPayment = payments.find((payment) => payment.checked);
  if (!checkedPayment) {
    alert("vui lòng chọn phương thức thanh toán");
    return;
  }

  try {
    const response = await fetch(`/api/v1/orders`, {
      method: "POST",
      body: JSON.stringify({
        phone: phoneInput.value,
        address: addressInput.value,
        note: noteInput.value,
        payment: checkedPayment.dataset.value
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
    alert("order successfully");
  } catch(err) {
    alert(err.message);
  }
}