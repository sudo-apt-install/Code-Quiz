// Globally scoped variables to build the page
var body = document.body;
var h1El = document.createElement("h1");
var startButton = document.createElement("button");
var restartButton = document.createElement("button");
var infoEl = document.createElement("div");
var timeElement = document.querySelector(".time");
var display = document.querySelector(".container");
var primaryQuestion = document.querySelector(".theQuestion");
var optionEl = document.querySelector('.options');
var buttonList = document.createElement("ul"); // create an ordered list
var QRElement = document.createElement("div");//Questions Remaining Element
var secondsLeft = 100; // globally scoped variable for the time and check functions
// globals for high score
var table = document.createElement('table');
var tableHead = document.createElement('thead');
var tableBody = document.createElement('tbody');
var checkHighScores = document.createElement("button");
checkHighScores.setAttribute("id", 3000);
var myHeader = document.createElement("header");
var clearHighScores = document.createElement("button");
var currentScore = 0;
var highScoreElement = document.createElement("div");
var highScore = localStorage.getItem("High Score");
var initialForm = document.createElement('form');
var input = document.createElement('input');
input.type = 'text';
input.name = 'initials';
input.placeholder = 'Enter your initials';
initialForm.appendChild(input);
initialForm.setAttribute('id', 2000);
initialForm.addEventListener("submit", function(event){
    event.preventDefault();
    var initials = input.value//event.target.value
    console.log(initials);
})

checkHighScores.addEventListener('click', function(){
    quizOver();
    buttonList.innerHTML="";
    showHighScoresPage();
})
clearHighScores.addEventListener('click', function(){
    localStorage.clear();
    secondsLeft = 0;
    currentScore = 0;
})

/*****************************************************************/

let questionPool = [
    {
        question: 'What was Broly\'s power level at birth?',
        options: ['10,000', '4000', '7000', '13,000', '2000'],
        answer: '10,000',
        funFact: "That's in the same league with the Elite Saiyan warriors fighting  in their prime!",
    },
    {
        question: 'How many planets does Frieza own?',
        options: ['79', '256', '23', '153', '312'],
        answer: '79',
        funFact: 'That\'s less than his brother Cooler!'
    },
    {
        question: 'How many planets does Cooler own?',
        options: ['79', '256', '23', '153', '312'],
        answer: '256',
        funFact: 'Far more than his brother Frieza!'
    },
    {
        question: 'By the end of Dragon Ball Z, which character is the only character to have never died?',
        options: ['Master Roshi', 'Yajirobi', 'Hercule', 'Goku', 'Piccolo'],
        answer: 'Hercule',
        funFact: 'Far more than his brother Frieza!'
    },
    {
        question: 'From when he learned it in Dragon Ball, until the end of the Z series...How many times did Goku use the Kamehameha Wave?',
        options: ['67 times', '29 times', '97 times', '136 times', '214 times'],
        answer: '97 times',
        funFact: 'KAMEHAMEHA!!!!'
    },
    {
        question: 'What is the One thing a Saiyan always keeps?',
        options: ['HIS DIGNITY!!!!','HIS PRIDE!!!!', 'HIS POWER!!!!', 'HIS WORD!!!!', 'CONTROL!!!!'],
        answer: 'HIS PRIDE!!!!',
        funFact: "Babidi got much more than he bargained for trying to control the Prince of Saiyans!"
    },
];

h1El.textContent = "Dragon Ball (qui)Z";
infoEl.textContent = "Try to answer the following Dragon Ball/ Dragon Ball Z related questions within the time limit. Keep in mind that incorrect answers will penalize your time by fifteen seconds, and your score!"

startButton.innerHTML = "Start Quiz!";
checkHighScores.innerHTML = "High Scores";
clearHighScores.innerHTML = "Clear High Scores!";
restartButton.innerHTML = "Restart quiz!";

body.appendChild(h1El);
body.appendChild(infoEl);
body.appendChild(startButton);

// styling
h1El.setAttribute("style", "display: flex; justify-content: center; margin-bottom: 2%; width:100%; text-align:center; color: black; font-size: 2rem;");
startButton.setAttribute("style", "display: flex; justify-content: center; align-items: space-between; margin:auto; width:20vw; text-align:center; background-color: #CC5200; border-radius: 25px; color: white; ");

infoEl.setAttribute("style", "display: flex; justify-content: center; margin:auto; padding-bottom: 2%; width:100%; text-align:center; color: black; font-size: 2rem;");

restartButton.setAttribute("style", "display: flex; align-items: space-between; margin:auto; width:10vw; height: 5vh; text-align:center; background-color: green; border-radius: 25px; color: white; ");
restartButton.style.justifyContent = 'center';
restartButton.style.alignItems = 'center';

checkHighScores.setAttribute("style", "display: flex; justify-content: flex-start; align-items: space-between; width:10vw; height: 5vh; text-align: center; background-color: purple; border-radius: 25px; color: white; ");
checkHighScores.style.justifyContent = "center";
checkHighScores.style.alignItems = "center";

clearHighScores.setAttribute("style", "display: flex; justify-content: flex-end; align-items: space-between; width:10vw; height: 5vh; text-align: center; background-color: #ED254E; border-radius: 25px; color: white; ");
clearHighScores.style.justifyContent = "center";
clearHighScores.style.alignItems = "center";

// Begins the quiz timer
function setTime(){
    timerInterval = setInterval(function() {
    secondsLeft--;
    timeElement.textContent = `Time remaining: ${secondsLeft}`;
    
    if(secondsLeft < 1){
        clearInterval(timerInterval);
        quizOver();
    }

},1000)
}

// Begins the quiz
startButton.addEventListener("click", function(){
    setTime();
    selectQuestion();
    console.log(currentScore);
    body.removeChild(h1El);
    body.removeChild(infoEl);
    body.removeChild(startButton);
    body.appendChild(checkHighScores);
    renderQuestion();
})
restartButton.addEventListener("click", function(){
  location.reload();
})


// create a hash set to store questions that were already asked
var previousQuestions = new Set();
var remainingQuestions = questionPool.length;

// function to select the next question at random
// function to select the next question at random
function selectQuestion(){
    currentQuestionObject = questionPool[Math.floor(Math.random() * questionPool.length)];
    //console.log(currentQuestionObject);

    if (!previousQuestions.has(currentQuestionObject.question)){
        remainingQuestions -= 1;
        currentQuestion = currentQuestionObject.question;
        previousQuestions.add(currentQuestionObject.question);
        //console.log(`previous questions length is ${previousQuestions.size}`);

        if(previousQuestions.size === questionPool.length){
            quizOver();
            return;
        }
    } else {
        selectQuestion();
    }
    setQuizStyling();
    
    
}

// displays the first question once the start button is clicked
function renderQuestion() {
    primaryQuestion.textContent = currentQuestion;
    optionEl.innerHTML = "";

    buttonList.innerHTML="";
  
    // create and add new options to the DOM
    for (let i = 0; i < currentQuestionObject.options.length; i++) {
        var option = currentQuestionObject.options[i];
        var answerChoiceButton = document.createElement("button");
        answerChoiceButton.textContent = option;
        answerChoiceButton.setAttribute("style", "display: flex; align-items: space-between; margin:auto; width:10vw; height: 5vh; text-align:center; background-color: #CC5200; border-radius: 25px; color: white; ");
        answerChoiceButton.style.justifyContent = 'center';
        answerChoiceButton.style.alignItems = 'center';
        answerChoiceButton.dataset.value = option;
        answerChoiceButton.addEventListener("click", checkAnswer);
        
        
        // create a new list item for the button and append it to the list
        var listItem = document.createElement("li");
        listItem.setAttribute("id", 1000+i);
        listItem.appendChild(answerChoiceButton);
        buttonList.appendChild(listItem);
        listItem.setAttribute ("style", "margin-top: 1%;")
    };

    // append the list to the DOM
    optionEl.appendChild(buttonList);

};



function setQuizStyling(){
    primaryQuestion.setAttribute("style", "display: flex; justify-content: center; margin-top: 5%; margin-bottom: 5%; width:100%; text-align:center; color: black; font-size: 2rem;");
    timeElement.setAttribute("style", "display: flex; justify-content: flex-end; width: 95%; font-size: 2rem; ");
    highScoreElement.setAttribute("style", "display: flex; justify-content: center; margin-top: 5%; margin-bottom: 5%; width:100%; text-align:center; color: black; font-size: 2rem; border: 3px solid black; ");
    
    //body.appendChild(QRElement);
    // QRElement.textContent = `Questions Remaining: ${remainingQuestions}`;
    // QRElement.setAttribute("style", "display: flex; justify-content: flex-start; margin:auto; padding-bottom: 2%; width:100%; text-align:center; color: black; font-size: 2rem;");
};

// checks if the chosen answer is the correct one
function checkAnswer(event) {
    if (event.target.dataset.value === currentQuestionObject.answer) {
      currentScore += 15;
      console.log(currentScore);
    } else {
      secondsLeft -= 15;
    };

    if(previousQuestions.size != questionPool.length){
        selectQuestion();
        renderQuestion();
    } else{
        buttonList.innerHTML="";
        quizOver();
    }
};
  
//function runs to end the quiz once the conditions are met
function quizOver(){
    if (previousQuestions.size != questionPool.length && currentScore != 0){
        currentScore += secondsLeft;
    }
    updateLocalStorage(); // update local storage with current score
    clearInterval(timerInterval);
    highScoreElement.textContent = "Current high Score: " + highScore;
    showHighScoresPage();
};

function buildTable(){
    table.appendChild(tableHead);
    table.appendChild(tableBody);
    document.getElementById('body').appendChild(table);
}

function showHighScoresPage() {
  // Clear the display element
  display.innerHTML = "";
  //document.getElementById('3000').setAttribute("disabled", "");

  // Create the high score table
  tableHead.innerHTML = "<tr><th>Initials</th><th>Score</th></tr>";
  var highScores = JSON.parse(localStorage.getItem("High Scores")) || [];
  highScores.forEach(function(score) {
    var row = document.createElement("tr");
    row.innerHTML = "<td>" + score.initials + "</td><td>" + score.score + "</td>";
    tableBody.appendChild(row);
  });
  table.appendChild(tableHead);
  table.appendChild(tableBody);
  body.appendChild(table);

  // Add buttons to clear the high scores and go back to the quiz
  highScoreElement.textContent = "High Scores";
  clearHighScores.textContent = "Clear High Scores";
  display.appendChild(highScoreElement);
  display.appendChild(table);
  display.appendChild(clearHighScores);
  display.appendChild(checkHighScores);
  display.appendChild(restartButton);
}

// function getInitials(){
//     body.appendChild(initialForm);
//     var formData = {
//         'initials': input.value,
//         'High Score': highScore
//       };
//     // Save the form data to local storage
//     localStorage.setItem("Form Data", JSON.stringify(formData));
// }


// store the high score to local storage
function updateLocalStorage() {
  // Get the high score from local storage or set it to 0
  var highScore = localStorage.getItem("High Score") || 0;

  // If the current score is higher than the high score, update the high score
  if (currentScore > highScore) {
    highScore = currentScore;
    currentScore = 0;
    body.appendChild(initialForm);
    var formData = {
        'initials': input.value,
        'High Score': highScore
      };
    // Save the form data to local storage
    localStorage.setItem("Form Data", JSON.stringify(formData));
    localStorage.setItem("High Score", highScore);
    // localStorage.setItem("Initials", document.getElementById('2000'));
  }
}
