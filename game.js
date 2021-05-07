function checkIfOverI(timerId) {
  let botun = document.getElementById("buttonClass");
  if (botun.i + 1 > 9) {
    setTimeout(() => {
      clearInterval(timerId);
    }, 0);

    logEnd("The game is over (bubble got too big)! ", score);
  }
}

function checkIfOverClick(e) {
  let botun = document.getElementById("buttonClass");
  let target = e.target;
  if (target.id !== botun.id) {
    logEnd("The game is over (you clicked outside the bubble)! ", score);
  }
}

function eraseButton() {
  let botun = document.getElementById("buttonClass");
  botun.remove();
}

function calculateScore(n) {
  return parseInt(1.5 ** n);
}

function handleClick(timerId, e) {
  setTimeout(() => {
    clearInterval(timerId);
  }, 10);
}

var score = 0;
var i = 0;
var num = 0;

function increaseButton(button) {
  let timerId = setInterval(() => {
    button.i = i;
    i++;

    checkIfOverI(timerId);
  }, 1000);

  button.onclick = function () {
    handleClick(timerId);
    score += calculateScore(num);
    logScore(score);
    i = 0;
    eraseButton();
    createButton();
  };
}
function createButton() {
  var button = document.createElement("button");
  button.setAttribute("id", "buttonClass");
  button.setAttribute("i", 0);

  var intFrameWidth = window.innerWidth;
  var intFrameHeight = window.outerHeight;

  var body = document.getElementsByTagName("body")[0];
  body.setAttribute("id", "bodyClass");
  body.addEventListener("click", checkIfOverClick);
  body.appendChild(button);

  button.style.position = "absolute";
  button.style.right = `${250 + (Math.random() * intFrameWidth) / 2}px`;
  button.style.top = `${(Math.random() * intFrameHeight) / 2}px`;

  num++;

  increaseButton(button);
}

var output = document.createElement("output");
output.setAttribute("id", "outputClass");
var body = document.getElementsByTagName("body")[0];
body.appendChild(output);
var outputString =
  "Your score is " + score + "; Number of clicked bubbles so far: " + num;
var biggerOutputString = outputString.fontsize(4).fontcolor("blue");
output.innerHTML = biggerOutputString;

function logScore(score) {
  outputString =
    "Your score is " + score + "; Number of clicked bubbles so far: " + num;
  biggerOutputString = outputString.fontsize(4).fontcolor("blue");
  output.innerHTML = biggerOutputString;
}

function logEnd(text, score) {
  outputString = text + "Your total score is: " + score;
  biggerOutputString = outputString.fontsize(4).fontcolor("blue");
  output.innerHTML = biggerOutputString;

  eraseButton();
  var bot1 = document.createElement("button");
  var bot2 = document.createElement("button");

  bot1.textContent = "Restart";
  bot2.textContent = "Quit";
  body.appendChild(bot1);
  body.appendChild(bot2);

  bot1.onclick = function () {
    location.reload();
  };
  bot2.onclick = function () {
    window.close();
  };
}

createButton();
