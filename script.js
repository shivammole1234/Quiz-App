const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false }
        ]
    },
    {
        question: "Which is the highest peak in the world?",
        answers: [
            { text: "Mt. Everest", correct: true },
            { text: "Mount Kilimanjaro", correct: false },
            { text: "Chimborazo", correct: false },
            { text: "Vesuvius", correct: false }
        ]
    },
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Paris", correct: true },
            { text: "London", correct: false },
            { text: "Berlin", correct: false },
            { text: "Rome", correct: false }
        ]
    },
    {
        question: "Who is the CEO of Microsoft?",
        answers: [
            { text: "Satya Nadella", correct: true },
            { text: "Bill Gates", correct: false },
            { text: "Steve Jobs", correct: false },
            { text: "Tim Cook", correct: false }
        ]
    },
    {
        question: "In what year was JavaScript invented?",
        answers: [
            { text: "1984", correct: false },
            { text: "1995", correct: true },
            { text: "2003", correct: false },
            { text: "2016", correct: false }
        ]
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: [
            { text: "Jupiter", correct: true },
            { text: "Earth", correct: false },
            { text: "Mars", correct: false },
            { text: "The Sun", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const ansButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQueIndex = 0;
let score = 0;

function startQuiz() {
    currentQueIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQue = questions[currentQueIndex];
    const questionNo = currentQueIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQue.question;

    currentQue.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        ansButtons.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while(ansButtons.firstChild) {
        ansButtons.removeChild(ansButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(ansButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQueIndex++;

    if (currentQueIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQueIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
