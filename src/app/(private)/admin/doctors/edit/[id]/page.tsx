import PageTitle from "@/components/page-title";
import React from "react";
import DoctorForm from "../../_components/doctor-form";
import { getDoctorById } from "@/server-actions/doctors";
import { Alert } from "antd";

interface EditDoctorPageProps {
  params: {
    id: string;
  };
}

const EditDoctorPage = async ({ params }: EditDoctorPageProps) => {
  const { success, data } = await getDoctorById(params.id);
  if (!success) {
    return (
      <Alert message="Failed to fetch doctor , please try again" showIcon />
    );
  }
  const doctor = data;
  return (
    <div className="p-5">
      <PageTitle title="Edit Doctor" />
      <DoctorForm type="edit" initialValues={doctor} />
    </div>
  );
};

export default EditDoctorPage;
