var body = document.body;
var h1El = document.createElement("h1");
var p1El = document.createElement("p");
var button = document.createElement("button");
var card = document.createElement("div");
var cardHead = document.createElement("div");
var cardBody = document.createElement("div");
var cardFooter = document.createElement("div");
var infoEl = document.createElement("div");

//Creating a list element
var listElement = document.createElement("ol");

//Creating ordered list items
var li1 = document.createElement("li");
var li2 = document.createElement("li");
var li3 = document.createElement("li");
var li4 = document.createElement("li");

h1El.textContent = "Dragon Ball (qui)Z";
infoEl.textContent = "Try to answer the following Dragon Ball/ Dragon Ball Z related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!"

button.innerHTML = "Start Quiz!"

body.appendChild(h1El);
body.appendChild(infoEl);
body.appendChild(button);

h1El.setAttribute("style", "margin:auto; width:50%; text-align:center;");
button.setAttribute("style", "display: flex; justify-content: center; margin:auto; width:10%; text-align:center; background-color: #CC5200; color: white; ");
infoEl.setAttribute("style", "margin:auto; width:50%; text-align:center;");
kittenEl.setAttribute("style", "font-size:25px; text-align:center;");
favoriteEl.setAttribute("style", "font-size:20px;");

let previousQuestions = new set();

let questionPool = ['What was Broly\'s power level at birth?', 'How many planets does Frieza own?', 'How many planets does Cooler own?', 'From when he learned it in Dragon Ball, until the end of the Z series...How many times did Goku use the Kamehameha Wave?', 'What is the One thing a Saiyan always keeps?'];
let answerPool = ['10,000', '79', '256', '97 times', 'HIS PRIDE!!!!' ]
let funFact = ["That's in the same league with the Elite Saiyan warriors fighting  in their prime!", 'That\'s less than his brother Cooler!', 'Far more than his brother Frieza!' ]

