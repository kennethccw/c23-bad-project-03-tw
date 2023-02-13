window.onload = async () => {
  //// bottom-nar-bar////
  navigateToHome();
  navigateToCalendar();
  navigateToMood();
  navigateToMentor();
  naviagteToSetting();
  getpast7DaysHappy();
  getpast7DaysSurprised();
  getPast7DaysNeutral();
  getPast7DaysSad();
  getPast7DaysAngry();
  getActivities();
  // updateActivitiesUI();
  
  //// bottom-nar-bar////
};

async function getpast7DaysHappy() {
  const resp = await fetch("/moodlog/past7DaysHappy");
  
 

  if (resp.status === 200){
    const numberOfHappy = await resp.json();
    const numberOfHappyTitle = document.createElement("happy-days");
    numberOfHappyTitle.textContent = numberOfHappy +"DAYS";
    document.querySelector("#happy-days").appendChild(numberOfHappyTitle);

    if (numberOfHappy == 0){
    
      numberOfHappyTitle.textContent ="   ";
     
  
      
   }
  }

  

}


async function getpast7DaysSurprised() {
  const resp = await fetch("/moodlog/past7DaysSurprised");
  

  if (resp.status === 200){
    const numberOfSurprised = await resp.json();
    
    const numberOfSurprisedTitle = document.createElement("surprised-days");
    numberOfSurprisedTitle.textContent = numberOfSurprised +"DAYS";
    document.querySelector("#surprised-days").appendChild(numberOfSurprisedTitle);

    if (numberOfSurprised == 0){
    
      numberOfSurprisedTitle.textContent ="   ";
   }
  }

  

}

async function getPast7DaysNeutral() {
  const resp = await fetch("/moodlog/past7DaysNeutral");

  if (resp.status === 200){
    const numberOfNeutral = await resp.json();
    console.log("js-number of Neutral",numberOfNeutral)
    const numberOfNeutralTitle = document.createElement("neutral-days");
    numberOfNeutralTitle.textContent = numberOfNeutral +"DAYS";
    document.querySelector("#neutral-days").appendChild(numberOfNeutralTitle);

    if (numberOfNeutral == 0){
    
      numberOfNeutralTitle.textContent ="   ";
   }
  }

  

}

async function getPast7DaysSad() {
  const resp = await fetch("/moodlog/past7DaysSad");

  if (resp.status === 200){
    const numberOfSad = await resp.json();
    
    const numberOfSadTitle = document.createElement("sad-days");
    // numberOfSad.className = "sad-days"
    numberOfSadTitle.textContent = numberOfSad +"DAYS";
    document.querySelector("#sad-days").appendChild(numberOfSadTitle);

    if (numberOfSad == 0){
      
      numberOfSadTitle.textContent ="   ";
  }

}

}
  
  

  
  
async function getPast7DaysAngry() {
  const resp = await fetch("/moodlog/past7DaysAngry");

  if (resp.status === 200){
    const numberOfAngry = await resp.json();
    const numberOfAngryTitle = document.createElement("angry-days");
    // numberOfAngry.className = "angry-days";
    numberOfAngryTitle.textContent = numberOfAngry +"DAYS";
    document.querySelector("#angry-days").appendChild(numberOfAngryTitle);

    if (numberOfAngry == 0){
      
      numberOfAngryTitle.textContent ="   ";
    }


  }

  

}


async function getActivities(){
  const resp = await fetch("/moodlog/getActivities");
  if (resp.status === 200) {
    const activities = await resp.json();
    
   
    const resultArea = document.querySelector("#activities-container")
    resultArea.innerHTML = "";
    
    

    for (const activitie of activities){

      
       const itemBox = document.createElement("div");
       itemBox.className = "activities";
       resultArea.appendChild(itemBox)

       const itemImage = document.createElement("img");
       itemImage.className = "itemImage";
       itemImage.src = activitie.image_path;
       itemBox.appendChild(itemImage);
       
       const contentContainer = document.createElement("div");
       contentContainer.className = "contentContainer";
       itemBox.appendChild(contentContainer)

       const itemdescription =document.createElement("div");
       itemdescription.className = "description";
       itemdescription.textContent = activitie.description;
       contentContainer.appendChild(itemdescription)

       const itemcontent = document.createElement("div");
       itemcontent.className = "content";
       itemcontent.textContent = activitie.content;
       
       contentContainer.appendChild(itemcontent)
       
      
       
    }

  }
}




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

