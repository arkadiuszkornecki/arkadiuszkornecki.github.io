let currentQuestion = 1;
let quizData = null;
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
        console.log("błąd: nieznany przedmiot");
    }
}

function loadQuiz(jsonPath) {
    fetch(jsonPath)
        .then(response => response.json())
        .then(data => {
            quizData = data;
            currentQuestion = 1;
            score = 0;
            userAnswers = {};
            showQuestion(currentQuestion);
        })
        .catch(error => console.log(error));
}

function showQuestion(number) {
    const questionData = quizData[String(number)];
    selectedAnswer = null;

    document.querySelector("#title_h1").innerHTML = questionData.tresc;

    const testsContainer = document.querySelector("#subject_tests");
    const btn_place = document.querySelector("#bottom");
    testsContainer.innerHTML = "";
    testsContainer.style.display = "flex";
    testsContainer.style.flexDirection = "column";
    btn_place.innerHTML = "";

    ["a", "b", "c", "d"].forEach(key => {
        const el = document.createElement("div");
        el.className = "odp";
        el.setAttribute("data-answer", key);
        el.textContent = questionData[key];
        el.style.marginBottom = "10px";
        el.style.borderRadius = "3px";

        el.addEventListener("click", () => {
            document.querySelectorAll(".odp").forEach(d => d.style.border = "none");
            el.style.border = "3px solid var(--primary-color)";
            selectedAnswer = key;
        });

        testsContainer.appendChild(el);
    });

    const nextBtn = document.createElement("button");
    nextBtn.textContent = currentQuestion < Object.keys(quizData).length ? "Następne" : "Zakończ";
    nextBtn.classList.add("btn");

    nextBtn.addEventListener("click", () => {
        userAnswers[String(currentQuestion)] = selectedAnswer || null;
        if (selectedAnswer === questionData.answer) score++;

        if (currentQuestion < Object.keys(quizData).length) {
            currentQuestion++;
            showQuestion(currentQuestion);
        } else {
            showSummary();
        }
    });

    btn_place.appendChild(nextBtn);
}


function showSummary() {
    const totalQuestions = Object.keys(quizData).length;
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

        for (let i = 1; i <= totalQuestions; i++) {
            const q = quizData[String(i)];
            const userAns = userAnswers[String(i)];

            const qDiv = document.createElement("div");
            qDiv.style.display = "flex";
            qDiv.style.flexDirection = "column";
            qDiv.style.marginBottom = "20px";
            qDiv.style.width = "100%";
            qDiv.style.alignItems = "center";

            const questionText = document.createElement("div");
            questionText.className = "final_answer";
            questionText.textContent = `${i}. ${q.tresc}`;
            questionText.style.marginBottom = "10px";

            const userAnswerDiv = document.createElement("div");
            userAnswerDiv.className = "final_answer";
            userAnswerDiv.textContent = `Twoja odpowiedź: ${userAns ? q[userAns] : "Brak odpowiedzi"}`;
            userAnswerDiv.style.backgroundColor = userAns === q.answer ? "green" : "red";
            userAnswerDiv.style.color = "white";
            userAnswerDiv.style.marginBottom = "5px";

            const correctAnswerDiv = document.createElement("div");
            correctAnswerDiv.className = "final_answer";
            correctAnswerDiv.textContent = `Poprawna odpowiedź: ${q[q.answer]}`;
            correctAnswerDiv.style.backgroundColor = "green";
            correctAnswerDiv.style.color = "white";

            qDiv.appendChild(questionText);
            qDiv.appendChild(userAnswerDiv);
            qDiv.appendChild(correctAnswerDiv);

            testsContainer.appendChild(qDiv);
        }
    });

    testsContainer.appendChild(showAnswersBtn);
}

