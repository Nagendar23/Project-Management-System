import Link from "next/link";

export default function Home() {
  return (
    <main className="page-shell">
      <section className="panel max-w-3xl">
        <p className="text-sm uppercase tracking-[0.18em] muted-text mb-3">Dashboard</p>
        <h1 className="text-5xl font-bold mb-4">Project Management System</h1>
        <p className="muted-text mb-8 text-lg">
          Organize projects, manage tasks, and keep priorities visible in one clean workspace.
        </p>

        <Link href="/projects">
          <button className="px-6 py-3">Go to Projects</button>
        </Link>
      </section>
    </main>
  );
}