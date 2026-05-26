"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
  ChevronDown,
  User,
  Settings,
  LogOut,
  HelpCircle,
  CheckCircle,
  AlertTriangle,
  Info,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { notifications as initialNotifications } from "@/lib/data";
import type { Notification } from "@/types";

interface HeaderProps {
  onMenuClick: () => void;
}

const typeIcons = {
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertTriangle,
  info: Info,
};

const typeStyles = {
  success: "bg-emerald-50 text-emerald-600",
  warning: "bg-amber-50 text-amber-600",
  error: "bg-rose-50 text-rose-600",
  info: "bg-blue-50 text-blue-600",
};

export default function Header({ onMenuClick }: HeaderProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [dark, setDark] = useLocalStorage("theme", "light");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const debouncedSearch = useDebounce(searchQuery, 300);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const initials = user?.name
    ? user.name.split(" ").map((s) => s[0]).join("").toUpperCase().slice(0, 2)
    : user?.email?.slice(0, 2).toUpperCase() || "U";

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  const toggleDark = () => setDark(dark === "dark" ? "light" : "dark");

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <header className="sticky top-0 z-30 h-16 w-full border-b border-gray-200 bg-white/80 backdrop-blur-xl">
      <div className="flex h-full items-center justify-between px-4 lg:px-6">
        {/* Left */}
        <div className="flex items-center gap-3">
          {isMobile && (
            <button
              onClick={onMenuClick}
              className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100"
            >
              <Menu size={20} />
            </button>
          )}
          <div className="hidden sm:flex sm:items-center sm:gap-2">
            <span className="text-sm text-gray-400">Pages</span>
            <span className="text-sm text-gray-300">/</span>
            <span className="text-sm font-medium text-gray-900">Dashboard</span>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              ref={searchRef}
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-48 rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:w-64 focus:border-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-100 lg:w-56"
            />
            {debouncedSearch && (
              <div className="absolute left-0 right-0 top-full mt-1 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
                <p className="px-3 py-1 text-xs text-gray-400">Searching for &quot;{debouncedSearch}&quot;...</p>
              </div>
            )}
          </div>

          {/* Mobile Search */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 md:hidden"
          >
            <Search size={20} />
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDark}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100"
          >
            {dark === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Notifications */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative rounded-lg p-2 text-gray-500 transition hover:bg-gray-100"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
                  {unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -5 }}
                  className="absolute right-0 top-full z-50 mt-2 w-[320px] sm:w-[360px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl max-sm:fixed max-sm:left-4 max-sm:right-4 max-sm:w-auto"
                >
                  <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                    <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                    <button onClick={markAllRead} className="text-xs text-blue-600 hover:text-blue-700">
                      Mark all read
                    </button>
                  </div>
                  <div className="max-h-[320px] overflow-y-auto">
                    {notifications.map((notif) => {
                      const Icon = typeIcons[notif.type];
                      return (
                        <div
                          key={notif.id}
                          className={cn(
                            "flex items-start gap-3 px-4 py-3 transition hover:bg-gray-50",
                            !notif.read && "bg-blue-50/50",
                          )}
                        >
                          <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg", typeStyles[notif.type])}>
                            <Icon size={14} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{notif.title}</p>
                            <p className="text-xs text-gray-500">{notif.message}</p>
                          </div>
                          <span className="text-[11px] text-gray-400">
                            {new Date(notif.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 rounded-lg p-1.5 transition hover:bg-gray-100"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-xs font-bold text-white shadow-sm">
                {initials}
              </div>
              <div className="hidden text-left lg:block">
                <p className="text-sm font-medium text-gray-900 leading-tight">{user?.name || "User"}</p>
                <p className="text-[11px] text-gray-400">{user?.email || ""}</p>
              </div>
              <ChevronDown size={14} className="hidden text-gray-400 lg:block" />
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -5 }}
                  className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl max-sm:fixed max-sm:left-4 max-sm:right-4 max-sm:w-auto"
                >
                  <div className="border-b border-gray-100 px-4 py-3">
                    <p className="text-sm font-semibold text-gray-900">{user?.name || "User"}</p>
                    <p className="text-xs text-gray-500">{user?.email || ""}</p>
                  </div>
                  <div className="p-1">
                    {[
                      { label: "My Profile", icon: User, href: "/settings" },
                      { label: "Settings", icon: Settings, href: "/settings" },
                      { label: "Help", icon: HelpCircle, href: "/help" },
                    ].map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
                      >
                        <item.icon size={16} className="text-gray-400" />
                        {item.label}
                      </a>
                    ))}
                  </div>
                  <div className="border-t border-gray-100 p-1">
                    <button onClick={() => { logout(); router.push("/login"); }} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-500 transition hover:bg-red-50">
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {searchOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-100 bg-white px-4 py-3"
          >
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-300 focus:bg-white"
                autoFocus
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
