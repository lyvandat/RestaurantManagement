export const addMenuItem = async function (id, data) {
  try {
    const url = `/api/v1/menu/${id}`;
    let fetchOptions = {
      method: "POST",
      body: JSON.stringify(data),
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
    alert(`Thêm sản phẩm vào thực đơn thành công`);
    return true;
  } catch (err) {
    alert(err.message);
    return false;
  }
};
