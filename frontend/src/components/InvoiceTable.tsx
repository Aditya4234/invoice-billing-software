"use client";

import { Eye, Download, MoreHorizontal } from "lucide-react";
import type { Invoice } from "@/types";

const statusStyles: Record<string, string> = {
  paid: "bg-green-50 text-green-700 ring-green-600/20",
  pending: "bg-yellow-50 text-yellow-700 ring-yellow-600/20",
  overdue: "bg-red-50 text-red-700 ring-red-600/20",
  draft: "bg-gray-50 text-gray-600 ring-gray-500/20",
};

interface InvoiceTableProps {
  invoices: Invoice[];
}

export default function InvoiceTable({ invoices }: InvoiceTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Invoice ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Client
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Due Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Status
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {invoices.map((invoice) => (
              <tr
                key={invoice.id}
                className="transition hover:bg-gray-50/50"
              >
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-blue-600">
                    {invoice.id}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {invoice.clientName}
                    </p>
                    <p className="text-xs text-gray-500">{invoice.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm font-semibold text-gray-900">
                    ${invoice.amount.toLocaleString()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">
                    {invoice.dueDate}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
                      statusStyles[invoice.status]
                    }`}
                  >
                    {invoice.status.charAt(0).toUpperCase() +
                      invoice.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button className="rounded-lg p-2 text-gray-400 transition hover:bg-blue-50 hover:text-blue-600">
                      <Eye size={16} />
                    </button>
                    <button className="rounded-lg p-2 text-gray-400 transition hover:bg-blue-50 hover:text-blue-600">
                      <Download size={16} />
                    </button>
                    <button className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
