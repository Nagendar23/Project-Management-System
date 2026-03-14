"use client";

import { deleteTask, updateTask } from "@/lib/api";
import { Task, TaskPriority, TaskStatus } from "@/types/task";

type TaskListProps = {
  tasks: Task[];
  onChanged: () => void;
};

export default function TaskList({ tasks, onChanged }: TaskListProps) {
  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      onChanged();
    } catch (err) {
      console.log(err);
      alert("Failed to delete task");
    }
  };

  const handleStatusChange = async (id: string, status: TaskStatus) => {
    try {
      await updateTask(id, { status });
      onChanged();
    } catch (err) {
      console.log(err);
      alert("Failed to update task");
    }
  };

  const handlePriorityChange = async (id: string, priority: TaskPriority) => {
    try {
      await updateTask(id, { priority });
      onChanged();
    } catch (err) {
      console.log(err);
      alert("Failed to update task");
    }
  };

  if (tasks.length === 0) {
    return <div className="panel"><p className="muted-text">No tasks found</p></div>;
  }

  return (
    <section>
      <h2 className="section-title mb-4">Tasks</h2>

      <div className="grid gap-4">
        {tasks.map((task) => (
          <div key={task._id} className="panel">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <h3 className="text-xl font-semibold">{task.title}</h3>
                <p className="muted-text mt-1">{task.description || "No description"}</p>
              </div>
              <div className="text-right text-sm muted-text">
                <p>Due {new Date(task.due_date).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="grid gap-2 md:grid-cols-2 text-sm mb-4">
              <p><span className="font-semibold">Status:</span> {task.status}</p>
              <p><span className="font-semibold">Priority:</span> {task.priority}</p>
            </div>

            <div className="flex gap-2 mt-3 flex-wrap">
              <select
                className="max-w-[180px]"
                value={task.status}
                onChange={(e) => handleStatusChange(task._id, e.target.value as TaskStatus)}
              >
                <option value="todo">Todo</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>

              <select
                className="max-w-[180px]"
                value={task.priority}
                onChange={(e) => handlePriorityChange(task._id, e.target.value as TaskPriority)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>

              <button onClick={() => handleDelete(task._id)} className="bg-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}