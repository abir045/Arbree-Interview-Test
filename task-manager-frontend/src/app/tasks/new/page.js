"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import TaskForm from "@/components/TaskForm";
import { createTask } from "@/services/api";

export default function CreateTask() {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (taskData) => {
    try {
      await createTask(taskData);
      router.push("/tasks");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create task");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Task</h1>
      {error && <div className="text-red-500 mb-4">{error} </div>}
      <TaskForm
        onSubmit={handleSubmit}
        onCancel={() => router.push("/tasks")}
      />
    </div>
  );
}
