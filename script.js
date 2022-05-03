const red = document.querySelector(".red");
const yellow = document.querySelector(".yellow");
const green = document.querySelector(".green");
const blue = document.querySelector(".blue");
const startBtn = document.querySelector("#startBtn");
const resetBtn = document.querySelector("#resetBtn");
const losingSound = document.getElementById("losingSound");
const nextRoundSound = document.getElementById("nextSound");

function getRandomPanel() {
  const panels = [red, yellow, blue, green];
  //get one random panel
  return panels[parseInt(Math.random() * panels.length)];
}

const sequence = [getRandomPanel()];
let sequenceToMatch = [...sequence];

const flash = (panel) => {
  const sound = document.querySelector(
    `audio[data-color="${panel.dataset.color}"]`
  );

  return new Promise((resolve, reject) => {
    //add flashing to panel and sound
    panel.classList.add("active");
    sound.play();
    setTimeout(() => {
      //remove flashing
      panel.classList.remove("active");
      setTimeout(() => {
        resolve();
      }, 250);
    }, 1000);
  });
};

const startFlashing = async () => {
  canClick = false;
  for (let panel of sequence) {
    await flash(panel);
  }
  canClick = true;
};

let canClick = false;

const panelClicked = (panelClicked) => {
  const sound = document.querySelector(
    `audio[data-color="${panelClicked.dataset.color}"]`
  );
  if (!canClick) return;
  if (sequence.length > 1) sound.play();

  const expectedPanel = sequenceToMatch.shift();
  if (expectedPanel === panelClicked) {
    if (sequenceToMatch.length === 0) {
      //start new round
      setTimeout(() => {
        nextRoundSound.currentTime = 0;
        nextRoundSound.play();
      }, 500);
      sequence.push(getRandomPanel());
      sequenceToMatch = [...sequence];
      setTimeout(() => {
        startFlashing();
      }, 3000);
    }
  } else {
    //end game
    losingSound.currentTime = 0;
    losingSound.play();
    setTimeout(() => {
      alert("GAME OVER, please restart the game and try again.");
    }, 500);
  }
};

startBtn.addEventListener("click", startFlashing);
resetBtn.addEventListener("click", () => location.reload());
