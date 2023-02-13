window.onload = async () => {
  //// bottom-nar-bar////
  navigateToHome();
  navigateToCalendar();
  navigateToMood();
  navigateToMentor();
  naviagteToSetting();
  createEmoticon();
  await showPastEmoticon()
};
//// bottom-nar-bar////
async function showPastEmoticon() {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  
  const dateString = params.date; 
  const result = await fetch(`/method/emoticon/past/date/${dateString}`)
  const eid = await result.json()
  document.querySelectorAll('.emoji').forEach((emoji) => {
    if (parseInt(emoji.dataset.emotion_id) === eid.emotion_map_id) {
      emoji.setAttribute('style', 'opacity: 100%;')
    }
  })
}
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
function createEmoticon() {
  document.querySelectorAll(".emoji").forEach((emojiPic) => {
    emojiPic.addEventListener("click", async (e) => {
      const mood = e.target;
      console.log(mood.dataset.emotion_id)
      const reqBody = { emotionId: parseInt(mood.dataset.emotion_id) };
      console.log(reqBody)
      const resp = await fetch("/method/emoticon", {
        method: "POST",
        headers: {
          "content-type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(reqBody),
      });
      if (resp.status === 200) {
        window.location = "/history.html";
      } else if (resp.status === 406){
        window.location = '/history.html'
      }else {
        const data = await resp.json();
        alert(data.message);
      }
    });
  });
}
//// bottom-nar-bar////
