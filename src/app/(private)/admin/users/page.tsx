import PageTitle from "@/components/page-title";
import { IUser } from "@/interfaces";
import { getAllUsers } from "@/server-actions/users";
import { Alert } from "antd";
import React from "react";
import UsersTable from "./_components/users-table";

async function UsersPage() {
  const { success, data } = await getAllUsers();
  if (!success) {
    return (
      <Alert message="Failed to fetch Users,please try again later" showIcon />
    );
  }
  const users :IUser[] = data;

  return (
    <div className="p-5">
      <PageTitle title="Users" />
      <UsersTable users={users} />
    </div>
  );
}

export default UsersPage;
