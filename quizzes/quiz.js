
let currentQuestion = 0;
let quizData = null;
let shuffledQuestions = [];
let selectedAnswer = null;
let score = 0;
let userAnswers = {};

function quiz(subject, num) {
    const quizPaths = {
        geografia: `quizzes/test${num}.json`,
        biologia: `quizzes/test${num}.json`,
        angielski: `quizzes/test${num}.json`
    };

    if (quizPaths[subject]) {
        loadQuiz(quizPaths[subject]);
    } else {
        showWorkInProgress();
    }
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function loadQuiz(jsonPath) {
    fetch(jsonPath)
        .then(response => response.json())
        .then(data => {
            quizData = data;

            const questionsArray = Object.keys(data).map(key => {
                const question = data[key];

                const answers = [
                    { key: 'a', text: question.a },
                    { key: 'b', text: question.b },
                    { key: 'c', text: question.c },
                    { key: 'd', text: question.d }
                ];

                const shuffledAnswers = shuffleArray(answers);

                return {
                    id: key,
                    tresc: question.tresc,
                    answers: shuffledAnswers,
                    correctAnswer: question.answer
                };
            });

            // shuffledQuestions = shuffleArray(questionsArray);
            const allShuffled = shuffleArray(questionsArray);
            shuffledQuestions = allShuffled.slice(0, 20);

            currentQuestion = 0;
            score = 0;
            userAnswers = {};
            showQuestion(currentQuestion);
        })
        .catch(error => {
            console.log(error);
            showWorkInProgress();
        });
}

function showQuestion(index) {
    const questionData = shuffledQuestions[index];
    selectedAnswer = null;

    document.querySelector("#title_h1").innerHTML = questionData.tresc;

    const testsContainer = document.querySelector("#subject_tests");
    const btn_place = document.querySelector("#bottom");
    testsContainer.innerHTML = "";
    testsContainer.style.display = "flex";
    testsContainer.style.flexDirection = "column";
    btn_place.innerHTML = "";

    questionData.answers.forEach(answer => {
        const el = document.createElement("div");
        el.className = "odp";
        el.setAttribute("data-answer", answer.key);
        el.textContent = answer.text;
        el.style.marginBottom = "10px";
        el.style.borderRadius = "3px";

        el.addEventListener("click", () => {
            document.querySelectorAll(".odp").forEach(d => d.style.border = "none");
            el.style.border = "3px solid var(--primary-color)";
            selectedAnswer = answer.key;
        });

        testsContainer.appendChild(el);
    });

    const nextBtn = document.createElement("button");
    nextBtn.textContent = currentQuestion < shuffledQuestions.length - 1 ? "Następne" : "Zakończ";
    nextBtn.classList.add("btn");

    nextBtn.addEventListener("click", () => {
        userAnswers[questionData.id] = selectedAnswer || null;
        if (selectedAnswer === questionData.correctAnswer) score++;

        if (currentQuestion < shuffledQuestions.length - 1) {
            currentQuestion++;
            showQuestion(currentQuestion);
        } else {
            showSummary();
        }
    });

    btn_place.appendChild(nextBtn);
}

function showWorkInProgress() {
    document.querySelector("#title_h1").innerHTML = "Praca w toku";
    const testsContainer = document.querySelector("#subject_tests");
    const btn_place = document.querySelector("#bottom");

    testsContainer.innerHTML = "";
    testsContainer.style.display = "flex";
    testsContainer.style.flexDirection = "column";
    testsContainer.style.justifyContent = "center";
    testsContainer.style.alignItems = "center";

    btn_place.innerHTML = '<button class="btn"><a href="../index.html">Powrót</a></button>';
}


function showSummary() {
    const totalQuestions = shuffledQuestions.length;
    const average = Math.round((score / totalQuestions) * 100);

    document.querySelector("#title_h1").innerHTML = "Podsumowanie";
    const testsContainer = document.querySelector("#subject_tests");
    const btn_place = document.querySelector("#bottom");
    testsContainer.innerHTML = "";
    btn_place.innerHTML = '<button class="btn"><a href="../index.html">Powrót</a></button>';

    testsContainer.style.maxHeight = "70vh";
    testsContainer.style.overflowY = "auto";

    const scoreDiv = document.createElement("div");
    scoreDiv.className = "odp";
    scoreDiv.textContent = `Zdobyte punkty: ${score} / ${totalQuestions}`;
    scoreDiv.style.marginBottom = "10px";
    testsContainer.appendChild(scoreDiv);

    const averageDiv = document.createElement("div");
    averageDiv.className = "odp";
    averageDiv.textContent = `Średnia: ${average}%`;
    averageDiv.style.marginBottom = "20px";
    testsContainer.appendChild(averageDiv);

    const showAnswersBtn = document.createElement("button");
    showAnswersBtn.textContent = "Zobacz odpowiedzi";
    showAnswersBtn.style.marginTop = "20px";
    showAnswersBtn.style.padding = "10px 20px";
    showAnswersBtn.style.fontSize = "18px";
    showAnswersBtn.classList.add("btn");
    showAnswersBtn.style.width = "260px";

    showAnswersBtn.addEventListener("click", () => {
        testsContainer.innerHTML = "";

        shuffledQuestions.forEach((q, index) => {
            const userAns = userAnswers[q.id];
            const correctAnswerObj = q.answers.find(ans => ans.key === q.correctAnswer);

            const qDiv = document.createElement("div");
            qDiv.style.display = "flex";
            qDiv.style.flexDirection = "column";
            qDiv.style.marginBottom = "20px";
            qDiv.style.width = "100%";
            qDiv.style.alignItems = "center";

            const questionText = document.createElement("div");
            questionText.className = "final_answer";
            questionText.textContent = `${index + 1}. ${q.tresc}`;
            questionText.style.marginBottom = "10px";

            const userAnswerObj = q.answers.find(ans => ans.key === userAns);
            const userAnswerDiv = document.createElement("div");
            userAnswerDiv.className = "final_answer";
            userAnswerDiv.textContent = `Twoja odpowiedź: ${userAnswerObj ? userAnswerObj.text : "Brak odpowiedzi"}`;
            userAnswerDiv.style.backgroundColor = userAns === q.correctAnswer ? "green" : "red";
            userAnswerDiv.style.color = "white";
            userAnswerDiv.style.marginBottom = "5px";

            const correctAnswerDiv = document.createElement("div");
            correctAnswerDiv.className = "final_answer";
            correctAnswerDiv.textContent = `Poprawna odpowiedź: ${correctAnswerObj.text}`;
            correctAnswerDiv.style.backgroundColor = "green";
            correctAnswerDiv.style.color = "white";

            qDiv.appendChild(questionText);
            qDiv.appendChild(userAnswerDiv);
            qDiv.appendChild(correctAnswerDiv);

            testsContainer.appendChild(qDiv);
        });
    });

    testsContainer.appendChild(showAnswersBtn);
}