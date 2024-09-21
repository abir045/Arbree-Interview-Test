"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import TaskForm from "@/components/TaskForm";
import { getTaskById, updateTask } from "@/services/api";

export default function EditTask() {
  const [task, setTask] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await getTaskById(params.id);
        setTask(response.data);
      } catch (err) {
        setError("Failed to fetch task");
      }
    };
    fetchTask();
  }, [params.id]);

  const handleSubmit = async (taskData) => {
    try {
      await updateTask(params.id, taskData);
      router.push(`/tasks/${params.id}`);
    } catch (err) {
      setError(err.response?.data?.error || "failed to update task");
    }
  };

  if (!task) return <div>loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit task</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <TaskForm
        task={task}
        onSubmit={handleSubmit}
        onCancel={() => router.push(`/tasks/${params.id}`)}
      />
    </div>
  );
}
