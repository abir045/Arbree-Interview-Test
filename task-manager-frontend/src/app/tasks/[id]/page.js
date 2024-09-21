"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getTaskById } from "@/services/api";

export default function TaskDetail() {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await getTaskById(params.id);
        setTask(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching task", err);
        setError("Failed to fetch task details");
        setLoading(false);
      }
    };
    fetchTask();
  }, [params.id]);

  if (loading)
    return <div className="text-center mt-8">Loading task details...</div>;
  if (error)
    return <div className="text-center mt-8 text-red-400">Error: {error}</div>;
  if (!task) return <div className="text-center mt-8">Task not found</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Details</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
        <p className="mb-4">{task.description}</p>
        <div className="mb-2">
          <span className="font-semibold">Status: {task.status}</span>
        </div>
        {task.deadline && (
          <div className="mb-2">
            <span className="font-semibold">Deadline: {task.deadline}</span>
          </div>
        )}
      </div>
    </div>
  );
}
