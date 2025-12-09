let refreshInterval;
let refreshReleaseInterval;
let averageTimeStart;
let averageTimeRelease;
let elapsedCount;
let sum;
let releasedTime = [];
let elapsedTime = [];

function updateGeneral() {
  const labelFullAverage = document.getElementById("labelFullAverage");
  const labelDownTiming = document.getElementById("labelDownTiming");
  const labelUpTiming = document.getElementById("labelUpTiming");
  const labelAverageErrorDown = document.getElementById(
    "labelAverageErrorDown",
  );

  labelFullAverage.textContent = `${Math.round(averageTimeStart - averageTimeRelease)}ms`;
  labelDownTiming.textContent = `heelp`;
  labelUpTiming.textContent = `help2`;
}

document.addEventListener("keydown", function (event) {
  if (refreshInterval) {
    return;
  }

  const startTime = Date.now();
  refreshInterval = setInterval(function () {
    const labelStart = document.getElementById("labelStart");
    const labelElapsed = document.getElementById("labelElapsed");
    const labelAverageStart = document.getElementById("labelAverageStart");
    updateGeneral();

    elapsedTime.push(Date.now() - startTime);
    const sum = elapsedTime.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
    averageTimeStart =
      elapsedTime.reduce((sum, currentValue) => sum + currentValue, 0) /
      elapsedTime.length;

    labelStart.textContent = startTime;
    labelElapsed.textContent = `${elapsedTime.length - 1}ms`;
    labelAverageStart.textContent = `${Math.round(averageTimeStart)}ms`;
  });

  if (refreshReleaseInterval) {
    console.log("Down");
    clearInterval(refreshReleaseInterval);
    refreshReleaseInterval = null;
  }
});

document.addEventListener("keyup", function (event) {
  if (refreshReleaseInterval) {
    return;
  }

  const startTime = Date.now();
  refreshReleaseInterval = setInterval(function () {
    const labelStart = document.getElementById("labelStart");
    const labelReleased = document.getElementById("labelReleased");
    updateGeneral();

    releasedTime.push(Date.now() - startTime);
    const sum = releasedTime.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
    averageTimeRelease =
      releasedTime.reduce((sum, currentValue) => sum + currentValue, 0) /
      releasedTime.length;

    labelStart.textContent = startTime;
    labelReleased.textContent = `${releasedTime.length - 1}ms`;
    labelAverageRelease.textContent = `${Math.round(averageTimeRelease)}ms`;
  });

  if (refreshReleaseInterval) {
    console.log("cleared");
    clearInterval(refreshInterval);
    refreshInterval = null;
  }
});
