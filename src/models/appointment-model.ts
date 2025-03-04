import mongoose, { Schema, Document } from "mongoose";

export interface IAppointment extends Document {
  date: string;
  time: string;
  doctor: mongoose.Types.ObjectId;
  patient: mongoose.Types.ObjectId;
  specialist: string;
  status: "pending" | "approved" | "rejected";
  fee: number;
  paymentId: string;
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    date: { type: String, required: true },
    time: { type: String, required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "doctors", required: true },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "patients", required: true },
    specialist: { type: String, required: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "approved" },
    fee: { type: Number, required: true },
    paymentId: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Appointment || mongoose.model<IAppointment>("Appointment", AppointmentSchema);
