const holesArray = [
  {
    hole: "0",
  },
  {
    hole: "1",
  },
  {
    hole: "2",
  },
  {
    hole: "3",
  },
  {
    hole: "4",
  },
  {
    hole: "5",
  },
  {
    hole: "6",
  },
  {
    hole: "7",
  },
  {
    hole: "8",
  },
];

function goHome() {
  window.location.href = "../index.html";
}
const music = new Audio("sounds/music.mp3");
music.volume = 0.2;
music.addEventListener(
  "ended",
  function () {
    this.currentTime = 0;
    this.play();
  },
  false
);

function volumeUp() {
  if (music.volume <= 0.99) {
    music.volume += 0.1;
  }
}
function volumeDown() {
  if (music.volume >= 0.1) {
    music.volume -= 0.1;
  }
}
function stopMusic() {
  music.pause();
}
function playMusic() {
  music.play();
}

const gridDisplay = document.querySelector("#grid");
let score = 0;

function createBoard() {
  for (let i = 0; i < holesArray.length; i++) {
    const hole = document.createElement("img");
    hole.setAttribute("src", "images/hidden.png");
    hole.setAttribute("id", i);
    hole.addEventListener("mousedown", hit);
    hole.className = "hole";
    gridDisplay.append(hole);
  }
  setTimeout(popUp, 1200);
}

document.getElementById("startImg").addEventListener("click", () => {
  music.play();
});
document.getElementById("startImg").addEventListener("click", createBoard);
document
  .getElementById("startImg")
  .addEventListener("click", document.getElementById("startImg").remove);

let count = 0;
function popUp() {
  if (count < 10) {
    const randomHole = Math.floor(Math.random() * 9);
    const holePicked = document.getElementById(randomHole);
    holePicked.setAttribute("src", "images/mole.png");
    holePicked.setAttribute("hittable", "1");

    function hide() {
      holePicked.setAttribute("hittable", "0");
      if (holePicked.getAttribute("src") == "images/mole.png") {
        holePicked.setAttribute("src", "images/hidden.png");
      }

      setTimeout(() => {
        holePicked.setAttribute("src", "images/hidden.png");
      }, 800);
    }
    count += 1;
    setTimeout(hide, 500);
    setTimeout(popUp, 1400);
  } else {
    for (let i = 0; i < holesArray.length; i++) {
      let el = document.getElementById(i);
      el.remove();
    }
    const playAgain = document.createElement("img");
    playAgain.setAttribute("src", "images/playagain.png");
    playAgain.setAttribute("id", "playAgainImg");
    playAgain.setAttribute("width", "400px");
    playAgain.setAttribute("height", "230px");
    playAgain.className = "hoverEffect";
    document.querySelector("#playAgain").append(playAgain);
    const playagainImg = document.getElementById("playAgainImg");
    /* playagainImg.addEventListener("click", () => restart("playAgainImg")); */

    count = 0;

    let ul = document.getElementById("topScores");
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(score));
    ul.appendChild(li);
    score = 0;
    playagainImg.addEventListener("click", () => createBoard());
    playagainImg.addEventListener("click", () => playagainImg.remove());
  }
}

function hit() {
  if (this.getAttribute("hittable") == "1") {
    this.setAttribute("src", "images/ouch.png");
    const ouch = new Audio("sounds/ouch2.mp3");
    ouch.volume = 0.4;
    ouch.play();
    console.log("OUCH");
    score += 1;
    document.getElementById("result").innerHTML = score;
  }
}
