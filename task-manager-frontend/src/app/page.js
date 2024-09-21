import TaskList from "@/components/TaskList";
import Image from "next/image";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <TaskList />
    </main>
  );
}

/**
 * // src/app/tasks/[id]/edit/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import TaskForm from '@/components/TaskForm';
import { getTaskById, updateTask } from '@/services/api';

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
        setError('Failed to fetch task');
      }
    };
    fetchTask();
  }, [params.id]);

  const handleSubmit = async (taskData) => {
    try {
      await updateTask(params.id, taskData);
      router.push(`/tasks/${params.id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update task');
    }
  };

  if (!task) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Task</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <TaskForm task={task} onSubmit={handleSubmit} onCancel={() => router.push(`/tasks/${params.id}`)} />
    </div>
  );
}

// src/app/tasks/[id]/page.js (updated to include delete functionality)
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { getTaskById, deleteTask } from '@/services/api';

export default function TaskDetail() {
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
        setError('Failed to fetch task');
      }
    };
    fetchTask();
  }, [params.id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(params.id);
        router.push('/tasks');
      } catch (err) {
        setError('Failed to delete task');
      }
    }
  };

  if (!task) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Detail</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
        <p className="mb-4">{task.description}</p>
        <div className="mb-2">
          <span className="font-semibold">Status:</span> {task.status}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Due Date:</span> {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'Not set'}
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <Link href={`/tasks/${params.id}/edit`} className="px-4 py-2 bg-yellow-500 text-white rounded">
            Edit
          </Link>
          <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
 * 
 * 
 */
