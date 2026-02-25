const questions = [{
    question:"How many pyramids are at the Giza plateau? (Including the queens)",
    answers:[
      {text: "6 pyramids", correct: false},
      {text: "9 pyramids", correct: true},
      {text: "10 pyramids", correct: false},
      {text: "12 pyramids", correct: false}  
    ]

},

{
    question:"What do Greek celebrate on October 28th?",
    answers:[
      {text: "Ohi <όχι> day (to Ottomans)", correct: false},
      {text: "Independence day 1821 (from Italy)", correct: false},
      {text: "Independence day 1821 (from Ottomans)", correct: false},
      {text: "Ohi <όχι> day (to Italy)", correct: true}  
    ]

},

{
    question:"Whats the elevation of Mount Everest?",
    answers:[
      {text: "8,529m", correct: false},
      {text: "8,243m", correct: false},
      {text: "8,849m", correct: true},
      {text: "8,950m", correct: false}  
    ]

},

{
    question:"How many planets do we have in our solar system?",
    answers:[
      {text: "6 planets", correct: false},
      {text: "8 planets", correct: true},
      {text: "9 planets", correct: false},
      {text: "10 planets", correct: false}  
    ]

}

];

const startBtn = document.getElementById("start");
const intro = document.querySelector(".quiz-intro");
const questionForm = document.querySelector(".quiz-form");

startBtn.addEventListener("click", () => {
  intro.classList.add("remove"); 
  questionForm.classList.remove("remove");
  
});

const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const scoreInfo = document.getElementById("score");
const timeleft = document.getElementById("timeleft");
const start = document.getElementById("start");

let currentIndex = 0;
let score = 0;
let correctQuestions = 0;
let interval;

start.addEventListener("click", startQuiz);

function startQuiz(){
  currentIndex = 0;
  score = 0;
  correctQuestions = 0;
  nextBtn.innerHTML = "Next";
  showQuestion()
}

function showQuestion(){
  timer(7);
  resetState();
  timeleft.classList.remove("hide");
  scoreInfo.classList.remove("hide");
  let currentQuestion = questions[currentIndex];
  let questionNo = currentIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("answersBtn");
    answerElement.appendChild(button);

    if (answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });

}

function resetState(){ 
  nextBtn.classList.add("hide");
  timeleft.classList.add("hide");
  scoreInfo.classList.add("hide");
  scoreInfo.innerHTML = `Score: ${score}`;
  while(answerElement.firstChild){
    answerElement.removeChild(answerElement.firstChild);
  }

}

function selectAnswer(e){
  clearInterval(interval);
  const selectedBtn = e.target.closest("button");
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score += 25;
    correctQuestions++;
  }else{
    selectedBtn.classList.add("incorrect");
    score = Math.max(0, score - 25);
  }
  scoreInfo.innerHTML = `Score: ${score}`
  Array.from(answerElement.children).forEach(btn => {
  if(btn.dataset.correct === "true"){
    btn.classList.add("correct");
  }
  btn.disabled = true;
    });
 
nextBtn.style.visibility="visible";
}

function showScore(){
  resetState();
  questionElement.innerHTML = `You answered ${correctQuestions} out of ${questions.length} questions correctly. <br>Your score is ${score} out of 100.`;
  nextBtn.innerHTML = "Play  Again";
  nextBtn.style.visibility = "visible";
}

function handleNextButton(){
  currentIndex++;
  if (currentIndex < questions.length){
    showQuestion();
  }else{
    showScore();
  }
  
}

nextBtn.addEventListener("click", () => { 
  if(currentIndex < questions.length){
    handleNextButton();
  }else{
    startQuiz();
  }
});


function timer(seconds){
  clearInterval(interval);
  timeleft.innerHTML = seconds;
  let time = seconds;
  interval = setInterval(() => {
    time = Math.max(0, time - 1)
    timeleft.innerHTML = time;
  
    if (time <= 0){
      clearInterval(interval);
      currentIndex++;
      score = Math.max(0, score - 25);
      showQuestion();
    }
  },1000)
}
