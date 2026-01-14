// I WANT TO ADD LIKE A TIME MACHINE AND uh SORTING BY THINGS later
// also want sliders/config for each entries background blur

const btnModern = document.getElementById("modern");
const btnGrid = document.getElementById("grid");

const btnClassics = document.getElementById("classics");
const btnPlatformers = document.getElementById("platformers");

btnModern.addEventListener("click", () => updateStyling("modern"));
btnGrid.addEventListener("click", () => updateStyling("grid"));

btnClassics.addEventListener("click", () => updateType("classics"));
btnPlatformers.addEventListener("click", () => updateType("platformers"));

const typeButtons = {
  classics: btnClassics,
  platformers: btnPlatformers,
};

const styleButtons = {
  modern: btnModern,
  grid: btnGrid,
};

function updateActiveButton(buttonMap, activeKey) {
  Object.entries(buttonMap).forEach(([key, btn]) => {
    btn.style.backgroundColor = key === activeKey ? "#fff" : "#000";
    btn.style.color = key === activeKey ? "#000" : "#222";
  });
}

function updateStyling(newStyle) {
  if (currentStyle === newStyle) return;
  updateActiveButton(styleButtons, newStyle);
  styling = currentStyle = newStyle;
  GenerateList();
}

function updateType(newType) {
  if (currentType === newType) return;
  updateActiveButton(typeButtons, newType);
  type = currentType = newType;
  GenerateList();
}

let styling = "modern";
let type = "classics";
let currentStyle;
let currentType;

updateActiveButton(styleButtons, styling);
updateActiveButton(typeButtons, type);

const list = document.getElementById("list");
let data;
async function GenerateList() {
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

function renderCard(item) {
  entry = document.createElement("div");
  entry.classList.add("card");
  entry.classList.add(styling);
  entry.classList.add(type);

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

    if (type == "classics" && styling == "modern") {
      entry.innerHTML += `
        <div class="cardContainer" style="background: linear-gradient(
        270deg,
        rgba(0, 0, 0, 0),
        rgba(5, 5, 5, 1)
        ), url('https://img.youtube.com/vi/${completionID}/maxresdefault.jpg');
        background-size: cover;">
          <div class="container">
            <div class="level">
              <p class="textLevel">${item.Level}</p>
              <p class="textPublisher">by ${item.Publisher}<br>${item.Date}</p>
            </div>
          </div>
          <div class="container victors">
            <p class="firstVictor">${item.NLW}<br>A${item.AEM} T${item.GDDL}</p>
            <p class="followingVictors">${item.ATT} Attempts<br>WF: ${item.WF}<br>${item.Enj}/10</p>
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
