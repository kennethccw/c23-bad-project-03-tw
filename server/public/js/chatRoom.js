const socket = io.connect();
let user;
let lastMessageUser;

window.onload = async () => {
  //// bottom-nar-bar////
  navigateToHome();
  navigateToCalendar();
  navigateToMood();
  navigateToMentor();
  naviagteToSetting();
  getWellcomeMessage();
  getTextMessage();
  getUserInfo();

  socket.on("send-message", (data) => {
    addNewMessage(data);
  });

  const addNewMessage = (data) => {
    const { message, user } = data;
    console.log(data, lastMessageUser)

    if (user.username !== lastMessageUser) {
      // add new message
      const resultArea = document.querySelector(".newMessage-container");
      const msgBox = document.createElement("div");
      msgBox.className = "msgBox";
      resultArea.appendChild(msgBox);

      const newMsgImage = document.createElement("img");
      newMsgImage.className = "newMsgImage";
      newMsgImage.src = user.image;
      msgBox.appendChild(newMsgImage);

      const newMessageContainer = document.createElement("div")
      newMessageContainer.className = "newMessageContainer"
      msgBox.appendChild(newMessageContainer)

      const newMessageUsername = document.createElement("div");
      newMessageUsername.className = "newMessageUsername";
      newMessageUsername.textContent = user.username;
      newMessageContainer.appendChild(newMessageUsername);

      const newMessageContent = document.createElement("div");
      newMessageContent.className = "newMessageContent";
      newMessageContent.textContent = data.message;
      newMessageContainer.appendChild(newMessageContent)

    
    } else {
      
      const resultArea = document.querySelector(".newMessage-container");
      const msgBox = document.createElement("div");
      msgBox.className = "msgBox";
      resultArea.appendChild(msgBox);

      const newMsgImage = document.createElement("img");
      newMsgImage.className = "newMsgImage";
      newMsgImage.src = user.image;
      msgBox.appendChild(newMsgImage);

      const newMessageContainer = document.createElement("div")
      newMessageContainer.className = "newMessageContainer"
      msgBox.appendChild(newMessageContainer)

      const newMessageUsername = document.createElement("div");
      newMessageUsername.className = "newMessageUsername";
      newMessageUsername.textContent = user.username;
      newMessageContainer.appendChild(newMessageUsername);

      const newMessageContent = document.createElement("div");
      newMessageContent.className = "newMessageContent";
      newMessageContent.textContent = data.message;
      newMessageContainer.appendChild(newMessageContent)

    }

   
  };
};
//// bottom-nar-bar////

//socket io
async function getWellcomeMessage() {
  socket.on("welcome-message", (data) => {
    addMessage(data.msg);
  });

  const addMessage = (msg) => {
    const textHistory = document.querySelector(".wellcomeMessage-container");
    const msgDiv = document.createElement("div");
    msgDiv.className = "wellcomeMessage-container";

    textHistory.appendChild(msgDiv);

    const msgImage = document.createElement("img");
    msgImage.className = "msgImage";
    msgImage.src = "./photos/logo/admin-png.png";
    msgDiv.appendChild(msgImage);

    const msgContent = document.createElement("div");
    msgContent.className = "wellcomeMessage";
    msgContent.textContent = msg;
    msgDiv.appendChild(msgContent);
  };
}

function getTextMessage() {
  document.querySelector("#form-textarea").addEventListener("submit", async (event) => {
    event.preventDefault();
    const input = document.querySelector("#textarea").value;
    console.log(user);
    socket.emit("send-message", { message: input, user: user });

    // reset textarea
    document.querySelector("#textarea").value = "";
  });
}

async function getUserInfo() {
  const resp = await fetch("/chatRoom/getUser");
  console.log("js resp line 44".resp);
  if (resp.status === 200) {
    const userInfo = await resp.json();
    user = userInfo[0];
    lastMessageUser = userInfo[0].username;

    console.log("js line45=", userInfo);

    
  }
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

//// bottom-nar-bar////
