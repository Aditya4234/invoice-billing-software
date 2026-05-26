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
    "Payment is due within 15 days from the date of invoice.\n" +
    "Please include the invoice number with your payment.\n" +
    "Bank transfer details will be provided upon request.\n" +
    "For any queries, contact our billing department at accounts@molyweb.com",
  termsConditions:
    "1. Services will commence after receipt of advance payment.\n" +
    "2. Delivery timeline: 4-6 weeks from project kickoff.\n" +
    "3. Late payment attracts 2% interest per month on outstanding amount.\n" +
    "4. All disputes subject to Lucknow jurisdiction.\n" +
    "5. Support included for 30 days post-delivery.\n" +
    "6. Refund policy as per company terms and conditions.",
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
    <>
      <InvoiceHeader company={COMPANY} invoiceNumber={INVOICE.number} />

      <div className="grid grid-cols-2 gap-6 mb-5">
        <div className="border border-gray-300 rounded-sm p-3">
          <h3 className="text-xs font-semibold text-gray-800 mb-2 pb-1.5 border-b border-gray-200">
            Invoice Details
          </h3>
          <div className="space-y-1 text-[11px]">
            <div className="flex justify-between">
              <span className="text-gray-500">Invoice Number</span>
              <span className="font-medium text-gray-900">{INVOICE.number}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Invoice Date</span>
              <span className="font-medium text-gray-900">{formatDate(INVOICE.date)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Terms</span>
              <span className="font-medium text-gray-900">{INVOICE.terms}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Due Date</span>
              <span className="font-medium text-gray-900">{formatDate(INVOICE.dueDate)}</span>
            </div>
          </div>
        </div>
        <div className="border border-gray-300 rounded-sm p-3">
          <h3 className="text-xs font-semibold text-gray-800 mb-2 pb-1.5 border-b border-gray-200">
            Place Of Supply
          </h3>
          <p className="text-[11px] font-medium text-gray-900 mt-2">{INVOICE.placeOfSupply}</p>
        </div>
      </div>

      <div className="border border-gray-300 rounded-sm p-3 mb-5">
        <h3 className="text-xs font-semibold text-gray-800 mb-2 pb-1.5 border-b border-gray-200">Bill To</h3>
        <p className="text-sm font-semibold text-gray-900">{INVOICE.customer.name}</p>
        <p className="text-[11px] text-gray-600 mt-0.5">
          {INVOICE.customer.address}, {INVOICE.customer.city}, {INVOICE.customer.state} - {INVOICE.customer.country}
        </p>
      </div>

      <div className="border border-gray-300 rounded-sm p-3 mb-5">
        <h3 className="text-xs font-semibold text-gray-800 mb-1">Subject</h3>
        <p className="text-[11px] font-medium text-gray-900">{INVOICE.subject}</p>
      </div>

      <div className="mb-5">
        <InvoiceTable items={ITEMS} />
      </div>

      <div className="mb-5">
        <InvoiceSummary
          subtotal={INVOICE.subtotal}
          cgstTotal={INVOICE.cgstTotal}
          sgstTotal={INVOICE.sgstTotal}
          grandTotal={INVOICE.grandTotal}
          paidAmount={INVOICE.paidAmount}
          balanceDue={INVOICE.balanceDue}
        />
      </div>

      <div className="mb-4">
        <InvoiceNotes notes={INVOICE.notes} termsConditions={INVOICE.termsConditions} />
      </div>

      <SignatureSection />
    </>
  );
}
