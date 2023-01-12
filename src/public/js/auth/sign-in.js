const loginForm = document.getElementById("login-form");

if (loginForm) {
  const logUserIn = async (e) => {
    console.log("click");
    e.preventDefault();
    try {
      const response = await fetch("/api/v1/auth/sign-in", {
        method: "POST",
        body: JSON.stringify({
          name: loginForm.elements[(name = "name")].value,
          password: loginForm.elements[(name = "password")].value,
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
      console.log("data login", data);
      alert("login successfully");

      if (data.user.VAITRO === "Đối tác") {
        window.location.href = "/seller/store";
      } else if (data.user.VAITRO === "Khách hàng") {
        window.location.href = "/";
      } else if (data.user.VAITRO === "Tài xế") {
        window.location.href = "/driver";
      } else if (data.user.VAITRO === "Nhân viên") {
        window.location.href = "/staff";
      }
      console.log(data.user);
    } catch (err) {
      console.log(err.message);
      alert(err.message);
    }
  };

  loginForm.addEventListener("submit", logUserIn);
}
