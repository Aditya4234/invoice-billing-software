"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import StatsCard from "@/components/dashboard/StatsCard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import PaymentPieChart from "@/components/dashboard/PaymentPieChart";
import InvoiceChart from "@/components/dashboard/InvoiceChart";
import InvoiceTable from "@/components/dashboard/InvoiceTable";
import QuickActions from "@/components/dashboard/QuickActions";
import ActivityTimeline from "@/components/dashboard/ActivityTimeline";
import { getDashboardData } from "@/lib/api";
import { stats, invoices, recentActivity, monthlyRevenue, paymentStatusData } from "@/lib/data";
import type { DashboardData } from "@/types";
import { CardSkeleton, ChartSkeleton, TableSkeleton } from "@/components/ui/Skeleton";

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardData()
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  const d = {
    stats: data?.stats ?? stats,
    invoices: data?.invoices ?? invoices,
    recentActivity: data?.recentActivity ?? recentActivity,
    monthlyRevenue: data?.monthlyRevenue ?? monthlyRevenue,
    paymentStatus: data?.paymentStatus ?? paymentStatusData,
  };

  if (loading) {
    return (
      <div className="space-y-4 lg:space-y-8 p-4 lg:p-8">
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-8 w-72 rounded-lg bg-gray-200 animate-pulse"
          />
          <div className="mt-2 h-5 w-96 rounded-lg bg-gray-100 animate-pulse" />
        </div>

        <div className="grid gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>

        <div className="grid gap-4 lg:gap-6 lg:grid-cols-2">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>

        <div>
          <div className="mb-4 h-6 w-40 rounded bg-gray-200 animate-pulse" />
          <TableSkeleton rows={5} />
        </div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 lg:space-y-8 p-4 lg:p-8 min-w-0">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, Admin <span className="inline-block animate-bounce">👋</span>
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Here&apos;s what&apos;s happening with your business today.
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {d.stats.map((stat, i) => (
          <StatsCard key={stat.label} stat={stat} index={i} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 lg:gap-6 lg:grid-cols-2">
        <RevenueChart data={d.monthlyRevenue} />
        <div className="grid gap-6">
          <PaymentPieChart data={d.paymentStatus} />
          <InvoiceChart />
        </div>
      </div>

      {/* Invoices + Quick Actions */}
      <div className="grid gap-4 lg:gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Recent Invoices
            </h2>
            <InvoiceTable invoices={d.invoices} />
          </motion.div>
        </div>
        <div>
          <QuickActions />
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="grid gap-4 lg:gap-6 lg:grid-cols-2">
        <ActivityTimeline activities={d.recentActivity} />

        {/* Upcoming Dues Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl border border-gray-100 bg-white p-4 lg:p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Dues</h3>
          <p className="mt-1 text-sm text-gray-500">Invoices due in the next 7 days</p>

          <div className="mt-4 space-y-3">
            {d.invoices
              .filter((inv) => inv.status === "pending" || inv.status === "overdue")
              .slice(0, 4)
              .map((inv) => (
                <div
                  key={inv.id}
                  className="flex items-center justify-between rounded-xl bg-gray-50 px-3 lg:px-4 py-3 transition hover:bg-gray-100"
                >
                  <div className="min-w-0 flex-1 mr-2">
                    <p className="text-sm font-medium text-gray-900 truncate">{inv.clientName}</p>
                    <p className="text-xs text-gray-500 truncate">{inv.id} · Due {new Date(inv.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 shrink-0">
                    ${inv.amount.toLocaleString()}
                  </span>
                </div>
              ))}
          </div>
        </motion.div>
      </div>

      {/* Performance Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="grid gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      >
        {[
          { label: "Avg. Invoice Value", value: "$12,450", change: "+8.3%", color: "text-blue-600" },
          { label: "Collection Rate", value: "94.2%", change: "+2.1%", color: "text-emerald-600" },
          { label: "On-time Payments", value: "87.5%", change: "+5.4%", color: "text-emerald-600" },
          { label: "Active Projects", value: "128", change: "+14", color: "text-purple-600" },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border border-gray-100 bg-white p-3 lg:p-4 shadow-sm">
            <p className="text-xs font-medium text-gray-500">{item.label}</p>
            <div className="mt-1 flex items-center justify-between">
              <p className="text-xl font-bold text-gray-900">{item.value}</p>
              <span className={`text-xs font-semibold ${item.color}`}>{item.change}</span>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
