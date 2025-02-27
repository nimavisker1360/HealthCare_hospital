"use client";

import { IUser } from "@/interfaces";
import { updateUser } from "@/server-actions/users";
import { Table, Switch, message } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";

function UsersTable({ users }: { users: IUser[] }) {
  const [loading, setLoading] = useState(false);

  const updateUserHandler = async ({
    userId,
    updatedData,
  }: {
    userId: string;
    updatedData: Partial<IUser>;
  }) => {
    try {
      setLoading(true);
      const { success } = await updateUser({ userId, updatedData });
      if (success) {
        message.success("User Updated Successfully");
      } else {
        message.error("Failed to update user ");
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };
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
      render: (isApproved: boolean, row: IUser) => (
        <Switch
          checked={isApproved}
          onChange={(newValue) =>
            updateUserHandler({
              userId: row._id,
              updatedData: { isApproved: newValue },
            })
          }
        />
      ),
    },
    {
      title: "Is Super Admin",
      dataIndex: "isSuperAdmin",
      key: "isSuperAdmin",
      render: (isSuperAdmin: boolean, row: IUser) => (
        <Switch
          checked={isSuperAdmin}
          onChange={(newValue) =>
            updateUserHandler({
              userId: row._id,
              updatedData: { isSuperAdmin: newValue },
            })
          }
        />
      ),
    },
  ];
  return (
    <div>
    <Table
      dataSource={users}
      columns={columns}
      loading={loading}
      rowKey="_id"
    />
  </div>
  );
}

export default UsersTable;
