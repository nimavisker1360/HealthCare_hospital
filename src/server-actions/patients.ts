"use server";

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
