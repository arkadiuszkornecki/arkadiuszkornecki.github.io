import '@/App.css'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Bio from "@/routes/bio/Bio.tsx";
import Quiz from "@/routes/quiz/Quiz.tsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Bio />}/>
                <Route path="/quiz">
                    <Route index element={<Quiz />} />
                </Route>

                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Routes>
        </BrowserRouter>
    )
}