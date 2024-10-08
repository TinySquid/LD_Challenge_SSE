import express from "express";
import studentRouter from "./student-router";
import examRouter from "./exam-router";

const api = express();

api.use("/students", studentRouter);
api.use("/exams", examRouter);

export default api;
