import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const quizAxios = axios.create({ baseURL: `${API}/api/quiz` });

export const registerStudent = (first_name: string, password: string) =>
  quizAxios.post("/register", { first_name, password });

export const loginStudent = (first_name: string, password: string) =>
  quizAxios.post("/login", { first_name, password });

export const fetchQuestions = () =>
  quizAxios.get("/questions");

export const submitQuiz = (token: string, answers: Record<number, string>) =>
  quizAxios.post("/submit", { token, answers });

export const fetchResults = () =>
  quizAxios.get("/results");

export const fetchStudents = () =>
  quizAxios.get("/students");

export const deleteResult = (id: string) =>
  quizAxios.delete(`/result/${id}`);

export const checkSubmitted = (student_name: string) =>
  quizAxios.get(`/check/${student_name}`);
