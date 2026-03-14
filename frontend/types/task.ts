export type TaskStatus = "todo" | "in-progress" | "done";
export type TaskPriority = "low" | "medium" | "high";

export type Task = {
    _id:string;
    project_id:string;
    title:string;
    description?:string;
    status:TaskStatus;
    priority:TaskPriority;
    due_date:string;
    created_at?:string;

}

export type CreateTaskPayload={
    title:string;
    description?:string;
    status:TaskStatus;
    priority:TaskPriority;
    due_date:string;
};
export type UpdateTaskPayload = Partial<CreateTaskPayload>;