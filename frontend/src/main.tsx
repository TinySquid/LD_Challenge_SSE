import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllExams from "./pages/AllExams.tsx";
import ExamDetails from "./pages/ExamDetails.tsx";
import Layout from "./components/Layout/Layout.tsx";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<AllExams />} />
          <Route path="exams/:id" element={<ExamDetails />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>,
);
