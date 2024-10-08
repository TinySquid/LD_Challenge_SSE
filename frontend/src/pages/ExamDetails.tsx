import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classes from "./AllExams.module.css";
import Table from "../components/ExamTable";

interface ExamResult {
  student: string;
  score: number;
}

interface ExamData {
  results: ExamResult[];
  average: number;
}

const API_URL: string = (import.meta.env.VITE_BACKEND_URL as string) || "http://localhost:3000";

function ExamDetails() {
  const { id } = useParams();
  const [average, setAverage] = useState<string>("0");
  const [exams, setExams] = useState<string[][]>([]);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const res = await fetch(`${API_URL}/api/exams/${id}`);
        const data = (await res.json()) as ExamData;

        const sortedResults = data.results.sort((a, b) => b.score - a.score);

        const tableFormattedData = sortedResults.map((result, idx) => {
          return [result.student, `${(result.score * 100).toFixed(2)}%`, String(idx + 1)];
        });

        setExams(tableFormattedData);

        setAverage((data.average * 100).toFixed(2));
      } catch (err) {
        console.error(err);
      }
    };

    void fetchExam();
  }, [id]);

  return (
    <div className={`${classes.container}`}>
      <h1>Exam {id}</h1>
      <span>Average: {average}%</span>
      <Table colHeadings={["Student Name", "Grade", "Rank"]} rows={exams} linkFirstColumn={false} />
    </div>
  );
}

export default ExamDetails;
