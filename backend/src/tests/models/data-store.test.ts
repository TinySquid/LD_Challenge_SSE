import { mockScoreEvents } from "./mock-score-events";
import studentStore, {
  updateStoreFromScoreEvent,
  fetchAllStudents,
  fetchStudent,
  fetchStudentAverage,
  fetchAllExams,
  fetchExam,
} from "../../models/data-store";

describe("StudentStore", () => {
  beforeAll(() => {
    mockScoreEvents.forEach((event) => {
      updateStoreFromScoreEvent(event);
    });

    expect(studentStore).toBeDefined();
    expect(Object.keys(studentStore.students)).toHaveLength(3);
    expect(Object.keys(studentStore.exams)).toHaveLength(3);
  });

  describe("fetchAllStudents", () => {
    it("should return all student IDs", () => {
      const studentIds = fetchAllStudents();

      expect(studentIds).toHaveLength(3);
      expect(studentIds).toEqual(["Raquel97", "Hattie95", "Erin_Hamill1"]);
    });
  });

  describe("fetchStudentAverage", () => {
    it("should return the average score for a student", () => {
      const average = fetchStudentAverage("Raquel97");

      expect(average).toBeCloseTo(0.8409464144884967);
    });
  });

  describe("fetchStudent", () => {
    it("should return a student's exams and average", () => {
      const student = fetchStudent("Raquel97");

      expect(student.exams).toHaveLength(3);
      expect(student.average).toBeCloseTo(0.8409464144884967);
    });
  });

  describe("fetchAllExams", () => {
    it("should return all exams, with an avg and # of students", () => {
      const exams = fetchAllExams();

      expect(exams).toHaveLength(3);
      expect(exams[0]).toHaveProperty("id", 3774);
      expect(exams[0]).toHaveProperty("average");
      expect(exams[0]).toHaveProperty("students", 3);
    });
  });

  describe("fetchExam", () => {
    it("should return all students and scores for an exam", () => {
      const exam = fetchExam(3774);

      expect(exam.results).toHaveLength(3);
      expect(exam.average).toBeCloseTo(0.6772722664015255);
    });
  });
});
