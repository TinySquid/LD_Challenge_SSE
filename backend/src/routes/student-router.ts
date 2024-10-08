import { Router } from "express";
import studentController from "../controllers/student-controller";

const studentRouter = Router();

studentRouter.get("/", studentController.getAllStudents);
studentRouter.get("/:studentId", studentController.getStudent);

export default studentRouter;
