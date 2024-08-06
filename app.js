let gameseq = [];
let userseq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// Replace keypress event with click event on body
document.addEventListener("click", function (event) {
  if (started == false && !event.target.classList.contains("btn")) {
    console.log("Game is Started");
    started = true;
    levelUp(true);
  }
});

function gameFlash(btn, isFirstFlash = false) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, isFirstFlash ? 300 : 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

function levelUp(isFirstFlash = false) {
  userseq = [];
  level++;
  h2.innerText = `level ${level}`;

  let ranIdx = Math.floor(Math.random() * 4);
  let randColor = btns[ranIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  
  gameseq.push(randColor);
  console.log(gameseq);
  gameFlash(randBtn, isFirstFlash);
}

function checkAns(idx) {
  if (userseq[idx] == gameseq[idx]) {
    if (userseq.length == gameseq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! Your Score was <b>${level}</b>. Click anywhere outside the box to start again.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  console.log(userColor);
  userseq.push(userColor);
  checkAns(userseq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameseq = [];
  userseq = [];
  level = 0;
}
