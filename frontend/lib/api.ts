import { Project, ProjectsListResponse } from "@/types/project";
import { CreateTaskPayload, Task, UpdateTaskPayload } from "@/types/task";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

//projects
export async function getProjects(page = 1, limit = 10):Promise<ProjectsListResponse >{
    const res = await fetch(`${BASE_URL}/projects?page=${page}&limit=${limit}`)
    if(!res.ok) throw new Error("Failed to fetch projects")
    return res.json()
}

export async function createProject(payload: {
  name: string;
  description?: string;
}): Promise<Project> {
  const res = await fetch(`${BASE_URL}/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Failed to create project");
  return res.json();
}

export async function getProject(id: string): Promise<Project> {
    const res = await fetch(`${BASE_URL}/projects/${id}`);
    if (!res.ok) throw new Error("Failed to fetch project");
    return res.json();
}

export async function deleteProject(id:string):Promise<Project>{
    const res = await fetch(`${BASE_URL}/projects/${id}`,{
        method:"DELETE"
    });
    if(!res.ok) throw new Error("Failed to delete project");
    return res.json()
}

/// Tasks
export async function getTasksByProject(
    projectId:string,
    status?:string,
    sort?:string
):Promise<Task[]>{
    const params = new URLSearchParams();
    if(status) params.set("status",status);
    if(sort) params.set("sort",sort)

    const query = params.toString()? `?${params.toString()}` : "";
    const res = await fetch(`${BASE_URL}/projects/${projectId}/tasks${query}`);
    if(!res.ok) throw new Error("Failed to fetch tasks");
    return res.json()
}

export async function createTask(
    projectId:string,
    payload:CreateTaskPayload
):Promise<Task>{
    const res = await fetch(`${BASE_URL}/projects/${projectId}/tasks`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(payload)
    });
    if(!res.ok) throw new Error("Failed to create task");
    return res.json();
}

export async function updateTask(
    taskId:string,
    payload:UpdateTaskPayload
):Promise<Task>{
    const res = await fetch(`${BASE_URL}/tasks/${taskId}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(payload)
    });
    if(!res.ok) throw new Error("Failed to update task");
    return res.json();
}

export async function deleteTask(taskId: string): Promise<Task> {
  const res = await fetch(`${BASE_URL}/tasks/${taskId}`, {
    method: "DELETE"
  });
  if (!res.ok) throw new Error("Failed to delete task");
  return res.json();
}