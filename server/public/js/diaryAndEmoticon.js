window.onload = async () => {
  // editDiary()
  await generateCalendar();
  // await loadEmoticonCalendar();
  await addEmotion();
  //// bottom-nar-bar////
  navigateToHome();
  navigateToCalendar();
  navigateToMood();
  navigateToMentor();
  naviagteToSetting();
  //// bottom-nar-bar////
};

////edit diary////
function editDiary() {
  const editDiaryBtn = document.querySelector(".button-Btn");
  editDiaryBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    window.location = "/editDiary.html";
  });
}
////edit diary////
async function addEmotion() {
  const resp = await fetch('/method/diary/today')
  const isLoggedDiaryToday = await resp.json()
  const editDiaryBtn = document.querySelector(".button-Btn");
  if (isLoggedDiaryToday) {
    editDiaryBtn.addEventListener("click", alertChooseMood);
  } else {
    editDiary();
  }
  document.querySelectorAll(".emoji-bar").forEach((emotionSelected) => {
    emotionSelected.addEventListener("click", async (e) => {
      console.log("hi");
      document.querySelectorAll(".emoji-bar").forEach((emotionNotSelected) => {
        emotionNotSelected.setAttribute('style', 'opacity: 50%;')
      })
      // emotionSelected.setAttribute('style', 'opacity: 50%;')
      emotionSelected.setAttribute('style', 'opacity: 100%;')
      const resp = await fetch(`/method/diary?eid=${emotionSelected.dataset.emoji}`);
      console.log("after fetch");
      if (resp.status === 200) {
        // alert("Updated your profile information!!")
        await generateCalendar();
        editDiaryBtn.removeEventListener ("click", alertChooseMood);
        editDiary();
      }
    });
  });
}

function alertChooseMood () {
  alert("Please choose the mood today first!!");
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

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Váriavel principal
let date = new Date();

// Função que retorna a data atual do calendário
function getCurrentDate(element, asString) {
  if (element) {
    if (asString) {
      return (element.textContent =
        weekdays[date.getDay()] +
        ", " +
        date.getDate() +
        " de " +
        months[date.getMonth()] +
        " de " +
        date.getFullYear());
    }
    return (element.value = date.toISOString().substr(0, 10));
  }
  return date;
}

// Função principal que gera o calendário
async function generateCalendar() {
  // Pega um calendário e se já existir o remove
  const calendar = document.getElementById("calendar");
  if (calendar) {
    calendar.remove();
  }

  // Cria a tabela que será armazenada as datas
  const table = document.createElement("table");
  table.id = "calendar";

  // Cria os headers referentes aos dias da semana
  const trHeader = document.createElement("tr");
  trHeader.className = "weekends";
  weekdays.map((week) => {
    const th = document.createElement("th");
    const w = document.createTextNode(week.substring(0, 3));
    th.appendChild(w);
    trHeader.appendChild(th);
  });

  // Adiciona os headers na tabela
  table.appendChild(trHeader);

  //Pega o dia da semana do primeiro dia do mês
  const weekDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  //Pega o ultimo dia do mês
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  let tr = document.createElement("tr");
  let td = "";
  let empty = "";
  let btn = document.createElement("button");
  let week = 0;

  // Se o dia da semana do primeiro dia do mês for maior que 0(primeiro dia da semana);
  while (week < weekDay) {
    td = document.createElement("td");
    empty = document.createTextNode(" ");
    td.appendChild(empty);
    tr.appendChild(td);
    week++;
  }

  // Vai percorrer do 1º até o ultimo dia do mês
  for (let i = 1; i <= lastDay; ) {
    // Enquanto o dia da semana for < 7, ele vai adicionar colunas na linha da semana
    while (week < 7) {
      td = document.createElement("td");
      let text = document.createTextNode(i);
      btn = document.createElement("button");
      btn.className = "btn-day";
      btn.setAttribute("data-date", i);
      btn.addEventListener("click", function () {
        changeDate(this);
      });
      week++;
      td.className = `date-${i}`;
      td.setAttribute("data-date", i);
      // Controle para ele parar exatamente no ultimo dia
      if (i <= lastDay) {
        i++;
        btn.appendChild(text);
        td.appendChild(btn);
      } else {
        text = document.createTextNode(" ");
        td.appendChild(text);
      }
      tr.appendChild(td);
    }
    // Adiciona a linha na tabela
    table.appendChild(tr);

    // Cria uma nova linha para ser usada
    tr = document.createElement("tr");

    // Reseta o contador de dias da semana
    week = 0;
  }
  // Adiciona a tabela a div que ela deve pertencer
  const content = document.getElementById("table");
  content.appendChild(table);
  changeActive();
  changeHeader(date);
  document.querySelectorAll(".btn-day").forEach((btnToday) => {
    // console.log("hello td");
    if (
      btnToday.dataset.date === new Date().getDate().toString() &&
      document.querySelector("#month-header").dataset.year ===
        new Date().getFullYear().toString() &&
      document.querySelector("#month-header").dataset.month ===
        (new Date().getMonth() + 1).toString()
    ) {
      // console.log("hello");
      btnToday.setAttribute("style", "color: #FF0000!important");
    }
  });

  await loadEmoticonCalendar();

  // document.getElementById("date").textContent = date;
  getCurrentDate(document.getElementById("currentDate"), true);
  getCurrentDate(document.getElementById("date"), false);
}

// Altera a data atráves do formulário
function setDate(form) {
  let newDate = new Date(form.date.value);
  date = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() + 1);
  generateCalendar();
  return false;
}

// Método Muda o mês e o ano do topo do calendário
function changeHeader(dateHeader) {
  const month = document.getElementById("month-header");
  month.setAttribute("data-year", dateHeader.getFullYear());
  month.setAttribute("data-month", dateHeader.getMonth() + 1);
  if (month.childNodes[0]) {
    month.removeChild(month.childNodes[0]);
  }
  const headerMonth = document.createElement("h1");
  const textMonth = document.createTextNode(
    months[dateHeader.getMonth()].substring(0, 3) + " " + dateHeader.getFullYear()
  );
  headerMonth.appendChild(textMonth);
  month.appendChild(headerMonth);
}

// Função para mudar a cor do botão do dia que está ativo
function changeActive() {
  let btnList = document.querySelectorAll("button.active");
  btnList.forEach((btn) => {
    btn.classList.remove("active");
  });
  btnList = document.getElementsByClassName("btn-day");
  for (let i = 0; i < btnList.length; i++) {
    const btn = btnList[i];
    if (btn.textContent === date.getDate().toString()) {
      btn.classList.add("active");
    }
  }
}

// Função que pega a data atual
function resetDate() {
  date = new Date();
  generateCalendar();
}

// Muda a data pelo numero do botão clicado
function changeDate(button) {
  let newDay = parseInt(button.textContent);
  date = new Date(date.getFullYear(), date.getMonth(), newDay);
  generateCalendar();
}

// Funções de avançar e retroceder mês e dia
function nextMonth() {
  date = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  generateCalendar();
}

function prevMonth() {
  date = new Date(date.getFullYear(), date.getMonth() - 1, 1);
  generateCalendar();
}

function prevDay() {
  date = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
  generateCalendar();
}

function nextDay() {
  date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
  generateCalendar();
}

async function loadEmoticonCalendar() {
  const resp = await fetch("/mood/calendar");

  const result = await resp.json();

  const allMoodLogArr = [];
  // const moodDiaryArr = [];
  // const moodVoiceMemoArr = [];
  // const moodEmoticonArr = [];
  for (const moodDiary of result["allMoodLog"]["moodDiaryArr"]) {
    allMoodLogArr.push({
      emotion: moodDiary["emotion"],
      emoji: moodDiary["emoji"],
      id: { diary: moodDiary["id"] },
      year: new Date(moodDiary["created_at"]).getFullYear(),
      month: new Date(moodDiary["created_at"]).getMonth() + 1,
      day: new Date(moodDiary["created_at"]).getDate(),
    });
  }
  for (const moodVoiceMemo of result["allMoodLog"]["moodVoiceMemoArr"]) {
    allMoodLogArr.push({
      emotion: moodVoiceMemo["emotion"],
      emoji: moodVoiceMemo["emoji"],
      id: { voiceMemo: moodVoiceMemo["id"] },
      year: new Date(moodVoiceMemo["created_at"]).getFullYear(),
      month: new Date(moodVoiceMemo["created_at"]).getMonth() + 1,
      day: new Date(moodVoiceMemo["created_at"]).getDate(),
    });
  }
  for (const moodEmoticon of result["allMoodLog"]["moodEmoticonArr"]) {
    allMoodLogArr.push({
      emotion: moodEmoticon["emotion"],
      emoji: moodEmoticon["emoji"],
      id: { emoticon: moodEmoticon["id"] },
      year: new Date(moodEmoticon["created_at"]).getFullYear(),
      month: new Date(moodEmoticon["created_at"]).getMonth() + 1,
      day: new Date(moodEmoticon["created_at"]).getDate(),
    });
  }

  for (const singleLog of allMoodLogArr) {
    document.querySelectorAll("td").forEach((tdWithDate) => {
      if (
        tdWithDate.dataset.date === singleLog.day.toString() &&
        document.querySelector("#month-header").dataset.year === singleLog.year.toString() &&
        document.querySelector("#month-header").dataset.month === singleLog.month.toString()
      ) {
        const imgTag = document.createElement("img");
        imgTag.setAttribute("src", singleLog.emoji);
        imgTag.className = "emoji";
        if (singleLog.id.diary) {
          imgTag.setAttribute("data-diary", singleLog.id.diary);
        }
        if (singleLog.id.voiceMemo) {
          imgTag.setAttribute("data-voiceMemo", singleLog.id.voiceMemo);
        }
        if (singleLog.id.emoticon) {
          imgTag.setAttribute("data-emoticon", singleLog.id.emoticon);
        }
        tdWithDate.appendChild(imgTag);
      }
    });
  }
}
