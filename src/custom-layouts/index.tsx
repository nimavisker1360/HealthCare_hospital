"use client";

import { usePathname } from "next/navigation";
import PrivateLayout from "./private";
import PublicLayout from "./public";

const CustomLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isPrivateRoute = pathname.includes("/admin");

  if (isPrivateRoute) {
    return <PrivateLayout>{children}</PrivateLayout>;
  }
  return <PublicLayout>{children}</PublicLayout>
};

export default CustomLayout;
