import PageTitle from "@/components/page-title";
import { Button } from "antd";
import Link from "next/link";
import React from "react";

const DoctorsPage = () => {
  return (
    <div className="p-5">
      <div className="flex justify-between items-center">
        <PageTitle title="Doctors" />
        <Button type="primary">
          <Link href="/admin/doctors/new">Add Doctor</Link>
        </Button>
      </div>
    </div>
  );
};

export default DoctorsPage;
