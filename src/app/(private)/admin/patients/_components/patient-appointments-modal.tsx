import { IPatient } from "@/interfaces";
import { Modal } from "antd";
import React from "react";
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
  return (
    <Modal
      open={showPatientAppointmentModal}
      onCancel={() => setShowPatientAppointmentModal(false)}
      footer={null}
      centered
      title={`Appointments of ${selectedPatient.name}`}
    ></Modal>
  );
};

export default PatientAppointmentModal;
