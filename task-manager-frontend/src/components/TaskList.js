"use client";

import { useState, useEffect } from "react";
import { getTasks } from "@/services/api";
import axios from "axios";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/tasks");
        setTasks(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch tasks");
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  if (loading) return <div>Loading tasks..</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li className="bg-gray-100 p-2 rounded" key={task.id}>
              {task.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
