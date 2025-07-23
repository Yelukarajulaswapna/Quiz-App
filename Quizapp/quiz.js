const questions=[
    {
        question:"What is the output of typeof null in JavaScript?",
        answers:[
            { text:"Object",correct:true},
            { text:"Null",correct:false},
            { text:"Undefine",correct:false},
            { text:"Number",correct:false}
        ]
    },
    {
        question:"What does the === operator do in JavaScript?",
        answers:[
            { text:"Compares values and types",correct:true},
            { text:"Compares values only",correct:false},
            { text:"Assigns value",correct:false},
            { text:"Compares references only",correct:false}
        ]
    },
    {
        question:"How do you create an arrow function in JavaScript?",
        answers:[
            { text:"function() => {}",correct:false},
            { text:"=> function()",correct:false},
            { text:"function =>() {}",correct:false},
            { text:"() => {}",correct:true}
        ]
    },
    {
        question:"What is the purpose of the let keyword in JavaScript (ES6)?",
        answers:[
            { text:"To create a global variable",correct:false},
            { text:"To declare a block-scoped variable",correct:true},
            { text:"To declare a constant",correct:false},
            { text:"To create a private variable",correct:false}
        ]
    }
];
const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-button");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+". "+ currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    })
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML=`Your score ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})


startQuiz();