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

interface MenuItemsProps {
  showMenuItems: boolean;
  setShowMenuItems: (showMenuItems: boolean) => void;
}
const MenuItems = ({ showMenuItems, setShowMenuItems }: MenuItemsProps) => {
    const iconSize = 16;
    const menuItems = [
      {
        name: "Dashboard",
        icon: <LayoutDashboard size={iconSize} />,
      },
      {
        name: "Doctors",
        icon: <GraduationCap size={iconSize} />,
      },
      {
        name: "Appointments",
        icon: <CalendarClock size={iconSize} />,
      },
      {
        name: "Patients",
        icon: <Contact size={iconSize} />,
      },
      {
        name: "Reports",
        icon: <Banknote size={iconSize} />,
      },
      {
          name: "Staff / Users",
          icon: <ListStart  size={iconSize} />,
        },
    ];

  return (
    <Drawer
      open={showMenuItems}
      onClose={() => setShowMenuItems(false)}
      title="Menu Items"
    >
        <div className="flex flex-col gap-7">
            {menuItems.map((item, index) => (
                <div key={index} className="flex gap-5 items-center">
                    {item.icon}
                    <span>{item.name}</span>
                </div>
            ))}
        </div>
    </Drawer>
  );
};

export default MenuItems;
