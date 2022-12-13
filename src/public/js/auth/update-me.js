const updateInfoForm = document.querySelector('.form-user-data');
const updatePasswordForm = document.querySelector('.form-user-settings');

const updateSettings = async function (data, type) {
  const url =
    type === 'password'
      ? '/auth/update-password'
      : '/auth/update-me';
  try {
    console.log(data);
    const response = await fetch(url, {
      method: 'PATCH',
      // gửi form data thì không cần JSON.stringify với lại "Content-Type"
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      const errRes = await response.json();
      // showAlert('error', errRes.message);
      alert(errRes.message);
      return false;
    }

    const resData = await response.json();
    alert(`update ${type} successfully`);
    return true;
  } catch (err) {
    alert('error', err.message);
    return false;
  }
};

if (updateInfoForm) {
  const updateUserData = async function (e) {
    e.preventDefault();
    const nameInput = this.elements[(name = 'name')];
    const emailInput = this.elements[(name = 'email')];

    updateSettings({
      name: nameInput.value,
      email: emailInput.value
    }, 'user info');
  };

  updateInfoForm.addEventListener('submit', updateUserData);
}

if (updatePasswordForm) {
  const updatePassword = async function (e) {
    e.preventDefault();
    const currentPasswordInput = this.elements[name = 'current-password'];
    const passwordInput = this.elements[name = 'password'];
    const confirmPasswordInput = this.elements[name = 'confirm-password'];
    const data = {
      currentPassword: currentPasswordInput.value,
      password: passwordInput.value,
      confirmPassword: confirmPasswordInput.value,
    };

    if ((await updateSettings(data, 'password')) === true) {
      currentPasswordInput.value = '';
      passwordInput.value = '';
      confirmPasswordInput.value = '';
    }
  };

  updatePasswordForm.addEventListener('submit', updatePassword);
}
