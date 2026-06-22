"use client";

import { useCallback, useEffect, useState } from "react";
import { Task } from "@/types/task";
import axios from "axios";

import TaskForm from "../app/components/TaskForm";
// import TaskList from "./components/TaskList";

export default function Home() {
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
    // let isMounted = true;

    const loadTasks = async () => {
      try {
        const response = await axios.get("/api/tasks");
        // if (isMounted) {
        setTasks(response.data);
        // }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    loadTasks();

    // return () => {
    //   isMounted = false;
    // };
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold p-4 text-center ">
        Awtomatig Tasks for Everyone
      </h1>
      <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <TaskForm onTaskAdded={fetchTasks} />
        <div className="w-full max-w-2xl mt-6">
          <h2 className="text-2xl font-bold mb-4">Tasks</h2>
          <ul>
            {tasks.map((task) => (
              <li
                key={task.id}
                className="mb-2 p-4 border rounded-xl flex justify-between"
              >
                <div className="flex flex-col items-center justify-between">
                  <h3 className="text-xl font-semibold">{task.title}</h3>
                  <p>{task.description}</p>
                </div>
                <p className="text-sm text-gray-500">{task.status}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
