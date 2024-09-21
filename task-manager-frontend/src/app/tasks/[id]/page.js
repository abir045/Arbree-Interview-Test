"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getTaskById, deleteTask } from "@/services/api";
import Link from "next/link";

export default function TaskDetail() {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const router = useRouter();

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

  const handleDelete = async () => {
    try {
      await deleteTask(params.id);
      console.log("task deleted successfully");
      router.push("/");
    } catch (err) {
      console.error("failed to delete task:", err);
      throw err;
    }
  };

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
        <div className="mb-2">
          <span className="font-semibold">Category: {task.category}</span>
        </div>
        {task.deadline && (
          <div className="mb-2">
            <span className="font-semibold">Deadline: {task.deadline}</span>
          </div>
        )}
        <div className="justify-end space-x-2 mt-4">
          <Link
            href={`/tasks/${params.id}/edit`}
            className="px-4 py-2 bg-yellow-500 text-white rounded"
          >
            Edit
          </Link>

          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-400 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
