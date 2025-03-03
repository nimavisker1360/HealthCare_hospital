'use client'

import { IPatient } from "@/interfaces";
import { Button, Table } from "antd";
import { Trash2,Pen,List } from "lucide-react";
import React from "react";

interface IPatientTableProps {
  patients: IPatient[];
}
const PatientsTable = ({ patients }: IPatientTableProps) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
        title:"Actions",
        dataIndex:"actions",
        key:"actions",
        render: (text:any,record:any) => (
          <div className="flex gap-5">
            <Button size="small">
                <Trash2 size={14}/>
            </Button>
            <Button size="small">
                <Pen size={14} />
            </Button>
            <Button size="small">
                <List size={14} /> View Appointments
            </Button>
          </div>
        )
    }
  ];
  return (
    <div>
      <Table
        dataSource={patients}
        columns={columns}
        rowKey="_id"
        pagination={false}
      />
    </div>
  );
};

export default PatientsTable;
