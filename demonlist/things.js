const classicsId = "1dIL3JjvLz9QGQPUxDUlIIZmjR2kRAXtgMel7Fyil-j4";
const platformersId = "1dIL3JjvLz9QGQPUxDUlIIZmjR2kRAXtgMel7Fyil-j4";
const classicsRange = "Classics!A1:O200";
const platformersRange = "Platformers!A1:M153";
const key = "AIzaSyCBmzuL3Z3NORg7j5Jtfq791Y8Hf7Yq0DU";
const classicUrl = `https://sheets.googleapis.com/v4/spreadsheets/${classicsId}/values/${encodeURIComponent(classicsRange)}?key=${key}`;
const platformerUrl = `https://sheets.googleapis.com/v4/spreadsheets/${platformersId}/values/${encodeURIComponent(platformersRange)}?key=${key}`;

// I WANT TO ADD LIKE A TIME MACHINE AND uh SORTING BY THINGS later
// also want sliders/config for each entries background blur

//tweaky
const size = 20;
const thumbHeight = size * 9;
const thumbWidth = size * 16;
console.log(`${thumbWidth}x${thumbHeight}`);

//brick programming 101
let url = classicUrl;
let currentStyle;
let currentType;

//defaults
let styling = "modern";
let type = "classics";

const btnLegacy = document.getElementById("legacy");
const btnModern = document.getElementById("modern");
const btnGrid = document.getElementById("grid");

btnLegacy.addEventListener("click", () => updateStyling("legacy"));
btnModern.addEventListener("click", () => updateStyling("modern"));
btnGrid.addEventListener("click", () => updateStyling("grid"));

const styleButtons = {
  legacy: btnLegacy,
  modern: btnModern,
  grid: btnGrid,
};

const btnClassics = document.getElementById("classics");
const btnPlatformers = document.getElementById("platformers");

btnClassics.addEventListener("click", () => updateType("classics"));
btnPlatformers.addEventListener("click", () => updateType("platformers"));

const typeButtons = {
  classics: btnClassics,
  platformers: btnPlatformers,
};

list = document.getElementById("list");

function updateActiveButton(buttonMap, activeKey) {
  Object.entries(buttonMap).forEach(([key, btn]) => {
    btn.style.backgroundColor = key === activeKey ? "#fff" : "#000";
    btn.style.color = key === activeKey ? "#000" : "#fff";
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

// defaults
updateActiveButton(styleButtons, styling);
updateActiveButton(typeButtons, type);

async function GenerateList() {
  console.log("Fetching URL:", url);
  list.innerHTML = "";

  try {
    const response = await fetch(url);
    const json = await response.json();

    const [headers, ...rows] = json.values;
    const data = rows.map((row) =>
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

//one higher than the highest
const ENJvalues = Array.from({ length: 13 }, (_, i) => i - 1);
const AEMvalues = Array.from({ length: 37 }, (_, i) => i);
const GDDLvalues = Array.from({ length: 40 }, (_, i) => i);

function valueToColour(value, min, max) {
  const t = (value - min) / (max - min);
  const h = 240 - t * 240;
  return `hsl(${h}, 80%, 50%)`;
}

//hardcode nlw because its better than assigning 400 static variables
console.log(ENJvalues, AEMvalues, GDDLvalues);

function renderCard(item) {
  const entry = document.createElement("div");
  entry.classList.add("card");
  entry.classList.add(styling);
  entry.classList.add(type);

  if (item.NLW?.trim() && item.Link?.trim()) {
    entry.classList.add("card");
    const completionID = item.Link.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/,
    )[1];

    console.log(item.Link, completionID);
    entry.style.setProperty(
      "--bg-url",
      `url("https://img.youtube.com/vi/${completionID}/maxresdefault.jpg")`,
    );

    if (styling !== "modern") {
      entry.innerHTML = `
      <a href="${item.Link}" target="_blank">
      <img src="https://img.youtube.com/vi/${completionID}/maxresdefault.jpg" width=${thumbWidth} height=${thumbHeight}>
      </a>
    `;
    }

    if (styling == "legacy") {
      //I really do not know how i managed to make it htis bad
      entry.innerHTML += `
        <div class="details">
          <div class="upperDetails">
            <h1>#${item.Pos}: ${item.Level} by ${item.Publisher}</h1>
            <h1 id="date">${item.Date}</h1>
          </div>

          <div class="stats">
            <div class="table">
              <div class="brick">
                <p class="aem">A${item.AEM}</p>
                <p class="gddl">T${item.GDDL}</p>
                <p class="nlw">${item.NLW}</p>
                <p class="enj">${item.Enj}/10</p>
              </div>
              <div class="brick">
                <p class="aemText">AEM</p>
                <p class="gddlText">GDDL</p>
                <p class="nlwText">NLW</p>
                <p class="enjText">ENJ</p>
              </div>
            </div>
            <div class="table">
              <div class="brick">
                <p class="attempts">${item.ATT}</p>
                <p class="wf">${item.WF}</p>
                <p class="peak">${item.Peak}</p>
                <p class="peakList">${item.ListPeak}</p>
              </div>
              <div class="brick">
                <p class="attemptsText">Attempts</p>
                <p class="wfText">Worst Fail</p>
                <p class="peakText">Peak</p>
                <p class="peakListText">Peak List</p>
              </div>
            </div>
          </div>
        </div>
        `;
    } else if (styling == "modern") {
      entry.innerHTML += `
        <div class="detailsModern">
          <p class="lvlPlace">#${item.Pos}:</p>
          <div class="lvlWrapper">
            <p class="lvlTitle">${item.Level}</p>
            <p class="lvlPublisher">${item.Publisher}</p>
            <p class="dateModern">${item.Date}</p>
          </div>

          <div class="difficulties">
            <div class="numberWrapper">
              <p class="aemModern">A${item.AEM}</p>
              <p class="gddlModern">T${item.GDDL}</p>
            </div>
            <p class="nlwModern">${item.NLW}</p>
          </div>
          <p class="enjModern">${item.Enj}/10</p>

          <div class="effort">
            <p class="wfModern">${item.WF} wf</p>
            <p class="attemptsModern">${item.ATT}@</p>
          </div>

          <div class="peaks">
            <p class="peakModern">${item.Peak}</p>
            <p class="listPeakModern">${item.ListPeak}</p>
          </div>
        </div>
        `;
    }

    list.appendChild(entry);
  } else if (item.NLW && !item.Link) {
    entry.classList.add("card");
    entry.innerHTML += `<img src="../images/novideo.png" width=${thumbWidth} height=${thumbHeight}>`;
    entry.style.setProperty("--bg-url", `url("../images/novideo.png")`);
  } else {
    //no nlw / lesser completions (this just does not work whatsoever just yet)
    entry.classList.add("record");
    if (styling == "legacy") {
      entry.innerHTML += `
      <div class="details">
        <div class="stats">
          <div class="title">
            <p>#${item.Pos}: ${item.Level} by ${item.Publisher}</p>
          </div>
            <p class="aem">${item.AEM}</p>
            <p class="gddl">${item.GDDL}</p>
            <p class="enj">${item.Enj}</p>

            <p class="attempts">${item.ATT}</p>
            <p class="wf">${item.WF}</p>
            <p class="peak">${item.Peak}</p>

            <p id="date">${item.Date}</p>
          </div>
        </div>
      </div>
    `;
    }
  }
}
GenerateList();
console.log(styling, type);
