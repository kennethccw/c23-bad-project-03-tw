window.onload = () => {
  login();
  // skipPage();
};

function login() {
  const loginForm = document.querySelector("#login-form");
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const formBody = {
      username: form.username.value,
      password: form.password.value,
    };
    const resp = await fetch("/user/login", {
      method: "POST",
      headers: {
        "content-type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(formBody),
    });
    if (resp.status === 200) {
      window.location = "/intro.html";
    } else {
      const data = await resp.json();
      alert(data.message);
    }
  });
}

