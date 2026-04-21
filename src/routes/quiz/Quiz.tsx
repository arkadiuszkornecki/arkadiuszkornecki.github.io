import "./styles.css";

import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

type AnswerKey = "a" | "b" | "c" | "d";

type Answer = {
    key: AnswerKey;
    text: string;
};

type RawQuestion = {
    tresc: string;
    a: string;
    b: string;
    c: string;
    d: string;
    answer: AnswerKey;
};

type RawQuiz = Record<string, RawQuestion>;
type QuizCatalog = Record<string, Record<string, string>>;

type Question = {
    id: string;
    tresc: string;
    answers: Answer[];
    correctAnswer: AnswerKey;
};

const quizCatalogModules = import.meta.glob("./quizzes.json", {
    eager: true,
    import: "default",
}) as Record<string, QuizCatalog>;

const quizModules = import.meta.glob("./quizzes/**/*.json", {
    eager: true,
    import: "default",
}) as Record<string, RawQuiz>;

const quizzesCatalog = quizCatalogModules["./quizzes.json"] ?? {};

function capitalize(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

function shuffleArray<T>(array: T[]) {
    const shuffled = [...array];

    for (let index = shuffled.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
    }

    return shuffled;
}

function getQuizData(subject: string, quiz: string) {
    return quizModules[`./quizzes/${subject}/${quiz}.json`] ?? null;
}

function buildQuestions(quizData: RawQuiz): Question[] {
    const questions = Object.entries(quizData).map<Question>(([id, question]) => ({
        id,
        tresc: question.tresc,
        answers: shuffleArray<Answer>([
            { key: "a", text: question.a },
            { key: "b", text: question.b },
            { key: "c", text: question.c },
            { key: "d", text: question.d },
        ]),
        correctAnswer: question.answer,
    }));

    return shuffleArray(questions).slice(0, 20);
}

export default function QuizApp() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<AnswerKey | null>(null);
    const [score, setScore] = useState(0);
    const [userAnswers, setUserAnswers] = useState<Record<string, AnswerKey | null>>({});
    const [showSummary, setShowSummary] = useState(false);
    const [showAnswers, setShowAnswers] = useState(false);

    const subject = searchParams.get("subject");
    const quiz = searchParams.get("quiz");

    const selectedSubject = subject && quizzesCatalog[subject] ? subject : null;
    const selectedQuizTitle = selectedSubject && quiz ? quizzesCatalog[selectedSubject]?.[quiz] : null;

    const quizData = useMemo(() => {
        if (!selectedSubject || !quiz) {
            return null;
        }

        return getQuizData(selectedSubject, quiz);
    }, [quiz, selectedSubject]);

    useEffect(() => {
        if (selectedSubject) {
            document.title = capitalize(selectedSubject);
            return;
        }

        document.title = "Quizzes PL";
    }, [selectedSubject]);

    useEffect(() => {
        (async () => {
            if (!selectedSubject || !quiz || !quizData) {
                setQuestions([]);
                setCurrentQuestion(0);
                setSelectedAnswer(null);
                setScore(0);
                setUserAnswers({});
                setShowSummary(false);
                setShowAnswers(false);
            return;
        }

        setQuestions(buildQuestions(quizData));
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setScore(0);
        setUserAnswers({});
        setShowSummary(false);
        setShowAnswers(false);
        })();
    }, [quiz, quizData, selectedSubject]);

    const currentQuestionData = questions[currentQuestion];

    function updateParams(nextParams: Record<string, string>) {
        setSearchParams(nextParams);
    }

    function selectSubject(nextSubject: string) {
        updateParams({ subject: nextSubject });
    }

    function selectQuiz(nextQuiz: string) {
        if (!selectedSubject) {
            return;
        }

        updateParams({ subject: selectedSubject, quiz: nextQuiz });
    }

    function handleBack() {
        if (selectedSubject && quiz) {
            navigate("/quiz");
            return;
        }

        if (selectedSubject) {
            navigate("/quiz");
            return;
        }

        document.title = "Arkadiusz Kornecki";
        navigate("/");
    }

    function handleNextQuestion() {
        if (!currentQuestionData) {
            return;
        }

        setUserAnswers((previousAnswers) => ({
            ...previousAnswers,
            [currentQuestionData.id]: selectedAnswer,
        }));

        if (selectedAnswer === currentQuestionData.correctAnswer) {
            setScore((previousScore) => previousScore + 1);
        }

        setSelectedAnswer(null);

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion((previousQuestion) => previousQuestion + 1);
            return;
        }

        setShowSummary(true);
    }

    if (!selectedSubject) {
        return (
            <section className="min-h-screen w-screen bg-slate-950 px-6 py-10 text-slate-100">
                <div className="mx-auto flex max-w-3xl flex-col gap-8 rounded-4xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/50 sm:p-10">
                    <header className="flex flex-col gap-3">
                        <h1 className="text-4xl font-black sm:text-5xl w-auto">Wybierz przedmiot</h1>
                    </header>

                    <main className="flex flex-col gap-4">
                        {Object.keys(quizzesCatalog).map((subjectName) => (
                            <button
                                key={subjectName}
                                type="button"
                                onClick={() => selectSubject(subjectName)}
                                className="rounded-3xl border border-slate-800 bg-slate-900 p-6 text-left text-lg font-semibold transition hover:border-amber-400 hover:bg-slate-800"
                            >
                                {capitalize(subjectName)}
                            </button>
                        ))}
                    </main>

                    <footer>
                        <button
                            type="button"
                            onClick={handleBack}
                            className="rounded-full border border-slate-700 px-6 py-3 font-semibold text-slate-200 transition hover:border-amber-400 hover:text-amber-300"
                        >
                            Powrót
                        </button>
                    </footer>
                </div>
            </section>
        );
    }

    if (!quiz) {
        return (
            <section className="min-h-screen w-screen bg-slate-950 px-6 py-10 text-slate-100">
                <div className="mx-auto flex max-w-3xl flex-col gap-8 rounded-4xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/50 sm:p-10 ">
                    <header className="flex flex-col gap-3">
                        <p className="text-sm uppercase tracking-[0.35em] text-amber-400">{capitalize(selectedSubject)}</p>
                        <h1 className="text-4xl font-black sm:text-5xl">Wybierz test</h1>
                    </header>

                    <main className="flex flex-col gap-4">
                        {Object.entries(quizzesCatalog[selectedSubject]).map(([quizKey, title]) => (
                            <button
                                key={quizKey}
                                type="button"
                                onClick={() => selectQuiz(quizKey)}
                                className="rounded-3xl border border-slate-800 bg-slate-900 p-6 text-left text-lg font-semibold transition hover:border-amber-400 hover:bg-slate-800"
                            >
                                {title}
                            </button>
                        ))}
                    </main>

                    <footer>
                        <button
                            type="button"
                            onClick={handleBack}
                            className="rounded-full border border-slate-700 px-6 py-3 font-semibold text-slate-200 transition hover:border-amber-400 hover:text-amber-300"
                        >
                            Powrót
                        </button>
                    </footer>
                </div>
            </section>
        );
    }

    if (!quizData || !selectedQuizTitle) {
        return (
            <section className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
                <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 rounded-4xl border border-slate-800 bg-slate-900/80 p-10 text-center">
                    <p className="text-sm uppercase tracking-[0.35em] text-amber-400">{capitalize(selectedSubject)}</p>
                    <h1 className="text-4xl font-black sm:text-5xl">Praca w toku</h1>
                    <p className="max-w-xl text-lg text-slate-300">
                        Ten quiz nie jest jeszcze dostępny w nowej wersji React.
                    </p>
                    <button
                        type="button"
                        onClick={handleBack}
                        className="rounded-full border border-slate-700 px-6 py-3 font-semibold text-slate-200 transition hover:border-amber-400 hover:text-amber-300"
                    >
                        Powrót
                    </button>
                </div>
            </section>
        );
    }

    if (!questions.length || !currentQuestionData) {
        return (
            <section className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
                <div className="mx-auto max-w-3xl rounded-4xl border border-slate-800 bg-slate-900/80 p-10 text-center text-xl font-semibold">
                    Ładowanie...
                </div>
            </section>
        );
    }

    const totalQuestions = questions.length;
    const average = Math.round((score / totalQuestions) * 100);

    if (showSummary && !showAnswers) {
        return (
            <section className="w-screen min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
                <div className="mx-auto flex max-w-3xl flex-col gap-6 rounded-4xl border border-slate-800 bg-slate-900/80 p-8 sm:p-10">
                    <header className="flex flex-col gap-2">
                        <p className="text-sm uppercase tracking-[0.35em] text-amber-400">{capitalize(selectedSubject)}</p>
                        <h1 className="text-4xl font-black sm:text-5xl">Podsumowanie</h1>
                        <p className="text-base text-slate-400">{selectedQuizTitle}</p>
                    </header>

                    <div className="rounded-3xl bg-slate-800 px-6 py-5 text-xl font-semibold">
                        Zdobyte punkty: {score} / {totalQuestions}
                    </div>

                    <div className="rounded-3xl bg-slate-800 px-6 py-5 text-xl font-semibold">
                        Średnia: {average}%
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                        <button
                            type="button"
                            onClick={handleBack}
                            className="rounded-full border border-slate-700 px-6 py-3 font-semibold text-slate-200 transition hover:border-amber-400 hover:text-amber-300"
                        >
                            Powrót
                        </button>

                        <button
                            type="button"
                            onClick={() => setShowAnswers(true)}
                            className="rounded-full bg-amber-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-amber-300"
                        >
                            Zobacz odpowiedzi
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    if (showSummary && showAnswers) {
        return (
            <section className="w-screen min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
                <div className="mx-auto flex max-w-4xl flex-col gap-6">
                    <header className="flex flex-col gap-2">
                        <p className="text-sm uppercase tracking-[0.35em] text-amber-400">{capitalize(selectedSubject)}</p>
                        <h1 className="text-4xl font-black sm:text-5xl">Podsumowanie</h1>
                        <p className="text-base text-slate-400">{selectedQuizTitle}</p>
                    </header>

                    <main className="flex flex-col gap-4">
                        {questions.map((question, index) => {
                            const userAnswerKey = userAnswers[question.id] ?? null;
                            const userAnswer = question.answers.find((answer) => answer.key === userAnswerKey);
                            const correctAnswer = question.answers.find(
                                (answer) => answer.key === question.correctAnswer,
                            );

                            return (
                                <article
                                    key={question.id}
                                    className="rounded-4xl border border-slate-800 bg-slate-900/80 p-6"
                                >
                                    <h2 className="mb-4 text-xl font-bold">
                                        {index + 1}. {question.tresc}
                                    </h2>

                                    <div
                                        className={`mb-3 rounded-2xl px-4 py-3 font-semibold text-white ${
                                            userAnswerKey === question.correctAnswer ? "bg-green-600" : "bg-red-600"
                                        }`}
                                    >
                                        Twoja odpowiedź: {userAnswer ? userAnswer.text : "Brak odpowiedzi"}
                                    </div>

                                    <div className="rounded-2xl bg-green-600 px-4 py-3 font-semibold text-white">
                                        Poprawna odpowiedź: {correctAnswer?.text}
                                    </div>
                                </article>
                            );
                        })}
                    </main>

                    <footer>
                        <button
                            type="button"
                            onClick={handleBack}
                            className="rounded-full border border-slate-700 px-6 py-3 font-semibold text-slate-200 transition hover:border-amber-400 hover:text-amber-300"
                        >
                            Powrót
                        </button>
                    </footer>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen w-screen bg-slate-950 px-6 py-10 text-slate-100">
            <div className="mx-auto flex max-w-3xl flex-col gap-8 rounded-4xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/50 sm:p-10">
                <header className="flex flex-col gap-3">
                    <p className="text-sm uppercase tracking-[0.35em] text-amber-400">{capitalize(selectedSubject)}</p>
                    <h1 className="text-3xl font-black sm:text-4xl">{currentQuestionData.tresc}</h1>
                    <p className="text-sm text-slate-400">
                        Pytanie {currentQuestion + 1} z {totalQuestions}
                    </p>
                </header>

                <main className="flex flex-col gap-3">
                    {currentQuestionData.answers.map((answer) => (
                        <button
                            key={answer.key}
                            type="button"
                            onClick={() => setSelectedAnswer(answer.key)}
                            className={`rounded-3xl border p-5 text-left text-lg font-medium transition ${
                                selectedAnswer === answer.key
                                    ? "border-amber-400 bg-slate-800"
                                    : "border-transparent bg-slate-800/70 hover:border-slate-600"
                            }`}
                        >
                            {answer.text}
                        </button>
                    ))}
                </main>

                <footer className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                    <button
                        type="button"
                        onClick={handleBack}
                        className="rounded-full border border-slate-700 px-6 py-3 font-semibold text-slate-200 transition hover:border-amber-400 hover:text-amber-300"
                    >
                        Powrót
                    </button>

                    <button
                        type="button"
                        disabled={!selectedAnswer}
                        onClick={handleNextQuestion}
                        className="rounded-full bg-amber-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
                    >
                        {currentQuestion < questions.length - 1 ? "Następne" : "Zakończ"}
                    </button>
                </footer>
            </div>
        </section>
    );
}
