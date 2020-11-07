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
//create a global array
var allScores = [];

//push the prior scores into the array as an object

//create onclick event for submitting initials

document
  .getElementById("submit-high-score")
  .addEventListener("click", function () {
    //starting over...
    var initialsVal = initials.value;
    var myScoreObj = {
      initals: initialsVal,
      score: seconds,
    };

    allScores.push(myScoreObj);

    //sort the object by its scores value (seconds)
    allScores.sort(function (a, b) {
      return b.score - a.score;
    });

    console.log(myScoreObj, allScores);

    //create a new element for a table header and two table cells
    var myRowEl = document.createElement("tr");
    //come back to loop this later
    var myInitialsEl = document.createElement("td");
    myInitialsEl.textContent = myScoreObj.initals;
    // var myScoreObj = JSON.stringify(localStorage);
    // myScore.innerText = allScores;
    var myScoreEl = document.createElement("td");
    myScoreEl.textContent = myScoreObj.score;

    myRowEl.appendChild(myInitialsEl);
    myRowEl.appendChild(myScoreEl);
    table.appendChild(myRowEl);

    //Create a Retry Quiz button which restarts the quiz and deletes the elements we added to the page
    var retryButtonEl = document.createElement("button");
    retryButtonEl.textContent = "Retry Quiz";
    retryButtonEl.id = "retry-quiz-button";
    body.appendChild(retryButtonEl);

    document
      .getElementById("retry-quiz-button")
      .addEventListener("click", function () {
        //remove the table rows

        //remove the  retry button

        //hide the input initials,  submit button, view highscores, timer,

        //remove the

        alert("help!");
      });
  });

// document
// .getElementById("answer-two-button")
// .addEventListener("click", function () {
//   page(1);
//   loadQuestions();
// });
