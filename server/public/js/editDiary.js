window.onload = async () => {
  await showPastDiary()
  // editDiary()
  // generateCalendar();
  // await loadEmoticonCalendar();
  editPastDiary();
  //// bottom-nar-bar////
  navigateToHome();
  navigateToCalendar();
  navigateToMood();
  navigateToMentor();
  naviagteToSetting();
  //// bottom-nar-bar////
  // submitDiary();
  insertDiary();
  // addEmotion()
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

// function submitDiary() {
//   const voiceDetectionMethod = document.querySelector(".edit-profile");
//   voiceDetectionMethod.addEventListener("click", async (e) => {
//     e.preventDefault();
//     window.location = "/history.html";
//   });
// }

function insertDiary() {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  
  const dateString = params.date; 
  if (dateString) {
    return
  }
  const textAreaForm = document.querySelector("#form-textarea");
  textAreaForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const form = e.target;
    formData.append("content", form.textarea.value);
    // formData.append(
    //   "emotion_map_id", e.target.email.value,
    // )
    formData.append("image", form.image.files[0]);
    console.log("before fetch");
    const resp = await fetch("/method/diary", {
      method: "POST",
      body: formData,
    });
    console.log("after");
    const respJson = await resp.json();
    if (resp.status === 200) {
      alert("Updated your profile information!!");
      window.location = "/history.html";
    }
  });
}

function editPastDiary() {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  
  const dateString = params.date; 

  const textAreaForm = document.querySelector("#form-textarea");
  textAreaForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const form = e.target;
    formData.append("content", form.textarea.value);
    // formData.append(
    //   "emotion_map_id", e.target.email.value,
    // )
    formData.append("image", form.image.files[0]);
    console.log("before fetch");
    const resp = await fetch(`/method/diary/date/${dateString}`, {
      method: "PUT",
      body: formData,
    });
    console.log("after");
    const respJson = await resp.json();
    if (resp.status === 200) {
      alert("Updated your profile information!!");
      window.location = "/history.html";
    }
  });
}

async function showPastDiary() {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  
  const dateString = params.date; 
  console.log(dateString)
  if (dateString) {
    const result = await fetch(`/method/diary/past/date/${dateString}`)
    const content = await result.json()
    console.log(content)
    document.querySelector('.textarea').value = content.content
  }
  }
