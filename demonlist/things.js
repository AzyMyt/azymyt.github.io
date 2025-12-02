const id = "1dIL3JjvLz9QGQPUxDUlIIZmjR2kRAXtgMel7Fyil-j4";
const range = "Classics!A1:O179";
const key = "AIzaSyCBmzuL3Z3NORg7j5Jtfq791Y8Hf7Yq0DU";
const url = `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/${encodeURIComponent(range)}?key=${key}`;

// I WANT TO ADD LIKE A TIME MACHINE AND uh SORTING BY THINGS later
// also a smaller card view like how gddl does it
// and one like how aredl does it, so i can include all the rest of my completions

//tweaky
const size = 20;
const thumbHeight = size * 9;
const thumbWidth = size * 16;
console.log(`${thumbWidth}x${thumbHeight}`);

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
      } else if (item.NLW == "") {
        return;
      } else {
        div.innerHTML += `<img src="../images/novideo.png" width=${thumbWidth} height=${thumbHeight}>`;
        div.style.setProperty("--bg-url", `url("../images/novideo.png")`);
      }

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
              <p class="peakList">${item.ListPeak}</p>
              <p class="peak">${item.Peak}</p>
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

      document.body.appendChild(div);
    });
  });
