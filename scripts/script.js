//setting document.body as a variable to shorten text
var body = document.body;
var heading1 = document.querySelector("h1");
var paragraph = document.querySelector("p");
var timerDisplay = document.getElementById("timer");
var viewHighscores = document.getElementById("high-score-link");
var answerButtons = document.querySelectorAll(".answer-buttons");
var correctOrWrong = document.getElementById("correct-or-wrong");
var initials = document.getElementById("initials");
var submitHighScore = document.getElementById("submit-high-score");
var initialsPrompt = document.getElementById("initials-prompt");

//add an area below for noting if correct. This could have been a
//placeholder in the html but I want to practice adding an element
table = document.querySelector("table");

//start a 60 second timer
var secondsAndScore = 60;
function startOrStopTimer(startOrStop) {
  if (startOrStop === "Start Timer") {
    //The intervalId isn't what's actually used to countdown
    //It's just the identifier that we'll target later to stop
    myIntervalId = setInterval(function () {
      timerDisplay.innerHTML = "Timer:" + secondsAndScore;
      secondsAndScore--;
      if (secondsAndScore <= 0) {
        clearInterval(myIntervalId);
      }
    }, 1000);
  } else if (secondsAndScore <= 0 || startOrStop === "Stop Timer") {
    clearInterval(myIntervalId);
  }
  timerDisplay.innerHTML = "Timer:" + secondsAndScore;
}

var questionNumber = 0;
function loadQuestions() {
  if (questionNumber < questions.length) {
    heading1.innerHTML = questions[questionNumber].q;
    for (var j = 0; j < 4; j++) {
      answerButtons[j].innerHTML = questions[questionNumber]["a" + j];
    }
    return questionNumber;
  } else {
    allDone();
  }
}

document.getElementById("start-quiz").addEventListener("click", function () {
  this.style.display = "none";
  paragraph.style.display = "none";
  paragraph.style.textAlign = "left";
  paragraph.style.fontSize = "20px";
  heading1.style.fontSize = "40px";
  heading1.style.fontWeight = "bold";
  heading1.style.textAlign = "left";
  loadQuestions(questionNumber);
  startOrStopTimer("Start Timer");

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
    a0: "JavaScript",
    a1: "C",
    a2: "Visual Basic",
    a3: "English",
  },
  {
    q: "How long is this class?",
    ca: "6 months",
    a0: "1 month",
    a1: "3 months",
    a2: "6 months",
    a3: "the rest of my life",
  },
  {
    q: 'What does this return? "7" == 7',
    ca: "True",
    a0: "False.",
    a1: "7",
    a2: "Undefined",
    a3: "True",
  },
  {
    q: 'What does this return? "7" === 7?',
    ca: "False",
    a0: "True",
    a1: "7",
    a2: "Undefined",
    a3: "False",
  },
];

//add an onClick event to each of the four buttons
document
  .getElementById("answer-one-button")
  .addEventListener("click", function () {
    page(0);
    loadQuestions(questionNumber);
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

//display correct or incorrect after the questions are answered
function page(id) {
  if (questions[questionNumber]["a" + id] === questions[questionNumber].ca) {
    correctOrWrong.innerHTML = "Correct!";
    correctOrWrong.style.display = "block";
  } else {
    secondsAndScore = secondsAndScore - 5;
    correctOrWrong.innerHTML = "Incorrect!";
    correctOrWrong.style.display = "block";
  }
  questionNumber++;
}

//load the enter your name page
function allDone() {
  heading1.innerHTML = "All Done!";
  paragraph.style.display = "block";
  paragraph.innerHTML = "Your final score is : " + secondsAndScore;
  for (var i = 0; i < answerButtons.length; i++) {
    answerButtons[i].setAttribute("style", "display:hidden");
  }
  initialsPrompt.style.display = "block";
  initials.style.display = "block";
  initials.innerHTML = "Enter your initials";
  submitHighScore.style.display = "block";
  startOrStopTimer("Stop Timer");
}
//create a global array
var allScores = [];

//create onclick event for submitting initials and score
document
  .getElementById("submit-high-score")
  .addEventListener("click", function () {
    var initialsVal = initials.value;
    var myScoreObj = {
      initals: initialsVal,
      score: secondsAndScore,
    };

    allScores.push(myScoreObj);

    //delete any existing rows from the table
    table.innerHTML = "";

    //sort the object by its scores value (secondsAndScore)
    allScores.sort(function (a, b) {
      return b.score - a.score;
    });

    storeFinishers();
    displayScores();
    //hide the button
    this.style.display = "none";
  });

//push the allscores array into local storage
function storeFinishers() {
  localStorage.setItem("finishers", JSON.stringify(allScores));
}

//display a table of scores
function displayScores() {
  var retryQuizEl = (document.getElementById("retry-quiz").style.display =
    "block");
  var scoreTest = JSON.parse(localStorage.getItem("finishers"));

  //make a header row for the table
  myHeaderRowEl = document.createElement("tr");
  myHeaderInitialsEl = document.createElement("th");
  myHeaderInitialsEl.textContent = "Initials";
  myHeaderScoreEl = document.createElement("th");
  myHeaderScoreEl.textContent = "Score";

  myHeaderRowEl.appendChild(myHeaderInitialsEl);
  myHeaderRowEl.appendChild(myHeaderScoreEl);
  table.appendChild(myHeaderRowEl);

  //loop over the scores to display them
  // Render a new table row for each score submitted
  for (var i = 0; i < scoreTest.length; i++) {
    var score = scoreTest[i];

    myRowEl = document.createElement("tr");
    var myInitialsEl = document.createElement("td");
    myInitialsEl.textContent = scoreTest[i].initals;
    var myScoreEl = document.createElement("td");
    myScoreEl.textContent = scoreTest[i].score;

    myRowEl.appendChild(myInitialsEl);
    myRowEl.appendChild(myScoreEl);
    table.appendChild(myRowEl);
  }
  //hide elements after submit
  initialsPrompt.style = "";
  initials.style = "";
  submitHighScore.style = "";
  correctOrWrong.style = "";
  correctOrWrong.innerHTML = "";

  //display the table
  table.style.display = "table";
  heading1.innerHTML = "High Scores";
}

document.getElementById("retry-quiz").addEventListener("click", function () {
  this.style.display = "";
  body.style = null;
  paragraph.style = null;
  heading1.style = null;
  paragraph.style = null;
  timerDisplay.style = null;
  viewHighscores.style = null;
  answerButtons.style = "";
  correctOrWrong.style = null;
  initials.style = null;
  submitHighScore.style = null;
  initialsPrompt.style = null;
  timerDisplay.style.display = "";
  viewHighscores.style.display = "";
  document.getElementById("start-quiz").style = "";

  heading1.innerHTML = "Coding Quiz Challenge";
  paragraph.innerHTML =
    "You have 60 seconds to complete this quiz. <br>" +
    "Wrong answers will result in losing 5 seconds from the timer.  <br>" +
    "After you've finished you will see where you've placed amongst <br>" +
    "the high scores.";
  questionNumber = 0;
  table.style = "";
  secondsAndScore = 60;
  initials.textContent = "";
  startOrStopTimer("Stop Timer");
});
