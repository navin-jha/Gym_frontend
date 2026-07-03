import React, { useState } from "react";

import {
  CalendarCheck,
  CalendarDays,
  CalendarRange,
  History,
  Users,
  UserCheck,
  UserX,
  Clock3,
} from "lucide-react";

import CheckInOut from "./AttendanceManagement/ChakeOut";
import DailyReport from "./AttendanceManagement/DailyRepotes";
import MonthlyReport from "./AttendanceManagement/MonthelyRepots";

function AttendanceManagement() {
  const [activeTab, setActiveTab] = useState("checkin");

  const tabs = [
    {
      key: "checkin",
      title: "Check In / Out",
      icon: CalendarCheck,
    },
    {
      key: "daily",
      title: "Daily Report",
      icon: CalendarDays,
    },
    {
      key: "monthly",
      title: "Monthly Report",
      icon: CalendarRange,
    },
    {
      key: "history",
      title: "History",
      icon: History,
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "checkin":
        return <CheckInOut />;

      case "daily":
        return <DailyReport />;

      case "monthly":
        return <MonthlyReport />;

      case "history":
        return (
          <div className="bg-white rounded-3xl shadow-sm p-12 text-center">
            <History size={55} className="mx-auto text-blue-500" />

            <h2 className="text-2xl font-bold mt-5">Attendance History</h2>

            <p className="text-gray-500 mt-2">History Module Coming Soon...</p>
          </div>
        );

      default:
        return <CheckInOut />;
    }
  };

  return (
    <div className="space-y-8">
      {/* ================= HERO ================= */}

      <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white p-6 md:p-10 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-8">
          <div>
            <p className="uppercase tracking-[3px] text-blue-100 text-sm">
              Gym ERP
            </p>

            <h1 className="text-3xl md:text-5xl font-black mt-3">
              Attendance Management
            </h1>

            <p className="mt-4 text-blue-100 max-w-2xl leading-7">
              Track member attendance, manage daily check-ins, monitor reports
              and maintain complete attendance history.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl px-8 py-6">
            <p className="text-blue-100">Today's Attendance</p>

            <h2 className="text-5xl font-black mt-3">82</h2>

            <p className="mt-2 text-blue-100">Members Checked In</p>
          </div>
        </div>
      </div>

      {/* ================= SUMMARY ================= */}

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
        <div className="bg-white rounded-3xl shadow-sm p-6 hover:shadow-xl transition">
          <Users className="text-blue-600" size={32} />

          <p className="text-gray-500 mt-5">Total Members</p>

          <h2 className="text-4xl font-black mt-2">250</h2>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-6 hover:shadow-xl transition">
          <UserCheck className="text-green-600" size={32} />

          <p className="text-gray-500 mt-5">Present</p>

          <h2 className="text-4xl font-black mt-2 text-green-600">82</h2>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-6 hover:shadow-xl transition">
          <UserX className="text-red-500" size={32} />

          <p className="text-gray-500 mt-5">Absent</p>

          <h2 className="text-4xl font-black mt-2 text-red-500">18</h2>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-6 hover:shadow-xl transition">
          <Clock3 className="text-orange-500" size={32} />

          <p className="text-gray-500 mt-5">Late Entries</p>

          <h2 className="text-4xl font-black mt-2 text-orange-500">6</h2>
        </div>
      </div>

      {/* ================= TABS ================= */}

      <div className="bg-white rounded-3xl shadow-sm p-3">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center justify-center gap-3 py-4 rounded-2xl font-semibold transition-all duration-300
                ${
                  activeTab === tab.key
                    ? "bg-blue-600 text-white shadow-lg"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <Icon size={22} />

                {tab.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= CONTENT ================= */}

      <div>{renderContent()}</div>
    </div>
  );
}

export default AttendanceManagement;
