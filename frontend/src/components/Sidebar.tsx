"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Users,
  Receipt,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  X,
  UserCog,
  Building2,
  CalendarDays,
  Clock,
  Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { title: "Invoices", icon: FileText, href: "/invoices" },
  { title: "Clients", icon: Users, href: "/clients" },
  { title: "Billing", icon: Receipt, href: "/billing" },
  { title: "Payments", icon: CreditCard, href: "/payments" },
  { title: "Reports", icon: BarChart3, href: "/reports" },
];

const hrmsItems = [
  { title: "Employees", icon: UserCog, href: "/employees" },
  { title: "Departments", icon: Building2, href: "/departments" },
  { title: "Attendance", icon: Clock, href: "/attendance" },
  { title: "Leave", icon: CalendarDays, href: "/leave" },
  { title: "Payroll", icon: Briefcase, href: "/payroll" },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col border-r border-gray-200 bg-white transition-all duration-300",
          collapsed ? "w-[72px]" : "w-[280px]"
        )}
      >
        {/* Logo */}
        <div className={cn(
          "flex h-20 items-center border-b border-gray-200 shrink-0",
          collapsed ? "justify-center px-0" : "px-6"
        )}>
          <div className={cn(
            "flex items-center",
            collapsed ? "flex-col gap-1" : "gap-3"
          )}>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold text-sm shadow-lg shrink-0">
              M
            </div>
            {!collapsed && (
              <div>
                <h1 className="text-lg font-bold text-gray-900">MolyWeb</h1>
                <p className="text-xs text-gray-500">Invoice Software</p>
              </div>
            )}
          </div>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={onToggle}
          className="absolute -right-3 top-[76px] z-10 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400 shadow-sm hover:text-gray-600 transition-all"
        >
          <ChevronLeft className={cn("h-3 w-3 transition-transform", collapsed && "rotate-180")} />
        </button>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-6">
          <p className={cn(
            "mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400",
            collapsed ? "text-center" : "px-3"
          )}>
            {collapsed ? "..." : "Main Menu"}
          </p>

          <nav className="space-y-1 mb-8">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  title={collapsed ? item.title : undefined}
                  className={cn(
                    "group flex items-center gap-4 rounded-xl text-sm font-medium transition-all",
                    collapsed ? "justify-center px-2 py-3" : "px-4 py-3",
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                      : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                  )}
                >
                  <Icon size={20} className={cn("shrink-0", !collapsed && "transition group-hover:scale-110")} />
                  {!collapsed && (
                    <>
                      <span>{item.title}</span>
                      {isActive && <span className="ml-auto h-2 w-2 rounded-full bg-white" />}
                    </>
                  )}
                </Link>
              );
            })}
          </nav>

          <p className={cn(
            "mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400",
            collapsed ? "text-center" : "px-3"
          )}>
            {collapsed ? "..." : "HR Management"}
          </p>

          <nav className="space-y-1">
            {hrmsItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  title={collapsed ? item.title : undefined}
                  className={cn(
                    "group flex items-center gap-4 rounded-xl text-sm font-medium transition-all",
                    collapsed ? "justify-center px-2 py-3" : "px-4 py-3",
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                      : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                  )}
                >
                  <Icon size={20} className={cn("shrink-0", !collapsed && "transition group-hover:scale-110")} />
                  {!collapsed && (
                    <>
                      <span>{item.title}</span>
                      {isActive && <span className="ml-auto h-2 w-2 rounded-full bg-white" />}
                    </>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 p-4 shrink-0">
          {!collapsed && (
            <div className="mb-4 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-5 text-white shadow-lg">
              <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mt-3 text-sm font-semibold">Upgrade Plan</h3>
              <p className="mt-1 text-xs text-blue-200">Unlock advanced billing & analytics features.</p>
              <button className="mt-4 w-full rounded-lg bg-white px-4 py-2.5 text-xs font-semibold text-blue-600 transition hover:bg-blue-50">
                Upgrade Now
              </button>
            </div>
          )}

          <div className={cn("space-y-1", collapsed && "flex flex-col items-center")}>
            <Link
              href="/settings"
              className={cn(
                "flex items-center gap-3 rounded-xl text-sm font-medium transition-all",
                collapsed ? "justify-center p-3" : "px-4 py-3",
                pathname === "/settings"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              )}
              title={collapsed ? "Settings" : undefined}
            >
              <Settings size={20} className="shrink-0" />
              {!collapsed && <span>Settings</span>}
            </Link>
            <button className={cn(
              "flex items-center gap-3 rounded-xl text-sm font-medium text-red-500 transition hover:bg-red-50",
              collapsed ? "justify-center p-3" : "w-full px-4 py-3"
            )}>
              <LogOut size={20} className="shrink-0" />
              {!collapsed && <span>Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden" onClick={onMobileClose} />
      )}

      {/* Mobile sidebar drawer */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col border-r border-gray-200 bg-white transition-transform duration-300 lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-20 items-center justify-between border-b border-gray-200 px-6 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold text-sm shadow-lg">
              M
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">MolyWeb</h1>
              <p className="text-xs text-gray-500">Invoice Software</p>
            </div>
          </div>
          <button
            onClick={onMobileClose}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 transition"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Main Menu
          </p>
          <nav className="space-y-1.5 mb-8">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={onMobileClose}
                  className={`group flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                      : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  <Icon size={20} className="transition group-hover:scale-110" />
                  <span>{item.title}</span>
                  {isActive && <span className="ml-auto h-2 w-2 rounded-full bg-white" />}
                </Link>
              );
            })}
          </nav>

          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            HR Management
          </p>
          <nav className="space-y-1.5">
            {hrmsItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={onMobileClose}
                  className={`group flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                      : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  <Icon size={20} className="transition group-hover:scale-110" />
                  <span>{item.title}</span>
                  {isActive && <span className="ml-auto h-2 w-2 rounded-full bg-white" />}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-gray-200 p-4 shrink-0">
          <div className="mb-4 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-5 text-white shadow-lg">
            <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="mt-3 text-sm font-semibold">Upgrade Plan</h3>
            <p className="mt-1 text-xs text-blue-200">Unlock advanced billing & analytics features.</p>
            <button className="mt-4 w-full rounded-lg bg-white px-4 py-2.5 text-xs font-semibold text-blue-600 transition hover:bg-blue-50">
              Upgrade Now
            </button>
          </div>

          <div className="space-y-1">
            <Link
              href="/settings"
              onClick={onMobileClose}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                pathname === "/settings"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Settings size={20} />
              Settings
            </Link>
            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50">
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
