"use client";

import { IUser } from "@/interfaces";
import { Table, Switch } from "antd";
import dayjs from "dayjs";
import React from "react";

function UsersTable({ users }: { users: IUser[] }) {
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
      title: "User Id",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Create At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createAt: string) => (
        <>{dayjs(createAt).format("MMM DD YYYY , hh:mm A")}</>
      ),
    },
    {
      title: "Is Approved",
      dataIndex: "isApproved",
      key: "isApproved",
      render: (isApproved: boolean) => {
        return <Switch checked={isApproved} />;
      },
    },
    {
      title: "Is Supper Admin",
      dataIndex: "isSuperAdmin",
      key: "isSuperAdmin",
      render: (isSuperAdmin: boolean) => <Switch checked={isSuperAdmin} />,
    },
  ];
  return (
    <div>
      <Table dataSource={users} columns={columns} />
    </div>
  );
}

export default UsersTable;
