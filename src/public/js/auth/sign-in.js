const loginForm = document.getElementById("login-form");

if (loginForm) {
  const logUserIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/auth/sign-in", {
        method: "POST",
        body: JSON.stringify({
          email: loginForm.elements[(name = "email")].value,
          password: loginForm.elements[(name = "password")].value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errRes = await response.json();
        console.log(errRes.message);
        return;
      }

      const data = await response.json();
      console.log(data);
      console.log("login successfully");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (err) {
      console.log(err.message);
    }
  };

  loginForm.addEventListener("submit", logUserIn);
}
