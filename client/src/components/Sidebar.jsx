import {
  LayoutDashboard,
  FolderKanban,
  BarChart3,
  Users,
  Settings,
  Plug,
  MessageCircle,
  Bot,
  ChevronRight,
  ChevronLeft,
  X,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const mainItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    label: "Projects",
    icon: FolderKanban,
    path: "/projects",
  },
  {
    label: "Project Analytics",
    icon: BarChart3,
    path: "/analytics",
  },
  {
    label: "Customers",
    icon: Users,
    path: "/customers",
  },
];

const supportItems = [
  {
    label: "Settings",
    icon: Settings,
    path: "/settings",
  },
  {
    label: "Integrations",
    icon: Plug,
    path: "/integrations",
  },
  {
    label: "Support & Success",
    icon: MessageCircle,
    path: "/support",
  },
];

function NavigationItem({ item, onClose, collapsed }) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      onClick={onClose}
      title={collapsed ? item.label : undefined}
      className={({ isActive }) => `relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200 ${collapsed ? "justify-center px-2" : ""} ${isActive ? "bg-white/80 font-medium text-gray-900 shadow-sm dark:bg-slate-800/90 dark:text-white dark:shadow-black/20" : "text-gray-600 hover:bg-white/60 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-800/70 dark:hover:text-white"}`}
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <span className="absolute -left-3 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-violet-500 dark:bg-violet-400" />
          )}

          <Icon size={18} strokeWidth={isActive ? 2.2 : 1.8} className={isActive ? "text-violet-600 dark:text-violet-400" : "text-gray-500 dark:text-slate-400"} />

          {!collapsed && <span>{item.label}</span>}
        </>
      )}
    </NavLink>
  );
}

export default function Sidebar({ mobileOpen = false, setMobileOpen }) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const close = () => {
    setMobileOpen?.(false);
  };

  const toggleCollapsed = () => {
    setCollapsed((previous) => !previous);
  };

  const openAIHub = () => {
    close();
    navigate("/ai-insights");
  };

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-slate-950/25 backdrop-blur-sm dark:bg-black/60 lg:hidden" onClick={close} />
      )}

      <aside className={`fixed left-0 top-0 z-50 flex h-screen flex-col rounded-r-[22px] border-r border-white/70 bg-white/70 backdrop-blur-2xl transition-all duration-300 dark:border-slate-800 dark:bg-slate-950/90 lg:sticky lg:translate-x-0 ${collapsed ? "w-[82px]" : "w-[224px]"} ${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className={`flex h-[106px] items-center gap-3 border-b border-white/50 px-5 dark:border-slate-800 ${collapsed ? "justify-center px-3" : ""}`}>
          <button type="button" onClick={() => navigate("/dashboard")} className="flex shrink-0 items-center" aria-label="Go to dashboard">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 shadow-lg">
              <div className="h-5 w-5 rotate-45 rounded-md bg-white/90" />
            </div>
          </button>

          {!collapsed && (
            <div className="min-w-0">
              <h1 className="text-sm font-semibold text-gray-900 dark:text-white">
                PulseBoard
              </h1>

              <p className="truncate text-[11px] text-gray-500 dark:text-slate-400">
                Analytics Dashboard
              </p>
            </div>
          )}

          <button type="button" onClick={close} className="ml-auto flex h-7 w-7 items-center justify-center rounded-lg bg-white/80 text-gray-700 shadow-sm transition hover:bg-white dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 lg:hidden" aria-label="Close menu">
            <X size={15} />
          </button>

          <button type="button" onClick={toggleCollapsed} className={`${collapsed ? "absolute right-2" : "ml-auto"} hidden h-7 w-7 items-center justify-center rounded-lg bg-white/80 text-gray-700 shadow-sm transition hover:bg-white dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 lg:flex`} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} title={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
            {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-6">
          {!collapsed && (
            <p className="mb-3 px-3 text-[10px] font-medium uppercase tracking-wider text-gray-400 dark:text-slate-500">
              Main
            </p>
          )}

          <div className="space-y-1">
            {mainItems.map((item) => (
              <NavigationItem key={item.label} item={item} onClose={close} collapsed={collapsed} />
            ))}
          </div>

          {!collapsed && (
            <>
              <p className="mb-3 mt-8 px-3 text-[10px] font-medium uppercase tracking-wider text-gray-400 dark:text-slate-500">
                Analytics
              </p>

              <div className="space-y-1">
                <NavigationItem
                  item={{
                    label: "Project Insights",
                    icon: BarChart3,
                    path: "/analytics",
                  }}
                  onClose={close}
                  collapsed={collapsed}
                />
              </div>

              <p className="mb-3 mt-8 px-3 text-[10px] font-medium uppercase tracking-wider text-gray-400 dark:text-slate-500">
                Support
              </p>
            </>
          )}

          {collapsed && (
            <div className="my-5 h-px bg-gray-200/70 dark:bg-slate-800" />
          )}

          <div className="space-y-1">
            {supportItems.map((item) => (
              <NavigationItem key={item.label} item={item} onClose={close} collapsed={collapsed} />
            ))}
          </div>
        </nav>

        <div className="p-3">
          <button type="button" onClick={openAIHub} className={`flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-purple-500 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-violet-300/40 transition hover:scale-[1.02] active:scale-[0.98] dark:shadow-violet-950/40 ${collapsed ? "px-2" : ""}`} title={collapsed ? "AI Insight Hub" : undefined}>
            <Bot size={17} />
            {!collapsed && <span>AI Insight Hub</span>}
          </button>
        </div>
      </aside>
    </>
  );
}