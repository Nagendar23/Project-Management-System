"use client";

type TaskFiltersProps = {
  status: string;
  sort: string;
  onStatusChange: (value: string) => void;
  onSortChange: (value: string) => void;
};

export default function TaskFilters({
  status,
  sort,
  onStatusChange,
  onSortChange
}: TaskFiltersProps) {
  return (
    <section className="panel mb-6">
      <h2 className="section-title">Filter and Sort Tasks</h2>

      <div className="grid gap-4 md:grid-cols-2 max-w-[640px]">
        <select value={status} onChange={(e) => onStatusChange(e.target.value)}>
          <option value="">All Status</option>
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <select value={sort} onChange={(e) => onSortChange(e.target.value)}>
          <option value="">Default Order</option>
          <option value="asc">Due Date Asc</option>
          <option value="desc">Due Date Desc</option>
        </select>
      </div>
    </section>
  );
}