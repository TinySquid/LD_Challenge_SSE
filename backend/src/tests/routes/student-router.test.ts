import request from "supertest";
import express from "express";

import studentRouter from "../../routes/student-router";
import { updateStoreFromScoreEvent } from "../../models/data-store";
import { mockScoreEvents } from "../models/mock-score-events";

const app = express();

beforeAll(() => {
  mockScoreEvents.forEach((event) => {
    updateStoreFromScoreEvent(event);
  });

  app.use("/", studentRouter);
});

describe("StudentRouter", () => {
  describe("GET /students", () => {
    it("should return all students", async () => {
      const response = await request(app).get("/");

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(3);
      expect(response.body).toEqual(["Raquel97", "Hattie95", "Erin_Hamill1"]);
    });
  });

  describe("GET /students/:studentId", () => {
    it("should return a student's exams and average", async () => {
      const response = await request(app).get("/Raquel97");

      expect(response.status).toBe(200);
      expect(response.body.exams).toHaveLength(3);
      expect(response.body.average).toBeCloseTo(0.840946414488496);
    });
  });
});
