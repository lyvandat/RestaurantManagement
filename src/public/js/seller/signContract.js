export const signContract = async function (id, data) {
  try {
    const url = `/api/v1/contract/${id}`;
    let fetchOptions = {
      method: "PATCH",
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
    alert(`Kí hợp đồng thành công`);
    return true;
  } catch (err) {
    alert("error", err.message);
    return false;
  }
};
