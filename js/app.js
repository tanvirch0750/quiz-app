 const questionNumber = document.querySelector('.question-number');
 const questionText = document.querySelector('.question-text');
 const optionContainer = document.querySelector('.option-container');
 const nextBtn = document.querySelector('.next');
 const answersIndicator = document.querySelector('.answers-indicator');
 const homeBox = document.querySelector(".home-box");
 const resultBox = document.querySelector(".result-box");
 const quizBox = document.querySelector(".quiz-box");
 const tryAgain = document.querySelector(".try-again");
 const goToHome = document.querySelector(".go-to-home");
 const startQuizBtn = document.querySelector(".start-quiz");


 let questionCounter = 0;
 let currentQuestion;
 let availableQuestions = [];
 let availableOptions = [];
 let correctAnswers = 0;
 let attempt = 0;

 // push the question into availableQuestion Array
  function setAvailableQuestion(){
    quiz.forEach(q => {
      availableQuestions.push(q);
    });
 };

 // set question number and question and options 
function getNewQuestion(){
  // set question number
  questionNumber.innerHTML = `Question ${questionCounter + 1} of ${quiz.length}`;

  // set question text
  // get random question
  const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
  currentQuestion = questionIndex;
  questionText.innerHTML = currentQuestion.q;

  // get the position of 'questionIndex' from the available question Array;
  const index1 = availableQuestions.indexOf(questionIndex);
  
  // remove the 'questionIndex' from the availableQuestion Array, so that question does not repeat;
  availableQuestions.splice(index1, 1)

  // set options
  // push options to available options array
  currentQuestion.options.forEach((opt, idx) => {
    availableOptions.push(idx);
  });

  optionContainer.innerHTML = '';
  let animationDelay = 0.2;

  //create options in html
  currentQuestion.options.forEach((opt, idx) => {
    // random option
    const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
    console.log(optionIndex);
    // get the position of option index from the available option
    const index2 = availableOptions.indexOf(optionIndex);
    // remove the optionIndex from the available options, so that the option does not repeat
    availableOptions.splice(index2, 1);
    // create options in html
    const option = document.createElement("div");
    option.innerHTML = currentQuestion.options[optionIndex];
    option.id = optionIndex;
    option.style.animationDelay = animationDelay + 's';
    animationDelay = animationDelay + 0.2;
    option.className = 'option';
    optionContainer.appendChild(option);
    option.setAttribute("onclick", "getResult(this)");
  });

  questionCounter++
}

// get the result of current attempt question
function getResult(element){
  const id = parseInt(element.id);
  if(id === currentQuestion.answer){
    element.classList.add("correct");
    updateAnswerIndicator('correct');
    correctAnswers++;
  }else{
    element.classList.add("wrong");
    updateAnswerIndicator('wrong');
    const optionLen = optionContainer.children.length;
    for(let i=0; i<optionLen; i++){
      if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
        optionContainer.children[i].classList.add("correct");
      }
    }
  }
  attempt++;
  unClickableOptions();
}

// make all the options unclickable once user select a option 
function unClickableOptions(){
  const optionLen = optionContainer.children.length;
  for(let i=0; i<optionLen; i++){
    optionContainer.children[i].classList.add('already-answered');
  }
}

function answerIndicator(){
  answersIndicator.innerHTML = '';
  quiz.forEach((q, idx) => {
    const indicator = document.createElement("div");
    answersIndicator.appendChild(indicator);
  })
}

function updateAnswerIndicator(markType){
  answersIndicator.children[questionCounter-1].classList.add(markType)
}

nextBtn.addEventListener('click', () => {
  if(questionCounter === quiz.length){
    console.log("quiz-over");
    quizOver();
  }else{
    getNewQuestion();
  }
})

function resetQuiz(){
  questionCounter = 0;
  correctAnswers = 0;
  attempt = 0;
};

startQuizBtn.addEventListener('click', () => {
  startQuiz();
})

tryAgain.addEventListener('click', () => {
  resultBox.classList.add("hide");
  quizBox.classList.remove("hide");
  resetQuiz();
  startQuiz();
});

goToHome.addEventListener('click', () => {
  resultBox.classList.add("hide");
  homeBox.classList.remove("hide");
  resetQuiz();
})

function quizOver(){
  quizBox.classList.add("hide");
  resultBox.classList.remove('hide');
  quizResult();
}

function quizResult(){
  resultBox.querySelector(".total-question").innerHTML = quiz.length;
  resultBox.querySelector(".total-attempt").innerHTML = attempt;
  resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
  resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
  const percentage = (correctAnswers/quiz.length)*100;
  resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + '%';
  resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + quiz.length;
}

 function startQuiz(){
  homeBox.classList.add("hide");
  quizBox.classList.remove("hide");

  setAvailableQuestion();
  getNewQuestion();
  answerIndicator();
 }

 window.onload = function(){
   homeBox.querySelector('.total-question').innerHTML = quiz.length;
 }