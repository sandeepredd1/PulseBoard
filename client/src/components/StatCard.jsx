import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";

export default function StatCard({
  title,
  value,
  change,
  positive = true,
  description,
  onClick,
}) {
  return (
    <div className="glass group min-h-[154px] rounded-[20px] border border-gray-200/60 bg-white/70 p-3 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl dark:border-slate-700/60 dark:bg-slate-900/70 dark:hover:shadow-black/30">
      {/* Title */}
      <div className="flex items-center gap-2">
        {positive ? (
          <ArrowUpRight size={17} className="text-emerald-500 dark:text-emerald-400" />
        ) : (
          <ArrowDownRight size={17} className="text-red-500 dark:text-red-400" />
        )}

        <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
          {title}
        </span>
      </div>

      {/* Value + Change */}
      <div className="mt-2 flex items-center gap-3">
        <span className="text-[22px] font-semibold tracking-tight text-gray-950 dark:text-white">
          {value}
        </span>

        {change && (
          <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold text-white ${positive ? "bg-emerald-500 dark:bg-emerald-600" : "bg-red-500 dark:bg-red-600"}`}>
            {change}
          </span>
        )}
      </div>

      {/* Description */}
      <div className="mt-5 flex min-h-[43px] items-center gap-2 border-l-2 border-violet-500 bg-violet-50/60 px-2 dark:border-violet-400 dark:bg-violet-950/30">
        <p className="line-clamp-2 flex-1 text-[11px] italic leading-4 text-gray-700 dark:text-gray-300">
          {description}
        </p>

        {/* Open Button */}
        <button type="button" onClick={onClick} disabled={!onClick} className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:scale-105 hover:bg-gray-50 hover:text-gray-900 disabled:cursor-default disabled:opacity-70 dark:border-slate-600 dark:bg-slate-800 dark:text-gray-200 dark:hover:bg-slate-700 dark:hover:text-white" aria-label={`Open ${title}`}>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}