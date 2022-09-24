//self-explanatory variables of utility
const grid = document.querySelector(".grid");
let ballPositionX = Math.random() * (450 - 150) + 150;
let ballPositionY = 45;
let ballDirectionX = 2;
let ballDirectionY = 2;
let currentPosition = 253; //player start position
let playOnClick = 1;
const hit = new Audio("sounds/hit.mp3");
hit.volume = 0.5;
const gameOver = new Audio("sounds/gameover.mp3");
gameOver.volume = 0.5;
const winSound = new Audio("sounds/win.mp3");
winSound.volume = 0.35;
const music = new Audio("sounds/music.mp3");
music.volume = 0.1;
music.addEventListener(
  "ended",
  function () {
    this.currentTime = 0;
    this.play();
  },
  false
);
function goHome() {
  window.location.href = "../index.html";
}
//generic function to add block
const blocks = [];
function addBlock(x, y, class1, id) {
  const block = document.createElement("div");
  block.classList.add("block");
  block.style.left = x + "px";
  block.style.bottom = y + "px";
  block.classList.add(class1);
  block.setAttribute("xFix", x);
  block.setAttribute("yFix", y);
  block.setAttribute("id", id);
  grid.appendChild(block);
}

//player block
addBlock(253, 25, "player", "player");

//rest of blocks
function createBlocks() {
  let count = 0;
  let startValueX = -100;
  let startValueY = 200;
  for (let i = 0; i < 18; i++) {
    if (count == 6 || count == 12) {
      startValueX -= 535;
      startValueY += 27;
      addBlock(startValueX, startValueY, "breakable", i);
    } else {
      startValueX += +107;
      addBlock(startValueX, startValueY, "breakable", i);
    }

    count++;
  }
}

//create ball
function createBall() {
  const ball = document.createElement("div");
  ball.classList.add("ball");
  ball.style.left = ballPositionX + "px";
  ball.style.bottom = ballPositionY + "px";
  grid.appendChild(ball);
}
//variables to help activate and stop interval functions
let ballMovementId;
let checkGameOverId;
let checkWinId;
let checkCollisionPlayerId;
let checkColissionBlocksId;
let changeDirectionId;
let count = 0;
const ball = document.querySelector(".ball");
//buttons actions
document
  .getElementById("startEasy")
  .addEventListener("click", () => startGame(14));
document
  .getElementById("startMedium")
  .addEventListener("click", () => startGame(8));
document
  .getElementById("startHard")
  .addEventListener("click", () => startGame(6));
document
  .getElementById("startVeryHard")
  .addEventListener("click", () => startGame(5));
document.getElementById("Home").addEventListener("click", () => goHome());

//start and stop the game(deletes all interval functions and blocks)
//depending on flag "playOnClick"
function startGame(difficulty) {
  if (playOnClick == 1) {
    music.play();
    createBlocks();
    createBall();
    ballMovementId = setInterval(ballMovement, difficulty);
    changeDirectionId = setInterval(changeDirection, difficulty);
    checkColissionBlocksId = setInterval(checkColissionBlocks, difficulty);
    checkCollisionPlayerId = setInterval(checkCollisionPlayer, difficulty);
    checkGameOverId = setInterval(checkGameOver, difficulty);
    checkWinId = setInterval(checkWin, difficulty);
    document.getElementById("info").innerHTML = "Don't let the ball fall off!";
    playOnClick = 0;
    document
      .getElementById("startEasy")
      .setAttribute("class", "btn btn-primary hidden");
    document
      .getElementById("startMedium")
      .setAttribute("class", "btn btn-primary hidden");
    document
      .getElementById("startHard")
      .setAttribute("class", "btn btn-primary hidden");
    document
      .getElementById("startVeryHard")
      .setAttribute("class", "btn btn-primary hidden");
    count = 0;
  } else {
    clearInterval(checkGameOverId);
    clearInterval(checkWinId);
    clearInterval(checkCollisionPlayerId);
    clearInterval(checkColissionBlocksId);
    clearInterval(ballMovementId);
    clearInterval(changeDirectionId);
    for (i = 0; i <= 17; i++) {
      let nested = document.getElementById(i);
      grid.removeChild(nested);
    }
    let nestedBall = document.querySelector(".ball");
    grid.removeChild(nestedBall);
    ballPositionX = Math.random() * (450 - 150) + 150;
    ballPositionY = 45;
    ballDirectionX = 2;
    ballDirectionY = 2;
    playOnClick = 1;
    document.getElementById("startEasy").innerHTML = "Easy";
    document.getElementById("startMedium").innerHTML = "Medium";
    document.getElementById("startHard").innerHTML = "Hard";
    document.getElementById("startVeryHard").innerHTML = "Very Hard";
  }
}

//border collision detection
function changeDirection() {
  if (ballPositionX >= 627) {
    ballDirectionX = -2;
  }
  if (ballPositionY >= 280) {
    ballDirectionY = -2;
  }
  if (ballPositionX <= 0) {
    ballDirectionX = +2;
  }
  if (ballPositionY <= 0) {
    ballDirectionY = +2;
  }
}

// ball redraw based on time interval and current and next position
function ballMovement() {
  const ball = document.querySelector(".ball");
  ballPositionX += ballDirectionX;
  ballPositionY += ballDirectionY;
  ball.style.left = ballPositionX + "px";
  ball.style.bottom = ballPositionY + "px";
}

//player position actualization
let player = document.querySelector(".player");
function drawPlayer() {
  player.style.left = currentPosition + "px";
}

//flags for more fluid player movement
let movingLeft = 0;
let movingRight = 0;
//fluid movement based on flags function and time intervals
function movingPlayer() {
  if (movingLeft == 1 && currentPosition > 15) {
    currentPosition -= 15;
    drawPlayer();
  }
  if (movingRight == 1 && currentPosition < 532) {
    currentPosition += 15;
    drawPlayer();
  }
}
function flagMovement(e) {
  switch (e.key) {
    case "ArrowLeft":
      movingLeft = 1;
      movingRight = 0;
      break;
    case "ArrowRight":
      movingRight = 1;
      movingLeft = 0;
      break;
  }
}
function clearFlagMovement(e) {
  switch (e.key) {
    case "ArrowLeft":
      movingLeft = 0;
    case "ArrowRight":
      movingRight = 0;
  }
}
document.addEventListener("keydown", flagMovement);
document.addEventListener("keyup", clearFlagMovement);
setInterval(movingPlayer, 30);

function checkCollisionPlayer() {
  if (
    ballPositionX + 10 >= currentPosition &&
    ballPositionX - 10 <= currentPosition + 100 &&
    ballPositionY > 40 &&
    ballPositionY < 45
  ) {
    ballDirectionY = 2;
  }
}

//checking collisions using ball and blocks positions adjusting pixels when wanting to take the end of the
//object since variables only take the start ( bottom, left ) in consideration
function checkColissionBlocks() {
  let blocksAr = Array.from(document.querySelectorAll(".breakable"));
  for (i = 0; i < blocksAr.length; i++) {
    if (
      (ballPositionX >= parseInt(blocksAr[i].getAttribute("xFix")) ||
        ballPositionX + 20 >= parseInt(blocksAr[i].getAttribute("xFix"))) &&
      (ballPositionX <= parseInt(blocksAr[i].getAttribute("xFix")) + 100 ||
        ballPositionX + 20 <=
          parseInt(blocksAr[i].getAttribute("xFix")) + 100) &&
      ballPositionY + 20 >= parseInt(blocksAr[i].getAttribute("yFix")) &&
      ballPositionY <= parseInt(blocksAr[i].getAttribute("yFix")) + 20
    ) {
      blocksAr[i].classList.remove("block");
      blocksAr[i].classList.remove("breakable");
      count++;
      hit.play();
      if (
        ballDirectionY == 2 &&
        ballDirectionX == 2 &&
        ballPositionY + 10 > parseInt(blocksAr[i].getAttribute("yFix"))
      ) {
        ballDirectionX = -2;
        break;
      } else if (ballDirectionY == 2 && ballDirectionX == 2) {
        ballDirectionY = -2;
        break;
      }
      if (
        ballDirectionY == 2 &&
        ballDirectionX == -2 &&
        ballPositionY + 10 > parseInt(blocksAr[i].getAttribute("yFix"))
      ) {
        ballDirectionX = 2;
        break;
      } else if (ballDirectionY == 2 && ballDirectionX == -2) {
        ballDirectionY = -2;
        break;
      }
      if (
        ballDirectionY == -2 &&
        ballDirectionX == 2 &&
        ballPositionY + 10 < parseInt(blocksAr[i].getAttribute("yFix")) + 20
      ) {
        ballDirectionX = -2;
        break;
      } else if (ballDirectionY == -2 && ballDirectionX == 2) {
        ballDirectionY = 2;
        break;
      }
      if (
        ballDirectionY == -2 &&
        ballDirectionX == -2 &&
        ballPositionY + 10 < parseInt(blocksAr[i].getAttribute("yFix")) + 20
      ) {
        ballDirectionX = 2;
        break;
      } else if (ballDirectionY == -2 && ballDirectionX == -2) {
        ballDirectionY = 2;
        break;
      }
    }
  }
}

//check for lose based on time interval
function checkGameOver() {
  if (ballPositionY <= 3) {
    clearInterval(ballMovementId);
    document.getElementById("info").innerHTML = "GAME OVER";
    gameOver.play();
    music.pause();
    clearInterval(checkGameOverId);
    document
      .getElementById("startEasy")
      .setAttribute("class", "btn btn-primary");
    document
      .getElementById("startMedium")
      .setAttribute("class", "btn btn-primary");
    document
      .getElementById("startHard")
      .setAttribute("class", "btn btn-primary");
    document
      .getElementById("startVeryHard")
      .setAttribute("class", "btn btn-primary");
  }
}
//check for win on time interval
function checkWin() {
  if (count == 18) {
    clearInterval(ballMovementId);
    document.getElementById("info").innerHTML = "YOU WIN!";
    music.pause();
    winSound.play();
    clearInterval(checkWinId);
    document
      .getElementById("startEasy")
      .setAttribute("class", "btn btn-primary");
    document
      .getElementById("startMedium")
      .setAttribute("class", "btn btn-primary");
    document
      .getElementById("startHard")
      .setAttribute("class", "btn btn-primary");
    document
      .getElementById("startVeryHard")
      .setAttribute("class", "btn btn-primary");
  }
}
