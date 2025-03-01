"use server";

import AppointmentModel from "@/models/appointment-model";
import DoctorModel from "@/models/doctor-model";
import dayjs from "dayjs";

export const checkDoctorsAvailability = async ({
    date,
    time,
    specialist,
  }: {
    date: string;
    time: string;
    specialist: string;
}) => {
    try {
        // get the doctor ids which are booked on the given date and time
        const bookedDoctorIds = await AppointmentModel.find({
          date,
          time,
          status: "approved",
        }).distinct("doctor");
    

    //get the doctors by eliminating the above ids and by checking the specialist
    const availableDoctors = await DoctorModel.find({
        _id: { $nin: bookedDoctorIds },
        specializations: { $in: [specialist] },
        workDays: { $in: [dayjs(date).format("dddd").toLowerCase()] },
        startTime: { $lte: time },
        endTime: { $gt: time },
      });
      
      console.log("Available Doctors: ", availableDoctors);
      
      return {
        success: true,
        data: JSON.parse(JSON.stringify(availableDoctors)),
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
      };
    }
  };
