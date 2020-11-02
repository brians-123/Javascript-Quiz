//setting document.body as a variable to shorten text
var body = document.body;

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

//get the correct or wrong element
var correctOrWrong = document.getElementById("correct-or-wrong");

//add an area below for noting if correct. This could have been a
//placeholder in the html but I want to practice adding an element
// content = document.querySelector("content");
// correctOrWrong = document.createElement("p");
// correctOrWrong.innerHTML = "Correct!";
// correctOrWrong.setAttribute(
//   "style",
//   "border-top: solid black 3px; text-align: left"
// );
// content.appendChild(correctOrWrong);

//start a 75 second timer and add to console.log
seconds = 75;

function startTimer(time) {
  var countdownTimer = setInterval(function () {
    timerDisplay.innerHTML = "Timer:" + seconds;
    seconds--;
    if (seconds < 0) {
      clearInterval(countdownTimer);
      //go to the enter score page
    }
  }, 1000);
}

//make the existing html element 'timer'and 'view-highscores-link' visible

i = 0;
var questionNumber = 0;
function loadQuestions() {
  if (questionNumber < questions.length) {
    heading1.innerHTML = questions[questionNumber].q;
    for (var j = 0; j < 4; j++) {
      answerButtons[j].innerHTML = questions[questionNumber]["a" + j];
    }
    console.log("questionNumber after: " + questionNumber);
    return questionNumber;
  } else {
    allDone();
  }
}

console.log("i after everything: " + i);

document.getElementById("start-quiz").addEventListener("click", function () {
  this.style.display = "none";
  paragraph.style.display = "none";
  paragraph.style.textAlign = "left";
  paragraph.style.fontSize = "20px";
  heading1.style.fontSize = "40px";
  heading1.style.fontWeight = "bold";
  heading1.style.textAlign = "left";
  loadQuestions(questionNumber);
  console.log("questionNumber in start-quiz:" + questionNumber);
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

//define an array object for questions. Have an object stored within it.
var questions = [
  {
    q: "Which is the best language?",
    ca: "JavaScript",
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

//add an onClick event to each of the four buttons
document
  .getElementById("answer-one-button")
  .addEventListener("click", function () {
    page(0);
    console.log("question in answer button one b4: " + questionNumber);
    loadQuestions(questionNumber);
    console.log("question in the answer one after: " + questionNumber);
  });
document
  .getElementById("answer-two-button")
  .addEventListener("click", function () {
    page(1);
    loadQuestions();
  });
document
  .getElementById("answer-three-button")
  .addEventListener("click", function () {
    page(2);
    loadQuestions();
  });
document
  .getElementById("answer-four-button")
  .addEventListener("click", function () {
    page(3);
    loadQuestions();
  });

//
function page(id) {
  //if the answer is correct display the value
  console.log("questionNumber at page function" + questionNumber);
  console.log("id: " + id);
  console.log(
    questions[questionNumber]["a" + id] + " and " + questions[questionNumber].ca
  );
  if (questions[questionNumber]["a" + id] === questions[questionNumber].ca) {
    console.log("correct answer");
    correctOrWrong.innerHTML = "Correct!";
    correctOrWrong.style.display = "block";
  } else {
    console.log("incorrect answer");
    seconds = seconds - 5;
    correctOrWrong.innerHTML = "Incorrect!";
    correctOrWrong.style.display = "block";
  }
  questionNumber++;
  // return id;
}

//remove the text from the heading element

//make an element below the buttons. We need a line, and
//whether or not the prior answer was correct
var answerFour = document.querySelector(".answer-four");
var newDiv = document.createElement("div");

//get the timer element and add countDownTimer to it

//get the View Highscores element and make it visible

//test where I'm updating the button text

// answerOne.innerHTML = questions[i].a1;

//Loop through the questions and answers and change display

//load the enter your name page
function allDone() {
  heading1.innerHTML = "All Done!";
  paragraph.style.display = "block";
  paragraph.innerHTML = "your final score is :" + seconds;
  for (var i = 0; i < answerButtons.length; i++) {
    answerButtons[i].setAttribute("style", "display:hidden");
  }
}
