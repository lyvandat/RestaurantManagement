alert("we have email verification, please use your actual email or use our created account for testing purposes. email: lyvandat123@gmail.com, password: 123123");
const signUpForm = document.getElementById("signup-form");

if (signUpForm) {
  const signUserUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/auth/sign-up", {
        method: "POST",
        body: JSON.stringify({
          name: signUpForm.elements[(name = "name")].value,
          email: signUpForm.elements[(name = "email")].value,
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
