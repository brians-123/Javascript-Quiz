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
//get the correct or wrong element
var correctOrWrong = document.getElementById("correct-or-wrong");
//get the enter your initials element
var initials = document.getElementById("initials");
//get the submit high score element
var submitHighScore = document.getElementById("submit-high-score");
//get the submit high score element
var initialsPrompt = document.getElementById("initials-prompt");

//add an area below for noting if correct. This could have been a
//placeholder in the html but I want to practice adding an element
table = document.querySelector("table");

// correctOrWrong.innerHTML = "Correct!";
// correctOrWrong.setAttribute(
//   "style",
//   "border-top: solid black 3px; text-align: left"
// );
// content.appendChild(correctOrWrong);

//start a 75 second timer and add to console.log
seconds = 75;

function startOrStopTimer(startOrStop) {
  var countdownTimer = setInterval(function () {
    timerDisplay.innerHTML = "Timer:" + seconds;
    seconds--;
    //This isn't working and not sure why.
    if (seconds < 0 || startOrStop == "stopTimer") {
      clearInterval(countdownTimer);
      // console.log("startOrStop: " + startOrStop);
      // console.log("countdownTimer: " + countdownTimer);
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
    // console.log("questionNumber after: " + questionNumber);
    return questionNumber;
  } else {
    allDone();
  }
}

// console.log("i after everything: " + i);

document.getElementById("start-quiz").addEventListener("click", function () {
  this.style.display = "none";
  paragraph.style.display = "none";
  paragraph.style.textAlign = "left";
  paragraph.style.fontSize = "20px";
  heading1.style.fontSize = "40px";
  heading1.style.fontWeight = "bold";
  heading1.style.textAlign = "left";
  loadQuestions(questionNumber);
  // console.log("questionNumber in start-quiz:" + questionNumber);
  //start the 60 second countdown
  startOrStopTimer("startTimer");

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
    // console.log("question in answer button one b4: " + questionNumber);
    loadQuestions(questionNumber);
    // console.log("question in the answer one after: " + questionNumber);
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
  // console.log("questionNumber at page function" + questionNumber);
  // console.log("id: " + id);
  // console.log(
  // questions[questionNumber]["a" + id] + " and " + questions[questionNumber].ca
  // );
  if (questions[questionNumber]["a" + id] === questions[questionNumber].ca) {
    // console.log("correct answer");
    correctOrWrong.innerHTML = "Correct!";
    correctOrWrong.style.display = "block";
  } else {
    // console.log("incorrect answer");
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

// answerOne.innerHTML = questions[i].a1;

//Loop through the questions and answers and change display

//load the enter your name page
function allDone() {
  heading1.innerHTML = "All Done!";
  paragraph.style.display = "block";
  paragraph.innerHTML = "Your final score is : " + seconds;
  for (var i = 0; i < answerButtons.length; i++) {
    answerButtons[i].setAttribute("style", "display:hidden");
  }
  initialsPrompt.style.display = "block";
  // initialsPrompt.style.marginRight = "5px";
  initials.style.display = "block";
  initials.innerHTML = "Enter your initials";
  submitHighScore.style.display = "block";
  startOrStopTimer("stopTimer");
}
//create an array
var allScores = [];

//push the prior scores into the array

//create onclick event for submitting initials

document
  .getElementById("submit-high-score")
  .addEventListener("click", function () {
    //starting over...
    //get any values in local storage, if they exist by pulling into priorScores
    // priorScores = JSON.parse(localStorage.getItem("questionsGame"));
    allScores = [JSON.parse(localStorage.getItem("questionsGame"))];

    // console.log(priorScores);
    console.log(allScores);

    //push the newest value into the array
    allScores.push(2);
    // priorScores.push(JSON.parse(localStorage.getItem("questionsGame")));

    //append initials, and score into a high score key-value pair
    var allScores = localStorage.setItem(
      "questionsGame",
      JSON.stringify(allScores)
    );

    //commenting out and making simple above
    // var score = localStorage.setItem(
    //   "questionsGame",
    //   JSON.stringify([seconds, initials.value])
    // );
    // console.log(JSON.parse(score));

    // Create an Object, put into an Array, put into local Storage
    // could use seconds value as ranking indicator on

    //possibility to loop through the array checking the objects' seconds.
    //

    //sort the object scores in descending order. use parseint?

    //create a new element for a table row and two table cells
    var myScore = document.createElement("tr");
    myScore.style.cssText = "border: 1px solid black, background-color: beige";
    myScore.textContent = allScores;
    // var myScoreObj = JSON.stringify(localStorage);
    myScore.innerText = allScores;
    document.body.appendChild(myScore);
  });

//Create a Go Back button which restarts the quiz

//Create a Clear Scores button, which will clear the scores both from display
//and from the stored variables
