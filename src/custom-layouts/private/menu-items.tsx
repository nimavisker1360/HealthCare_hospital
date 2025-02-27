import React from "react";
import { Drawer, List } from "antd";
import {
  Banknote,
  CalendarClock,
  Contact,
  GraduationCap,
  LayoutDashboard,
  ListStart,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

interface MenuItemsProps {
  showMenuItems: boolean;
  setShowMenuItems: (showMenuItems: boolean) => void;
}
const MenuItems = ({ showMenuItems, setShowMenuItems }: MenuItemsProps) => {
  const iconSize = 16;
  const pathname = usePathname();
  const router = useRouter();
  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={iconSize} />,
      path: "/admin/dashboard",
    },
    {
      name: "Doctors",
      icon: <GraduationCap size={iconSize} />,
      path: "/admin/doctors",
    },
    {
      name: "Appointments",
      icon: <CalendarClock size={iconSize} />,
      path: "/admin/appointments",
    },
    {
      name: "Patients",
      icon: <Contact size={iconSize} />,
      path: "/admin/patients",
    },
    {
      name: "Reports",
      icon: <Banknote size={iconSize} />,
      path: "/admin/reports",
    },
    {
      name: "Staff / Users",
      icon: <ListStart size={iconSize} />,
      path: "/admin/staff",
    },
  ];

  return (
    <Drawer
      open={showMenuItems}
      onClose={() => setShowMenuItems(false)}
      title="Menu Items"
    >
      <div className="flex flex-col gap-10  mt-10">
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              router.push(item.path);
              setShowMenuItems(false);
            }}
            className={`p-2 flex gap-5 items-center cursor-pointer ${
              pathname === item.path
                ? "border-primary bg-gray-200 border-solid border"
                : ""
            }`}
          >
            {item.icon}
            <span className="text-sm">{item.name}</span>
          </div>
        ))}
      </div>
    </Drawer>
  );
};

export default MenuItems;
