"use client";

import { TrendingUp } from "lucide-react";
import type { MonthlyRevenue, PaymentStatus } from "@/types";

interface RevenueChartProps {
  data: MonthlyRevenue[];
  paymentStatus: PaymentStatus[];
}

export default function RevenueChart({ data, paymentStatus }: RevenueChartProps) {
  const maxRevenue = Math.max(...data.map((d) => d.revenue));

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Revenue Bar Chart */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Revenue Overview
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Monthly revenue vs expenses
            </p>
          </div>
          <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
            <TrendingUp size={20} />
          </div>
        </div>

        <div className="mt-8 flex items-end justify-between gap-3" style={{ height: 200 }}>
          {data.map((item) => (
            <div key={item.month} className="flex flex-1 flex-col items-center gap-2">
              <div className="relative flex w-full items-end justify-center gap-1">
                <div
                  className="w-3 rounded-t-md bg-blue-600 transition-all hover:bg-blue-700"
                  style={{
                    height: `${(item.revenue / maxRevenue) * 160}px`,
                  }}
                />
                <div
                  className="w-3 rounded-t-md bg-gray-200 transition-all hover:bg-gray-300"
                  style={{
                    height: `${(item.expenses / maxRevenue) * 160}px`,
                  }}
                />
              </div>
              <span className="text-xs font-medium text-gray-500">
                {item.month}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-6 border-t border-gray-100 pt-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-blue-600" />
            <span className="text-xs text-gray-600">Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-gray-200" />
            <span className="text-xs text-gray-600">Expenses</span>
          </div>
        </div>
      </div>

      {/* Payment Status */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900">
          Payment Status
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Distribution of invoice statuses
        </p>

        <div className="mt-8 space-y-5">
          {paymentStatus.map((item) => (
            <div key={item.label}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  {item.label}
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  {item.value}%
                </span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${item.color}`}
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
