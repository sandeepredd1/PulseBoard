import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import ProjectTable from "../components/ProjectTable";
import ProjectForm from "../components/ProjectForm";
import Modal from "../components/Modal";

import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../services/api";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] =
    useState(null);

  const [submitting, setSubmitting] =
    useState(false);

  const [deleteTarget, setDeleteTarget] =
    useState(null);

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getProjects();

      const data =
        response.data ||
        response.projects ||
        response;

      setProjects(
        Array.isArray(data)
          ? data
          : data.projects || []
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const openCreate = () => {
    setEditingProject(null);
    setModalOpen(true);
  };

  const openEdit = (project) => {
    setEditingProject(project);
    setModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    try {
      setSubmitting(true);

      if (editingProject) {
        const response = await updateProject(
          editingProject._id,
          formData
        );

        const updated =
          response.data ||
          response.project ||
          response;

        setProjects((current) =>
          current.map((project) =>
            project._id === editingProject._id
              ? updated
              : project
          )
        );
      } else {
        const response =
          await createProject(formData);

        const created =
          response.data ||
          response.project ||
          response;

        setProjects((current) => [
          created,
          ...current,
        ]);
      }

      setModalOpen(false);
      setEditingProject(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      await deleteProject(deleteTarget._id);

      setProjects((current) =>
        current.filter(
          (project) =>
            project._id !== deleteTarget._id
        )
      );

      setDeleteTarget(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Layout>
      <section className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Projects
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your projects and track progress.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700"
        >
          + New Project
        </button>
      </section>

      {error && (
        <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <ProjectTable
        projects={projects}
        loading={loading}
        error={error}
        onEdit={openEdit}
        onDelete={setDeleteTarget}
      />

      {/* Create / Edit */}
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingProject(null);
        }}
        title={
          editingProject
            ? "Edit Project"
            : "Create Project"
        }
      >
        <ProjectForm
          project={editingProject}
          onSubmit={handleSubmit}
          onCancel={() => {
            setModalOpen(false);
            setEditingProject(null);
          }}
          submitting={submitting}
        />
      </Modal>

      {/* Delete */}
      <Modal
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        title="Delete Project"
      >
        <p className="text-sm leading-6 text-gray-600">
          Are you sure you want to delete{" "}
          <strong>
            {deleteTarget?.title}
          </strong>
          ? This action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => setDeleteTarget(null)}
            className="rounded-xl bg-white/70 px-4 py-2.5 text-sm text-gray-600 hover:bg-white"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="rounded-xl bg-red-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-600"
          >
            Delete Project
          </button>
        </div>
      </Modal>
    </Layout>
  );
}