import mongoose, { Schema, Document } from "mongoose";

export interface IClient extends Document {
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  pincode?: string;
  gstin?: string;
  status: "active" | "inactive";
  totalInvoices: number;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

const ClientSchema = new Schema<IClient>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    company: { type: String, default: "" },
    address: { type: String, default: "" },
    pincode: { type: String, default: "" },
    gstin: { type: String },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    totalInvoices: { type: Number, default: 0 },
    totalAmount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(_doc, ret: Record<string, unknown>) {
        ret.id = String(ret._id);
        delete ret.__v;
        delete ret._id;
        return ret;
      },
    },
  }
);

ClientSchema.index({ name: "text", company: "text", email: "text" });

export default mongoose.model<IClient>("Client", ClientSchema);
