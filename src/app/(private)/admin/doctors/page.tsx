import PageTitle from "@/components/page-title";
import { getDoctors } from "@/server-actions/doctors";
import { Alert, Button } from "antd";
import Link from "next/link";
import React from "react";
import DoctorsTable from "./_components/doctors-table";

const DoctorsPage = async () => {
  const { success, data } = await getDoctors();
  if (!success) {
    return (
      <Alert message="Failed to fetch doctors,please try again later" showIcon />
    );
  }

  const doctors = data;
  return (
    <div className="p-5">
      <div className="flex justify-between items-center">
        <PageTitle title="Doctors" />
        <Button type="primary">
          <Link href="/admin/doctors/new">Add Doctor</Link>
        </Button>
      </div>

      <DoctorsTable doctors={doctors}      
      />
    </div>
  );
};

export default DoctorsPage;
