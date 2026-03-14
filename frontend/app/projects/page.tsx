"use client";

import { useEffect, useState } from "react";
import ProjectForm from "@/components/ProjectForm";
import ProjectList from "@/components/ProjectList";
import { getProjects } from "@/lib/api";
import { Project } from "@/types/project";

export default function ProjectsPage() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const fetchProjectsData = async () => {
		try {
			setLoading(true);
			setError("");

			const data = await getProjects();
			setProjects(data.projects || []);
		} catch (err) {
			console.log(err);
			setError("Failed to fetch projects");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchProjectsData();
	}, []);

	return (
		<main className="page-shell">
			<section className="mb-8">
				<p className="text-sm uppercase tracking-[0.18em] muted-text mb-2">Workspace</p>
				<h1 className="text-4xl font-bold mb-2">Projects</h1>
				<p className="muted-text">Create a project, review existing work, and move into task management.</p>
			</section>

			{error && <p className="text-red-500 mb-4">{error}</p>}

			<ProjectForm onCreated={fetchProjectsData} />

			{loading ? (
				<p>Loading projects...</p>
			) : (
				<ProjectList
					projects={projects}
					onDeleted={fetchProjectsData}
				/>
			)}
		</main>
	);
}
