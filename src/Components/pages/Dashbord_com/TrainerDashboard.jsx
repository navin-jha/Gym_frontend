import React, { useState, useEffect } from "react";

import DashboardLayout from "./DashboardLayout";

import Home from "../../Dashboard_Components/Home";
import AttendanceManagement from "../../Dashboard_Components/AttendanceManagement";
import UserProfile from "../../Dashboard_Components/UserProfile";
import MemberOverview from "../../Dashboard_Components/MemberOverview";

import {
  LayoutDashboard,
  ClipboardList,
  Users,
  UserCircle,
} from "lucide-react";

function TrainerDashboard() {
  const [activePage, setActivePage] = useState("home");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [activePage]);

  const menuItems = [
    {
      key: "home",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      key: "member-overview",
      label: "My Members",
      icon: Users,
    },
    {
      key: "attendance-management",
      label: "Attendance",
      icon: ClipboardList,
    },
    {
      key: "user-profile",
      label: "Profile",
      icon: UserCircle,
    },
  ];

  const renderPage = () => {
    switch (activePage) {
      case "member-overview":
        return <MemberOverview />;

      case "attendance-management":
        return <AttendanceManagement />;

      case "user-profile":
        return <UserProfile />;

      default:
        return <Home />;
    }
  };

  return (
    <DashboardLayout
      title="Trainer Dashboard"
      welcomeText="Welcome to Gym ERP Trainer Dashboard"
      menuItems={menuItems}
      activePage={activePage}
      setActivePage={setActivePage}
    >
      {renderPage()}
    </DashboardLayout>
  );
}

export default TrainerDashboard;
