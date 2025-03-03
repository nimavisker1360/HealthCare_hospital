"use server";

import { IPatient } from "@/interfaces";
import PatientModel from "@/models/patient-models";

export const getAllPatients = async () => {
  try {
    const patient = await PatientModel.find().sort({ createdAt: -1 });
    return {
      success: true,
      data: JSON.parse(JSON.stringify(patient)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
export const deletePatient = async (id: string) => {
  try {
    await PatientModel.findByIdAndDelete(id);
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
export const updatePatient = async (id: string, updatedData: Partial<IPatient>) => {
  try {
    await PatientModel.findByIdAndUpdate(id, updatedData, { new: true });
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};