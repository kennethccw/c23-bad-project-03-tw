window.onload = async () => {
  await register();
};

document.querySelectorAll(".input-container").forEach((inputContainer) => {
  inputContainer.addEventListener("click", (e) => {
    document.querySelectorAll(".input-content").forEach((inputContent) => {
      if (inputContent.textContent === "") {
        inputContent.setAttribute("placeholder", `${inputContent.dataset.label}`);
      }
    });
    console.log("clicked box");
    const inputBox = e.target;
    inputBox.setAttribute("placeholder", "");
    e.stopPropagation();
  });
});

const body = document.querySelector("body");
body.addEventListener("click", (e) => {
  console.log("clicked body");
  document.querySelectorAll(".input-content").forEach((inputContent) => {
    if (inputContent.textContent === "") {
      inputContent.setAttribute("placeholder", `${inputContent.dataset.label}`);
    }
  });
});

async function register() {
  const resp = await fetch("/user/register")
  const email = await resp.json()
  console.log(email)
  if (email ) {
    const emailContainer = document.querySelector('.email .input-content')
    emailContainer.value = email
  }

  const profilePig = document.querySelector(".profile-pig");
      const profilePic = document.querySelector(".profile-pic");
      
      // profilePic.setAttribute("style", "display: none;");
      const editProfilePicBtn = document.querySelector("#profile-pic-upload");
      editProfilePicBtn.addEventListener("change", (e) => {
        profilePig.hidden = false;
        profilePic.hidden = true;
        profilePic.setAttribute("style", "display: none;");
        const profilePicUrl = URL.createObjectURL(e.target.files[0]);
        console.log(profilePicUrl);
        profilePig.setAttribute("src", profilePicUrl);
      })

  const registerForm = document.querySelector("#register-form");
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.username.value) {
      alert("Missing username!!");
      return;
    }
    if (!form.password.value) {
      alert("Missing password!!");
      return;
    }
    if (!form.email.value) {
      alert("Missing email!!");
      return;
    }

    if (form.username.value.length < 6 || form.username.value.length > 20) {
      alert("Invalid username!!");
      return;
    }
    if (form.password.value.length < 8 || form.password.value.length > 16) {
      alert("Invalid password!!");
      return;
    }

    const formData = new FormData();
    console.log(form.image.files[0])
    formData.append("image", form.image.files[0]);
    formData.append("username", form.username.value);
    formData.append("email", form.email.value);
    formData.append("password", form.password.value);
    formData.append("age", form.age.value);
    formData.append("medical_record", form.medicalHistory.value);
    const resp = await fetch("/user/register", {
      method: "POST",
      body: formData,
    });
    if (resp.status === 201) {
      window.location = "/login.html";
    } else {
      const data = await resp.json();
      alert(data.message);
    }
  });
}
