import mongoose, { Schema, Document } from "mongoose";

export interface IDepartment extends Document {
  name: string;
  head: string;
  employeeCount: number;
  budget: number;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}

const DepartmentSchema = new Schema<IDepartment>(
  {
    name: { type: String, required: true },
    head: { type: String, required: true },
    employeeCount: { type: Number, default: 0 },
    budget: { type: Number, required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
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

export default mongoose.model<IDepartment>("Department", DepartmentSchema);
