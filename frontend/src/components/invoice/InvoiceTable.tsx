"use client";

export interface TableItem {
  id: number;
  description: string;
  hsnSac: string;
  quantity: number;
  rate: number;
  cgst: { rate: number; amount: number };
  sgst: { rate: number; amount: number };
  amount: number;
}

interface Props {
  items: TableItem[];
}

export function InvoiceTable({ items }: Props) {
  return (
    <div className="overflow-x-auto border border-gray-300 rounded-sm">
      <table className="w-full text-[11px]">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-300">
            <th className="px-2.5 py-2 text-left font-semibold text-gray-700 w-8">#</th>
            <th className="px-2.5 py-2 text-left font-semibold text-gray-700">Item & Description</th>
            <th className="px-2.5 py-2 text-left font-semibold text-gray-700 w-20">HSN/SAC</th>
            <th className="px-2.5 py-2 text-right font-semibold text-gray-700 w-12">Qty</th>
            <th className="px-2.5 py-2 text-right font-semibold text-gray-700 w-20">Rate (₹)</th>
            <th className="px-2.5 py-2 text-right font-semibold text-gray-700 w-14">CGST %</th>
            <th className="px-2.5 py-2 text-right font-semibold text-gray-700 w-20">CGST Amt (₹)</th>
            <th className="px-2.5 py-2 text-right font-semibold text-gray-700 w-14">SGST %</th>
            <th className="px-2.5 py-2 text-right font-semibold text-gray-700 w-20">SGST Amt (₹)</th>
            <th className="px-2.5 py-2 text-right font-semibold text-gray-700 w-24">Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={item.id} className="border-b border-gray-200 last:border-b-0">
              <td className="px-2.5 py-2.5 text-gray-600 text-center">{idx + 1}</td>
              <td className="px-2.5 py-2.5 text-gray-900 font-medium">{item.description}</td>
              <td className="px-2.5 py-2.5 text-gray-600">{item.hsnSac}</td>
              <td className="px-2.5 py-2.5 text-gray-900 text-right">{item.quantity}</td>
              <td className="px-2.5 py-2.5 text-gray-900 text-right">{item.rate.toFixed(2)}</td>
              <td className="px-2.5 py-2.5 text-gray-900 text-right">{item.cgst.rate}%</td>
              <td className="px-2.5 py-2.5 text-gray-900 text-right">{item.cgst.amount.toFixed(2)}</td>
              <td className="px-2.5 py-2.5 text-gray-900 text-right">{item.sgst.rate}%</td>
              <td className="px-2.5 py-2.5 text-gray-900 text-right">{item.sgst.amount.toFixed(2)}</td>
              <td className="px-2.5 py-2.5 text-gray-900 text-right font-medium">{item.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
