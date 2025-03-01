import Link from "next/link";
import React, { use, useEffect } from "react";
import Image from "next/image";
import { Alert, Button, message } from "antd";
import { getUserDataFromMongoDB } from "@/server-actions/users";
import { IUsersStore, usersGlobalStore } from "@/store/users-store";
import { Menu } from "lucide-react";
import Spinner from "@/components/Spinner";
import MenuItems from "./menu-items";

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [showMenuItems, setShowMenuItems] = React.useState<boolean>(false);
  const { setCurrentUserData, currentUserData }: IUsersStore =
    usersGlobalStore() as any;

  const getUserData = async () => {
    try {
      setLoading(true);
      const response: any = await getUserDataFromMongoDB();
      if (response.success) {
        setCurrentUserData(response.data);
        if (!response.data.isApproved) {
          setError(
            "Your account is not approved yet. Please wait for approval."
          );
        }
      } else {
        message.error(response.message);
        setError(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <div className="bg-primary text-white py-8 px-10 flex justify-between items-center">
        <Link href="/">
          <Image
            src="/assets/logo-full.svg"
            alt="logo"
            width={128}
            height={256}
          />
        </Link>
        <div className="flex gap-5 items-center">
          <span className="text-white text-sm uppercase">
            {currentUserData?.name}
          </span>

          <Button ghost size="small" onClick={() => setShowMenuItems(true)}>
            <Menu size={16} className="text-white" />
          </Button>
        </div>
      </div>
      {error ? (
        <div className="p-5">
          <Alert showIcon message={error} type="error" />
        </div>
      ) : (
        <div className="p-5">{children}</div>
      )}
      {showMenuItems && (
        <MenuItems
          showMenuItems={showMenuItems}
          setShowMenuItems={setShowMenuItems}
        />
      )}
    </div>
  );
};

export default PrivateLayout;
