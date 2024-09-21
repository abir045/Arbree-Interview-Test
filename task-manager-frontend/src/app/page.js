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
