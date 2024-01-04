var timerEl = $("#timer-span");
var containerEl = $(".container");
var questionEl = $("#question-head");
var answerButtonParentEl = $(".answer-btns");
var scoreEl = $("#score");
var wrongrightEl = $("#wrong-right");

var scoreButtonEl = $(".score-btn");
var startButtonEl = $(".start-btn");

let timerInterval;
let questionInterval;

var startTime = 60;
var currentTIme = 0;
var perQuestionTime = 10;
var scoreTracker = 0;

var gameState = false;
var scoresOpen = false;
var gameOverEl;
var saveScoreForm;

let questionOne = {
    question: "What does DOM stand for?",
    answers: ["Direct Open Market", "Data Oriented Model", "Document Object Model", "Document Order Mode"],
    correct: 2,
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

var componentObject = questionHolder.qOne;
var qHolderValues = Object.values(questionHolder);
var keysLength = Object.keys(questionHolder).length;

const TimerFunction = () => {
    timerInterval = setInterval(function() {
        currentTIme--;
        AdjustTime();
        if(currentTIme < 1)    {
            GameOver();
            return;
        }
    }, 1000);
}

const StartGame = () => {
    if(gameState)   { return; }

    if(gameOverEl)  { gameOverEl.remove(); }

    if(saveScoreForm) { saveScoreForm.remove(); }

    gameState = true;
    scoreTracker = 0;
    questionEl.show();
    startButtonEl.hide();

    if(timerInterval)   { clearInterval(timerInterval); }

    console.log(questionHolder.qOne.question);
    currentTIme = startTime;
    AdjustTime();

    PopulateNextQuestion();

    TimerFunction();
    wrongrightEl.text("");
}

const AdjustTime = () => {
    if(currentTIme < 10 && currentTIme > 0)    {
        timerEl.text("0" + currentTIme);
    } else if(currentTIme < 0)  {
        timerEl.text("0");
        //GameOver();
    } else {
        timerEl.text(currentTIme);
    }
}

const PopulateNextQuestion = () => {
    //roll to select question
    var roll = Math.floor(Math.random() * keysLength);
    perQuestionTime = 10;

    componentObject = qHolderValues[roll];

    /*if(roll == 1)   {
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
    }*/

    console.log("Populating: " + roll + "  :  " + componentObject);
    questionEl.text(componentObject.question);

    for(let j = 0; j < 4; j++) {
        var aButton = $("<button>");
        var textTag = $("<p2>");
        
        textTag.text((j + 1) + " : " + componentObject.answers[j]);
        aButton.addClass("answer-btn");
        aButton.on('click', function() {
            var dex = j;
            CheckAnswer(j);
        });

        aButton.append(textTag);
        answerButtonParentEl.append(aButton);
    }

    var questionTimer = $("<h2>");
    questionTimer.addClass("question-timer");
    questionTimer.text(perQuestionTime);
    questionTimer.css("text-align", "center");
    containerEl.append(questionTimer);

    questionInterval = setInterval(function() {
        perQuestionTime--;
        questionTimer.text(perQuestionTime);
        if(perQuestionTime < 1) {
            TimeOutQuestion();
            return;
        }
    }, 1000);
}

const CheckAnswer = (x) => {
    console.log(x);

    if(x == componentObject.correct) {
        //Win condition
        wrongrightEl.text("Right!");
        CalculateScore(perQuestionTime);
        AdjustTime();
    } else {
        //Lose condition
        wrongrightEl.text("Wrong!");
        currentTIme -= perQuestionTime;
        AdjustTime();
    }
    
    clearInterval(questionInterval);
    perQuestionTime = 10;

    CleanElements();
}

const CleanElements = () => {
    var buttonContainerLength = answerButtonParentEl.children().length;
    containerEl.children('h2').remove();

    for(let i = 0; i < buttonContainerLength; i++) {
        answerButtonParentEl.children(0).remove();
    }
    
    PopulateNextQuestion();
}

const TimeOutQuestion = () => {
    clearInterval(questionInterval);
    wrongrightEl.text("Time Out!");
    CleanElements();
}

const CalculateScore = (x) => {
    clearInterval(questionInterval);
    scoreTracker += 10 + perQuestionTime;
    scoreEl.text("Score: " + scoreTracker);
}

const GameOver = () => {
    clearInterval(timerInterval);
    clearInterval(questionInterval);
    AdjustTime();

    gameOverEl = $("<h2>");
    gameOverEl.text("GAME OVER!");
    gameOverEl.css("text-align", "center");

    var buttonContainerLength = answerButtonParentEl.children().length;

    for(let i = 0; i < buttonContainerLength; i++)  {
        answerButtonParentEl.children(0).remove();
    }

    //Save Score Here
    saveScoreForm = $("<form>")
    var initialInput = $("<input>");
    var initialLabel = $("<label>");
    var saveScore = $("<button>");

    saveScore.addClass("head-btn");
    saveScoreForm.addClass("save-score-form");
    initialInput.attr("id", "initial-input");
    initialLabel.attr("for", "initial-input");

    saveScoreForm.prepend(initialLabel);
    saveScoreForm.append(initialInput);
    saveScoreForm.append(saveScore);
    initialInput.attr("placeholder", "GBG");
    initialInput.attr("maxLength", "3");

    saveScore.text("Save Score");
    initialLabel.text("Initials: ");

    saveScore.css("justify-content", "baseline");
    initialLabel.css("font-family", "Verdana, Geneva, Tahoma, sans-serif");
    initialInput.css("font-family", "Verdana, Geneva, Tahoma, sans-serif");

    //saveScore.on('click', SaveScore(event, initialInput.val()));
    saveScore.on('click', function(event) {
        event.preventDefault();
        console.log(initialInput.val());
        SaveScore(initialInput.val(), saveScoreForm);
    });
    containerEl.append(saveScoreForm);

    questionEl.hide();
    startButtonEl.show();
    containerEl.children('h2').remove();
    containerEl.prepend(gameOverEl);
    gameState = false;
}

const SaveScore = (x, y) => {
    if(x == "" || x == null) {x = "AAA";}
    localStorage.setItem(x, scoreTracker);
    y.remove();
}

const ShowHighScores = () => {
    if(gameState || scoresOpen)   {return;}

    scoresOpen = true;
    var maxScores = 10;
    var previousValue = 0;

    var addDiv = $("<div>");
    addDiv.addClass("high-score-table");

    for(let i = 0; i < localStorage.length; i++) {
        if(maxScores <= 0) { continue; }

        var aScore = $("<div>");
        var scoreVal = $("<h2>");
        var storedVal = localStorage.getItem(localStorage.key(i));

        aScore.css("width", "100%");
        scoreVal.addClass("high-score-values");
        scoreVal.text(localStorage.key(i) + " : " + storedVal);
        aScore.append(scoreVal);

        //very simple sory could definitely do a more sophisticated one
        if(storedVal > previousValue) {
            addDiv.prepend(aScore);
        } else {
            addDiv.append(aScore);
        }

        previousValue = storedVal;
        maxScores--;
    }

    var title = $("<h2>");
    title.addClass("head-score-title");
    title.text("High Scores");
    title.css("text-align, border-bottom", "center, 1 rem solid var(--yellowColor");
    addDiv.prepend(title);

    var closeButton = $("<button>");
    closeButton.addClass("close-button");
    closeButton.text("X");

    closeButton.on("click", function() {
        scoresOpen = false;
        addDiv.remove();
        this.remove();
    });

    containerEl.append(closeButton);
    containerEl.append(addDiv);
}

startButtonEl.on('click', StartGame);
scoreButtonEl.on('click', ShowHighScores);


//per question interval
//need to set up dynamically adding and removing buttons
//need to compare answer to correct for wrong/right and scoring
//need to add score

//need save score system