window.onload = async () => {
  //// bottom-nar-bar////
  navigateToHome();
  navigateToCalendar();
  navigateToMood();
  navigateToMentor();
  naviagteToSetting();
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
  window.location = '/messageId.html';
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