export const deleteOrder = async function (sellerId, orderId) {
  try {
    const url = `/api/v1/order/${sellerId}/${orderId}`;
    let fetchOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
      const errRes = await response.json();
      alert(errRes.message);
      return false;
    }

    const resData = await response.json();
    alert(`Xóa đơn đặt hàng thành công`);
    return true;
  } catch (err) {
    alert(err.message);
    return false;
  }
};
