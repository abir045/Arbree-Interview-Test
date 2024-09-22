import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  // baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
});

export const getTasks = () => api.get("/api/tasks");
export const getTaskById = (id) => api.get(`/api/tasks/${id}`);
export const createTask = async (taskData) => {
  console.log("sending task data", taskData);
  try {
    const response = await api.post("/api/tasks", taskData);
    console.log("server response:", response.data);
    return response;
  } catch (err) {
    console.error("error creating task", err);
    throw err;
  }
};

export const updateTask = async (taskId, updatedData) => {
  console.log("sending updated data", { taskId, updatedData });
  try {
    const response = await api.put(`/api/tasks/${taskId}`, updatedData);
    console.log("server response:", response.data);
    return response;
  } catch (err) {
    console.error("error updating task", err);
    throw err;
  }
};

export const deleteTask = async (taskId) => {
  console.log("deleting task with id:", taskId);

  try {
    const response = await api.delete(`/api/tasks/${taskId}`);
    return response;
  } catch (err) {
    console.error("error deleting task", err);
    throw err;
  }
};

// export const updateTask = (id, taskData) => api.put(`/tasks/${id}`, taskData);
//export const deleteTask = (id) => api.delete(`/tasks/${id}`);
