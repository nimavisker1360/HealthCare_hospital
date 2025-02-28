"use client";

import { specializations, workDays, workHours } from "@/constants";
import { Form, Input, Select, Upload } from "antd";
import React, { useState } from "react";

const DoctorForm = () => {
  const [profilePicture, setProfilePicture] = useState<any>(null);
  return (
    <div className="mt-5 ">
      <Form layout="vertical" className="grid grid-cols-4 gap-5">
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input the name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "please input the email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            {
              required: true,
              message: "Please input the phone!",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="specialization"
          label="Specialization"
          rules={[
            {
              required: true,
              message: "Please input the specialization!",
            },
          ]}
        >
          <Select options={specializations} mode="multiple" />
        </Form.Item>
        <Form.Item
          name="workDays"
          label="Work Days"
          rules={[
            {
              required: true,
              message: "Please input the work days!",
            },
          ]}
        >
          <Select options={workDays} mode="multiple" />
        </Form.Item>

        <Form.Item
          name="startTime"
          label="Start Time"
          rules={[
            {
              required: true,
              message: "Please input the start time!",
            },
          ]}
        >
          <Select options={workHours} />
        </Form.Item>
        <Form.Item
          name="endTime"
          label="End Time"
          rules={[
            {
              required: true,
              message: "Please input the end time!",
            },
          ]}
        >
          <Select options={workHours} />
        </Form.Item>
        <Form.Item
          name="fee"
          label="Fee"
          rules={[
            {
              required: true,
              message: "Please input the fee!",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="bio"
          label="Bio"
          rules={[
            {
              required: true,
              message: "Please input the bio!",
            },
          ]}
          className="col-span-4"
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="Doctor Profile Picture">
          <Upload
            listType="picture-card"
            beforeUpload={(file) => {
              setProfilePicture(file);
              return false;
            }}
          >
            <div className="span text-xs">
              {profilePicture ? "Change" : "Upload"} profile Picture
            </div>
          </Upload>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DoctorForm;
