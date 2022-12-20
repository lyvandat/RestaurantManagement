export const clickOrderButton = async function (e) {
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
    const response = await fetch(`/api/v1/payment/checkout-session`, {
      method: "POST",
      body: JSON.stringify({
        phone: phoneInput.value,
        address: addressInput.value,
        note: noteInput.value || "None",
        payment: checkedPayment.dataset.value || "card",
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
      location.assign(data.data.session.url);
    }
  } catch (err) {
    alert(err.message);
  }
};
