"use client";

import axios from "axios";
import { useState } from "react";

const TaskForm = ({ onTaskAdded }: { onTaskAdded: () => void }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("PENDING");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newTask = {
      title,
      description,
      status,
    };

    try {
      const response = await axios.post("/api/tasks", newTask);
      console.log("Added task:", response.data);
      setTitle("");
      setDescription("");
      setStatus("PENDING");

      onTaskAdded();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-red-400 p-6 rounded shadow">
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
