const classicsId = "1dIL3JjvLz9QGQPUxDUlIIZmjR2kRAXtgMel7Fyil-j4";
const platformersId = "1dIL3JjvLz9QGQPUxDUlIIZmjR2kRAXtgMel7Fyil-j4";
const classicsRange = "Classics!A1:O200";
const platformersRange = "Platformers!A1:M153";
const key = "AIzaSyCBmzuL3Z3NORg7j5Jtfq791Y8Hf7Yq0DU";
const classicUrl = `https://sheets.googleapis.com/v4/spreadsheets/${classicsId}/values/${encodeURIComponent(classicsRange)}?key=${key}`;
const platformerUrl = `https://sheets.googleapis.com/v4/spreadsheets/${platformersId}/values/${encodeURIComponent(platformersRange)}?key=${key}`;

const cardsPassed = false;

// I WANT TO ADD LIKE A TIME MACHINE AND uh SORTING BY THINGS later
// also a smaller card view like how gddl does it
// and one like how aredl does it, so i can include all the rest of my completions

//tweaky
const size = 20;
const thumbHeight = size * 9;
const thumbWidth = size * 16;
console.log(`${thumbWidth}x${thumbHeight}`);

let styling = "legacy"; // default
let currentStyle;
function updateStyling(updateValue) {
  if (currentStyle != updateValue) {
    btnLegacy.style.setProperty("background-color", "#000");
    btnModern.style.setProperty("background-color", "#000");
    btnGrid.style.setProperty("background-color", "#000");

    btnLegacy.style.setProperty("color", "#fff");
    btnModern.style.setProperty("color", "#fff");
    btnGrid.style.setProperty("color", "#fff");

    if (updateValue == "legacy") {
      btnLegacy.style.setProperty("background-color", "#fff");
      btnLegacy.style.setProperty("color", "#000");
      styling = "legacy";
    } else if (updateValue == "modern") {
      btnModern.style.setProperty("background-color", "#fff");
      btnModern.style.setProperty("color", "#000");
      styling = "modern";
    } else if (updateValue == "grid") {
      btnGrid.style.setProperty("background-color", "#fff");
      btnGrid.style.setProperty("color", "#000");
      styling = "grid";
    }
    GenerateList();
  }
  currentStyle = updateValue;
  console.log(`Style changed to ${styling}`);
}

let type = "classics"; // default
let currentType;
let url;
function updateType(updateValue) {
  if (currentType != updateValue) {
    btnClassics.style.setProperty("background-color", "#000");
    btnPlatformers.style.setProperty("background-color", "#000");

    btnClassics.style.setProperty("color", "#fff");
    btnPlatformers.style.setProperty("color", "#fff");

    if (updateValue == "classics") {
      btnClassics.style.setProperty("background-color", "#fff");
      btnClassics.style.setProperty("color", "#000");
      type = "classics";
      url = classicUrl;
    } else if (updateValue == "platformers") {
      btnPlatformers.style.setProperty("background-color", "#fff");
      btnPlatformers.style.setProperty("color", "#000");
      type = "platformers";
      url = platformerUrl;
    }
    console.log(`List now displays ${type}`);
    GenerateList();
  }
  currentType = updateValue;
}

btnLegacy = document.getElementById("legacy");
btnModern = document.getElementById("modern");
btnGrid = document.getElementById("grid");
btnClassics = document.getElementById("classics");
btnPlatformers = document.getElementById("platformers");

btnLegacy.addEventListener("click", () => updateStyling("legacy"));
btnModern.addEventListener("click", () => updateStyling("modern"));
btnGrid.addEventListener("click", () => updateStyling("grid"));

btnClassics.addEventListener("click", () => updateType("classics"));
btnPlatformers.addEventListener("click", () => updateType("platformers"));

document.getElementById("list");

updateStyling(styling);
updateType(type);

// garbage responsible for generating the list below, currently only for "legacy" styling
function GenerateList() {
  list.innerHTML = "";
  fetch(url)
    .then((r) => r.json())
    .then((json) => {
      const [headers, ...rows] = json.values;
      const data = rows.map((r) =>
        Object.fromEntries(r.map((v, i) => [headers[i], v])),
      );
      console.log(data);

      // cards
      data.forEach((item) => {
        const div = document.createElement("div");
        if (item.AEM >= 13) {
          div.classList.add("card");
          if (item.Link != "") {
            const completionID = item.Link.match(
              /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/,
            )[1];
            console.log(item.Link, completionID);
            div.style.setProperty(
              "--bg-url",
              `url("https://img.youtube.com/vi/${completionID}/maxresdefault.jpg")`,
            );
            div.innerHTML = `
          <a href="${item.Link}" target="_blank">
          <img src="https://img.youtube.com/vi/${completionID}/maxresdefault.jpg" width=${thumbWidth} height=${thumbHeight}>
          </a>
        `;
          } else {
            div.innerHTML += `<img src="../images/novideo.png" width=${thumbWidth} height=${thumbHeight}>`;
            div.style.setProperty("--bg-url", `url("../images/novideo.png")`);
          }
        } else {
          div.classList.add("record");
        }

        if (styling == "legacy") {
          if (item.AEM >= 13) {
            //hell on earth
            div.innerHTML += `
      <div class="details">
        <div class="upperDetails">
          <h1>#${item.Pos}: ${item.Level} by ${item.Publisher}</h1>
          <h1 id="date">${item.Date}</h1>
        </div>

        <div class="stats">
          <div class="table">
            <div class="brick">
              <p class="aem">${item.AEM}</p>
              <p class="gddl">${item.GDDL}</p>
              <p class="nlw">${item.NLW}</p>
              <p class="enj">${item.Enj}</p>
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
          } else {
            div.innerHTML += `
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
        list.appendChild(div);
      });
    });
}

console.log(styling, type);
