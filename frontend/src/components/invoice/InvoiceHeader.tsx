import type { CompanyInfo } from "@/types/invoice";

interface Props {
  company: CompanyInfo;
  invoiceNumber: string;
}

export function InvoiceHeader({ company, invoiceNumber }: Props) {
  return (
    <div className="flex flex-col sm:flex-row items-start justify-between pb-6 mb-6 border-b border-gray-300 gap-4">
      <div className="flex gap-4">
        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs font-bold shrink-0 border border-gray-200">
          <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="4" y="8" width="32" height="24" rx="2" />
            <path d="M12 16h16M12 21h10M12 26h6" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-900 leading-tight">{company.name}</h1>
          <p className="text-xs text-gray-600 mt-1 max-w-xs leading-relaxed">
            {company.address}, {company.city}, {company.state} {company.pincode} India
          </p>
          <div className="mt-1.5 space-y-0.5">
            <p className="text-[11px] text-gray-500"><span className="font-medium text-gray-700">GSTIN:</span> {company.gstin}</p>
            <p className="text-[11px] text-gray-500"><span className="font-medium text-gray-700">PAN:</span> {company.pan}</p>
            <p className="text-[11px] text-gray-500"><span className="font-medium text-gray-700">Phone:</span> {company.phone}</p>
            <p className="text-[11px] text-gray-500"><span className="font-medium text-gray-700">Email:</span> {company.email}</p>
            <p className="text-[11px] text-gray-500"><span className="font-medium text-gray-700">Web:</span> {company.website}</p>
          </div>
        </div>
      </div>
      <div className="text-right shrink-0">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">TAX INVOICE</h2>
        <p className="text-[11px] text-gray-500 mt-1">Invoice #{invoiceNumber}</p>
      </div>
    </div>
  );
}
