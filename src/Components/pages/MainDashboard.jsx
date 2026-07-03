import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import AdminDashboard from "./Dashbord_com/AdminDashboard"
import StaffDashboard from "./Dashbord_com/StaffDashboard"
import TrainerDashboard from "./Dashbord_com/TrainerDashboard";

const MainDashboard = () => {
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");

  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  switch (role) {
    case "ADMIN":
      return <AdminDashboard location={location} />;

    case "STAFF":
      return <StaffDashboard location={location} />;

    case "TRAINER":
      return <TrainerDashboard location={location} />;

    default:
      return <Navigate to="/login" replace />;
  }
};

export default MainDashboard;
