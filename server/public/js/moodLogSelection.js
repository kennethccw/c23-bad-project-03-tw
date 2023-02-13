// import { } from "./emoticonMethod"

window.onload = async () => {
  logByEmoticon ();
  writeDiaryAndEmoticon ();
  voiceDetection ();

 //// bottom-nar-bar////
  navigateToHome ();
  navigateToCalendar ();
  navigateToMood ();
  navigateToMentor ();
  naviagteToSetting ();
};
//// bottom-nar-bar////


 //// bottom-nar-bar////
  function navigateToHome () {
  const voiceDetectionMethod = document.querySelector(".home-tab");
  voiceDetectionMethod.addEventListener("click", async (e) => {
  e.preventDefault();
  window.location = '/activities.html';
})
}
function navigateToCalendar () {
  const voiceDetectionMethod = document.querySelector(".calendar-tab");
  voiceDetectionMethod.addEventListener("click", async (e) => {
  e.preventDefault();
  window.location = '/history.html';
})
}

function navigateToMood () {
  const voiceDetectionMethod = document.querySelector(".mood-tab");
  voiceDetectionMethod.addEventListener("click", async (e) => {
  e.preventDefault();
  window.location = '/moodLogSelection.html';
})
}

function navigateToMentor () {
  const voiceDetectionMethod = document.querySelector(".mentor-tab");
  voiceDetectionMethod.addEventListener("click", async (e) => {
  e.preventDefault();
  window.location = '/chatRoom.html';
})
}

function naviagteToSetting () {
  const voiceDetectionMethod = document.querySelector(".setting-tab");
  voiceDetectionMethod.addEventListener("click", async (e) => {
  e.preventDefault();
  window.location = '/profile.html';
})
}

 //// bottom-nar-bar////

function logByEmoticon () {
  const logByEmoticonMethod = document.querySelector(".select-emoticon");
  logByEmoticonMethod.addEventListener("click", async (e) => {
    e.preventDefault();
    window.location = '/emoticonMethod.html';
  })
}

function writeDiaryAndEmoticon () {
  const logByEmoticonMethod = document.querySelector(".write-diary");
  logByEmoticonMethod.addEventListener("click", async (e) => {
    e.preventDefault();
    window.location = '/diaryAndEmoticon.html';
  })
}

function voiceDetection () {
  const voiceDetectionMethod = document.querySelector(".voice-detection");
  voiceDetectionMethod.addEventListener("click", async (e) => {
  e.preventDefault();
  window.location = '/selectVoiceRecognition.html';
})
}
