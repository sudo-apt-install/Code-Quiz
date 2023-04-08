var body = document.body;
var h1El = document.createElement("h1");
var startButton = document.createElement("button");
var cardFooter = document.createElement("div");
var infoEl = document.createElement("div");
var timeElement = document.querySelector(".time");
var display = document.querySelector(".container");
var primaryQuestion = document.querySelector(".theQuestion");
var optionEl = document.querySelector('.options');
var currentScore = 0;

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
        question: 'From when he learned it in Dragon Ball, until the end of the Z series...How many times did Goku use the Kamehameha Wave?',
        options: ['67 times', '29 times', '97 times', '136 times', '214 times'],
        answer: '97 times',
        funFact: 'KAMEHAMEHA!!!!'
    },
    {
        question: 'What is the One thing a Saiyan always keeps?',
        options: ['HIS DIGNITY!!!!','HIS PRIDE!!!!', 'HIS POWER!!!!', 'HIS WORD!!!!', 'CONTROL!!!!'],
        answer: 'HIS PRIDE!!!!',
        funFact: "Babidi got much more than her bargained for trying to control the Prince of Saiyans."
    },
];

//Creating a list element
var listElement = document.createElement("ol");

//Creating ordered list items
var li1 = document.createElement("li");
var li2 = document.createElement("li");
var li3 = document.createElement("li");
var li4 = document.createElement("li");
var li5 = document.createElement("li");

h1El.textContent = "Dragon Ball (qui)Z";
//h2El.textContent = "Time Remaining: "
infoEl.textContent = "Try to answer the following Dragon Ball/ Dragon Ball Z related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!"

startButton.innerHTML = "Start Quiz!"

body.appendChild(h1El);
body.appendChild(infoEl);
body.appendChild(startButton);

h1El.setAttribute("style", "margin:auto; width:50%; text-align:center;");
startButton.setAttribute("style", "display: flex; justify-content: center; margin:auto; width:10%; text-align:center; background-color: #CC5200; color: white; ");
infoEl.setAttribute("style", "margin:auto; width:50%; text-align:center;");


var secondsLeft = 100;

function setTime(){

    var timerInterval = setInterval(function() {
        secondsLeft--;
        timeElement.textContent = `Time remaining: ${secondsLeft}`;
        
        if(secondsLeft === 0){
            clearInterval(timerInterval);
        }

    },1000)
}

startButton.addEventListener("click", function(){
    setTime();
    start();
    renderQuestion();
})

function start(){
    selectQuestion();
}

// create a hash set to store questions that were already asked
var previousQuestions = new Set();

function selectQuestion(){
    currentQuestionObject = questionPool[Math.floor(Math.random() * questionPool.length)];
    
    if (!previousQuestions.has(currentQuestionObject)){
        currentQuestion = currentQuestionObject.question;
        previousQuestions.add(currentQuestionObject);
    } else {
        selectQuestion();
    }

    console.log(currentQuestion);
}

function renderQuestion() {
    primaryQuestion.textContent = currentQuestion;
  
    // create and add new options to the DOM
    for (let i = 0; i < currentQuestionObject.options.length; i++) {
      var option = currentQuestionObject.options[i];
      var answerChoiceButton = document.createElement("button");
      answerChoiceButton.textContent = option;
      answerChoiceButton.dataset.value = option;
      answerChoiceButton.addEventListener("click", checkAnswer);
      optionEl.appendChild(answerChoiceButton);
      
    }
}
  


function checkAnswer() {
  console.log(this.dataset.value);
  if (this.dataset.value === currentQuestionObject.answer) {
    currentScore += 10;
    alert(currentQuestionObject.funFact);
    selectQuestion();
  }
}
