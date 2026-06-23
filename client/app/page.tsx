"use client";

import { useCallback, useEffect, useState } from "react";
import { Task } from "@/types/task";
import axios from "axios";

import TaskForm from "../app/components/TaskForm";
// import TaskList from "./components/TaskList";

import { FaTrash } from "react-icons/fa6";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = useCallback(async () => {
    try {
      const response = await axios.get("/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, []);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await axios.get("/api/tasks");
        setTasks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      }
    };
    loadTasks();
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const response = await axios.patch(`/api/tasks/${id}`, { status });
      if (response.status === 200) {
        fetchTasks();
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`/api/tasks/${id}`);
      if (response.status === 200) {
        fetchTasks();
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col flex-1 items-center justify-center font-sans bg-[#ede8d0] dark:bg-[#0e0e0e]">
        <h1 className="absolute top-0 text-zinc-800 dark:text-zinc-200 text-3xl font-bold p-4 text-center ">
          Awtomatig Tasks
        </h1>
        <TaskForm onTaskAdded={fetchTasks} />
        <div className="w-full max-w-2xl mt-6 p-6">
          <div className="flex justify-between text-zinc-500 mb-4">
            <h2 className="text-2xl font-bold mb-4">Tasks</h2>
            <h2 className="opacity-70 text-sm">
              {tasks.filter((task) => task.status !== "DONE").length} tasks left
            </h2>
          </div>
          {loading ? (
            <p>Loading tasks...</p>
          ) : tasks?.length > 0 ? (
            <ul>
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="mb-2 p-4 border border-zinc-700 rounded-xl flex justify-between"
                >
                  <div className="flex flex-col items-start justify-between">
                    <h3 className="text-sm md:text-xl font-semibold">
                      {task.title}
                    </h3>
                    <p className="text-xs md:text-sm text-zinc-500">
                      {task.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <select
                      value={task.status}
                      onChange={(e) =>
                        handleStatusChange(task.id.toString(), e.target.value)
                      }
                      className="border border-gray-700 rounded-md bg-zinc-900 text-xs p-1 md:text-sm md:p-2"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="DONE">Done</option>
                    </select>
                    <button
                      onClick={() => handleDelete(task.id.toString())}
                      className="text-red-400  p-1 md:p-2 rounded cursor-pointer hover:bg-red-500 hover:text-white transition duration-150"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-zinc-500">
              No tasks found. Add a new task to get started!
            </p>
          )}
        </div>
      </div>
    </>
  );
}
