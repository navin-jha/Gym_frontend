import React, { useState, useEffect } from "react";

import DashboardLayout from "./DashboardLayout";

import RegisterForm from "../../Dashboard_Components/RegisterForm";
import UserProfile from "../../Dashboard_Components/UserProfile";
import Home from "../../Dashboard_Components/Home";
import MemberManagement from "../../Dashboard_Components/MemberManagement";
import PaymentManagement from "../../Dashboard_Components/PaymentManagement";
import AttendanceManagement from "../../Dashboard_Components/AttendanceManagement";

import {
  LayoutDashboard,
  UserPlus,
  Users,
  CreditCard,
  ClipboardList,
  UserCircle,
} from "lucide-react";

function StaffDashboard() {
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
      key: "register",
      label: "Member Registration",
      icon: UserPlus,
    },
    {
      key: "member-management",
      label: "Member Management",
      icon: Users,
    },
    {
      key: "payment",
      label: "Payment Management",
      icon: CreditCard,
    },
    {
      key: "attendance-management",
      label: "Attendance Management",
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
      case "register":
        return <RegisterForm redirectPath="/dashboard" />;

      case "member-management":
        return <MemberManagement />;

      case "payment":
        return <PaymentManagement />;

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
      title="Staff Dashboard"
      welcomeText="Welcome to Gym ERP Staff Dashboard"
      menuItems={menuItems}
      activePage={activePage}
      setActivePage={setActivePage}
    >
      {renderPage()}
    </DashboardLayout>
  );
}

export default StaffDashboard;
