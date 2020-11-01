//get the heading element
var heading1 = document.querySelector("h1");
//get the paragraph element
var paragraph = document.querySelector("p");
//get the timer element
var timerDisplay = document.getElementById("timer");
//get the view Highscores element
var viewHighscores = document.getElementById("high-score-link");
//get the four answer buttons
var answerButtons = document.querySelectorAll(".answer-buttons");
//get the four button answers individually so I can replace them
//better

//start a 75 second timer and add to console.log
seconds = 75;

function startTimer(time) {
  var countdownTimer = setInterval(function () {
    console.log(seconds);
    timerDisplay.innerHTML = "Timer:" + seconds;
    seconds--;
    if (seconds < 0) {
      clearInterval(countdownTimer);
      //go to the enter score page
    }
  }, 1000);
}

//make the existing html element 'timer'and 'view-highscores-link' visible

//get the button element, add onclick event that does the following:
//hides the button
//calls 'nextPage function' that loops through questions and answers

document.getElementById("start-quiz").addEventListener("click", function () {
  //this.style.backgroundColor = "red";
  this.style.display = "none";
  heading1.style.display = "none";
  // paragraph.style.display = "none";
  paragraph.style.fontSize = "30px";
  paragraph.style.fontWeight = "bold";
  paragraph.style.textAlign = "left";
  paragraph.innerHTML = questions[0].q;

  //start the 60 countdown
  startTimer();

  //change the formatting of existing elements to block
  //hide and unhide accordingly
  timerDisplay.style.display = "block";
  viewHighscores.style.display = "block";
  for (var i = 0; i < answerButtons.length; i++) {
    answerButtons[i].setAttribute("style", "display:block");
  }
});

//add an onClick event to the each of the four buttons
document
  .getElementById("answer-one-button")
  .addEventListener("click", function () {
    this.style.backgroundColor = "red";
    page("answer-one-button");
  });
document
  .getElementById("answer-two-button")
  .addEventListener("click", function () {
    this.style.backgroundColor = "red";
    page("answer-two-button");
  });
document
  .getElementById("answer-three-button")
  .addEventListener("click", function () {
    this.style.backgroundColor = "red";
    page("answer-three-button");
  });
document
  .getElementById("answer-four-button")
  .addEventListener("click", function () {
    this.style.backgroundColor = "red";
    page("answer-four-button");
  });

// startQuiz.addEventListner("click", nextPage());
function page(id) {
  //if the answer is correct display the value
  if (id === questions[i].ca) {
    console.log("correct answer");
  } else {
    console.log("incorrect answer");
    console.log(id);
    console.log(i);
    console.log(questions[i].ca);
  }
}

//define an array object for questions. Have an object stored within it.
var questions = [
  {
    q: "Which is the best language?",
    ca: "Javascript",
    a0: "Java",
    a1: "C",
    a2: "Visual Basic",
    a3: "JavaScript",
  },

  {
    q: "How long is this class?",
    ca: "6 months",
    a0: "1 month",
    a1: "3 months",
    a2: "6 months",
    a3: "the rest of my life",
  },
];

console.log(questions[0].q);
function nextPage(event) {
  //remove default behavior on the submit button
  nextPage.preventDefault;
  //Cycle through the questions
  for (i = 0; i < questions.length; i++) {}
}

//

//remove the text from the heading element

//make an element below the buttons. We need a line, and
//whether or not the prior answer was correct
var answerFour = document.querySelector(".answer-four");
var newDiv = document.createElement("div");

//get the timer element and add countDownTimer to it

//get the View Highscores element and make it visible

//test where I'm updating the button text

i = 1;
// answerOne.innerHTML = questions[i].a1;

//set answer button styles and text
for (var i = 0; i < 4; i++) {
  // console.log(questions[0]["a" + i]);
  // console.log(answerButtons[i]);
  answerButtons[i].innerHTML = questions[0]["a" + i];
}
