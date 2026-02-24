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
      {text: "8 planets", correct: true},
      {text: "9 planets", correct: false},
      {text: "6 planets", correct: false},
      {text: "10 planets", correct: false}  
    ]

}

];

const startBtn = document.getElementById("start");
const intro = document.getElementsByClassName(".quiz-intro");
const questionForm = document.getElementsByClassName(".quiz-form");

questionForm.style.display="none";
startBtn.addEventListener("click", () => {
  
});

const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;
let score = 0;

function startQuiz(){
  currentIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  showQuestion()
}

function showQuestion(){
  resetState();
  let currentQuestion = questions[currentIndex];
  let questionNo = currentIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("answersBtn");
    answerElement.appendChild(button);
  });

}

function resetState(){ 
  nextBtn.style.display = "none";
  while(answerElement.firstChild){
    answerElement.removeChild(answerElement.firstChild);
  }

}

startQuiz();