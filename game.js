function checkIfOverI(timerId) {
  let botun = document.getElementById("buttonClass");
  if (botun.i + 1 > colorArray.length) {
    setTimeout(() => {
      clearInterval(timerId);
    }, 0);

    alert(
      "The game is over (bubble got too big), your total score is " + score
    );
    let choice = window.prompt("Restart (Y/N): ").toLowerCase();
    while (choice !== "y" && choice !== "n") {
      choice = window
        .prompt("Please enter Y or N. Restart (Y/N): ")
        .toLowerCase();
    }
    if (choice === "y") {
      location.reload();
    } else window.close();
  }
}

function checkIfOverClick(e) {
  let botun = document.getElementById("buttonClass");
  let target = e.target;
  if (target.id !== botun.id) {
    alert(
      "The game is over (you clicked outside the bubble), your total score is " +
        score
    );
    let choice = window.prompt("Restart (Y/N): ").toLowerCase();
    while (choice !== "y" && choice !== "n") {
      choice = window
        .prompt("Please enter Y or N. Restart (Y/N): ")
        .toLowerCase();
    }
    if (choice === "y") location.reload();
    else window.close();
  }
}

function changeColor() {
  let botun = document.getElementById("buttonClass");
  botun.style.backgroundColor = colorArray[botun.i];
}

function eraseButton() {
  let botun = document.getElementById("buttonClass");
  botun.remove();
}

function calculateScore(w) {
  return (10000 / (parseFloat(w) ^ (2 * Math.PI))) * (157 / 200);
}

function handleClick(timerId, e) {
  setTimeout(() => {
    clearInterval(timerId);
  }, 10);
}

var score = 0;
let height = 50;
let width = 50;
var i = 0;
var num = 0;
var colorArray = [
  "#ffcdd2",
  "#ef9a9a",
  "#e57373",
  "#ef5350",
  "#f44336",
  "#e53935",
  "#d32f2f",
  "#c62828",
  "#b71c1c",
];

function increaseButton(button) {
  let timerId = setInterval(() => {
    button.style.width = `${width}px`;
    button.style.height = `${height}px`;
    button.i = i;
    changeColor();
    i++;

    width += 50;
    height += 50;

    checkIfOverI(timerId);
  }, 1000 / (0.5 * num));

  button.onclick = function () {
    handleClick(timerId);
    score += calculateScore(button.style.width);
    logScore(score);
    i = 0;
    eraseButton();
    height = 50;
    width = 50;
    createButton();
  };
}

function createButton() {
  var button = document.createElement("button");
  button.setAttribute("id", "buttonClass");
  button.setAttribute("i", 0);
  var intFrameWidth = window.innerWidth;
  var intFrameHeight = window.outerHeight;

  console.log(intFrameWidth, intFrameHeight);
  var body = document.getElementsByTagName("body")[0];
  body.setAttribute("id", "bodyClass");
  body.addEventListener("click", checkIfOverClick);
  body.appendChild(button);

  button.style.position = "absolute";
  button.style.right = `${250 + (Math.random() * intFrameWidth) / 2}px`;
  button.style.top = `${(Math.random() * intFrameHeight) / 2}px`;
  console.log(button.style.right, button.style.top);
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

createButton();
