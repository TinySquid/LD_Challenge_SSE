import { Request, Response } from "express";
import { fetchExam, fetchAllExams, fetchExamHistogram } from "../models/data-store";

function getExam(req: Request, res: Response) {
  const examId = req.params.examId;

  const student = fetchExam(examId);

  res.status(200).json(student);
}

function getAllExams(req: Request, res: Response) {
  const students = fetchAllExams();

  res.status(200).json(students);
}

function getExamHistogram(req: Request, res: Response) {
  const examId = req.params.examId;

  const histogram = fetchExamHistogram(examId);

  res.status(200).json(histogram);
}

const controller = {
  getExam,
  getAllExams,
  getExamHistogram,
};

export default controller;
