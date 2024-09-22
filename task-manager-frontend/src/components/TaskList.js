"use client";

import { useState, useEffect } from "react";
import { createTask, getTasks } from "@/services/api";
import axios from "axios";
import Link from "next/link";
import TaskForm from "./TaskForm";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);

      setLoading(false);
    } catch (err) {
      setError("Failed to fetch tasks");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (taskData) => {
    try {
      const response = await createTask(taskData);
      console.log("task created", response.data);
      setShowForm(false);
      fetchTasks();
    } catch (err) {
      console.error("Error creating task:", err);
      setError("Failed to create task");
    }
  };

  if (loading) return <div>Loading tasks..</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <button
        className="mb-4 bg-blue-400 text-white px-4 py-2 rounded"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Hide form" : "Add New Task"}
      </button>

      {showForm && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Create New Task</h2>
          <TaskForm
            onSubmit={handleCreateTask}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      <h2>Tasks</h2>

      {tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li className="bg-gray-100 p-2 rounded" key={task.id}>
              <Link
                href={`/tasks/${task.id}`}
                className="text-blue-600 hover:underline"
              >
                {task.title}{" "}
                <span className="ml-2 text-gray-500">({task.category})</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
