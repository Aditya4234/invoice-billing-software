import mongoose, { Schema, Document } from "mongoose";

export interface IEmployee extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  salary: number;
  status: "active" | "inactive" | "on-leave";
  joinDate: string;
  address: string;
  bankAccount?: string;
  ifscCode?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EmployeeSchema = new Schema<IEmployee>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    department: { type: String, required: true },
    position: { type: String, required: true },
    salary: { type: Number, required: true },
    status: {
      type: String,
      enum: ["active", "inactive", "on-leave"],
      default: "active",
    },
    joinDate: { type: String, required: true },
    address: { type: String, default: "" },
    bankAccount: { type: String },
    ifscCode: { type: String },
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

export default mongoose.model<IEmployee>("Employee", EmployeeSchema);
