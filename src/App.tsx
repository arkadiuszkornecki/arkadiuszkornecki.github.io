import "@/App.css";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Bio from "@/routes/bio/Bio.tsx";
import Quiz from "@/routes/quiz/Quiz.tsx";
import RavaDocs from "@/routes/rava/RavaDocs.tsx";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Bio />} />
        <Route path="/quiz">
          <Route index element={<Quiz />} />
        </Route>
        <Route path="/rava/*" element={<RavaDocs />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
