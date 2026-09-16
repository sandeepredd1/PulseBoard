import { CalendarDays } from "lucide-react";

const statusStyles = {
  todo: `
    bg-gray-100
    text-gray-600

    dark:bg-slate-700
    dark:text-gray-200
  `,

  in_progress: `
    bg-violet-100
    text-violet-600

    dark:bg-violet-950/60
    dark:text-violet-300
  `,

  completed: `
    bg-emerald-100
    text-emerald-600

    dark:bg-emerald-950/60
    dark:text-emerald-300
  `,

  overdue: `
    bg-red-100
    text-red-600

    dark:bg-red-950/60
    dark:text-red-300
  `,
};

const statusLabels = {
  todo: "To Do",
  in_progress: "In Progress",
  completed: "Completed",
  overdue: "Overdue",
};

function formatDate(date) {
  if (!date) return "—";

  return new Date(date).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );
}

export default function ProjectTable({
  projects = [],
  loading = false,
  error = "",
  onEdit,
  onDelete,
}) {
  {/* =========================
      Loading
  ========================== */}
  if (loading) {
    return (
      <div
        className="
          glass
          rounded-[20px]
          border
          border-gray-200/60
          bg-white/70
          p-6

          dark:border-slate-700/60
          dark:bg-slate-900/70
        "
      >
        <div className="animate-pulse space-y-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="
                h-12
                rounded-xl

                bg-gray-200/60

                dark:bg-slate-700/60
              "
            />
          ))}
        </div>
      </div>
    );
  }

  {/* =========================
      Error
  ========================== */}
  if (error) {
    return (
      <div
        className="
          glass
          rounded-[20px]
          border
          border-gray-200/60
          bg-white/70
          p-8
          text-center

          dark:border-slate-700/60
          dark:bg-slate-900/70
        "
      >
        <p
          className="
            text-sm
            font-medium

            text-red-500

            dark:text-red-400
          "
        >
          {error}
        </p>
      </div>
    );
  }

  {/* =========================
      Empty State
  ========================== */}
  if (!projects.length) {
    return (
      <div
        className="
          glass
          rounded-[20px]
          border
          border-gray-200/60
          bg-white/70
          p-10
          text-center

          dark:border-slate-700/60
          dark:bg-slate-900/70
        "
      >
        <p
          className="
            text-sm
            font-medium

            text-gray-700

            dark:text-gray-200
          "
        >
          No projects yet
        </p>

        <p
          className="
            mt-1
            text-xs

            text-gray-400

            dark:text-gray-500
          "
        >
          Create your first project to get started.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        glass
        overflow-hidden
        rounded-[20px]

        border
        border-gray-200/60

        bg-white/70

        dark:border-slate-700/60
        dark:bg-slate-900/70
      "
    >
      {/* =========================
          Desktop Table
      ========================== */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr
              className="
                border-b
                border-gray-200/60

                text-left
                text-xs

                text-gray-500

                dark:border-slate-700
                dark:text-gray-400
              "
            >
              <th className="px-5 py-4 font-medium">
                Project
              </th>

              <th className="px-5 py-4 font-medium">
                Status
              </th>

              <th className="px-5 py-4 font-medium">
                Due Date
              </th>

              <th className="px-5 py-4 font-medium">
                Updated
              </th>

              <th className="px-5 py-4" />
            </tr>
          </thead>

          <tbody>
            {projects.map((project) => (
              <tr
                key={project._id || project.id}
                className="
                  border-b
                  border-gray-100/70

                  transition

                  hover:bg-gray-50/80

                  dark:border-slate-800
                  dark:hover:bg-slate-800/50
                "
              >
                {/* Project */}
                <td className="px-5 py-4">
                  <div>
                    <p
                      className="
                        text-sm
                        font-medium

                        text-gray-800

                        dark:text-gray-100
                      "
                    >
                      {project.title}
                    </p>

                    {project.description && (
                      <p
                        className="
                          mt-1
                          max-w-[280px]
                          truncate
                          text-xs

                          text-gray-400

                          dark:text-gray-500
                        "
                      >
                        {project.description}
                      </p>
                    )}
                  </div>
                </td>

                {/* Status */}
                <td className="px-5 py-4">
                  <span
                    className={`
                      inline-flex
                      rounded-full
                      px-3
                      py-1
                      text-[10px]
                      font-medium

                      ${
                        statusStyles[project.status] ||
                        statusStyles.todo
                      }
                    `}
                  >
                    {statusLabels[project.status] ||
                      project.status}
                  </span>
                </td>

                {/* Due Date */}
                <td
                  className="
                    px-5
                    py-4
                    text-xs

                    text-gray-500

                    dark:text-gray-400
                  "
                >
                  <span className="flex items-center gap-2">
                    <CalendarDays
                      size={14}
                      className="
                        text-gray-400

                        dark:text-gray-500
                      "
                    />

                    {formatDate(project.dueDate)}
                  </span>
                </td>

                {/* Updated */}
                <td
                  className="
                    px-5
                    py-4
                    text-xs

                    text-gray-500

                    dark:text-gray-400
                  "
                >
                  {formatDate(project.updatedAt)}
                </td>

                {/* Actions */}
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        onEdit?.(project)
                      }
                      className="
                        rounded-lg
                        px-2
                        py-1
                        text-xs

                        text-violet-600

                        transition

                        hover:bg-violet-50

                        dark:text-violet-400
                        dark:hover:bg-violet-950/50
                      "
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        onDelete?.(project)
                      }
                      className="
                        rounded-lg
                        px-2
                        py-1
                        text-xs

                        text-red-500

                        transition

                        hover:bg-red-50

                        dark:text-red-400
                        dark:hover:bg-red-950/50
                      "
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* =========================
          Mobile Cards
      ========================== */}
      <div className="space-y-3 p-3 md:hidden">
        {projects.map((project) => (
          <div
            key={project._id || project.id}
            className="
              rounded-2xl
              border
              border-gray-200/60

              bg-white/60
              p-4

              transition

              hover:bg-white/80

              dark:border-slate-700
              dark:bg-slate-800/70
              dark:hover:bg-slate-800
            "
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p
                  className="
                    truncate
                    text-sm
                    font-medium

                    text-gray-800

                    dark:text-gray-100
                  "
                >
                  {project.title}
                </p>

                <p
                  className="
                    mt-1
                    text-xs

                    text-gray-400

                    dark:text-gray-500
                  "
                >
                  {formatDate(project.dueDate)}
                </p>
              </div>

              <span
                className={`
                  shrink-0
                  rounded-full
                  px-3
                  py-1
                  text-[10px]
                  font-medium

                  ${
                    statusStyles[project.status] ||
                    statusStyles.todo
                  }
                `}
              >
                {statusLabels[project.status] ||
                  project.status}
              </span>
            </div>

            {/* Mobile Actions */}
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() =>
                  onEdit?.(project)
                }
                className="
                  rounded-lg
                  border
                  border-violet-200

                  bg-violet-50
                  px-3
                  py-2
                  text-xs

                  text-violet-600

                  transition

                  hover:bg-violet-100

                  dark:border-violet-800
                  dark:bg-violet-950/50
                  dark:text-violet-300
                  dark:hover:bg-violet-900/60
                "
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() =>
                  onDelete?.(project)
                }
                className="
                  rounded-lg
                  border
                  border-red-200

                  bg-red-50
                  px-3
                  py-2
                  text-xs

                  text-red-500

                  transition

                  hover:bg-red-100

                  dark:border-red-800
                  dark:bg-red-950/50
                  dark:text-red-300
                  dark:hover:bg-red-900/60
                "
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}