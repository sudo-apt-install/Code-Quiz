// Globally scoped variables to build the page
var body = document.body;
var h1El = document.createElement("h1");
var startButton = document.createElement("button");
var infoEl = document.createElement("div");
var timeElement = document.querySelector(".time");
var display = document.querySelector(".container");
var primaryQuestion = document.querySelector(".theQuestion");
var optionEl = document.querySelector('.options');
var currentScore = 0;
var buttonList = document.createElement("ul"); // create an ordered list
var QRElement = document.createElement("div");//Questions Remaining Element
var secondsLeft = 100; // globally scoped variable for the time and check functions
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
//startButton.innerHTML.setAttribute = ("style", "align-content: center; justify-content: center;")

body.appendChild(h1El);
body.appendChild(infoEl);
body.appendChild(startButton);

h1El.setAttribute("style", "display: flex; justify-content: center; margin-bottom: 2%; width:100%; text-align:center; color: black; font-size: 2rem;");
startButton.setAttribute("style", "display: flex; justify-content: center; align-items: space-between; margin:auto; width:20vw; text-align:center; background-color: #CC5200; border-radius: 25px; color: white; ");
infoEl.setAttribute("style", "display: flex; justify-content: center; margin:auto; padding-bottom: 2%; width:100%; text-align:center; color: black; font-size: 2rem;");

// Begins the quiz timer
function setTime(){

    var timerInterval = setInterval(function() {
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
    body.removeChild(h1El);
    body.removeChild(infoEl);
    body.removeChild(startButton)
    renderQuestion();
})


// create a hash set to store questions that were already asked
var previousQuestions = new Set();
var remainingQuestions = questionPool.length;

// function to select the next question at random
// function to select the next question at random
function selectQuestion(){
    currentQuestionObject = questionPool[Math.floor(Math.random() * questionPool.length)];
    
    
    if (!previousQuestions.has(currentQuestionObject.question)){
        remainingQuestions -= 1;
        currentQuestion = currentQuestionObject.question;
        previousQuestions.add(currentQuestionObject.question);
        //console.log(`previous questions length is ${previousQuestions.size}`);
        if(previousQuestions.size === questionPool.length){
            quizOver();
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
  
    // create and add new options to the DOM
    for (let i = 0; i < currentQuestionObject.options.length; i++) {
        var option = currentQuestionObject.options[i];
        var answerChoiceButton = document.createElement("button");
        answerChoiceButton.textContent = option;
        answerChoiceButton.setAttribute("style", "display: flex; justify-content: center; align-items: space-between; margin:auto; width:10%; text-align:center; background-color: #CC5200; border-radius: 25px; color: white; ");
        answerChoiceButton.dataset.value = option;
        answerChoiceButton.addEventListener("click", checkAnswer);
        
        // create a new list item for the button and append it to the list
        var listItem = document.createElement("li");
        listItem.setAttribute("id", 2000+i);
        listItem.appendChild(answerChoiceButton);
        buttonList.appendChild(listItem);
        listItem.setAttribute ("style", "margin-top: 1%;")
    };

    // append the list to the DOM
    optionEl.appendChild(buttonList);

};

function removeAnswerChoices(){
    //2000 because I set the list item Id's to 2000+i
    for (var m = 2000; m < 2005; m++){
        buttonList.removeChild(document.getElementById(m.toString()));
    };
};

function setQuizStyling(){
    body.appendChild(QRElement);
    primaryQuestion.setAttribute("style", "display: flex; justify-content: center; margin-top: 5%; margin-bottom: 5%; width:100%; text-align:center; color: black; font-size: 2rem;");
    timeElement.setAttribute("style", "display: flex; justify-content: flex-end; width: 95%; font-size: 2rem; ");
    QRElement.textContent = `Questions Remaining: ${remainingQuestions}`;
    QRElement.setAttribute("style", "display: flex; justify-content: flex-start; margin:auto; padding-bottom: 2%; width:100%; text-align:center; color: black; font-size: 2rem;");
};


// checks if the chosen answer is the correct one
function checkAnswer() {

  if (this.dataset.value === currentQuestionObject.answer) {
    currentScore += 10;
    alert(currentQuestionObject.funFact);
    selectQuestion();
    removeAnswerChoices();
    renderQuestion();
  } else{
    secondsLeft -= 15;
    selectQuestion();
    removeAnswerChoices();
    renderQuestion();
  };
};

//function runs to end the quiz once the conditions are met
function quizOver(){
    removeAnswerChoices();
    location.href = '/assets/high-scores.html'
}