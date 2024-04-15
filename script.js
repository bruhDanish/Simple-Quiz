const questions = [
    {
        question: "What is the full form of HTML?",
        answers:[
            {text: "Hyper Text Markup Language", correct: true},
            {text: "Hyper Text Markdown Language", correct: false},
            {text: "Higher Text Markup Language", correct: false},
            {text: "Hyper Turn Markup Language", correct: false}
        ]
    },
    {
        question: "What is the full form of CSS?",
        answers:[
            {text: "Cascading Styles Sheet", correct: false},
            {text: "Cascade Style Sheet", correct: false},
            {text: "Cascading Style Sheet", correct: true},
            {text: "Cascading Styling Sheet", correct: false},
        ]
    },
    {
        question: "What is the full form of JS?",
        answers:[
            {text: "JavaScript", correct: true},
            {text: "JavaScripting", correct: false},
            {text: "JavaSheet", correct: false},
            {text: "JavaShrink", correct: false}
        ]
    },
    {
        question: "What is the full form of PHP?",
        answers:[
            {text: "Highertext Preprocessor", correct: false},
            {text: "Hypertext Preprocessor", correct: true},
            {text: "Hypertext Preprocessing", correct: false},
            {text: "Hypertexting Preprocessors", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("a-btns");
const nxtBtn = document.getElementById("nxt-btn");


let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nxtBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion= questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nxtBtn.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nxtBtn.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Your Score is ${score} out of ${questions.length}!`;
    nxtBtn.innerHTML = "Restart";
    nxtBtn.style.display = "block";
}

function handleNextBtn(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nxtBtn.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextBtn();
    }else{
        startQuiz();
    }
})

startQuiz();

