"use client";

import PageTitle from "@/components/page-title";
import { workHours, specializations } from "@/constants";
import { IDoctor } from "@/interfaces";
import { checkDoctorsAvailability } from "@/server-actions/appointments";
import { Form, Input, Button, Select, message, Alert } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";

const BookApPointmentPage = () => {
  const [slotData, setSlotData] = React.useState({
    date: "",
    time: "",
    specialist: "",
  });
  const [availableDoctors, setAvailableDoctors] = useState<IDoctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const checkAvailabilityHandler = async () => {
    try {
      setLoading(true);
      setError("");
      const { success, data } = await checkDoctorsAvailability(slotData);

      if (!success && !data.length) {
        setError("no doctors available for the given slot");
        setAvailableDoctors([]);
      } else {
        setAvailableDoctors(data);
        console.log(data);
      }
    } catch (error: any) {
      setAvailableDoctors([]);
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const clearHandler = () => {
    setSlotData({ date: "", time: "", specialist: "" });
    setAvailableDoctors([]);
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

      {availableDoctors.length === 0 && (
        <Alert
          message="No doctors available for the selected time slot."
          type="error"
          showIcon
          closable
          className="mt-5"
        />
      )}
    </div>
  );
};

export default BookApPointmentPage;
