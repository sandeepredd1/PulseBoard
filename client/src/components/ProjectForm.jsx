import { useEffect, useState } from "react";

const initialForm = {
  title: "",
  description: "",
  status: "todo",
  dueDate: "",
};

export default function ProjectForm({
  project,
  onSubmit,
  onCancel,
  submitting = false,
}) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (project) {
      setForm({
        title: project.title || "",
        description: project.description || "",
        status: project.status || "todo",
        dueDate: project.dueDate
          ? new Date(project.dueDate)
              .toISOString()
              .split("T")[0]
          : "",
      });
    } else {
      setForm(initialForm);
    }
  }, [project]);

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: "",
    }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.title.trim()) {
      nextErrors.title = "Project title is required.";
    }

    if (form.title.trim().length > 100) {
      nextErrors.title =
        "Title must be less than 100 characters.";
    }

    if (!form.description.trim()) {
      nextErrors.description =
        "Description is required.";
    }

    if (!form.dueDate) {
      nextErrors.dueDate =
        "Due date is required.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) return;

    await onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Project Title */}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-gray-700 dark:text-gray-200">
          Project Title
        </label>

        <input
          value={form.title}
          onChange={(event) =>
            updateField("title", event.target.value)
          }
          placeholder="Enter project title"
          className="
            w-full rounded-xl
            border border-gray-200
            bg-white
            px-4 py-3
            text-sm text-gray-900
            placeholder:text-gray-400
            outline-none
            transition
            focus:border-violet-400
            focus:ring-2 focus:ring-violet-200
            dark:border-slate-700
            dark:bg-slate-900
            dark:text-white
            dark:placeholder:text-gray-500
            dark:focus:border-violet-500
            dark:focus:ring-violet-500/20
          "
        />

        {errors.title && (
          <p className="mt-1 text-xs text-red-500 dark:text-red-400">
            {errors.title}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-gray-700 dark:text-gray-200">
          Description
        </label>

        <textarea
          rows={4}
          value={form.description}
          onChange={(event) =>
            updateField(
              "description",
              event.target.value
            )
          }
          placeholder="Describe your project"
          className="
            w-full resize-none rounded-xl
            border border-gray-200
            bg-white
            px-4 py-3
            text-sm text-gray-900
            placeholder:text-gray-400
            outline-none
            transition
            focus:border-violet-400
            focus:ring-2 focus:ring-violet-200
            dark:border-slate-700
            dark:bg-slate-900
            dark:text-white
            dark:placeholder:text-gray-500
            dark:focus:border-violet-500
            dark:focus:ring-violet-500/20
          "
        />

        {errors.description && (
          <p className="mt-1 text-xs text-red-500 dark:text-red-400">
            {errors.description}
          </p>
        )}
      </div>

      {/* Status + Due Date */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Status */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700 dark:text-gray-200">
            Status
          </label>

          <select
            value={form.status}
            onChange={(event) =>
              updateField(
                "status",
                event.target.value
              )
            }
            className="
              w-full rounded-xl
              border border-gray-200
              bg-white
              px-4 py-3
              text-sm text-gray-900
              outline-none
              transition
              focus:border-violet-400
              focus:ring-2 focus:ring-violet-200
              dark:border-slate-700
              dark:bg-slate-900
              dark:text-white
              dark:focus:border-violet-500
              dark:focus:ring-violet-500/20
            "
          >
            <option
              value="todo"
              className="bg-white text-gray-900 dark:bg-slate-900 dark:text-white"
            >
              To Do
            </option>

            <option
              value="in_progress"
              className="bg-white text-gray-900 dark:bg-slate-900 dark:text-white"
            >
              In Progress
            </option>

            <option
              value="completed"
              className="bg-white text-gray-900 dark:bg-slate-900 dark:text-white"
            >
              Completed
            </option>

            <option
              value="overdue"
              className="bg-white text-gray-900 dark:bg-slate-900 dark:text-white"
            >
              Overdue
            </option>
          </select>
        </div>

        {/* Due Date */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700 dark:text-gray-200">
            Due Date
          </label>

          <input
            type="date"
            value={form.dueDate}
            onChange={(event) =>
              updateField(
                "dueDate",
                event.target.value
              )
            }
            className="
              w-full rounded-xl
              border border-gray-200
              bg-white
              px-4 py-3
              text-sm text-gray-900
              outline-none
              transition
              focus:border-violet-400
              focus:ring-2 focus:ring-violet-200
              dark:border-slate-700
              dark:bg-slate-900
              dark:text-white
              dark:focus:border-violet-500
              dark:focus:ring-violet-500/20
            "
          />

          {errors.dueDate && (
            <p className="mt-1 text-xs text-red-500 dark:text-red-400">
              {errors.dueDate}
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-3">
        <button
          type="button"
          onClick={onCancel}
          className="
            rounded-xl
            border border-gray-200
            bg-white
            px-4 py-2.5
            text-sm font-medium
            text-gray-700
            transition
            hover:bg-gray-100
            dark:border-slate-700
            dark:bg-slate-900
            dark:text-gray-200
            dark:hover:bg-slate-800
          "
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={submitting}
          className="
            rounded-xl
            bg-violet-600
            px-5 py-2.5
            text-sm font-medium
            text-white
            shadow-lg shadow-violet-200/50
            transition
            hover:bg-violet-700
            disabled:cursor-not-allowed
            disabled:opacity-50
            dark:shadow-violet-900/30
          "
        >
          {submitting
            ? "Saving..."
            : project
              ? "Update Project"
              : "Create Project"}
        </button>
      </div>
    </form>
  );
}