import { ScoreEvent } from "../services/score-tracker";

interface Students {
  [key: string]: number[];
}

interface Exams {
  [key: string]: [string, number][];
}

interface DataStore {
  students: Students;
  exams: Exams;
}

const dataStore: DataStore = {
  students: {},
  exams: {},
};

export function updateStoreFromScoreEvent(event: ScoreEvent) {
  if (!dataStore.students[event.studentId]) {
    dataStore.students[event.studentId] = [];
  }

  dataStore.students[event.studentId].push(event.exam);

  if (!dataStore.exams[event.exam]) {
    dataStore.exams[event.exam] = [];
  }

  dataStore.exams[event.exam].push([event.studentId, event.score]);
}

export function fetchAllStudents() {
  return Object.keys(dataStore.students);
}

export function fetchStudent(studentId: string) {
  const examIds = dataStore.students[studentId];

  const scores = examIds.map((examId) => {
    return {
      id: examId,
      score: dataStore.exams[examId].find((exam) => exam[0] === studentId)![1],
    };
  });

  const average = scores.reduce((acc, score) => acc + score.score, 0) / scores.length;

  return {
    exams: scores,
    average,
  };
}

export function fetchStudentAverage(studentId: string) {
  const exams = dataStore.students[studentId];

  const scores = exams.map((exam) => {
    return dataStore.exams[exam].find((score) => score[0] === studentId)![1];
  });

  const totalScore = scores.reduce((acc, score) => acc + score, 0);

  return totalScore / scores.length;
}

export function fetchAllExams() {
  const exams = Object.keys(dataStore.exams).map(Number);

  const results = exams.map((examId) => {
    return {
      id: examId,
      average: fetchExamAverage(examId),
      students: dataStore.exams[examId].length,
    };
  });

  return results;
}

export function fetchExam(examId: string | number) {
  const results = dataStore.exams[examId].map((student) => {
    return {
      student: student[0],
      score: student[1],
    };
  });

  return {
    results,
    average: results.reduce((acc, result) => acc + result.score, 0) / results.length,
  };
}

function fetchExamAverage(examId: string | number) {
  const results = dataStore.exams[examId].map((exam) => exam[1]);

  return results.reduce((acc, score) => acc + score, 0) / results.length;
}

export function fetchExamHistogram(examId: string | number) {
  const exam = fetchExam(examId);

  const buckets: Record<string, number> = {};

  [10, 25, 50, 75, 80, 85, 90, 95, 100].sort().forEach((v) => {
    buckets[v] = 0;
  });

  exam.results.forEach((r) => {
    for (let k in buckets) {
      const score = r.score * 100;

      if (score <= Number(k)) {
        buckets[k]++;
        break;
      }
    }
  });

  return buckets;
}

export default dataStore;
