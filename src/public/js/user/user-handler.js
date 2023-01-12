export const createOrder = async function (data) {
  try {
    const url = `/api/v1/order`;
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
    alert(`order successfully`);
    return true;
  } catch (err) {
    alert("error", err.message);
    return false;
  }
};
