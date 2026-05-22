import mongoose, { Schema, Document } from "mongoose";

export interface IPayment extends Document {
  invoiceId: string;
  clientName: string;
  amount: number;
  method: "credit_card" | "bank_transfer" | "cash" | "check" | "upi";
  status: "completed" | "pending" | "failed" | "refunded";
  transactionId: string;
  date: string;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    invoiceId: { type: String, required: true },
    clientName: { type: String, required: true },
    amount: { type: Number, required: true },
    method: {
      type: String,
      enum: ["credit_card", "bank_transfer", "cash", "check", "upi"],
      required: true,
    },
    status: {
      type: String,
      enum: ["completed", "pending", "failed", "refunded"],
      default: "pending",
    },
    transactionId: { type: String, required: true },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IPayment>("Payment", PaymentSchema);
