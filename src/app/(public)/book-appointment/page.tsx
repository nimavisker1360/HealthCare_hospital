"use client";

import PageTitle from "@/components/page-title";
import { workHours, specializations } from "@/constants";
import { IDoctor, IPatient } from "@/interfaces";
import {
  checkDoctorsAvailability,
  saveAppointments,
} from "@/server-actions/appointments";
import { Form, Input, Button, Select, message, Alert } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import AvailableDoctors from "./_components/available-doctors";
import PatientDetails from "./_components/patient-details";
import { getStripePaymentIntent } from "@/server-actions/payments";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CreditCardForm from "./_components/credit-card-form";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

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
  const [showCreditCardForm, setShowCreditCardForm] = useState(false);
  const [loadingPaymentIntent, setLoadingPaymentIntent] = useState(false);
  const router =useRouter()

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
    setLoadingPaymentIntent(true);
    try {
      const { data, success, message } = await getStripePaymentIntent(
        selectedDoctor?.fee || 0
      );

      if (!success) {
        throw new Error(message);
      }
      setPaymentIntent(data.client_secret);
      setShowCreditCardForm(true);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoadingPaymentIntent(false);
    }
  };

  const onPaymentSuccess = async (paymentId: string) => {
    try {
      const response = await saveAppointments({
        date: slotData.date,
        time: slotData.time,
        doctorId: selectedDoctor?._id || "",
        specialist: slotData.specialist,
        fee: selectedDoctor?.fee || 0,
        paymentId,
        patientDetails,
      });
      if(!response.success){
        throw new Error(response.message);
      }
      message.success("Appointment booked successfully");
      router.push(`/appointment-confirmation?id=${response.data._id}`);
    } catch (error: any) {{
  }
      message.error = error.message;
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
          <Button
            type="primary"
            onClick={getPaymentIntent}
            loading={loadingPaymentIntent}
          >
            Confirm
          </Button>
        </div>
      )}
      {paymentIntent && (
        <Elements
          options={{
            clientSecret: paymentIntent,
          }}
          stripe={stripePromise}
        >
          <CreditCardForm
            showCreditCardForm={showCreditCardForm}
            setShowCreditCardForm={setShowCreditCardForm}
            onPaymentSuccess={onPaymentSuccess}
          />
        </Elements>
      )}
    </div>
  );
};

export default BookApPointmentPage;
