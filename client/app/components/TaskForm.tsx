"use client";

import axios from "axios";
import { useState } from "react";

// ICONS
import { FaPlus } from "react-icons/fa6";

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
    <form
      onSubmit={handleSubmit}
      className="w-screen md:w-2xl px-6 py-2 rounded shadow flex justify-between items-start gap-4 md:gap-8"
    >
      <div className="flex-1 mb-4">
        <input
          type="text"
          id="title"
          required
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-zinc-800 mb-4 block w-full p-2 rounded-lg outline-none "
        />
        <textarea
          id="description"
          required
          placeholder="Enter task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-zinc-800 mt-1 block w-full p-2 rounded-lg outline-none"
        />
      </div>
      <button
        type="submit"
        className="bg-orange-600 hover:bg-orange-700 text-white font-bold p-3 rounded-lg cursor-pointer"
      >
        <FaPlus />
      </button>
    </form>
  );
};

export default TaskForm;
