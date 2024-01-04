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
    question: "Which of the following is a valid way to transform an element?",
    answers: ["Rotate", "Skew", "Scale", "All Of The Above"],
    correct: 3,
}

let questionThree = {
    question: "How would you target the root of an HTML file to declare variables?",
    answers: ["   .root", "   root", "   :root", "   <root>"],
    correct: 2,
}

let questionFour = {
    question: "What keyphrase do you use in the console window in order to generate a new file?",
    answers: ["touch", "file", "new", "html"],
    correct: 0,
}

let questionFive = {
    question: "What function stops a form from refreshing the page?",
    answers: ["stopPropagation()", "preventDefault()", "cancelRefresh()", "end()"],
    correct: 1,
}

let questionSix = {
    question: "How do you access items stored in local storage?",
    answers: ["storage.get(key)", "localStorage(key)", "localStorage.getItem(key)", "localStorage.key(value)"],
    correct: 2,
}

let questionSeven = {
    question: "Which keyphrase would you use to check to see when a user presses DOWN?",
    answers: ["keyDown", "keydown", "keyUp", "All Of The Above"],
    correct: 1,
}

let questionEight = {
    question: "What keyphrase do you use in javascript to declare a variable",
    answers: ["let", "var", "const", "All Of The Above"],
    correct: 3,
}

let questionNine = {
    question: "Whick keyphrase would you use to check when the mouse passes over an element?",
    answers: ["mouseMove", "mousedown", "mousethrough", "mouseover"],
    correct: 3,
}

let questionTen = {
    question: "What notation would you use to get a child from a list?",
    answers: ["[]", "()", "{}", "<>"],
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

    saveScore.on('click', function(event) {
        event.preventDefault();
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
    //set default save to AAA
    if(x == "" || x == null) { x = "AAA"; }
    var checkHigher = localStorage.getItem(x);
    //check for and get saved score
    if(checkHigher > scoreTracker)  { return; }
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