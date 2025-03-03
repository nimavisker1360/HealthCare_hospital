"use client";

import PageTitle from "@/components/page-title";
import { IAppointment } from "@/interfaces";
import { getAppointmentById } from "@/server-actions/appointments";
import { Button, Input, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import AppointmentReceipt from "./_components/appointment-receipt";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useParams } from "next/navigation";


const AppointmentConfirmation = () => {

  const searchParams = new URLSearchParams(window.location.search);
  const [appointmentId, setAppointmentId] = useState(searchParams.get("id")|| "");
  const [loading, setLoading] = useState(false);
  const [appointment, setAppointment] = useState<IAppointment | null>(null);
  const componentRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!componentRef.current) return;

    const canvas = await html2canvas(componentRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save("appointment.pdf");
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

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

  useEffect(() => {
    if (appointmentId) {
      getData();
    }
  }, []);

  return (
    <div className="p-5 flex flex-col items-center gap-7">
      <div className="justify-center flex">
        <PageTitle title="Appointment Confirmation" />
      </div>
      <div className="w-[600px] flex justify-center">
        <div className="flex justify-between gap-5 items-end w-full">
          <div className="w-full">
            <label className="text-sm">Appointment Id</label>
            <Input
              value={appointmentId}
              onChange={(e) => setAppointmentId(e.target.value)}
              className="w-full"
            />
          </div>

          <Button type="primary" loading={loading} onClick={getData}>
            Search
          </Button>
        </div>
      </div>

      <div ref={componentRef} className="flex justify-center mt-5">
        <div className="w-[600px]">
          {appointment && <AppointmentReceipt appointment={appointment} />}
        </div>
      </div>

      {appointment && (
        <div className="flex justify-end gap-5 w-[600px]">
          <Button onClick={handleDownloadPDF}>Download</Button>
          <Button type="primary" onClick={handlePrint}>
            Print
          </Button>
        </div>
      )}
    </div>
  );
};

export default AppointmentConfirmation;
