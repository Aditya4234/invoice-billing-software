"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { CompanyInfo } from "@/types/invoice";
import { InvoiceHeader } from "@/components/invoice/InvoiceHeader";
import { InvoiceTable } from "@/components/invoice/InvoiceTable";
import type { TableItem } from "@/components/invoice/InvoiceTable";
import { InvoiceSummary } from "@/components/invoice/InvoiceSummary";
import { InvoiceNotes } from "@/components/invoice/InvoiceNotes";
import { InvoiceActions } from "@/components/invoice/InvoiceActions";
import { SignatureSection } from "@/components/invoice/SignatureSection";
import { formatDate } from "@/lib/utils";

const COMPANY: CompanyInfo = {
  name: "Molyweb Digital Solutions Private Limited",
  address: "Flat No. 102, Om Plaza Apartment, Sector-19, Indira Nagar",
  city: "Lucknow",
  state: "Uttar Pradesh",
  pincode: "226016",
  gstin: "09AAACM5601QZM",
  pan: "AAACM5601Q",
  phone: "9453354551",
  email: "sales@molyweb.com",
  website: "www.molyweb.com",
};

const ITEMS: TableItem[] = [
  {
    id: 1,
    description: "NGO Website Development with Payment Gateway",
    hsnSac: "998311",
    quantity: 1,
    rate: 50000,
    cgst: { rate: 9, amount: 4500 },
    sgst: { rate: 9, amount: 4500 },
    amount: 59000,
  },
  {
    id: 2,
    description: "Website Hosting & Maintenance (Annual)",
    hsnSac: "998312",
    quantity: 1,
    rate: 12000,
    cgst: { rate: 9, amount: 1080 },
    sgst: { rate: 9, amount: 1080 },
    amount: 14160,
  },
  {
    id: 3,
    description: "Domain Registration (.org) - 1 Year",
    hsnSac: "998313",
    quantity: 1,
    rate: 1500,
    cgst: { rate: 9, amount: 135 },
    sgst: { rate: 9, amount: 135 },
    amount: 1770,
  },
];

const INVOICE = {
  number: "INV-2026-0001",
  date: "2026-05-01",
  terms: "Net 15",
  dueDate: "2026-05-16",
  placeOfSupply: "Uttar Pradesh (09)",
  customer: {
    name: "Shanti Seva Foundation",
    address: "123, Community Centre, Civil Lines",
    city: "Delhi",
    state: "Delhi",
    country: "India",
  },
  subject: "Website Development & Digital Services",
  subtotal: 63500,
  cgstTotal: 5715,
  sgstTotal: 5715,
  grandTotal: 74930,
  paidAmount: 25000,
  balanceDue: 49930,
  notes:
    "Thank you for choosing MOLYWEB DIGITAL SOLUTIONS PVT. LTD. We appreciate your business and look forward to serving you again. For any support or queries, feel free to contact us.",
  termsConditions:
    "Payment is due within 7 days from the invoice date.\n" +
    "A 50% advance payment is required before project initiation.\n" +
    "Final files/source code will be delivered after full payment clearance.\n" +
    "Any additional changes outside the agreed scope may incur extra charges.\n" +
    "Late payments may result in project delay or temporary service suspension.\n" +
    "All payments made are non-refundable once the work has started.\n" +
    "Client is responsible for providing all required content and approvals on time.\n" +
    "Ownership of the project will be transferred to the client after complete payment.\n" +
    "This invoice is electronically generated and does not require a physical signature.\n" +
    "For any queries related to this invoice, contact us at sales@molyweb.com",
  amountInWords: "Indian Rupee Seventy Four Thousand Nine Hundred Thirty Only",
};

export default function InvoicePage() {
  const printRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <style>{`
        @media print {
          body {
            background: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          body > :not(.print-area) {
            display: none !important;
          }
          .print-area {
            position: static !important;
            visibility: visible !important;
            width: 100% !important;
            box-shadow: none !important;
            margin: 0 auto !important;
            padding: 15mm 20mm !important;
          }
          .print-area * {
            visibility: visible !important;
          }
          .no-print {
            display: none !important;
          }
          @page {
            size: A4 portrait;
            margin: 0;
          }
        }
      `}</style>

      <div className="min-h-screen bg-gray-100 py-6 px-4 print:bg-white print:py-0 print:px-0">
        <div className="max-w-[210mm] mx-auto overflow-x-auto">
          <div className="mb-4 no-print flex items-center justify-between">
            <Link
              href="/invoices"
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition"
            >
              <ArrowLeft size={16} />
              Back to Invoices
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="print:hidden bg-white shadow-lg mx-auto w-full max-sm:!w-full max-sm:!min-h-0 max-sm:!p-4"
            style={{
              width: "210mm",
              minHeight: "297mm",
              padding: "15mm 20mm",
            }}
          >
            <InvoiceContent />
          </motion.div>

          <div
            ref={printRef}
            className="print-area hidden print:block bg-white mx-auto w-full"
            style={{
              width: "210mm",
              minHeight: "297mm",
              padding: "15mm 20mm",
            }}
          >
            <InvoiceContent />
          </div>

          <InvoiceActions printRef={printRef} />
        </div>
      </div>
    </>
  );
}

function InvoiceContent() {
  return (
    <div className="border border-gray-400 font-serif text-gray-900">
      <div className="p-4">
        <InvoiceHeader company={COMPANY} />
      </div>

      <div className="grid grid-cols-2 border-y border-gray-400">
        <div className="p-2 border-r border-gray-400">
          <table className="w-full text-[11px]">
            <tbody>
              <tr>
                <td className="w-28 text-gray-600 pb-0.5">#</td>
                <td className="pb-0.5 font-bold">: {INVOICE.number}</td>
              </tr>
              <tr>
                <td className="text-gray-600 pb-0.5">Invoice Date</td>
                <td className="pb-0.5 font-bold">: {formatDate(INVOICE.date)}</td>
              </tr>
              <tr>
                <td className="text-gray-600 pb-0.5">Terms</td>
                <td className="pb-0.5 font-bold">: {INVOICE.terms}</td>
              </tr>
              <tr>
                <td className="text-gray-600">Due Date</td>
                <td className="font-bold">: {formatDate(INVOICE.dueDate)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="p-2">
          <table className="w-full text-[11px]">
            <tbody>
              <tr>
                <td className="w-32 text-gray-600 align-top">Place Of Supply</td>
                <td className="font-bold align-top">: {INVOICE.placeOfSupply}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="border-b border-gray-400 p-2 bg-gray-100/50">
        <h3 className="text-[11px] font-bold text-gray-800 mb-1">Bill To</h3>
      </div>
      <div className="border-b border-gray-400 p-2">
        <p className="text-[12px] font-bold text-gray-900">{INVOICE.customer.name}</p>
        <p className="text-[11px] text-gray-800 mt-1 leading-snug">
          {INVOICE.customer.address}<br />
          {INVOICE.customer.city}<br />
          {INVOICE.customer.state}<br />
          {COMPANY.pincode} {INVOICE.customer.state}<br />
          {INVOICE.customer.country}
        </p>
      </div>

      <div className="border-b border-gray-400 p-2">
        <table className="w-full text-[11px]">
          <tbody>
            <tr>
              <td className="w-24 text-gray-600 pb-1">Subject :</td>
            </tr>
            <tr>
              <td className="font-medium text-gray-900">{INVOICE.subject}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <InvoiceTable items={ITEMS} />
      </div>

      <div className="flex border-t border-gray-400">
        <div className="w-[60%] border-r border-gray-400">
          <InvoiceNotes notes={INVOICE.notes} termsConditions={INVOICE.termsConditions} amountInWords={INVOICE.amountInWords} />
        </div>
        <div className="w-[40%] flex flex-col">
          <InvoiceSummary
            subtotal={INVOICE.subtotal}
            cgstTotal={INVOICE.cgstTotal}
            sgstTotal={INVOICE.sgstTotal}
            grandTotal={INVOICE.grandTotal}
            paidAmount={INVOICE.paidAmount}
            balanceDue={INVOICE.balanceDue}
          />
          <div className="mt-auto border-t border-gray-400">
            <SignatureSection />
          </div>
        </div>
      </div>
    </div>
  );
}
