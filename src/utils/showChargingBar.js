const showChargingBar = () => {
  document.getElementById("button-start-game").hidden = true;
  const totalBar = document.createElement("div");
  const progressBar = document.createElement("div");
  totalBar.setAttribute("id", "total-bar-generic");
  progressBar.setAttribute("id", "current-progress-bar-generic");
  document.getElementById("main-start-container").appendChild(totalBar);
  document.getElementById("total-bar-generic").appendChild(progressBar);
  const currentPerc = 0;
  addPerc(currentPerc);
};

const addPerc = (currentPerc) => {
  setTimeout(() => {
    currentPerc += 1;
    document.getElementById("current-progress-bar-generic").style.width =
      currentPerc + "%";
    if (currentPerc < 100) {
      addPerc(currentPerc);
    }
  }, 33);
};

export default showChargingBar;
