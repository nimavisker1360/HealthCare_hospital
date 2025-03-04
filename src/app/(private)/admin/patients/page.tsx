import PageTitle from "@/components/page-title";
import { getAllPatients } from "@/server-actions/patients";
import { Alert } from "antd";
import React, { Suspense } from "react";
import PatientsTable from "./_components/patients-table";

import SpinnerForServerComponents from "@/components/spinner-for-server-components";

const PatientList = async () => {
  const { success, data } = await getAllPatients();

  if (!success) {
    return <Alert message="Failed to fetch patient" type="error" showIcon />;
  }
  const patients = data;
  return (
    <div className="p-5">
      <PageTitle title="Patients" />

      <PatientsTable patients={patients} />
    </div>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<SpinnerForServerComponents />}>
      <PatientList />
    </Suspense>
  );
}
