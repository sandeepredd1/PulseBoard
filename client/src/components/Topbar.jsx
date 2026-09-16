import {
  Search,
  Sun,
  Moon,
  Bell,
  Menu,
  ChevronDown,
  Settings,
  ShieldCheck,
  LogOut,
  CheckCheck,
  FolderKanban,
  BarChart3,
  X,
  UserRound,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

export default function Topbar({ setMobileOpen }) {
  const { dark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Project updated",
      message: "Your project status was updated.",
      time: "5 min ago",
      icon: FolderKanban,
      read: false,
      path: "/projects",
    },
    {
      id: 2,
      title: "Analytics ready",
      message: "Your latest project analytics are ready.",
      time: "20 min ago",
      icon: BarChart3,
      read: false,
      path: "/analytics",
    },
    {
      id: 3,
      title: "Welcome to PulseBoard",
      message: "Your workspace is ready to use.",
      time: "1 hour ago",
      icon: CheckCheck,
      read: false,
      path: "/dashboard",
    },
  ]);

  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const searchRef = useRef(null);

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "PB";

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationOpen(false);
      }

      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setSearchOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setProfileOpen(false);
        setNotificationOpen(false);
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const searchItems = [
    {
      title: "Projects",
      description: "Manage your projects",
      icon: FolderKanban,
      path: "/projects",
    },
    {
      title: "Project Analytics",
      description: "View project performance",
      icon: BarChart3,
      path: "/analytics",
    },
    {
      title: "Dashboard",
      description: "View your dashboard",
      icon: BarChart3,
      path: "/dashboard",
    },
  ];

  const filteredSearchItems = searchItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.description.toLowerCase().includes(searchValue.toLowerCase())
  );

  const openSearchItem = (path) => {
    setSearchOpen(false);
    setSearchValue("");
    navigate(path);
  };

  const handleNotificationClick = (notification) => {
    setNotifications((current) =>
      current.map((item) =>
        item.id === notification.id ? { ...item, read: true } : item
      )
    );

    setNotificationOpen(false);
    navigate(notification.path);
  };

  const markAllRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const openProfile = () => {
    setProfileOpen(false);
    navigate("/profile");
  };

  const openSettings = () => {
    setProfileOpen(false);
    navigate("/settings");
  };

  const openSecurity = () => {
    setProfileOpen(false);
    navigate("/settings");
  };

  const handleLogout = async () => {
    setProfileOpen(false);

    try {
      await logout();
    } finally {
      navigate("/login");
    }
  };

  return (
    <header className="relative flex h-[76px] items-center gap-3 text-gray-900 dark:text-white">
      <button type="button" onClick={() => setMobileOpen(true)} className="glass group flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200/60 text-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/80 hover:text-gray-900 hover:shadow-lg dark:border-slate-700/60 dark:text-gray-200 dark:hover:bg-slate-800/80 dark:hover:text-white lg:hidden" aria-label="Open menu">
        <Menu size={19} className="transition-transform duration-300 group-hover:scale-110" />
      </button>

      <div ref={searchRef} className="relative min-w-0 flex-1">
        <div className={`glass flex h-11 items-center gap-3 rounded-full border px-4 transition-all duration-300 ${searchOpen ? "border-violet-200 bg-white/90 shadow-lg shadow-violet-100 ring-2 ring-violet-100 dark:border-violet-800 dark:bg-slate-800/90 dark:shadow-black/20 dark:ring-violet-900/40" : "border-gray-200/60 hover:bg-white/80 hover:shadow-md dark:border-slate-700/60 dark:hover:bg-slate-800/80"}`}>
          <Search size={18} className={`shrink-0 transition-colors ${searchOpen ? "text-violet-500" : "text-gray-400 dark:text-gray-500"}`} />

          <input
            type="search"
            value={searchValue}
            onFocus={() => setSearchOpen(true)}
            onChange={(event) => {
              setSearchValue(event.target.value);
              setSearchOpen(true);
            }}
            placeholder="Search projects, clients, transactions..."
            className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400 dark:text-gray-100 dark:placeholder:text-gray-500"
          />

          {searchValue && (
            <button type="button" onClick={() => setSearchValue("")} className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-slate-700 dark:hover:text-gray-200" aria-label="Clear search">
              <X size={14} />
            </button>
          )}

          <kbd className="hidden rounded-lg border border-gray-200 bg-white/70 px-2 py-1 text-[10px] text-gray-400 dark:border-slate-600 dark:bg-slate-800 dark:text-gray-500 sm:block">
            /
          </kbd>
        </div>

        {searchOpen && (
          <div className="absolute left-0 right-0 top-14 z-50 overflow-hidden rounded-2xl border border-gray-200/70 bg-white/95 p-2 text-gray-900 shadow-2xl shadow-slate-900/10 backdrop-blur-2xl dark:border-slate-700 dark:bg-slate-900/95 dark:text-white dark:shadow-black/30">
            <div className="px-3 py-2">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                Quick navigation
              </p>
            </div>

            {filteredSearchItems.length > 0 ? (
              <div className="space-y-1">
                {filteredSearchItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button key={item.path} type="button" onClick={() => openSearchItem(item.path)} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-gray-800 transition-all duration-200 hover:bg-violet-50 hover:shadow-sm dark:text-gray-100 dark:hover:bg-violet-950/50">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-950/60 dark:text-violet-300">
                        <Icon size={17} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                          {item.title}
                        </p>

                        <p className="truncate text-xs text-gray-400 dark:text-gray-500">
                          {item.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="px-4 py-8 text-center">
                <Search size={24} className="mx-auto mb-2 text-gray-300 dark:text-gray-600" />

                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  No results found
                </p>

                <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                  Try searching for projects or analytics
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <button type="button" onClick={toggleTheme} className="glass group flex h-11 w-[76px] shrink-0 items-center justify-center gap-1 rounded-full border border-gray-200/60 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/80 hover:shadow-lg dark:border-slate-700/60 dark:hover:bg-slate-800/80" aria-label="Toggle theme">
        <Sun size={16} className={`transition-all duration-300 ${dark ? "rotate-90 text-gray-500" : "text-orange-500"}`} />
        <Moon size={15} className={`transition-all duration-300 ${dark ? "text-violet-400" : "text-gray-400"}`} />
      </button>

      <div ref={notificationRef} className="relative hidden sm:block">
        <button type="button" onClick={() => { setNotificationOpen((previous) => !previous); setProfileOpen(false); }} className={`glass group relative flex h-11 w-11 items-center justify-center rounded-full text-gray-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/80 hover:text-violet-600 hover:shadow-lg dark:text-gray-300 dark:hover:bg-slate-800/80 dark:hover:text-violet-400 ${notificationOpen ? "bg-white/80 text-violet-600 shadow-lg dark:bg-slate-800/90 dark:text-violet-400" : ""}`} aria-label="Notifications">
          <Bell size={17} className="transition-transform duration-300 group-hover:rotate-6" />

          {unreadCount > 0 && (
            <span className="absolute right-2 top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-violet-500 px-1 text-[8px] font-bold text-white ring-2 ring-white dark:ring-slate-900">
              {unreadCount}
            </span>
          )}
        </button>

        {notificationOpen && (
          <div className="absolute right-0 top-14 z-50 w-[320px] overflow-hidden rounded-2xl border border-gray-200/70 bg-white/95 text-gray-900 shadow-2xl shadow-slate-900/10 backdrop-blur-2xl dark:border-slate-700 dark:bg-slate-900/95 dark:text-white dark:shadow-black/30">
            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 dark:border-slate-800">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Notifications
                </h3>

                <p className="text-[11px] text-gray-400 dark:text-gray-500">
                  {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}` : "All notifications read"}
                </p>
              </div>

              {unreadCount > 0 && (
                <button type="button" onClick={markAllRead} className="text-[11px] font-medium text-violet-600 transition hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300">
                  Mark all read
                </button>
              )}
            </div>

            <div className="max-h-[330px] overflow-y-auto p-2">
              {notifications.map((notification) => {
                const Icon = notification.icon;

                return (
                  <button key={notification.id} type="button" onClick={() => handleNotificationClick(notification)} className={`flex w-full gap-3 rounded-xl p-3 text-left transition-all duration-200 hover:bg-violet-50 dark:hover:bg-violet-950/40 ${notification.read ? "opacity-60" : ""}`}>
                    <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-950/60 dark:text-violet-300">
                      <Icon size={16} />

                      {!notification.read && (
                        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-violet-500 ring-2 ring-white dark:ring-slate-900" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-gray-800 dark:text-gray-100">
                        {notification.title}
                      </p>

                      <p className="mt-0.5 text-[11px] leading-4 text-gray-400 dark:text-gray-500">
                        {notification.message}
                      </p>

                      <p className="mt-1 text-[10px] text-gray-400 dark:text-gray-500">
                        {notification.time}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <button type="button" onClick={() => { setNotificationOpen(false); navigate("/dashboard"); }} className="w-full border-t border-gray-100 px-4 py-3 text-center text-xs font-medium text-violet-600 transition hover:bg-violet-50 dark:border-slate-800 dark:text-violet-400 dark:hover:bg-violet-950/40">
              View dashboard
            </button>
          </div>
        )}
      </div>

      <div ref={profileRef} className="relative">
        <button type="button" onClick={() => { setProfileOpen((previous) => !previous); setNotificationOpen(false); }} className="group flex items-center gap-2 rounded-full transition-all duration-300 hover:-translate-y-0.5" aria-label="Open profile menu">
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-gradient-to-br from-orange-300 via-amber-400 to-yellow-600 text-xs font-bold text-white shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:shadow-orange-200 dark:border-slate-800 dark:group-hover:shadow-orange-900/30">
            {initials}

            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </div>

          <div className="hidden max-w-[120px] text-left xl:block">
            <p className="truncate text-xs font-semibold text-gray-800 dark:text-gray-100">
              {user?.name || "PulseBoard User"}
            </p>

            <p className="truncate text-[10px] text-gray-400 dark:text-gray-500">
              {user?.email || "Account"}
            </p>
          </div>

          <ChevronDown size={14} className={`hidden text-gray-400 transition-transform duration-300 dark:text-gray-500 xl:block ${profileOpen ? "rotate-180" : ""}`} />
        </button>

        {profileOpen && (
          <div className="absolute right-0 top-14 z-50 w-[260px] overflow-hidden rounded-2xl border border-gray-200/70 bg-white/95 text-gray-900 shadow-2xl shadow-slate-900/10 backdrop-blur-2xl dark:border-slate-700 dark:bg-slate-900/95 dark:text-white dark:shadow-black/30">
            <div className="border-b border-gray-100 bg-gradient-to-br from-violet-50/80 to-blue-50/80 p-4 dark:border-slate-800 dark:from-violet-950/50 dark:to-blue-950/40">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-300 to-yellow-600 text-sm font-bold text-white shadow-md">
                  {initials}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                    {user?.name || "PulseBoard User"}
                  </p>

                  <p className="truncate text-xs text-gray-400 dark:text-gray-500">
                    {user?.email || "Account"}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-2">
              <button type="button" onClick={openProfile} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-gray-600 transition-all duration-200 hover:bg-violet-50 hover:text-violet-700 dark:text-gray-300 dark:hover:bg-violet-950/50 dark:hover:text-violet-300">
                <UserRound size={17} />

                <div>
                  <p className="font-medium">My Profile</p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500">
                    View your profile
                  </p>
                </div>
              </button>

              <button type="button" onClick={openSettings} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-gray-600 transition-all duration-200 hover:bg-violet-50 hover:text-violet-700 dark:text-gray-300 dark:hover:bg-violet-950/50 dark:hover:text-violet-300">
                <Settings size={17} />

                <div>
                  <p className="font-medium">Account Settings</p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500">
                    Manage your account
                  </p>
                </div>
              </button>

              <button type="button" onClick={openSecurity} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-gray-600 transition-all duration-200 hover:bg-violet-50 hover:text-violet-700 dark:text-gray-300 dark:hover:bg-violet-950/50 dark:hover:text-violet-300">
                <ShieldCheck size={17} />

                <div>
                  <p className="font-medium">Security</p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500">
                    Password & security
                  </p>
                </div>
              </button>

              <div className="my-2 h-px bg-gray-100 dark:bg-slate-800" />

              <button type="button" onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-red-500 transition-all duration-200 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40">
                <LogOut size={17} />

                <div>
                  <p className="font-medium">Logout</p>
                  <p className="text-[10px] text-red-400 dark:text-red-500">
                    Sign out of PulseBoard
                  </p>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}