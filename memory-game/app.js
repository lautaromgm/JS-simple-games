const cardArray = [
  {
    name: "blood",
    img: "images/blood.png",
  },
  {
    name: "tiny",
    img: "images/tiny.png",
  },
  {
    name: "wk",
    img: "images/wk.png",
  },
  {
    name: "huskar",
    img: "images/huskar.png",
  },
  {
    name: "jugger",
    img: "images/jugger.png",
  },
  {
    name: "bristle",
    img: "images/bristle.png",
  },
  {
    name: "blood",
    img: "images/blood.png",
  },
  {
    name: "tiny",
    img: "images/tiny.png",
  },
  {
    name: "wk",
    img: "images/wk.png",
  },
  {
    name: "huskar",
    img: "images/huskar.png",
  },
  {
    name: "jugger",
    img: "images/jugger.png",
  },
  {
    name: "bristle",
    img: "images/bristle.png",
  },
];

function goHome() {
  window.location.href = "../index.html";
}

cardArray.sort(() => 0.5 - Math.random());

const gridDisplay = document.querySelector("#grid");
let cardsChosen = [];
let cardsChosenIds = [];
let cardsWon = [];
let score = 0;
const matchAudio = new Audio("sounds/match.wav");
const music = new Audio("sounds/music.wav");
music.volume = 0.2;
music.addEventListener(
  "ended",
  function () {
    this.currentTime = 0;
    this.play();
  },
  false
);

document.getElementById("startImg").addEventListener("click", () => {
  music.play();
});
document.getElementById("startImg").addEventListener("click", createBoard);
document
  .getElementById("startImg")
  .addEventListener("click", document.getElementById("startImg").remove);

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

function createBoard() {
  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement("img");
    card.setAttribute("src", "images/blank.png");
    card.setAttribute("data-id", i);
    card.setAttribute("id", `card${i}`);
    card.addEventListener("mousedown", flipCard);
    card.className = "card";
    gridDisplay.append(card);
  }
}

function checkMatch() {
  const cards = document.querySelectorAll("#grid img");
  cards[cardsChosenIds[0]].addEventListener("mousedown", flipCard);
  console.log("check for match!");

  if (cardsChosen[0] == cardsChosen[1]) {
    cards[cardsChosenIds[0]].setAttribute("src", "images/black.png");
    cards[cardsChosenIds[1]].setAttribute("src", "images/black.png");
    cards[cardsChosenIds[0]].removeEventListener("click", flipCard);
    cards[cardsChosenIds[1]].removeEventListener("click", flipCard);
    cardsWon.push(cardsChosen);
    score += 5;
    document.getElementById("alert").innerHTML = "MATCH!";
    matchAudio.play();
  }
  if (cardsChosen[0] != cardsChosen[1]) {
    cards[cardsChosenIds[0]].setAttribute("src", "images/blank.png");
    cards[cardsChosenIds[1]].setAttribute("src", "images/blank.png");
    score -= 1;
    document.getElementById("alert").innerHTML = "-";
  }
  cardsChosen = [];
  cardsChosenIds = [];
  document.getElementById("result").innerHTML = score;
  if (cardsWon.length == 6) {
    document.getElementById("alert").innerHTML = `FINAL SCORE: ${score}`;

    const playAgain = document.createElement("img");
    playAgain.setAttribute("src", "images/playagain.png");
    playAgain.setAttribute("id", "playAgainImg");
    playAgain.setAttribute("width", "400px");
    playAgain.setAttribute("height", "230px");
    playAgain.className = "hoverEffect";

    for (let i = 0; i < cardArray.length; i++) {
      let el = document.getElementById(`card${i}`);
      el.remove();
    }

    document.querySelector("#playAgain").append(playAgain);

    let ul = document.getElementById("topScores");
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(score));
    ul.appendChild(li);

    reiniciarCartas();
    const playagainImg = document.getElementById("playAgainImg");
    playagainImg.addEventListener("click", () => createBoard());
    playagainImg.addEventListener("click", () => playagainImg.remove());
  }
}
function reiniciarCartas() {
  cardsWon = [];
  cardArray.sort(() => 0.5 - Math.random());
  score = 0;
  document.getElementById("result").innerHTML = score;
}

function flipCard() {
  if (cardsChosenIds.length < 2) {
    const cards = document.querySelectorAll("#grid img");
    const cardId = this.getAttribute("data-id");
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenIds.push(cardId);
    cards[cardsChosenIds[0]].removeEventListener("click", flipCard);
    this.setAttribute("src", cardArray[cardId].img);
    if (cardsChosen.length === 2) {
      setTimeout(checkMatch, 500);
    }
  }
}
