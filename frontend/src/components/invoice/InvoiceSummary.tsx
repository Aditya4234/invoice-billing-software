interface Props {
  subtotal: number;
  cgstTotal: number;
  sgstTotal: number;
  grandTotal: number;
  paidAmount: number;
  balanceDue: number;
}

export function InvoiceSummary({ subtotal, cgstTotal, sgstTotal, grandTotal, paidAmount, balanceDue }: Props) {
  const rows = [
    { label: "Sub Total", value: subtotal, bold: false, highlight: false },
    { label: "CGST @ 9%", value: cgstTotal, bold: false, highlight: false },
    { label: "SGST @ 9%", value: sgstTotal, bold: false, highlight: false },
    { label: "Total", value: grandTotal, bold: true, highlight: true },
    { label: "Payment Made", value: paidAmount, bold: false, highlight: false },
    { label: "Balance Due", value: balanceDue, bold: true, highlight: true },
  ];

  return (
    <div className="border border-gray-300 rounded-sm w-full max-w-xs ml-auto max-sm:max-w-full">
      <table className="w-full text-[11px]">
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className={row.highlight ? "bg-gray-50" : ""}>
              <td className={`px-3 py-1.5 ${row.bold ? "font-semibold text-gray-800" : "text-gray-600"}`}>
                {row.label}
              </td>
              <td className={`px-3 py-1.5 text-right ${row.bold ? "font-bold text-gray-900" : "text-gray-700"}`}>
                ₹{row.value.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
