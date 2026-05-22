import mongoose, { Schema, Document } from "mongoose";

export interface IInvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface IInvoice extends Document {
  clientId: string;
  clientName: string;
  email: string;
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "overdue" | "draft";
  items: IInvoiceItem[];
  invoiceDate?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const InvoiceItemSchema = new Schema<IInvoiceItem>(
  {
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    rate: { type: Number, required: true },
    amount: { type: Number, required: true },
  },
  { _id: false }
);

const InvoiceSchema = new Schema<IInvoice>(
  {
    clientId: { type: String, required: true },
    clientName: { type: String, required: true },
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    dueDate: { type: String, required: true },
    status: {
      type: String,
      enum: ["paid", "pending", "overdue", "draft"],
      default: "draft",
    },
    items: { type: [InvoiceItemSchema], default: [] },
    invoiceDate: { type: String },
    notes: { type: String },
  },
  { timestamps: true }
);

InvoiceSchema.index({ clientName: "text", id: "text", email: "text" });

export default mongoose.model<IInvoice>("Invoice", InvoiceSchema);
