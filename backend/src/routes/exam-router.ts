import { Router } from "express";
import examController from "../controllers/exam-controller";

const examRouter = Router();

examRouter.get("/", examController.getAllExams);
examRouter.get("/:examId/histogram", examController.getExamHistogram);
examRouter.get("/:examId", examController.getExam);

export default examRouter;
