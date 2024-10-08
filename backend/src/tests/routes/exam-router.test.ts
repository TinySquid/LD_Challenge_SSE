import request from "supertest";
import express from "express";

import examRouter from "../../routes/exam-router";
import { updateStoreFromScoreEvent } from "../../models/data-store";
import { mockScoreEvents } from "../models/mock-score-events";

const app = express();

beforeAll(() => {
  mockScoreEvents.forEach((event) => {
    updateStoreFromScoreEvent(event);
  });

  app.use("/exams", examRouter);
});

describe("ExamRouter", () => {
  describe("GET /exams", () => {
    it("should return all exams", async () => {
      const response = await request(app).get("/exams");

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(3);
      expect(response.body[0]).toHaveProperty("id", 3774);
      expect(response.body[0]).toHaveProperty("average");
      expect(response.body[0]).toHaveProperty("students", 3);
    });
  });

  describe("GET /exams/:examId", () => {
    it("should return results for a specified exam and an average across all students", async () => {
      const response = await request(app).get("/exams/3774");

      expect(response.status).toBe(200);
      expect(response.body.results).toHaveLength(3);
      expect(response.body.average).toBeCloseTo(0.6772722664015255);
    });
  });
});
