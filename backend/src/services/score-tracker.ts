import EventSource from "eventsource";
import { updateStoreFromScoreEvent } from "../models/data-store";

export interface ScoreEvent {
  studentId: string;
  exam: number;
  score: number;
}

const es = new EventSource("https://live-test-scores.herokuapp.com/scores");

es.addEventListener("score", (e) => {
  const data = JSON.parse(e.data);

  updateStoreFromScoreEvent(data);
});
