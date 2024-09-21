import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const getTasks = () => api.get("/api/tasks");
export const getTaskById = (id) => api.get(`/api/tasks/${id}`);
