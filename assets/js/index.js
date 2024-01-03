var timerEl = $("#timer-span");
var containerEl = $(".container");
var questionEl = $("#question-head");
var answerButtonParentEl = $(".answer-btns");
var scoreEl = $("#score");
var wrongrightEl = $("#wrong-right");

var scoreButtonEl = $(".score-btn");
var startButtonEl = $(".start-btn");

let timerInterval;

var startTime = 15;
var currentTIme = 0;
var perQuestionTime = 10;
var scoreTracker = 0;

var gameState = false;

let questionOne = {
    question: "What does DOM stand for?",
    answers: ["Direct Open Market", "Data Oriented Model", "Document Object Model", "Document Order Mode"],
    correct: "Document Object Model",
}

let questionTwo = {
    question: "How old are you?",
    answers: ["0 - 10", "10 - 20", "20 - 30", "30+"],
    correct: 0,
}

let questionThree = {
    question: "Three",
    answers: ["", "", "", ""],
    correct: 0,
}

let questionFour = {
    question: "Four",
    answers: ["", "", "", ""],
    correct: 0,
}

let questionFive = {
    question: "Five",
    answers: ["", "", "", ""],
    correct: 0,
}

let questionSix = {
    question: "Six",
    answers: ["", "", "", ""],
    correct: 0,
}

let questionSeven = {
    question: "Seven",
    answers: ["", "", "", ""],
    correct: 0,
}

let questionEight = {
    question: "Eight",
    answers: ["", "", "", ""],
    correct: 0,
}

let questionNine = {
    question: "Nine",
    answers: ["", "", "", ""],
    correct: 0,
}

let questionTen = {
    question: "Ten",
    answers: ["", "", "", ""],
    correct: 0,
}

let questionHolder = {
    qOne: questionOne,
    qTwo: questionTwo,
    qThree: questionThree,
    qFour: questionFour,
    qFive: questionFive,
    qSix: questionSix,
    qSeven: questionSeven,
    qEight: questionEight,
    qNine: questionNine,
    qTen: questionTen,
}

var keysLength = Object.keys(questionHolder).length;

var answerBtns = document.getElementsByClassName("answer-btn");

const TimerFunction = () => {
    timerInterval = setInterval(function() {
        if(currentTIme <= 0)    {
            GameOver();
            return;
        }

        currentTIme--;
        AdjustTime(0);
    }, 1000);
}

const StartGame = () => {
    if(gameState)   {
        console.log("GAME RUNNING!");
        return;
    }

    if(timerInterval)   {
        clearInterval(timerInterval);
    }

    console.log(questionHolder.qOne.question);
    currentTIme = startTime;
    AdjustTime(0);

    PopulateNextQuestion();

    TimerFunction();
    wrongrightEl.text("");
}

const AdjustTime = (x) => {
    if(x > 0) {
        currentTIme += x;
    }

    timerEl.text(currentTIme);
}

const PopulateNextQuestion = () => {
    //roll to select question
    var roll = Math.floor(Math.random() * keysLength);
    var componentObject = questionHolder.qOne;

    if(roll == 1)   {
        componentObject = questionHolder.qTwo;
    } else if(roll == 2) {
        componentObject = questionHolder.qThree;
    } else if(roll == 3) {
        componentObject = questionHolder.qFour;
    } else if(roll == 4) {
        componentObject = questionHolder.qFive;
    } else if(roll == 5) {
        componentObject = questionHolder.qSix;
    } else if(roll == 6) {
        componentObject = questionHolder.qSeven;
    } else if(roll == 7) {
        componentObject = questionHolder.qEight;
    } else if(roll == 8) {
        componentObject = questionHolder.qNine;
    } else if(roll == 9) {
        componentObject = questionHolder.qTen;
    } else {
        componentObject = questionHolder.qOne;
    }

    console.log(roll + "  :  " + componentObject);
    questionEl.text(componentObject.question);

    for(let i = 0; i < answerBtns.length; i++) {
        $(answerBtns[i]).children('p2').text((i + 1) + " : " + componentObject.answers[i]); 
        //$(answerBtns[i]).children('p2').text((i + 1) + " : " + questionOne.answers[i]);
    }
}

const CheckAnswer = (x) => {
    if(x == componentObject.correct) {
        //Win condition
        wrongrightEl.text("Right!");
    } else {
        //Lose condition
        wrongrightEl.text("Wrong!");
    }
}

const CalculateScore = (x) => {
    scoreTracker += 10 + perQuestionTime;
}

const GameOver = () => {
    clearInterval(timerInterval);

    var gameOverEl = $("<h2>");
    gameOverEl.text("GAME OVER!");
    gameOverEl.css("text-align", "center");

    console.log(answerBtns.length);
    var holdLength = answerBtns.length;

    for(let i = 0; i < holdLength; i++)  {
        answerBtns[0].remove();
    }

    //Save Score Here
    questionEl.hide();
    containerEl.append(gameOverEl);
    scoreTracker = 0;
}

startButtonEl.on('click', StartGame);


//need to set up dynamically adding and removing buttons
//need to compare answer to correct for wrong/right and scoring
//need to add score