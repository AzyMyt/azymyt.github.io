const id = "1dIL3JjvLz9QGQPUxDUlIIZmjR2kRAXtgMel7Fyil-j4";
const range = "Classics!A1:O179";
const key = "AIzaSyCBmzuL3Z3NORg7j5Jtfq791Y8Hf7Yq0DU";

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
        div.innerHTML = `<a href="${item.Link}" target="_blank">
        <img src="https://img.youtube.com/vi/${completionID}/maxresdefault.jpg" width=${25 * 16} height=${25 * 9}>
        </a>
        `;
      } else if (item.NLW == "Non-Ex") {
        return;
      } else
        div.innerHTML += `<p width=${25 * 16} height=${25 * 9}>No video</p>`;

      // details
      details = document.createElement("div");
      details.classList.add("details");

      upperDetails = document.createElement("div");
      upperDetails.classList.add("upperDetails");
      upperDetails.innerHTML += `
        <h1>#${item.Pos}: ${item.Level} by ${item.Publisher}</h1>
        <h1 id="date">${item.Date}</h1>
        `;

      // stats
      stats = document.createElement("div");
      stats.classList.add("stats");
      stats.innerHTML += `
      <p class="aem">${item.AEM}</p>
      <p class="aemText">AEM</p>
      <p class="nlw">${item.NLW}</p>
      <p class="nlwText">NLW</p>

      <p class="wfText">Worst Fail</p>
      <p class="attemptsText">Attempts</p>
      <p class="peakText">Peak</p>
      <p class="peakListText">Peak List</p>

      <p class="gddl">${item.GDDL}</p>
      <p class="gddlText">GDDL</p>
      <p class="enj">${item.Enj}</p>
      <p class="enjText">ENJ</p>

      <p class="wf">${item.WF}</p>
      <p class="attempts">${item.ATT}</p>
      <p class="peak">${item.Peak}</p>
      <p class="peakList">${item.ListPeak}</p>
      `;

      details.appendChild(upperDetails);
      details.appendChild(stats);
      div.appendChild(details);
      document.body.appendChild(div);
    });
  });
