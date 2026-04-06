// I WANT TO ADD LIKE A TIME MACHINE AND uh SORTING BY THINGS later

const btnModern = document.getElementById("modern");
const btnGrid = document.getElementById("grid");

const btnClassics = document.getElementById("classics");
const btnPlatformers = document.getElementById("platformers");

const btnPersonal = document.getElementById("personal");
const btnAredl = document.getElementById("aredl");

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
  GenerateList();
});

btnPlatformers.addEventListener("click", () => {
  btnPlatformers.style.backgroundColor = "#bbb";
  btnPlatformers.style.color = "#000";

  btnClassics.style.backgroundColor = "#222";
  btnClassics.style.color = "#fff";
  
  if (type == "classics") return;
  type = "platformers"
  GenerateList();
});

btnClassics.style.backgroundColor = "#bbb";
btnClassics.style.color = "#000"
btnPlatformers.style.backgroundColor = "#222";
btnPlatformers.style.color = "#fff";

btnPersonal.addEventListener("click", () => {
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

let styling = "modern";
let type = "classics";
let sort = "personal";
let currentStyle;
let currentType;
let currentSort;

async function aredlList() {
  try {
    const response = await fetch("https://api.aredl.net/v2/api/aredl/levels", {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    });

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
  if (!cachedLevels) {
    cachedLevels = await aredlList();
  }
  return cachedLevels;
}

async function getLevelIdByName(name) {
  const data = await getLevels();

  const level = data.find(item => item.name === name);
  return level ? level.level_id : null;
}

const list = document.getElementById("list");
let data;
async function GenerateList() {
  await getLevels();
  const range =
    type === "classics" ? "Classics!A1:O200" : "Platformers!A1:M153";
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

    console.log(data);
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

function renderCard(item) {
  entry = document.createElement("div");
  entry.classList.add("card");
  entry.classList.add(styling);
  entry.classList.add(type);

  const level_id = getLevelIdByName(item.Level);
  
  console.log("level:", item.Level, level_id);

  if (item.Level) {
    if (styling == "modern") {
      entry.innerHTML += `<p class="levelPos">#${item.Pos}</p>`;
    }
    const completionID = item.CompletionLink.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/,
    )[1];

    console.log(item.Record, item.CompletionLink, completionID);
    entry.style.setProperty(
      "--bg-url",
      `url("https://img.youtube.com/vi/${completionID}/maxresdefault.jpg")`,
    );
    entry.innerHTML += `
      <a href="${item.CompletionLink}" target="_blank" width="320" height="180">
      <img src="https://img.youtube.com/vi/${completionID}/maxresdefault.jpg" width="320" height="180">
      </a>
    `;

    if (!item.AREDL) {
      item.AREDL = "?";
    }

    if (type == "classics" && styling == "modern") {
      entry.innerHTML += `
        <div class="cardContainer" style="background: linear-gradient(
        270deg,
        rgba(0, 0, 0, 0),
        rgba(5, 5, 5, 1)
       ), url('https://levelthumbs.prevter.me/thumbnail/${level_id}');
       background-size: cover; background-position: center center;">
        <div class="levelDataUpper">
          <div class="levelDataLeft">
            <p class="textLevel">${item.Level}</p>
            <p class="textPublisher">by ${item.Publisher}</p>

            <p class="textDate smallInfo">${item.Date}</p>
            <p class="textAttempts smallInfo">${item.ATT} Att</p>
          </div>

          <div class="levelDataRight">
            <p class="textNLW" style="
            background: var(--colour-tier-${item.NLW.replace(/\s+/g, '-')}"
            >${item.NLW}</p>

            <div class="levelDataBoxes">
              <p class="boxAEM box" style=
              "background: var(--colour-aem-${item.AEM})"
              >A${item.AEM}</p>

              <p class="boxGDDL box" style=
              "background: var(--colour-tier-${item.GDDL})"
              >T${item.GDDL}</p>

              <p class="boxENJ box" style=
              "background: var(--colour-enj-${item.Enj})"
              >E${item.Enj}</p>

              <p class="boxWF box" style=
              "background: var(--colour-wf-${item.WF.slice(0, -1)})"
              >${item.WF}</p>
            </div>
          </div>
        </div>
        <div class="levelDataLower">
          <p class="textDate smallInfo" hidden>${item.Date}</p>
          <p class="textAttempts smallInfo" hidden>${item.ATT} Att</p>
          <p class="textAredlPos smallInfo" hidden>${item.ListPeak} Peak</p>
          <p class="textPeak smallInfo" hidden>P${item.Peak}</p>
          <p class="textAredl smallInfo" hidden>#${item.AREDL}</p>
        </div>
      </div>
      `;

    } else if (type == "platformers" && styling == "modern") {
      //platformers
      entry.innerHTML += `
        <div class="cardContainer" style="background: linear-gradient(
        270deg,
        rgba(0, 0, 0, 0),
        rgba(5, 5, 5, 1)
        ), url('https://img.youtube.com/vi/${completionID}/maxresdefault.jpg');
        background-size: cover;">
          <div class="container">
            <div class="level">
              <p class="textLevel">${item.Record}</p>
              <p class="textPublisher">by ${item.Publisher}</p>
            </div>
          </div>
          <div class="container victors">
            <p class="firstVictor">${item.FirstVictor}</p>
            <p class="followingVictors">${item.FollowingVictors}</p>
          </div>
        </div>
        `;
    }
  }

  list.appendChild(entry);
}

GenerateList();
console.log(styling, type);
