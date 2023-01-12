export const updateOrderStatus = async function (customerId, orderId) {
  try {
    const url = `/api/v1/order/${customerId}/${orderId}`;
    let fetchOptions = {
      method: "PATCH",
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
    alert(`update menu item successfully`);
    return true;
  } catch (err) {
    alert(err.message);
    return false;
  }
};
