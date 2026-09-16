import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useTheme } from "../context/ThemeContext";

export default function Chart({ data, availableYears = [], selectedYear, onYearChange, loading }) {
  const { dark } = useTheme();

  const chartData = Array.isArray(data) ? data : [];

  const axisColor = dark ? "#94a3b8" : "#8b929e";
  const gridColor = dark ? "#334155" : "#dfe5ed";

  const tooltipBackground = dark ? "rgba(15, 23, 42, 0.97)" : "rgba(255, 255, 255, 0.95)";
  const tooltipBorder = dark ? "#334155" : "#e5e7eb";
  const tooltipTextColor = dark ? "#f8fafc" : "#111827";

  return (
    <div className="glass rounded-[20px] border border-gray-200/60 bg-white/70 p-4 transition-colors duration-300 dark:border-slate-700/60 dark:bg-slate-900/70 sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-base font-medium text-gray-900 dark:text-white">
            Project Dynamics
          </h2>

          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Projects created and completed over time
          </p>
        </div>

        <select value={selectedYear ?? ""} onChange={(event) => onYearChange(Number(event.target.value))} disabled={loading || availableYears.length === 0} className="rounded-full border border-gray-200 bg-white/80 px-3 py-2 text-xs text-gray-700 shadow-sm outline-none transition hover:bg-white focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-600 dark:bg-slate-800 dark:text-gray-200 dark:hover:bg-slate-700 dark:focus:border-violet-500">
          {availableYears.length > 0 ? (
            availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))
          ) : (
            <option value="">
              No data
            </option>
          )}
        </select>
      </div>

      <div className="h-[280px] w-full">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Loading project data...
            </span>
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              No project data available for this year.
            </span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 10, right: 5, left: -18, bottom: 0 }}>
              <CartesianGrid stroke={gridColor} strokeDasharray="2 5" vertical={false} horizontal={false} />

              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: axisColor }} />

              <YAxis axisLine={false} tickLine={false} allowDecimals={false} tick={{ fontSize: 10, fill: axisColor }} />

              <Tooltip contentStyle={{ borderRadius: 14, border: `1px solid ${tooltipBorder}`, background: tooltipBackground, color: tooltipTextColor, boxShadow: dark ? "0 10px 30px rgba(0,0,0,.35)" : "0 10px 30px rgba(0,0,0,.08)" }} labelStyle={{ color: tooltipTextColor, fontWeight: 600, marginBottom: 4 }} itemStyle={{ color: tooltipTextColor }} cursor={{ fill: dark ? "rgba(148, 163, 184, 0.08)" : "rgba(100, 116, 139, 0.06)" }} />

              <Bar dataKey="created" barSize={10} radius={[2, 2, 0, 0]} fill="#36c763" name="Created" />

              <Bar dataKey="completed" barSize={10} radius={[2, 2, 0, 0]} fill="#ff554c" name="Completed" />

              <Bar dataKey="overdue" barSize={10} radius={[2, 2, 0, 0]} fill="#f97316" name="Overdue" />

              <Line type="monotone" dataKey="projects" stroke="#6545ff" strokeWidth={1.6} dot={false} name="Projects" />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="mt-2 flex flex-wrap justify-center gap-5 text-[10px] text-gray-500 dark:text-gray-400">
        <span className="flex items-center gap-2">
          <i className="h-[2px] w-4 bg-violet-500" />
          Projects
        </span>

        <span className="flex items-center gap-2">
          <i className="h-2.5 w-2.5 bg-emerald-500" />
          Created
        </span>

        <span className="flex items-center gap-2">
          <i className="h-2.5 w-2.5 bg-red-500" />
          Completed
        </span>

        <span className="flex items-center gap-2">
          <i className="h-2.5 w-2.5 bg-orange-500" />
          Overdue
        </span>
      </div>
    </div>
  );
}