"use client";

import {
  DollarSign,
  CheckCircle,
  Clock,
  Users,
  TrendingUp,
  Landmark,
} from "lucide-react";
import type { Stat } from "@/types";

const iconMap: Record<string, React.ElementType> = {
  DollarSign,
  CheckCircle,
  Clock,
  Users,
  TrendingUp,
  Landmark,
};

interface StatsCardProps {
  stat: Stat;
  index: number;
}

export default function StatsCard({ stat, index }: StatsCardProps) {
  const Icon = iconMap[stat.icon] || DollarSign;

  return (
    <div
      className={`animate-fade-in group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-100 hover:shadow-lg`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="flex items-start justify-between">
        <div className="rounded-xl bg-blue-50 p-3 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
          <Icon size={22} />
        </div>

        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
            stat.trend === "up"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {stat.change}
        </span>
      </div>

      <div className="mt-4">
        <p className="text-sm font-medium text-gray-500">{stat.label}</p>
        <p className="mt-1 text-2xl font-bold text-gray-900">{stat.value}</p>
      </div>
    </div>
  );
}
