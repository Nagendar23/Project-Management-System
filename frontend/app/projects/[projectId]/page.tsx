"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TaskForm from "@/components/TaskForm";
import TaskFilters from "@/components/TaskFilters";
import TaskList from "@/components/TaskList";
import { getProject, getTasksByProject } from "@/lib/api";
import { Project } from "@/types/project";
import { Task } from "@/types/task";

type ProjectDetailsPageProps = {
	params: Promise<{
		projectId: string;
	}>;
};

export default function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
	const [projectId, setProjectId] = useState("");
	const [project, setProject] = useState<Project | null>(null);
	const [tasks, setTasks] = useState<Task[]>([]);
	const [status, setStatus] = useState("");
	const [sort, setSort] = useState("");
	const [loadingProject, setLoadingProject] = useState(false);
	const [loadingTasks, setLoadingTasks] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		const loadParams = async () => {
			const resolvedParams = await params;
			setProjectId(resolvedParams.projectId);
		};

		loadParams();
	}, [params]);

	const fetchProjectData = async (id: string) => {
		try {
			setLoadingProject(true);
			setError("");

			const data = await getProject(id);
			setProject(data);
		} catch (err) {
			console.log(err);
			setError("Failed to fetch project");
		} finally {
			setLoadingProject(false);
		}
	};

	const fetchTasksData = async (id: string) => {
		try {
			setLoadingTasks(true);
			setError("");

			const data = await getTasksByProject(id, status, sort);
			setTasks(data);
		} catch (err) {
			console.log(err);
			setError("Failed to fetch tasks");
		} finally {
			setLoadingTasks(false);
		}
	};

	useEffect(() => {
		if (!projectId) return;

		fetchProjectData(projectId);
		fetchTasksData(projectId);
	}, [projectId]);

	useEffect(() => {
		if (!projectId) return;
		fetchTasksData(projectId);
	}, [status, sort]);

	return (
		<main className="page-shell">
			<Link href="/projects">
				<button className="mb-4 bg-slate-700">Back to Projects</button>
			</Link>

			{error && <p className="text-red-500 mb-4">{error}</p>}

			{loadingProject ? (
				<p>Loading project...</p>
			) : project ? (
				<section className="panel mb-8">
					<p className="text-sm uppercase tracking-[0.18em] muted-text mb-2">Project Details</p>
					<h1 className="text-4xl font-bold">{project.name}</h1>
					<p className="mt-3 muted-text">{project.description || "No description"}</p>
				</section>
			) : null}

			{projectId && (
				<>
					<TaskForm
						projectId={projectId}
						onCreated={() => fetchTasksData(projectId)}
					/>

					<TaskFilters
						status={status}
						sort={sort}
						onStatusChange={setStatus}
						onSortChange={setSort}
					/>

					{loadingTasks ? (
						<p>Loading tasks...</p>
					) : (
						<TaskList
							tasks={tasks}
							onChanged={() => fetchTasksData(projectId)}
						/>
					)}
				</>
			)}
		</main>
	);
}
