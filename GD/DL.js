const btnModern = document.getElementById("modern");
const btnGrid = document.getElementById("grid");

const btnClassics = document.getElementById("classics");
const btnPlatformers = document.getElementById("platformers");

const btnPersonal = document.getElementById("personal");
const btnAredl = document.getElementById("aredl");

const btnDateCurrent = document.getElementById("dateDisabled");
const btnDateBefore = document.getElementById("dateBefore");
const btnDateAfter = document.getElementById("dateAfter");
const txtDateArea = document.getElementById("dateArea");

const btnCompletions = document.getElementById("completions");
const btnProgress = document.getElementById("progress");

btnModern.addEventListener("click", () => {
  btnModern.style.backgroundColor = "#bbb";
  btnModern.style.color = "#000";

  btnGrid.style.backgroundColor = "#222";
  btnGrid.style.color = "#fff";
  
  if (styling == "modern") return;
  styling = "modern"
  GenerateList();
});

btnGrid.addEventListener("click", () => {
  btnGrid.style.backgroundColor = "#bbb";
  btnGrid.style.color = "#000";

  btnModern.style.backgroundColor = "#222";
  btnModern.style.color = "#fff";
  
  if (styling == "grid") return;
  styling = "grid"
  GenerateList();
});

btnModern.style.backgroundColor = "#bbb";
btnModern.style.color = "#000"
btnGrid.style.backgroundColor = "#222";
btnGrid.style.color = "#fff";

btnClassics.addEventListener("click", () => {
  btnClassics.style.backgroundColor = "#bbb";
  btnClassics.style.color = "#000";

  btnPlatformers.style.backgroundColor = "#222";
  btnPlatformers.style.color = "#fff";
  
  if (type == "classics") return;
  type = "classics"
  getLevels();
  GenerateList();
});

btnPlatformers.addEventListener("click", async () => {
  btnPlatformers.style.backgroundColor = "#bbb";
  btnPlatformers.style.color = "#000";

  btnClassics.style.backgroundColor = "#222";
  btnClassics.style.color = "#fff";
  
  if (type == "platformers") return;
  type = "platformers" 
  getLevels();
  GenerateList();
});

btnClassics.style.backgroundColor = "#bbb";
btnClassics.style.color = "#000"
btnPlatformers.style.backgroundColor = "#222";
btnPlatformers.style.color = "#fff";

btnPersonal.addEventListener("click", async () => {
  btnPersonal.style.backgroundColor = "#bbb";
  btnPersonal.style.color = "#000";

  btnAredl.style.backgroundColor = "#222";
  btnAredl.style.color = "#fff";
  
  if (sort == "personal") return;
  sort = "personal"
  GenerateList();
});

btnAredl.addEventListener("click", () => {
  btnAredl.style.backgroundColor = "#bbb";
  btnAredl.style.color = "#000";

  btnPersonal.style.backgroundColor = "#222";
  btnPersonal.style.color = "#fff";
  
  if (sort == "aredl") return;
  sort = "aredl"
  GenerateList();
});

btnPersonal.style.backgroundColor = "#bbb";
btnPersonal.style.color = "#000"
btnAredl.style.backgroundColor = "#222";
btnAredl.style.color = "#fff";

btnDateBefore.addEventListener("click", () => {
  btnDateBefore.style.backgroundColor = "#bbb";
  btnDateBefore.style.color = "#000";

  btnDateAfter.style.backgroundColor = "#222";
  btnDateAfter.style.color = "#fff";
  btnDateCurrent.style.backgroundColor = "#222";
  btnDateCurrent.style.color = "#fff";
  
  if (checkDates == "before") return;
  checkDates = "before";
  GenerateList();
});

btnDateAfter.addEventListener("click", () => {
  btnDateAfter.style.backgroundColor = "#bbb";
  btnDateAfter.style.color = "#000";

  btnDateBefore.style.backgroundColor = "#222";
  btnDateBefore.style.color = "#fff";
  btnDateCurrent.style.backgroundColor = "#222";
  btnDateCurrent.style.color = "#fff";
  
  if (checkDates == "after") return;
  checkDates = "after";
  GenerateList();
});

btnDateCurrent.addEventListener("click", () => {
  btnDateCurrent.style.backgroundColor = "#bbb";
  btnDateCurrent.style.color = "#000";

  btnDateBefore.style.backgroundColor = "#222";
  btnDateBefore.style.color = "#fff";
  btnDateAfter.style.backgroundColor = "#222";
  btnDateAfter.style.color = "#fff";
  
  if (checkDates == "current") return;
  checkDates = "current";
  GenerateList();
});

txtDateArea.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    
    if (dateValue == txtDateArea.value) return;
    dateValue = txtDateArea.value;
    console.log(dateValue);
    GenerateList();
  }
})

btnDateCurrent.style.backgroundColor = "#bbb";
btnDateCurrent.style.color = "#000"
btnDateBefore.style.backgroundColor = "#222";
btnDateBefore.style.color = "#fff";
btnDateAfter.style.backgroundColor = "#222";
btnDateAfter.style.color = "#fff";

btnCompletions.addEventListener("click", () => {
  btnCompletions.style.backgroundColor = "#bbb";
  btnCompletions.style.color = "#000";

  btnProgress.style.backgroundColor = "#222";
  btnProgress.style.color = "#fff";
  
  if (display == "completions") return;
  display = "completions"
  GenerateList();
});

btnProgress.addEventListener("click", () => {
  btnProgress.style.backgroundColor = "#bbb";
  btnProgress.style.color = "#000";

  btnCompletions.style.backgroundColor = "#222";
  btnCompletions.style.color = "#fff";
  
  if (display == "progress") return;
  display = "progress"
  GenerateList();
});

btnCompletions.style.backgroundColor = "#bbb";
btnCompletions.style.color = "#000";

btnProgress.style.backgroundColor = "#222";
btnProgress.style.color = "#fff";

let display = "completions";
let styling = "modern";
let type = "classics";
let sort = "personal";
let checkDates = "current";
let dateValue = 0;
let currentStyle;
let currentType;
let currentSort;
let response;

async function aredlList() {
  try {
    if (type == "classics") {
      response = await fetch("https://api.aredl.net/v2/api/aredl/levels", {
        method: "GET",
        headers: {
          "Accept": "application/json"
        }
      });
    } else if (type == "platformers"){
      response = await fetch("https://api.aredl.net/v2/api/arepl/levels", {
        method: "GET",
        headers: {
          "Accept": "application/json"
        }
      });
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    console.log (data);
    return data;

  } catch (error) {
    console.error("Error fetching levels:", error);
    return [];
  }
}

let cachedLevels = null;
async function getLevels() {
  cachedLevels = await aredlList();
  return cachedLevels;
}

async function getLevelIdByName(name) {
  const data = cachedLevels;

  const level = data.find(item => item.name === name);
  return level ? level.level_id : null;
}

const list = document.getElementById("list");
let data;
async function GenerateList() {
  if (!cachedLevels) await getLevels();
  
  console.log(`Styling: ${styling}\nType: ${type}\nSort: ${sort}\nDates: ${checkDates}\nDisplay: ${display}`)

  let range =
    type === "classics" ? "Classics!A1:O200" : "Platformers!A1:M153";

  if (display == "progress") {
    range = "ProjectsNew!A1:D200";
  }
  list.innerHTML = "";

  try {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/1dIL3JjvLz9QGQPUxDUlIIZmjR2kRAXtgMel7Fyil-j4/values/${encodeURIComponent(range)}?key=AIzaSyCBmzuL3Z3NORg7j5Jtfq791Y8Hf7Yq0DU`,
    );
    const json = await response.json();

    const [headers, ...rows] = json.values;
    data = rows.map((row) =>
      Object.fromEntries(row.map((v, i) => [headers[i], v])),
    );

    data.forEach(renderCard);

    if (styling == "grid") {
      list.classList.add("gridstyle");
    } else {
      if (list.classList.contains("gridstyle")) {
        list.classList.remove("gridstyle");
      }
    }
  } catch (err) {
    console.error("Failed to fetch data:", err);
  }
}

function getLevelIdByName(name) {
  const level = cachedLevels.find(item => item.name === name);
  if (name == "geode") {
    return 94516000
  } else{
    return level ? level.level_id : null;
  }
}

function getLevelPositionByName(name) {
  const level = cachedLevels.find(item => item.name === name);
  return level ? level.position : null;
}

function renderCard(item) {
  entry = document.createElement("div");
  entry.classList.add("card");
  entry.classList.add(styling);
  entry.classList.add(type);
  entry.classList.add(display);

  const level_id = getLevelIdByName(item.Level);
  let level_position = getLevelPositionByName(item.Level);
  
  //console.log("level:", item.Level, level_id);

  if (item.Level) {
    
    if (checkDates == "Before" && item.Date < dateValue) {
      console.log("Item past specified date:", item.Level);
      return;
    } else if (checkDates == "After" && item.Date > dateValue) {
      console.log("Item before specified date:", item.Level);
      return;
    }

    if (styling == "modern" && display == "completions") {
    
      if (!level_position) {
        level_position = "";
      } else {level_position = `#${level_position}`};
      
      if (!item.ListPeak) {
        ListPeak = "";
      } else {item.ListPeak = `(#${item.ListPeak})`};
      
      if (item.Peak == 1) {
        setPeakColour = "rgba(157, 157, 43, 1)";
      } else {setPeakColour = "#888"}

      if (!item.Peak) {
        item.peak = "";
      } else {item.Peak = `(#${item.Peak})`};
      
      if (!item.ATT) {
        item.ATT = "";
      } else {item.ATT = `${item.ATT} Att`}
      
      
      entry.innerHTML += `
      <div class="levelPositions">
        <p class="levelPos" title="Personal Placement">#${item.Pos}</p>
        <p class="levelPeak" title="Peak Personal Placement" style="
        color: ${setPeakColour}
        ">${item.Peak}</p>
      </div>
      `;
    } else if (display == "progress") {
      if (!item.Progress) return;
      if (item.Hide) return;
      entry.innerHTML += `<p></p>`
    }

    if (item.CompletionLink) {
      const completionID = item.CompletionLink.match(
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/,
      )[1];

      //console.log(item.Level, item.CompletionLink, completionID);
      entry.style.setProperty(
        "--bg-url",
        `url("https://img.youtube.com/vi/${completionID}/maxresdefault.jpg")`,
      );
      entry.innerHTML += `
        <a href="${item.CompletionLink}" target="_blank" width="320" height="180">
        <img title="${item.Level} completion" src="https://img.youtube.com/vi/${completionID}/maxresdefault.jpg" width="320" height="180">
        </a>
      `;
    } else {
      entry.innerHTML += `
      <div title="PLACEHOLDER!!! ${item.Level} showcase" width="320" height="180"></div>`
    }

    if (type == "classics" && styling == "modern" && display == "completions") {
      entry.innerHTML += `
        <div class="cardContainer" style="background: linear-gradient(
        270deg,
        rgba(0, 0, 0, 0),
        rgba(5, 5, 5, 1)
       ), url('https://levelthumbs.prevter.me/thumbnail/${level_id}');
       background-size: cover; background-position: center center;">
        <div class="levelDataUpper">
          <div class="levelDataLeft">
            <div class="levelName">
             <p class="textLevel" title="Level name">${item.Level}</p>
             <p class="textPosition" title="Current AREDL placement, (AREDL position at time of completion)">${level_position} ${item.ListPeak}</p>
            </div>
           <p class="textPublisher" title="Publisher of the level">by ${item.Publisher}</p>

            <p class="textDate smallInfo" title="Date completed">${item.Date}</p>
            <p class="textAttempts smallInfo" title="Attempts taken">${item.ATT}</p>
          </div>

          <div class="levelDataRight">
            <p class="textNLW" title="Non-Listworthy Tier (Includes List-Worthy)" style="
            background: var(--colour-tier-${item.NLW.replace(/\s+/g, '-')}"
            >${item.NLW}</p>

            <div class="levelDataBoxes">
              <p class="boxAEM box" title="Azy Execution Metric v2 Tier (Personal Tiering System)" style=
              "background: var(--colour-aem-${item.AEM})"
              >A${item.AEM}</p>

              <p class="boxGDDL box" title="Geometry Dash Demon Ladder Tier" style=
              "background: var(--colour-tier-${item.GDDL})"
              >T${item.GDDL}</p>

              <p class="boxENJ box" title="Enjoyment / Experience rating (out of 10)" style=
              "background: var(--colour-enj-${item.Enj})"
              >E${item.Enj}</p>

              <p class="boxWF box" title="Furthest Death (Worst Fail)" style=
              "background: var(--colour-wf-${item.WF.slice(0, -1)})"
              >${item.WF}</p>
            </div>
          </div>
        </div>
      </div>
      `;

    } else if (type == "platformers" && styling == "modern" && display == "completions") {
      entry.innerHTML += `
        <div class="cardContainer" style="background: linear-gradient(
        270deg,
        rgba(0, 0, 0, 0),
        rgba(5, 5, 5, 1)
       ), url('https://levelthumbs.prevter.me/thumbnail/${level_id}');
       background-size: cover; background-position: center center;">
        <div class="levelDataUpper">
          <div class="levelDataLeft">
            <div class="levelName">
             <p class="textLevel" title="Level name">${item.Level}</p>
             <p class="textPosition" title="Current AREDL placement, (AREDL position at time of completion)">${level_position} ${item.ListPeak}</p>
            </div>
           <p class="textPublisher" title="Publisher of the level">by ${item.Publisher}</p>

            <p class="textDate smallInfo" title="Date completed">${item.Date}</p>
            <p class="textAttempts smallInfo" title="Time spent on First Completion">${item.Time} Att</p>
          </div>

          <div class="levelDataRight">
            <p class="textNLW" title="Non-Listworthy Tier (Includes List-Worthy)" style="
            background: var(--colour-tier-${item.NLW.replace(/\s+/g, '-')}"
            >${item.NLW}</p>

            <div class="levelDataBoxes">
              <p class="boxAEM box" title="Azy Execution Metric v2 Tier (Personal Tiering System)" style=
              "background: var(--colour-aem-${item.AEM})"
              >A${item.AEM}</p>

              <p class="boxGDDL box" title="Geometry Dash Demon Ladder Tier" style=
              "background: var(--colour-tier-${item.GDDL})"
              >T${item.GDDL}</p>

              <p class="boxENJ box" title="Enjoyment / Experience rating (out of 10)" style=
              "background: var(--colour-enj-${item.Enj})"
              >E${item.Enj}</p>
            </div>
          </div>
        </div>
      </div>
      `;
      
    } else if (styling == "modern" && display == "progress") {
      entry.innerHTML += `
        <div class="cardContainer" style="background: linear-gradient(
        270deg,
        rgba(0, 0, 0, 0),
        rgba(5, 5, 5, 1)
       ), url('https://levelthumbs.prevter.me/thumbnail/${level_id}');
       background-size: cover; background-position: center center;">
        <div class="levelDataUpper" style="transform: translateY(-40px);">
          <div class="levelDataLeft">
            <div class="levelName">
             <p class="textLevel" title="Level name">${item.Level}</p>
             <p class="textPosition" title="Current AREDL position">#${level_position}</p>
            </div>
            <p class="textPublisher" title="Publisher of the level">by ${item.Publisher}</p>
          </div>
        </div>
        <div class="levelDataLower lowerProgress">
            <p class="textProgress" title="Public progress I have on the level">${item.Progress}</p>
        </div>
      </div>
      `;
    }
  }

  list.appendChild(entry);
}

GenerateList();