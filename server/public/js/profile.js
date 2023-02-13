window.onload = async () => {
  await loadProfileDetails();
  editProfile();
  logout();
  //// bottom-nar-bar////
  navigateToHome();
  navigateToCalendar();
  navigateToMood();
  navigateToMentor();
  naviagteToSetting();
  //// bottom-nar-bar////
};

//// bottom-nar-bar////
function navigateToHome() {
  const voiceDetectionMethod = document.querySelector(".home-tab");
  voiceDetectionMethod.addEventListener("click", async (e) => {
    e.preventDefault();
    window.location = "/activities.html";
  });
}
function navigateToCalendar() {
  const voiceDetectionMethod = document.querySelector(".calendar-tab");
  voiceDetectionMethod.addEventListener("click", async (e) => {
    e.preventDefault();
    window.location = "/history.html";
  });
}

function navigateToMood() {
  const voiceDetectionMethod = document.querySelector(".mood-tab");
  voiceDetectionMethod.addEventListener("click", async (e) => {
    e.preventDefault();
    window.location = "/moodLogSelection.html";
  });
}

function navigateToMentor() {
  const voiceDetectionMethod = document.querySelector(".mentor-tab");
  voiceDetectionMethod.addEventListener("click", async (e) => {
    e.preventDefault();
    window.location = "/chatRoom.html";
  });
}

function naviagteToSetting() {
  const voiceDetectionMethod = document.querySelector(".setting-tab");
  voiceDetectionMethod.addEventListener("click", async (e) => {
    e.preventDefault();
    window.location = "/profile.html";
  });
}

//// bottom-nar-bar////

//// loadProfileDetails ////
async function loadProfileDetails() {
  const resp = await fetch("/user/profile");
  const datas = await resp.json();
  // console.log(datas)
  for (const key in datas) {
    const userInfoContainer = document.querySelector(".user-info-col");

    if (key === "image" && datas[key] !== '') {
      const profilePig = document.querySelector(".profile-pig");
      const profilePic = document.querySelector(".profile-pic");
      profilePig.hidden = false;
      profilePic.hidden = true;
      profilePic.setAttribute("style", "display: none;");
      profilePig.setAttribute("src", datas[key]);
      const editProfilePicBtn = document.querySelector("#profile-pic-upload");
      editProfilePicBtn.addEventListener("change", (e) => {
        profilePig.hidden = false;
        profilePic.hidden = true;
        profilePic.setAttribute("style", "display: none;");
        const profilePicUrl = URL.createObjectURL(e.target.files[0]);
        console.log(profilePicUrl);
        profilePig.setAttribute("src", profilePicUrl);
      });
    } else if (key === "image" && datas[key] === '') {
      const profilePig = document.querySelector(".profile-pig");
      profilePig.setAttribute("style", "display: none;");
      const profilePic = document.querySelector(".profile-pic");
      profilePig.hidden = true;
      profilePic.hidden = false;
      const editProfilePicBtn = document.querySelector("#profile-pic-upload");
      editProfilePicBtn.addEventListener("change", (e) => {
        profilePig.hidden = false;
        profilePic.hidden = true;
        profilePic.setAttribute("style", "display: none;");
        const profilePicUrl = URL.createObjectURL(e.target.files[0]);
        profilePig.setAttribute("src", profilePicUrl);
      });
    } else if (key === "medical_record") {
      const userInfoCol = document.createElement("div");
      userInfoCol.classList.add("input-container", `${key}Tab`);

      const inputLabelCol = document.createElement("span");
      inputLabelCol.className = "input-label";

      const inputLabelSpan = document.createElement("input");
      inputLabelSpan.className = "input-content";
      inputLabelSpan.setAttribute("type", "text");
      inputLabelSpan.setAttribute("name", key);
      inputLabelSpan.value = datas[`${key}`];
      inputLabelCol.innerText = "Medical History:";
      userInfoCol.appendChild(inputLabelCol);
      userInfoCol.appendChild(inputLabelSpan);
      userInfoContainer.appendChild(userInfoCol);
    } else {
      const userInfoCol = document.createElement("div");
      userInfoCol.classList.add("input-container", `${key}Tab`);

      const inputLabelCol = document.createElement("span");
      inputLabelCol.className = "input-label";

      const inputLabelSpan = document.createElement("input");
      inputLabelSpan.className = "input-content";
      inputLabelSpan.setAttribute("type", "text");
      inputLabelSpan.setAttribute("name", key);
      const label = `${key[0].toUpperCase() + key.slice(1)}:`;
      inputLabelCol.innerText = label;
      inputLabelSpan.value = datas[`${key}`];
      userInfoCol.appendChild(inputLabelCol);
      userInfoCol.appendChild(inputLabelSpan);
      userInfoContainer.appendChild(userInfoCol);
    }
    // inputLabelSpan.setAttribute("placeholder");
    // console.log(datas[`${key}`])
    

  }
}
//// loadProfileDetails ////

async function editProfile() {
  // const editBtn = document.createElement("div");
  // editBtn.className="edit-profile";

  document.querySelector("#edit-profile-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const form = e.target;
    formData.append("username", form.username.value);
    formData.append("email", form.email.value);
    formData.append("age", form.age.value);
    formData.append("medical_record", form.medical_record.value);
    formData.append("image", form.image.files[0]);
    const resp = await fetch("/user/updateProfile", {
      method: "PUT",
      body: formData,
    });
    const respJson = await resp.json();
    if (resp.status === 200) {
      alert("Updated your profile information!!");
    }
    // console.log("respJson:")
    // console.log(respJson)
  });
}

function logout() {
  const logoutButton = document.querySelector(".logout-button");
  logoutButton.addEventListener("click", async (e) => {
    const resp = await fetch("/user/logout");
    if (resp.status === 200) {
      window.location = "/";
    }
  });
}
