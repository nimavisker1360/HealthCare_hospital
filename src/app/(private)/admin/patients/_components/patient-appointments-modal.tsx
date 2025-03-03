import { getDateTimeFormat } from "@/helpers/date-time-formats";
import { IAppointment, IDoctor, IPatient } from "@/interfaces";
import {
  getAllAppointments,
  getAppointmentByPatientId,
} from "@/server-actions/appointments";
import { message, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
interface PatientAppointmentModalProps {
  selectedPatient: IPatient;
  showPatientAppointmentModal: boolean;
  setShowPatientAppointmentModal: (value: boolean) => void;
}
const PatientAppointmentModal = ({
  selectedPatient,
  showPatientAppointmentModal,
  setShowPatientAppointmentModal,
}: PatientAppointmentModalProps) => {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);

  const getData = async () => {
    try {
      const { success, data } = await getAppointmentByPatientId(
        selectedPatient._id
      );
      if (!success) {
        return message.error("Failed to fetch appointments");
      } else {
        setAppointments(data);
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const columns = [
    {
      title: "Doctor Name",
      dataIndex: "doctor",
      render: (doctor: IDoctor) => doctor.name,
    },
    {
      title: "Specialist",
      dataIndex: "specialist",
      render: (specialist: string) => specialist.toUpperCase(),
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (date: string, row: IAppointment) =>
        getDateTimeFormat(`${date} ${row.time}`),
    },
    {
      title: "Fee",
      dataIndex: "fee",
      render: (fee: number) => `$${fee}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => status.toUpperCase(),
    },
    {
      title: "Booked On",
      dataIndex: "createdAt",
      render: (createdAt: string) => getDateTimeFormat(createdAt),
    },
    {
      title: "Payment ID",
      dataIndex: "paymentId",
    },
    {
      title: "Booked On",
      dataIndex: "createdAt",
      render: (createdAt: string) => getDateTimeFormat(createdAt),
    },
  ];

  return (
    <Modal
      open={showPatientAppointmentModal}
      onCancel={() => setShowPatientAppointmentModal(false)}
      footer={null}
      centered
      title={`Appointments of ${selectedPatient.name}`}
      width={1200}
    >
      <div className="mt-5">
        <Table
          columns={columns}
          dataSource={appointments}
          rowKey="_id"
          pagination={false}
        />
      </div>
    </Modal>
  );
};

export default PatientAppointmentModal;
