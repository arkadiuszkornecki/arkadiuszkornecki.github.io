let quizzes = {};

function showSubjects() {
    const capitalise = (string) => string.charAt(0).toUpperCase() + string.slice(1);
    const makeButton = (subject) => `<button class="subjects" onclick='selectSubject("${subject}")'>${capitalise(subject)}</button>`;
    document.querySelector("main").innerHTML = Object.keys(quizzes).map(makeButton).join("");
}

function selectSubject(subject) {
    const params = new URLSearchParams(window.location.search);
    params.set("subject", subject);
    window.history.replaceState({}, "", `${location.pathname}?${params}`);

    const makeButton = ([quiz, title]) => `<button class="quiz" onclick='selectQuiz("${quiz}")'>${title}</button>`;
    document.querySelector("main").innerHTML = Object.entries(quizzes[subject]).map(makeButton).join("");

    document.title = subject.charAt(0).toUpperCase() + subject.slice(1);
}

function selectQuiz(quiz) {
    const params = new URLSearchParams(window.location.search);
    params.set("quiz", quiz);
    window.location.replace(`quiz.html?${params}`);
}

function back() {
    const params = new URLSearchParams(window.location.search);
    const subject = params.get("subject");
    if (subject) window.location.replace(location.pathname);
    else window.location.replace(`..`);
}

document.addEventListener("DOMContentLoaded", async () => {
    quizzes = await fetch("/quizzes/quizzes.json").then(res => res.json());
    const params = new URLSearchParams(window.location.search);
    const subject = params.get("subject");
    if (subject) selectSubject(subject)
    else showSubjects();
})