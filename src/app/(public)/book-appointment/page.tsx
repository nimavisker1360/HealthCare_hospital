"use client";

import PageTitle from "@/components/page-title";
import { workHours, specializations } from "@/constants";
import { IDoctor, IPatient } from "@/interfaces";
import { checkDoctorsAvailability } from "@/server-actions/appointments";
import { Form, Input, Button, Select, message, Alert } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import AvailableDoctors from "./_components/available-doctors";
import PatientDetails from "./_components/patient-details";
import { getStripePaymentIntent } from "@/server-actions/payments";

const BookApPointmentPage = () => {
  const [slotData, setSlotData] = React.useState({
    date: "",
    time: "",
    specialist: "",
  });
  const [patientDetails, setPatientDetails] = useState<Partial<IPatient>>({
    name: "",
    email: "",
    phone: "",
    age: 0,
    gender: "",
    problem: "",
  });
  const [availableDoctors, setAvailableDoctors] = useState<IDoctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<IDoctor | null>(null);
  const [paymentIntent, setPaymentIntent] = useState("");

  const checkAvailabilityHandler = async () => {
    try {
      setLoading(true);
      setError("");
      const { success, data } = await checkDoctorsAvailability(slotData);

      if (!success || !data.length) {
        setError("No doctors available for the given slot");
        setSelectedDoctor(null);
        setAvailableDoctors([]);
      } else {
        setAvailableDoctors(data);
        console.log(data);
      }
    } catch (error: any) {
      setAvailableDoctors([]);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const clearHandler = () => {
    setSlotData({ date: "", time: "", specialist: "" });
    setAvailableDoctors([]);
  };
  const getPaymentIntent = async () => {
    try {
      const { data, success, message } = await getStripePaymentIntent(
        selectedDoctor?.fee || 0
      );

      if (!success) {
        throw new Error(message);
      }
      setPaymentIntent(data.client_secret);
      console.log(data.client_secret);
    } catch (error: any) {
      message.error(error.message);
    }
  };
  return (
    <div className="px-10 my-5">
      <PageTitle title="Book Appointment" />
      <Form layout="vertical" className="mt-5">
        <div className="grid grid-cols-4 gap-5 items-end">
          <Form.Item label="Date">
            <Input
              type="date"
              value={slotData.date}
              onChange={(e) =>
                setSlotData({ ...slotData, date: e.target.value })
              }
              min={dayjs().format("YYYY-MM-DD")}
            />
          </Form.Item>

          <Form.Item label="Time">
            <Select
              options={workHours}
              value={slotData.time}
              onChange={(value) => setSlotData({ ...slotData, time: value })}
              disabled={!slotData.date}
            />
          </Form.Item>

          <Form.Item label="Specialist">
            <Select
              options={specializations}
              value={slotData.specialist}
              onChange={(value) =>
                setSlotData({ ...slotData, specialist: value })
              }
              disabled={!slotData.time}
            />
          </Form.Item>

          <div className="grid grid-cols-2 gap-5">
            <Button onClick={clearHandler}>Clear</Button>
            <Button
              disabled={!slotData.specialist}
              type="primary"
              onClick={checkAvailabilityHandler}
              loading={loading}
            >
              Check Availability
            </Button>
          </div>
        </div>
      </Form>

      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          closable
          className="mt-5"
        />
      )}
      {availableDoctors.length > 0 && (
        <AvailableDoctors
          doctorsList={availableDoctors}
          selectedDoctor={selectedDoctor}
          setSelectedDoctor={setSelectedDoctor}
        />
      )}
      {selectedDoctor && (
        <PatientDetails
          patientDetails={patientDetails}
          setPatientDetails={setPatientDetails}
        />
      )}
      {selectedDoctor && (
        <div className="mt-7 gap-5 flex justify-end ">
          <Button type="primary" onClick={getPaymentIntent}>
            Confirm
          </Button>
        </div>
      )}
    </div>
  );
};

export default BookApPointmentPage;
