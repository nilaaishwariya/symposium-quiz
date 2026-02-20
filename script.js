const questions = [
    {
        question: "Which algorithm has the best average-case time complexity for sorting?",
        options: ["Bubble Sort", "Merge Sort", "Insertion Sort", "Selection Sort"],
        answer: 1
    },
    {
        question: "Which protocol is used for secure web browsing?",
        options: ["HTTP", "FTP", "SSH", "HTTPS"],
        answer: 3
    },
    {
        question: "What does ACID stand for in databases?",
        options: [
            "Atomicity, Consistency, Isolation, Durability",
            "Accuracy, Consistency, Isolation, Data",
            "Atomicity, Concurrency, Integrity, Durability",
            "Availability, Consistency, Isolation, Data"
        ],
        answer: 0
    },
    {
        question: "Which OSI layer handles encryption?",
        options: ["Transport", "Presentation", "Session", "Application"],
        answer: 1
    },
    {
        question: "What is the time complexity of binary search?",
        options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
        answer: 1
    },
    {
        question: "Which language is primarily used for Android development?",
        options: ["Swift", "Kotlin", "Ruby", "Go"],
        answer: 1
    },
    {
        question: "Which port does HTTPS use by default?",
        options: ["21", "80", "443", "25"],
        answer: 2
    },
    {
        question: "What is a deadlock in operating systems?",
        options: [
            "Infinite loop",
            "Two processes waiting on each other",
            "Memory leak",
            "CPU overload"
        ],
        answer: 1
    },
    {
        question: "Which database is NoSQL?",
        options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"],
        answer: 2
    },
    {
        question: "What does REST stand for?",
        options: [
            "Representational State Transfer",
            "Remote Execution Secure Transfer",
            "Reliable Encryption System Transfer",
            "Random Execution State Technique"
        ],
        answer: 0
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 20;
let timer;

const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const timeDisplay = document.getElementById("time");
const progressBar = document.getElementById("progress-bar");

function startTimer() {
    timeLeft = 20;
    timeDisplay.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function loadQuestion() {
    clearInterval(timer);
    startTimer();

    const q = questions[currentQuestion];
    questionContainer.textContent = q.question;
    optionsContainer.innerHTML = "";

    q.options.forEach((option, index) => {
        const btn = document.createElement("div");
        btn.textContent = option;
        btn.classList.add("option");
        btn.onclick = () => selectAnswer(index, btn);
        optionsContainer.appendChild(btn);
    });

    progressBar.style.width = ((currentQuestion) / questions.length) * 100 + "%";
}

function selectAnswer(index, btn) {
    clearInterval(timer);
    const correctAnswer = questions[currentQuestion].answer;
    const options = document.querySelectorAll(".option");

    options.forEach(opt => opt.style.pointerEvents = "none");

    if (index === correctAnswer) {
        btn.classList.add("correct");
        score++;
    } else {
        btn.classList.add("wrong");
        options[correctAnswer].classList.add("correct");
    }
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.querySelector(".quiz-container").classList.add("hidden");
    const resultContainer = document.getElementById("result-container");
    resultContainer.classList.remove("hidden");
    document.getElementById("score-text").textContent =
        `You scored ${score} out of ${questions.length}`;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById("result-container").classList.add("hidden");
    document.querySelector(".quiz-container").classList.remove("hidden");
    loadQuestion();
}

nextBtn.onclick = nextQuestion;
loadQuestion();
