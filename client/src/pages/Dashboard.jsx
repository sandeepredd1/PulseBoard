import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  AlertTriangle,
  Lightbulb,
  TrendingUp,
  TrendingDown,
  Users,
  BarChart3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Layout from "../components/Layout";
import Chart from "../components/Chart";
import ProjectTable from "../components/ProjectTable";
import { getDashboardSummary, deleteProject } from "../services/api";

export default function Dashboard() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedYear, setSelectedYear] = useState(null);

  const loadDashboard = async (year = null) => {
    try {
      setLoading(true);
      setError("");

      const response = await getDashboardSummary(year);
      const data = response?.data || response?.dashboard || response;

      setDashboard(data);

      if (data?.selectedYear) {
        setSelectedYear(Number(data.selectedYear));
      } else if (data?.availableYears?.length > 0) {
        setSelectedYear(Number(data.availableYears[0]));
      }
    } catch (err) {
      console.error("Dashboard loading error:", err);
      setError(err.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const handleYearChange = (year) => {
    const numericYear = Number(year);
    setSelectedYear(numericYear);
    loadDashboard(numericYear);
  };

  // EDIT PROJECT
  const handleEditProject = (project) => {
    if (!project?._id) return;

    navigate(`/projects?edit=${project._id}`);
  };

  // DELETE PROJECT
  const handleDeleteProject = async (project) => {
    if (!project?._id) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${project.title}"?`
    );

    if (!confirmed) return;

    try {
      await deleteProject(project._id);

      // Refresh dashboard after successful delete
      await loadDashboard(selectedYear);
    } catch (err) {
      console.error("Delete project error:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to delete project"
      );
    }
  };

  const stats = dashboard?.stats || {};
  const recentProjects = dashboard?.recentProjects || [];
  const chartData = dashboard?.chartData || [];
  const statusChart = dashboard?.statusChart || [];
  const availableYears = dashboard?.availableYears || [];

  const totalProjects = Number(stats.totalProjects || 0);
  const activeProjects = Number(stats.activeProjects || 0);
  const completedProjects = Number(stats.completedProjects || 0);
  const overdueProjects = Number(stats.overdueProjects || 0);

  const projectHealth = useMemo(() => {
    if (totalProjects === 0) return 0;

    const completedScore = completedProjects / totalProjects;
    const overduePenalty = overdueProjects / totalProjects;

    return Math.max(
      0,
      Math.min(
        100,
        Math.round(completedScore * 100 - overduePenalty * 30)
      )
    );
  }, [totalProjects, completedProjects, overdueProjects]);

  const statusData = useMemo(() => {
    const map = {
      todo: 0,
      in_progress: 0,
      completed: 0,
      overdue: 0,
    };

    statusChart.forEach((item) => {
      if (item?.status && map[item.status] !== undefined) {
        map[item.status] = Number(item.count || 0);
      }
    });

    return map;
  }, [statusChart]);

  const statusPercentages = useMemo(() => {
    if (totalProjects === 0) {
      return {
        todo: 0,
        inProgress: 0,
        completed: 0,
        overdue: 0,
      };
    }

    return {
      todo: Math.round((statusData.todo / totalProjects) * 100),
      inProgress: Math.round(
        (statusData.in_progress / totalProjects) * 100
      ),
      completed: Math.round(
        (statusData.completed / totalProjects) * 100
      ),
      overdue: Math.round(
        (statusData.overdue / totalProjects) * 100
      ),
    };
  }, [statusData, totalProjects]);

  const donutStyle = useMemo(() => {
    const todo = statusPercentages.todo;
    const inProgress = statusPercentages.inProgress;
    const completed = statusPercentages.completed;

    const todoEnd = todo * 3.6;
    const inProgressEnd = todoEnd + inProgress * 3.6;
    const completedEnd = inProgressEnd + completed * 3.6;

    return {
      background: `conic-gradient(#c4b5fd 0deg ${todoEnd}deg, #8b5cf6 ${todoEnd}deg ${inProgressEnd}deg, #6d28d9 ${inProgressEnd}deg ${completedEnd}deg, #ef4444 ${completedEnd}deg 360deg)`,
    };
  }, [statusPercentages]);

  const progressProjects = useMemo(() => {
    return recentProjects.slice(0, 4).map((project) => {
      let percentage = 0;

      if (project.status === "completed") {
        percentage = 100;
      } else if (project.status === "in_progress") {
        percentage = 50;
      } else if (project.status === "overdue") {
        percentage = 25;
      }

      return {
        ...project,
        progress: percentage,
      };
    });
  }, [recentProjects]);

  return (
    <Layout>
      <section className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Overview of your project performance
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/projects")}
          className="hidden rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700 dark:shadow-violet-950/40 sm:block"
        >
          + New Project
        </button>
      </section>

      {error && (
        <div className="mb-4 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
          Unable to load live dashboard data: {error}
        </div>
      )}

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <button
          type="button"
          onClick={() => navigate("/projects")}
          className="rounded-[20px] border border-gray-200 bg-white/80 p-4 text-left shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900/80"
        >
          <div className="flex items-center gap-2">
            <TrendingUp size={17} className="text-emerald-500" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              Total Projects
            </span>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-950 dark:text-white">
              {loading ? "—" : totalProjects}
            </span>
            <span className="rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-bold text-white">
              Live
            </span>
          </div>

          <div className="mt-4 border-l-2 border-violet-500 bg-violet-50 px-2.5 py-2 dark:bg-violet-950/30">
            <p className="text-[11px] italic text-gray-700 dark:text-gray-300">
              Total projects in your workspace
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => navigate("/projects")}
          className="rounded-[20px] border border-gray-200 bg-white/80 p-4 text-left shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900/80"
        >
          <div className="flex items-center gap-2">
            <TrendingUp size={17} className="text-emerald-500" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              Active Projects
            </span>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-950 dark:text-white">
              {loading ? "—" : activeProjects}
            </span>
            <span className="rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-bold text-white">
              Live
            </span>
          </div>

          <div className="mt-4 border-l-2 border-violet-500 bg-violet-50 px-2.5 py-2 dark:bg-violet-950/30">
            <p className="text-[11px] italic text-gray-700 dark:text-gray-300">
              Projects currently active
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => navigate("/projects")}
          className="rounded-[20px] border border-gray-200 bg-white/80 p-4 text-left shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900/80"
        >
          <div className="flex items-center gap-2">
            <TrendingUp size={17} className="text-emerald-500" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              Completed
            </span>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-950 dark:text-white">
              {loading ? "—" : completedProjects}
            </span>
            <span className="rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-bold text-white">
              Live
            </span>
          </div>

          <div className="mt-4 border-l-2 border-violet-500 bg-violet-50 px-2.5 py-2 dark:bg-violet-950/30">
            <p className="text-[11px] italic text-gray-700 dark:text-gray-300">
              Projects completed successfully
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => navigate("/projects")}
          className="rounded-[20px] border border-gray-200 bg-white/80 p-4 text-left shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900/80"
        >
          <div className="flex items-center gap-2">
            <TrendingDown size={17} className="text-red-500" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              Overdue
            </span>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-950 dark:text-white">
              {loading ? "—" : overdueProjects}
            </span>
            <span className="rounded-full bg-red-500 px-2.5 py-1 text-[10px] font-bold text-white">
              Live
            </span>
          </div>

          <div className="mt-4 border-l-2 border-red-500 bg-red-50 px-2.5 py-2 dark:bg-red-950/30">
            <p className="text-[11px] italic text-gray-700 dark:text-gray-300">
              Projects requiring attention
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => navigate("/analytics")}
          className="rounded-[20px] border border-gray-200 bg-white/80 p-4 text-left shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900/80"
        >
          <div className="flex items-center gap-2">
            <TrendingUp size={17} className="text-emerald-500" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              Project Health
            </span>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-950 dark:text-white">
              {loading ? "—" : `${projectHealth}%`}
            </span>
            <span className="rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-bold text-white">
              Live
            </span>
          </div>

          <div className="mt-4 border-l-2 border-emerald-500 bg-emerald-50 px-2.5 py-2 dark:bg-emerald-950/30">
            <p className="text-[11px] italic text-gray-700 dark:text-gray-300">
              Overall workspace performance
            </p>
          </div>
        </button>
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(340px,1fr)]">
        <div className="min-w-0">
          <Chart
            data={chartData}
            availableYears={availableYears}
            selectedYear={selectedYear}
            onYearChange={handleYearChange}
            loading={loading}
          />
        </div>

        <div className="rounded-[20px] border border-gray-200 bg-white/80 p-4 shadow-sm backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/80 sm:p-5">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              AI Insights Panel
            </h2>
            <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
              Smart insights from your projects
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
            <div className="flex items-center gap-2">
              <AlertTriangle
                size={17}
                className="text-yellow-500 dark:text-yellow-400"
              />
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                High Risk
              </span>
            </div>

            <div className="mt-4 border-l-2 border-red-500 bg-red-50 p-3 dark:border-red-400 dark:bg-red-950/30">
              <p className="text-xs italic leading-5 text-gray-800 dark:text-gray-200">
                {overdueProjects > 0
                  ? `${overdueProjects} project${overdueProjects > 1 ? "s are" : " is"} currently overdue and may require attention.`
                  : "No projects are currently overdue."}
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/projects")}
              className="mt-4 flex w-full items-center justify-between text-xs font-medium text-gray-700 transition hover:text-gray-950 dark:text-gray-300 dark:hover:text-white"
            >
              View Projects
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
            <div className="flex items-center gap-2">
              <Lightbulb
                size={17}
                className="text-yellow-500 dark:text-yellow-400"
              />
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                Forecast
              </span>
            </div>

            <div className="mt-4 border-l-2 border-violet-500 bg-violet-50 p-3 dark:border-violet-400 dark:bg-violet-950/30">
              <p className="text-xs italic leading-5 text-gray-800 dark:text-gray-200">
                {completedProjects > 0
                  ? "Completed projects are contributing positively to workspace delivery."
                  : "Complete projects to build your delivery performance."}
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/analytics")}
              className="mt-4 flex w-full items-center justify-between text-xs font-medium text-gray-700 transition hover:text-gray-950 dark:text-gray-300 dark:hover:text-white"
            >
              Open Analytics
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="rounded-[20px] border border-gray-200 bg-white/80 p-4 shadow-sm backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/80 sm:p-5">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">
            Project Status
          </h2>

          <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
            Distribution by project status
          </p>

          <div className="mt-5 flex items-center gap-6">
            <div
              className="relative h-28 w-28 shrink-0 rounded-full"
              style={donutStyle}
            >
              <div className="absolute inset-[26px] flex items-center justify-center rounded-full bg-white dark:bg-slate-900">
                <span className="text-xs font-bold text-gray-900 dark:text-white">
                  {totalProjects}
                </span>
              </div>
            </div>

            <div className="flex-1 space-y-3 text-xs text-gray-800 dark:text-gray-200">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <i className="h-2.5 w-2.5 rounded-full bg-violet-300" />
                  To Do
                </span>
                <b>{statusPercentages.todo}%</b>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <i className="h-2.5 w-2.5 rounded-full bg-violet-500" />
                  In Progress
                </span>
                <b>{statusPercentages.inProgress}%</b>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <i className="h-2.5 w-2.5 rounded-full bg-violet-700" />
                  Completed
                </span>
                <b>{statusPercentages.completed}%</b>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <i className="h-2.5 w-2.5 rounded-full bg-red-500" />
                  Overdue
                </span>
                <b>{statusPercentages.overdue}%</b>
              </div>
            </div>
          </div>

          <div className="mt-5 border-l-2 border-violet-500 bg-violet-50 p-3 text-xs italic text-gray-800 dark:border-violet-400 dark:bg-violet-950/30 dark:text-gray-200">
            {completedProjects > 0
              ? "Completed projects are showing positive delivery progress."
              : "Start completing projects to improve delivery progress."}
          </div>
        </div>

        <div className="rounded-[20px] border border-gray-200 bg-white/80 p-4 shadow-sm backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/80 sm:p-5">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">
            Project Progress
          </h2>

          <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
            Recent projects and estimated progress
          </p>

          <div className="mt-5 space-y-4">
            {loading ? (
              <>
                <div className="h-10 animate-pulse rounded-lg bg-gray-200 dark:bg-slate-700" />
                <div className="h-10 animate-pulse rounded-lg bg-gray-200 dark:bg-slate-700" />
                <div className="h-10 animate-pulse rounded-lg bg-gray-200 dark:bg-slate-700" />
              </>
            ) : progressProjects.length > 0 ? (
              progressProjects.map((project) => (
                <button
                  key={project._id}
                  type="button"
                  onClick={() => navigate("/projects")}
                  className="block w-full text-left"
                >
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      {project.title}
                    </span>

                    <span className="font-semibold text-gray-900 dark:text-white">
                      {project.progress}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-slate-700">
                    <div
                      className="h-full rounded-full bg-violet-600 transition-all dark:bg-violet-400"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </button>
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-gray-300 p-5 text-center text-xs text-gray-500 dark:border-slate-700 dark:text-gray-400">
                No projects available.
              </div>
            )}
          </div>

          <div className="mt-5 border-l-2 border-violet-500 bg-violet-50 p-3 text-xs italic text-gray-800 dark:border-violet-400 dark:bg-violet-950/30 dark:text-gray-200">
            Project progress is calculated from the current project status.
          </div>
        </div>

        <div className="rounded-[20px] border border-gray-200 bg-white/80 p-4 shadow-sm backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/80 sm:p-5">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">
            Workspace Summary
          </h2>

          <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
            Current project workspace performance
          </p>

          <div className="mt-5 text-center">
            <div className="text-4xl font-bold text-gray-950 dark:text-white">
              {projectHealth}
            </div>

            <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
              Health Score
            </p>
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-slate-700">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all"
              style={{ width: `${projectHealth}%` }}
            />
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-xl bg-emerald-50 p-3 dark:bg-emerald-950/30">
              <p className="text-gray-600 dark:text-gray-400">Completed</p>
              <p className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
                {completedProjects}
              </p>
            </div>

            <div className="rounded-xl bg-red-50 p-3 dark:bg-red-950/30">
              <p className="text-gray-600 dark:text-gray-400">Overdue</p>
              <p className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
                {overdueProjects}
              </p>
            </div>
          </div>

          <div className="mt-5 border-l-2 border-emerald-500 bg-emerald-50 p-3 text-xs italic text-gray-800 dark:bg-emerald-950/30 dark:text-gray-200">
            Workspace health is calculated from completed and overdue projects.
          </div>
        </div>
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-3">
        <button
          type="button"
          onClick={() => navigate("/analytics")}
          className="rounded-[20px] border border-gray-200 bg-gradient-to-br from-violet-50 to-purple-100 p-5 text-left transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-700 dark:from-violet-950/40 dark:to-slate-900"
        >
          <div className="flex items-center gap-2">
            <BarChart3
              size={18}
              className="text-violet-600 dark:text-violet-400"
            />

            <h2 className="text-base font-semibold text-gray-900 dark:text-white">
              Project Analytics
            </h2>
          </div>

          <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
            Track project performance and delivery trends.
          </p>

          <div className="mt-5 flex items-end gap-2">
            {[
              statusData.todo,
              statusData.in_progress,
              statusData.completed,
              statusData.overdue,
            ].map((value, index) => {
              const maxValue = Math.max(
                ...Object.values(statusData),
                1
              );

              const height = Math.max(15, (value / maxValue) * 85);

              return (
                <div
                  key={index}
                  className="flex-1 rounded-t-md bg-violet-500 dark:bg-violet-400"
                  style={{ height: `${height}px` }}
                />
              );
            })}
          </div>
        </button>

        <button
          type="button"
          onClick={() => navigate("/projects")}
          className="rounded-[20px] border border-gray-200 bg-gradient-to-br from-blue-50 to-cyan-100 p-5 text-left transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-700 dark:from-blue-950/40 dark:to-slate-900"
        >
          <div className="flex items-center gap-2">
            <Users
              size={18}
              className="text-blue-600 dark:text-blue-400"
            />

            <h2 className="text-base font-semibold text-gray-900 dark:text-white">
              Workspace Activity
            </h2>
          </div>

          <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
            Current activity across your workspace.
          </p>

          <div className="mt-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Active projects
              </span>

              <span className="text-xl font-bold text-gray-900 dark:text-white">
                {activeProjects}
              </span>
            </div>

            <div className="mt-3 h-2 rounded-full bg-blue-100 dark:bg-slate-700">
              <div
                className="h-2 rounded-full bg-blue-500 transition-all dark:bg-blue-400"
                style={{
                  width: `${
                    totalProjects
                      ? Math.min(
                          100,
                          (activeProjects / totalProjects) * 100
                        )
                      : 0
                  }%`,
                }}
              />
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => navigate("/analytics")}
          className="rounded-[20px] border border-gray-200 bg-gradient-to-br from-emerald-50 to-green-100 p-5 text-left transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-700 dark:from-emerald-950/40 dark:to-slate-900"
        >
          <div className="flex items-center gap-2">
            <TrendingUp
              size={18}
              className="text-emerald-600 dark:text-emerald-400"
            />

            <h2 className="text-base font-semibold text-gray-900 dark:text-white">
              Delivery Forecast
            </h2>
          </div>

          <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
            Expected project delivery performance.
          </p>

          <div className="mt-5">
            <span className="text-3xl font-bold text-gray-950 dark:text-white">
              {projectHealth}%
            </span>

            <span className="ml-2 rounded-full bg-emerald-500 px-2 py-1 text-[10px] font-bold text-white">
              Live
            </span>
          </div>
        </button>
      </section>

      <section className="mt-5">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">
              Recent Projects
            </h2>

            <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
              Recently updated projects
            </p>
          </div>

          {/* VIEW ALL */}
          <button
            type="button"
            onClick={() => navigate("/projects")}
            className="text-xs font-semibold text-violet-600 transition hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
          >
            View all
          </button>
        </div>

        <ProjectTable
          projects={recentProjects}
          loading={loading}
          error={error}
          onEdit={handleEditProject}
          onDelete={handleDeleteProject}
        />
      </section>
    </Layout>
  );
}