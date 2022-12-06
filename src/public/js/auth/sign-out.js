export const signOut = async (e) => {
  try {
    const response = await fetch("/auth/sign-out");

    if (!response.ok) {
      const errRes = await response.json();
      console.log(errRes.message);
      return;
    }

    const data = await response.json();
    console.log("logout successfully");
    setTimeout(() => {
      // window.location.reload(true);
      window.location.replace("/admin/sign-in");
    }, 1000);
  } catch (err) {
    console.log(err.message);
  }
};
