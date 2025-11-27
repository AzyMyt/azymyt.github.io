const id = "1dIL3JjvLz9QGQPUxDUlIIZmjR2kRAXtgMel7Fyil-j4";
const range = "Classics!A1:O179";
const key = "AIzaSyCBmzuL3Z3NORg7j5Jtfq791Y8Hf7Yq0DU";

const thumbHeight = 30 * 9;
const thumbWidth = 30 * 16;

const url = `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/${encodeURIComponent(range)}?key=${key}`;

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
        div.innerHTML += `<img src="novideo.png" width=${thumbWidth} height=${thumbHeight}>`;
        div.style.setProperty("--bg-url", `url("novideo.png")`);
      }

      div.innerHTML += `
      <div class="details">
        <div class="upperDetails">
          <h1>#${item.Pos}: ${item.Level} by ${item.Publisher}</h1>
          <h1 id="date">${item.Date}</h1>
        </div>

        <div class="stats">
          <div class="table">
            <div class="block">
              <p class="aem">${item.AEM}</p>
              <p class="aemText">AEM</p>
            </div>

            <div class="block">
              <p class="gddl">${item.GDDL}</p>
              <p class="gddlText">GDDL</p>
            </div>

            <div class="block">
              <p class="nlw">${item.NLW}</p>
              <p class="nlwText">NLW</p>
            </div>

            <div class="block">
              <p class="enj">${item.Enj}</p>
              <p class="enjText">ENJ</p>
            </div>
          </div>

          <div class="table">
            <div class="block">
              <p class="attempts">${item.ATT}</p>
              <p class="attemptsText">Attempts</p>
            </div>

            <div class="block">
              <p class="wf">${item.WF}</p>
              <p class="wfText">Worst Fail</p>
            </div>

            <div class="block">
              <p class="peak">${item.Peak}</p>
              <p class="peakText">Peak</p>
            </div>

            <div class="block">
              <p class="peakList">${item.ListPeak}</p>
              <p class="peakListText">Peak List</p>
            </div>
          </div>
        </div>
      </div>
      `;

      document.body.appendChild(div);
    });
  });
