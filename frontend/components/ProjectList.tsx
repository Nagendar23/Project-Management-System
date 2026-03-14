"use client";

import Link from "next/link";
import { Project } from "@/types/project";
import { deleteProject } from "@/lib/api";

type ProjectListProps = {
  projects: Project[];
  onDeleted: () => void;
};

export default function ProjectList({
  projects,
  onDeleted
}: ProjectListProps) {
  const handleDelete = async (id: string) => {
    try {
      await deleteProject(id);
      onDeleted();
    } catch (err) {
      console.log(err);
      alert("Failed to delete project");
    }
  };

  if (projects.length === 0) {
    return <div className="panel"><p className="muted-text">No projects found</p></div>;
  }

  return (
    <section>
      <h2 className="section-title mb-4">Projects</h2>

      <div className="grid gap-4">
        {projects.map((project) => (
          <div key={project._id} className="panel">
            <h3 className="text-xl font-semibold">{project.name}</h3>
            <p className="muted-text mt-2">{project.description || "No description"}</p>

            <div className="flex gap-2 mt-3">
              <Link href={`/projects/${project._id}`}>
                <button className="px-5">View Tasks</button>
              </Link>

              <button onClick={() => handleDelete(project._id)} className="bg-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}