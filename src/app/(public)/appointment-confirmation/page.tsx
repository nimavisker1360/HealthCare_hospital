"use client";

import PageTitle from "@/components/page-title";
import { IAppointment } from "@/interfaces";
import { getAppointmentById } from "@/server-actions/appointments";
import { Button, Input, message } from "antd";
import React, { useState } from "react";
import AppointmentReceipt from "./_components/appointment-receipt";
import { useReactToPrint } from "react-to-print";

const AppointmentConfirmation = () => {
  const [appointmentId, setAppointmentId] = useState("");
  const [loading, setLoading] = useState(false);
  const [appointment, setAppointment] = useState<IAppointment | null>(null);
  const componentRef = React.useRef(null);

  const getData = async () => {
    try {
      setLoading(true);
      const { data, success } = await getAppointmentById(appointmentId);
      if (success) {
        setAppointment(data);
      } else {
        message.error("No Appointment found with given Id");
      }
    } catch (error) {
      message.error("failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 flex flex-col items-center gap-7">
      <div className="justify-center flex">
        <PageTitle title="Appointment Confirmation" />
      </div>
      <div className="w-[600px] flex justify-center">
        <div className="flex justify-between gap-5 items-end w-full">
          <div>
            <label className="text-sm">Appointment Id</label>
            <Input
              value={appointmentId}
              onChange={(e) => setAppointmentId(e.target.value)}
            />
          </div>

          <Button type="primary" loading={loading} onClick={getData}>
            Search
          </Button>
        </div>
      </div>
      <div className="w-[600px]">
        {appointment && <AppointmentReceipt appointment={appointment} />}
      </div>
      <div className="flex justify-end gap-5 w-[600px]">
        <Button>Download</Button>
        <Button type="primary">Print</Button>
      </div>
    </div>
  );
};

export default AppointmentConfirmation;
