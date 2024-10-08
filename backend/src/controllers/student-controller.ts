import { Request, Response } from "express";
import { fetchStudent, fetchAllStudents } from "../models/data-store";

function getStudent(req: Request, res: Response) {
  const studentId = req.params.studentId;

  const student = fetchStudent(studentId);

  res.status(200).json(student);
}

function getAllStudents(req: Request, res: Response) {
  const students = fetchAllStudents();

  res.status(200).json(students);
}

const controller = {
  getStudent,
  getAllStudents,
};

export default controller;
