import PageTitle from "@/components/page-title";
import { getAllAppointments } from "@/server-actions/appointments";
import { Alert } from "antd";
import React from "react";
import AppointmentsTable from "./_components/appointment-table";

const AppointmentsListPage = async () => {
  const { success, data } = await getAllAppointments();
  if (!success) {
    return (
      <Alert message="Failed to fetch appointments" type="error" showIcon />
    );
  }
  const appointments = data;
  return (
    <div className="p-5">
      <PageTitle title="Appointments" />

      <AppointmentsTable appointments={appointments} />
    </div>
  );
};

export default AppointmentsListPage;
