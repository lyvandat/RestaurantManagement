const registerSellerForm = document.querySelector(".form-user-data");

const registerSeller = async function (data, type) {
  const url = "/api/v1/seller";
  try {
    let fetchOptions = {
      method: "POST",
      // gửi form data thì không cần JSON.stringify với lại "Content-Type"
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    console.log(url, fetchOptions);
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
      const errRes = await response.json();
      // showAlert('error', errRes.message);
      alert(errRes.message);
      return false;
    }

    const resData = await response.json();
    alert(`register successfully`);
    return true;
  } catch (err) {
    alert("error", err.message);
    return false;
  }
};

if (registerSellerForm) {
  const updateUserData = async function (e) {
    e.preventDefault();
    const nameInput = this.elements[(id = "restaurant-name")];
    const emailInput = this.elements[(id = "restaurant-email")];
    const ownerInput = this.elements[(id = "restaurant-owner")];
    const districtInput = this.elements[(id = "restaurant-district")];
    const cityInput = this.elements[(id = "restaurant-city")];
    const branchInput = this.elements[(id = "restaurant-branch")];
    const quantityInput = this.elements[(id = "restaurant-quantity")];
    const typeInput = this.elements[(id = "restaurant-type")];
    const phoneInput = this.elements[(id = "restaurant-phone")];
    const addressInput = this.elements[(id = "restaurant-address")];
    const bankNameInput = this.elements[(id = "bankName")];
    const bankBranchInput = this.elements[(id = "bankBranch")];
    const bankNumberInput = this.elements[(id = "bankNumber")];
    const usernameInput = this.elements[(id = "seller-username")];
    const passwordInput = this.elements[(id = "seller-password")];

    const formData = {
      restaurantName: nameInput.value,
      restaurantEmail: emailInput.value,
      restaurantOwner: ownerInput.value,
      restaurantDistrict: districtInput.value,
      restaurantCity: cityInput.value,
      restaurantBranch: branchInput.value,
      restaurantQuantity: quantityInput.value,
      restaurantType: typeInput.value,
      restaurantAddress: addressInput.value,
      restaurantPhone: phoneInput.value,
      bankName: bankNameInput.value,
      bankBranch: bankBranchInput.value,
      bankNumber: bankNumberInput.value,
      username: usernameInput.value,
      password: passwordInput.value,
    };

    registerSeller(formData, "user info");
  };

  registerSellerForm.addEventListener("submit", updateUserData);
}
