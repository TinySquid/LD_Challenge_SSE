import { useState, useEffect } from "react";
import classes from "./AllExams.module.css";
import Table from "../components/ExamTable";

interface ExamData {
  id: number;
  average: number;
  students: number;
}

const API_URL: string = (import.meta.env.VITE_BACKEND_URL as string) || "http://localhost:3000";

function AllExams() {
  const [exams, setExams] = useState<string[][]>([]);

  useEffect(() => {
    const fetchAllExams = async () => {
      try {
        const res = await fetch(`${API_URL}/api/exams`);
        const data = (await res.json()) as ExamData[];

        const tableFormattedData = data.map((exam) => {
          return [exam.id.toString(), `${(exam.average * 100).toFixed(2)}%`, exam.students.toString()];
        });

        setExams(tableFormattedData);
      } catch (err) {
        console.error(err);
      }
    };

    void fetchAllExams();
  }, []);

  return (
    <div className={`${classes.container}`}>
      <h1>All Exams</h1>
      <Table colHeadings={["Exam ID", "Avg Exam Grade", "Students"]} rows={exams} linkFirstColumn={true} />
    </div>
  );
}

export default AllExams;
