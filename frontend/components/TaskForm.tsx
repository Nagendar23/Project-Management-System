"use client";

import { useState } from "react";
import { createTask } from "@/lib/api";
import { TaskPriority, TaskStatus } from "@/types/task";

type TaskFormProps = {
  projectId: string;
  onCreated: () => void;
};

export default function TaskForm({ projectId, onCreated }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>("todo");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() || !status || !priority || !dueDate) {
      setError("Title, status, priority and due date are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await createTask(projectId, {
        title: title.trim(),
        description: description.trim() || undefined,
        status,
        priority,
        due_date: dueDate
      });

      setTitle("");
      setDescription("");
      setStatus("todo");
      setPriority("medium");
      setDueDate("");
      onCreated();
    } catch (err) {
      console.log(err);
      setError("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="panel mb-6">
      <h2 className="section-title">Create Task</h2>

      <form onSubmit={handleSubmit} className="grid gap-4 max-w-2xl">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />

        <select value={status} onChange={(e) => setStatus(e.target.value as TaskStatus)}>
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <select value={priority} onChange={(e) => setPriority(e.target.value as TaskPriority)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button type="submit" disabled={loading} className="w-fit px-5">
          {loading ? "Creating..." : "Create Task"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </section>
  );
}