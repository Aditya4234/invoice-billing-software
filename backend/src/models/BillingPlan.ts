import mongoose, { Schema, Document } from "mongoose";

export interface IBillingPlan extends Document {
  clientId: string;
  clientName: string;
  plan: "basic" | "pro" | "enterprise";
  amount: number;
  status: "active" | "cancelled" | "expired" | "trial";
  startDate: string;
  endDate: string;
  createdAt: Date;
  updatedAt: Date;
}

const BillingPlanSchema = new Schema<IBillingPlan>(
  {
    clientId: { type: String, required: true },
    clientName: { type: String, required: true },
    plan: {
      type: String,
      enum: ["basic", "pro", "enterprise"],
      required: true,
    },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["active", "cancelled", "expired", "trial"],
      default: "active",
    },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
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

export default mongoose.model<IBillingPlan>("BillingPlan", BillingPlanSchema);
