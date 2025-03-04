import mongoose, { Schema, Document } from "mongoose";

export interface IPatient extends Document {
  name: string;
  phone: string;
  email: string;
}

const PatientSchema = new Schema<IPatient>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
});

export default mongoose.models.Patient || mongoose.model<IPatient>("Patient", PatientSchema);
