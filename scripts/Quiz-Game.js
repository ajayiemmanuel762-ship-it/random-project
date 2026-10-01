//DOM ELEMEMTS(PICKING ELEMENTS FROM MY HTML TO MY JAVASCRIPT).
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const currentQuestionSpan = document.getElementById("current-question");
const answersContainer = document.getElementById("answers-container");
const ProgressBar = document.getElementById("progress");
const resultScreen = document.getElementById("result-screen");
const maxScoreSpan = document.getElementById("max-score");
const finalScoreSpan = document.getElementById("final-score");
const resultMessage = document.getElementById("result-message");
const totalQuestionSpan = document.getElementById("total-questions");
const questionText = document.getElementById("question-text");
const startButton = document.getElementById("start-btn");
const restartButton = document.getElementById("restart-btn");
const scoreSpan = document.getElementById("score");

//MY QUIZ QUESTIONS ARE AS FOLLOWS(DID IT WITH AN ARRAY, A SPECIAL JAVASCRIPT OBJECT)
const quizQuestions = [
  {
    question: "Who codes with this laptop?",
    answers: [
      { text: "Naza", correct: false},
      { text: "Bay", correct: false}, 
      { text: "Chiboy", correct: true},
      { text: "Other", correct: false},
    ],
  },
  {
    question: "They say I no normal nah true?",
    answers: [
      { text: "Yessss", correct: false},
      { text: "Nahhh", correct: true},
      { text: "Maybe", correct: false},
      { text: "I don't know", correct: false},
    ],
  },
  {
    question: "select the right answer below?",
    answers: [
      { text: "Introvert", correct: false},
      { text: "Extrovert", correct: false},
      { text: "Ambivert", correct: false},
      { text: "Mysterious", correct: true},
    ],
  },
  {
    question: "which of these below is one of the most dangerous places in the World?",
    answers: [
      { text: "Nigeria", correct: true},
      { text: "Sambisa", correct: false},
      { text: "Australia", correct: false},
      { text: "None of the above", correct: false},
    ],
  },
  {
    question: "What word is spelled incorrectly in the dictionary?",
    answers: [
      { text: "Aple", correct: false},
      { text: "Pomise", correct: false},
      { text: "Incorrectly", correct: true},
      { text: "None of the above", correct: false},
    ],
  },
  {
    question: "What can one catch but can not throw?",
    answers: [
      { text: "Air", correct: false},
      { text: "Catarrh", correct: false},
      { text: "Mosquito", correct: false},
      { text: "Cold", correct: true},
    ],
  },
  {
    question: "Who among these people is a genuine Man United fan?",
    answers: [
      {text: "AY", correct: false},
      {text: "Bay", correct: false},
      {text: "Joshua", correct: false},
      {text: "none of the above", correct: true},
    ],
  },
  {
    question: "How would you describe this quiz questions?",
    answers: [
      {text: "Ragebaiting", correct: false},
      {text: "Hilarious", correct: true},
      {text: "Stupid", correct: false},
      {text: "Great", correct: false},
    ],
  },
  {
    question: "If a plane crashes on the border between the United States and Canada, where do they bury the survivors?",
    answers: [
      {text: "United State of America", correct: false},
      {text: "Canada", correct: false},
      {text: "Nowhere", correct: true},
      {text: "None of the above", correct: false},
    ],
  },
  {
    question: "What will you actually find at the end of every rainbow",
    answers: [
      {text: "Yellow", correct: false},
      {text: "Blue", correct: false},
      {text: "W", correct: true},
      {text: "White", correct: false},
    ]
  }
];

//QUIZ STATE VARS(VARIABES).
let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;

totalQuestionSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

//NOW ADDING EVENT LISTENERS.
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  //RESET VARS
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion()
}

function showQuestion() {
  //RESET STATE
  answerDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex]

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  ProgressBar.style.width = progressPercent + "%"

  questionText.textContent = currentQuestion.question

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) =>{
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    // A DATASET IS A PROPERTY OF THE BUTTON ELEMENT THAT ALLOWS ME TO STORE CUSTOM DATA
    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  })
};

function selectAnswer(event) {
//OPTIMIZATION CHECK
  if(answerDisabled) return;

  answerDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  //HERE ARRAY.FROM() IS USED TO CONVERT THE NODELIST RETURNED BY ANSWER CONTAINER CHILDREN INTO AN ARRAY, THIS IS BECAUSE THE NODELIST IS NOT AN ARRAY AND I NEED TO USE USE forEach METHOD(()=>{}) 
  Array.from(answersContainer.children).forEach((button)=>{
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if(isCorrect) {
    score++
    scoreSpan.textContent = score
  }

  setTimeout(()=>{
    currentQuestionIndex++
    //NOW HAVE TO CHECK IF THERE ARE MORE QUESTIONS OR IF THE QUIZ IS OVER
    if(currentQuestionIndex < quizQuestions.length) {
      showQuestion()
    } else {
      showResults()
    }
  }, 1000)
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! you sabi!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Sabi boy!!"
  } else if (percentage >= 60) {
    resultMessage.textContent = "Omo, you try sha"
  } else if (percentage >= 40) {
    resultMessage.textContent = "Omo! you go sabi book so?"
  } else {
    resultMessage.textContent = "Baba dy go"
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");

  startQuiz();
}