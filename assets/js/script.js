//Stored DOM elements in variables//
var quizIntro = document.querySelector('.quiz-intro')
var questionPage = document.querySelector('.question-page')
var finishedScreen = document.querySelector('.finished-screen')

var questionEl = document.querySelector('.question');
var answerButtons = document.querySelectorAll('.answer-button')
var ab1 = document.querySelector('#a-b1')
var ab2 = document.querySelector('#a-b2')
var ab3 = document.querySelector('#a-b3')
var ab4 = document.querySelector('#a-b4')


var startButton = document.querySelector('.start-button')
var timerElement = document.querySelector('.timer-count')
var initialsbox = document.querySelector('.initials-box')
var initialsbutton = document.querySelector('.initials-button')
var highScores = document.querySelector('.high-scores')
var viewHighScores = document.querySelector('.view-scores')
var goBackButton = document.querySelector('.go-back')
var clearButton = document.querySelector('.clear-scores')

var result = document.querySelector('.results')
var finalScore = document.querySelector(".final-score");

//Initialize variables//
var timer;
var timerCount;
var questionInterval = 0;
var questionArray = [
    {
        questionEl: 'Which of the following is used to declare a variable in JavaScript?',
        options: ['a. var', 'b. let', 'c. const', 'd. All of the above'],
        answer: 'd. All of the above'
    },
    {
        questionEl: 'Which of the following is used to select an HTML element using its class name in JavaScript?',
        options: ['a. getElementbyID()', 'b. getElementbyClassName()', 'c. querySelector()', 'd. querySelectorAll()'],
        answer: 'b. getElementbyClassName()'
    },
    {
        questionEl: 'Which of the following methods is used to add a new element to the end of an array in JavaScript?',
        options: ['a. push()', 'b. pop()', 'c. shift()', 'd. unshift()'],
        answer: 'a. push()'
    },
    {
        questionEl: 'Which of the following JavaScript compariosn operators checks if two values are equal in value and type?',
        options: ['a. ==', 'b. >=', 'c. ===', 'd. <='],
        answer: 'c. ==='
    }
]

//functions//
// 1. Start Game//
function startGame() {
    timerCount = 75;
    startButton.disabled = true;
    startTimer()
    quizIntro.style.display='none';
    questionPage.style.display='block';
    displayQuestion(questionInterval);
}

// 2. Start Timer
function startTimer() {
    // Set the timer
    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = timerCount;
    //Tests if time has run out
    if (timerCount<=0) {
        clearInterval (timer);
        gameOver();
    } else if (questionInterval >= questionArray.length) {
        clearInterval(timer);
        gameOver();
    }
}, 1000);
}


//3. Display Question Function//
function displayQuestion(n) {
    questionEl.textContent = questionArray[n].questionEl;
    ab1.textContent = questionArray[n].options[0];
    ab2.textContent = questionArray[n].options[1];
    ab3.textContent = questionArray[n].options[2];
    ab4.textContent = questionArray[n].options[3];
    questionInterval = n;
  };

  function checkAnswer (event) {
    event.preventDefault();
    result.style.display = 'block';
    setTimeout(function () {
        result.style.display = 'none';
    }, 1000);

    var selectedOption = event.target.textContent;
    var correctAnswer = questionArray[questionInterval].answer;

    if (selectedOption === correctAnswer) {
        result.textContent = 'Correct!';
    } else {
        timerCount -= 10;
        result.textContent = 'Incorrect!';
    }

    if (questionInterval < questionArray.length) {
        questionInterval++;
        displayQuestion(questionInterval);
    }  else {
        gameOver();
    }

  };

  function gameOver () {
    questionPage.style.display = 'none';
    finishedScreen.style.display = 'block';
    finalScore.textContent = 'Your final score is:' + timerCount;
  };

  function displayScores(scores) {
    scores.sort(function (a,b) {
        return b.score - a.score;
    });
    var scoreList = document.querySelector('.score-list');
    scoreList.innerHTML = '';
    scores.forEach(function(scoreObj) {
        var li = document.createElement('li');
        li.textContent = scoreObj.initials + ': ' + scoreObj.score;
        scoreList.appendChild(li);
    });
};

function clearScores() {
    localStorage.removeItem('scores');
    displayScores([]); 
  };


// 3. Event Listeners //
startButton.addEventListener('click', startGame);

answerButtons.forEach (function (click) {
    click.addEventListener('click', checkAnswer);
});

initialsbutton.addEventListener('click',function(event){
    event.preventDefault();
    var scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.push({ initials: initialsbox.value, score: timerCount }); 
    localStorage.setItem('scores', JSON.stringify(scores));
    initialsbox.style = 'display: none;';
    initialsbutton.style = 'display: none;';
    highScores.style = 'display: block';
    displayScores(scores);
});

goBackButton.addEventListener('click', function (event) {
    event.preventDefault();
    finishedScreen.style.display = 'none';
    quizIntro.style.display = 'block';
    highScores.style.display = 'none';
    questionPage.style.display = 'none';
    location.reload();
});

viewHighScores.addEventListener("click", function (event) {
    event.preventDefault();
    finishedScreen.style.display = "none";
    quizIntro.style.display = "none";
    highScores.style.display = "block";
    questionPage.style.display = "none";
    var scores = JSON.parse(localStorage.getItem('scores')) || [];
    displayScores(scores);
});

clearButton.addEventListener('click', clearScores);


