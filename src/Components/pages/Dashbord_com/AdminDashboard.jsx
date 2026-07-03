import React, { useState, useEffect } from "react";

import DashboardLayout from "./DashboardLayout";

import RegisterForm from "../../Dashboard_Components/RegisterForm";
import MemberOverview from "../../Dashboard_Components/MemberOverview";
import UserProfile from "../../Dashboard_Components/UserProfile";
import Plans from "../../Dashboard_Components/Register/Plans";
import Home from "../../Dashboard_Components/Home";
import MemberManagement from "../../Dashboard_Components/MemberManagement";
import TrainerManagement from "../../Dashboard_Components/TrainerManagement";
import PlanManagements from "../../Dashboard_Components/PlanManagements";
import PaymentManagement from "../../Dashboard_Components/PaymentManagement";
import AttendanceManagement from "../../Dashboard_Components/AttendanceManagement";

import {
  LayoutDashboard,
  UserPlus,
  ClipboardList,
  Users,
  Dumbbell,
  UserCircle,
  CreditCard,
} from "lucide-react";

function AdminDashboard() {
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
      key: "plans",
      label: "Plans",
      icon: ClipboardList,
    },
    {
      key: "plan-management",
      label: "Plan Management",
      icon: ClipboardList,
    },
    {
      key: "member-management",
      label: "Member Management",
      icon: Users,
    },
    {
      key: "Trainer-management",
      label: "Trainer Management",
      icon: Dumbbell,
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

      case "member-overview":
        return <MemberOverview />;

      case "plans":
        return <Plans />;

      case "plan-management":
        return <PlanManagements />;

      case "member-management":
        return <MemberManagement />;

      case "Trainer-management":
        return <TrainerManagement />;

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
      title="Admin Dashboard"
      welcomeText="Welcome to Gym ERP Admin Dashboard"
      menuItems={menuItems}
      activePage={activePage}
      setActivePage={setActivePage}
    >
      {renderPage()}
    </DashboardLayout>
  );
}

export default AdminDashboard;
