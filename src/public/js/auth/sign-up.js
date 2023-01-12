const signUpForm = document.getElementById("signup-form");
const signUpDriverForm = document.getElementById("signup-driver-form");

if (signUpForm) {
  const signUserUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/v1/auth/sign-up", {
        method: "POST",
        body: JSON.stringify({
          name: signUpForm.elements[(name = "name")].value,
          email: signUpForm.elements[(name = "email")].value,
          phone: signUpForm.elements[(name = "phone")].value,
          address: signUpForm.elements[(name = "address")].value,
          role: "Khách hàng",
          username: signUpForm.elements[(name = "username")].value,
          password: signUpForm.elements[(name = "password")].value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errRes = await response.json();
        console.log(errRes.message);
        alert(errRes.message);
        return;
      }

      const data = await response.json();
      console.log("signup successfully");
      alert("signup successfully");
      window.location.replace("/admin/sign-in");
    } catch (err) {
      console.log(err.message);
      alert(err.message);
    }
  };

  signUpForm.addEventListener("submit", signUserUp);
}

if (signUpDriverForm) {
  const signDriverUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/v1/auth/sign-up-driver", {
        method: "POST",
        body: JSON.stringify({
          name: signUpDriverForm.elements[(name = "name")].value,
          email: signUpDriverForm.elements[(name = "email")].value,
          phone: signUpDriverForm.elements[(name = "phone")].value,
          address: signUpDriverForm.elements[(name = "address")].value,
          area: signUpDriverForm.elements[(name = "area")].value,
          motorbike:
            signUpDriverForm.elements[(name = "motorbike-identity")].value,
          bank: signUpDriverForm.elements[(name = "bank")].value,
          bankNumber: signUpDriverForm.elements[(name = "bank-number")].value,
          role: "Tài xế",
          username: signUpDriverForm.elements[(name = "username")].value,
          password: signUpDriverForm.elements[(name = "password")].value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errRes = await response.json();
        console.log(errRes.message);
        alert(errRes.message);
        return;
      }

      const data = await response.json();
      console.log("signup successfully");
      alert("signup successfully");
      window.location.replace("/sign-in");
    } catch (err) {
      console.log(err.message);
      alert(err.message);
    }
  };

  signUpDriverForm.addEventListener("submit", signDriverUp);
}
