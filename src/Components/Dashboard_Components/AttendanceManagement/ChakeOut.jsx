import React, { useState } from "react";
import axios from "axios";
import {
  UserRound,
  LogIn,
  LogOut,
  Loader2,
  BadgeCheck,
  Users,
  UserCheck,
  UserX,
  Clock3,
} from "lucide-react";

function CheckInOut() {
  const token = sessionStorage.getItem("token");

  const [userId, setUserId] = useState("");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [messageType, setMessageType] = useState("");

  // Temporary Dashboard Data
  // Later these values will come from Backend

  const [summary] = useState({
    total: 250,
    present: 82,
    absent: 18,
    checkedOut: 41,
  });

  const [recentAttendance] = useState([
    {
      id: 1001,
      name: "Rahul Kumar",
      status: "Checked In",
      time: "08:15 AM",
    },

    {
      id: 1002,
      name: "Aman Singh",
      status: "Checked Out",
      time: "10:42 AM",
    },

    {
      id: 1003,
      name: "Rohan Patel",
      status: "Checked In",
      time: "11:12 AM",
    },
  ]);

  const clearMessage = () => {
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
  };

  const handleAttendance = async (type) => {
    if (!userId.trim()) {
      setMessage("Please enter Member ID.");
      setMessageType("error");
      clearMessage();
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `http://localhost:8080/api/attendance/${type}?userId=${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setMessage(
        type === "check-in"
          ? "Member Checked In Successfully"
          : "Member Checked Out Successfully",
      );

      setMessageType("success");

      setUserId("");

      clearMessage();
    } catch (error) {
      console.error(error);

      setMessage(error.response?.data || "Unable to complete attendance.");

      setMessageType("error");

      clearMessage();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* ================= HERO ================= */}

      <div className="rounded-3xl bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white shadow-xl p-6 md:p-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div>
            <p className="uppercase tracking-[3px] text-green-100 text-sm">
              Gym ERP
            </p>

            <h1 className="text-3xl md:text-5xl font-black mt-3">
              Member Attendance
            </h1>

            <p className="mt-4 text-green-100 max-w-2xl leading-7">
              Quickly record member attendance, monitor today's activity and
              maintain complete attendance records.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl px-8 py-6">
            <BadgeCheck size={55} className="text-white" />

            <h2 className="text-5xl font-black mt-4">LIVE</h2>

            <p className="mt-2 text-green-100">Attendance Tracking</p>
          </div>
        </div>
      </div>

      {/* ================= SUMMARY ================= */}

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
        <div className="bg-white rounded-3xl shadow-sm p-6 hover:shadow-xl transition">
          <Users size={34} className="text-blue-600" />

          <p className="text-gray-500 mt-4">Members</p>

          <h2 className="text-4xl font-black mt-2">{summary.total}</h2>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-6 hover:shadow-xl transition">
          <UserCheck size={34} className="text-green-600" />

          <p className="text-gray-500 mt-4">Present</p>

          <h2 className="text-4xl font-black mt-2 text-green-600">
            {summary.present}
          </h2>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-6 hover:shadow-xl transition">
          <UserX size={34} className="text-red-500" />

          <p className="text-gray-500 mt-4">Absent</p>

          <h2 className="text-4xl font-black mt-2 text-red-500">
            {summary.absent}
          </h2>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-6 hover:shadow-xl transition">
          <Clock3 size={34} className="text-orange-500" />

          <p className="text-gray-500 mt-4">Checked Out</p>

          <h2 className="text-4xl font-black mt-2 text-orange-500">
            {summary.checkedOut}
          </h2>
        </div>
      </div>
      {/* ================= CHECK IN / OUT ================= */}

      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
        <div className="border-b px-8 py-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Check In / Check Out
          </h2>

          <p className="text-gray-500 mt-2">
            Enter Member ID and record today's attendance.
          </p>
        </div>

        <div className="p-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* LEFT */}

            <div>
              <label className="block font-semibold text-gray-700 mb-3">
                Member ID
              </label>

              <div className="relative">
                <UserRound
                  size={22}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="number"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Enter Member ID"
                  className="w-full border border-gray-300 rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition"
                />
              </div>

              {/* MESSAGE */}

              {message && (
                <div
                  className={`mt-5 rounded-xl px-4 py-3 font-medium
                  ${
                    messageType === "success"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {message}
                </div>
              )}

              {/* BUTTONS */}

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                  disabled={loading}
                  onClick={() => handleAttendance("check-in")}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-70 text-white rounded-2xl py-4 font-semibold flex items-center justify-center gap-3 transition-all"
                >
                  {loading ? (
                    <Loader2 size={22} className="animate-spin" />
                  ) : (
                    <LogIn size={22} />
                  )}
                  Check In
                </button>

                <button
                  disabled={loading}
                  onClick={() => handleAttendance("check-out")}
                  className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-70 text-white rounded-2xl py-4 font-semibold flex items-center justify-center gap-3 transition-all"
                >
                  {loading ? (
                    <Loader2 size={22} className="animate-spin" />
                  ) : (
                    <LogOut size={22} />
                  )}
                  Check Out
                </button>
              </div>
            </div>

            {/* RIGHT */}

            <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-3xl text-white p-8 flex flex-col justify-center">
              <h3 className="text-3xl font-black">Today's Attendance</h3>

              <p className="mt-4 text-green-100 leading-7">
                Record every member's entry and exit to generate accurate daily
                and monthly attendance reports automatically.
              </p>

              <div className="mt-8 space-y-5">
                <div className="flex justify-between">
                  <span>Total Members</span>

                  <span className="font-bold">{summary.total}</span>
                </div>

                <div className="flex justify-between">
                  <span>Present</span>

                  <span className="font-bold">{summary.present}</span>
                </div>

                <div className="flex justify-between">
                  <span>Absent</span>

                  <span className="font-bold">{summary.absent}</span>
                </div>

                <div className="flex justify-between">
                  <span>Checked Out</span>

                  <span className="font-bold">{summary.checkedOut}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ================= RECENT ACTIVITY ================= */}

      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
        <div className="border-b px-8 py-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Recent Attendance
          </h2>

          <p className="text-gray-500 mt-2">
            Latest member check-in and check-out activity.
          </p>
        </div>

        {/* Desktop */}

        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-8 py-4 font-semibold">Member ID</th>

                <th className="text-left px-8 py-4 font-semibold">Member</th>

                <th className="text-left px-8 py-4 font-semibold">Status</th>

                <th className="text-left px-8 py-4 font-semibold">Time</th>
              </tr>
            </thead>

            <tbody>
              {recentAttendance.map((item) => (
                <tr
                  key={item.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-8 py-5 font-semibold">#{item.id}</td>

                  <td className="px-8 py-5">{item.name}</td>

                  <td className="px-8 py-5">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold
                      ${
                        item.status === "Checked In"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="px-8 py-5 text-gray-600">{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile */}

        <div className="lg:hidden p-5 space-y-4">
          {recentAttendance.map((item) => (
            <div key={item.id} className="border rounded-2xl p-5 shadow-sm">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-lg">{item.name}</h4>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold
                  ${
                    item.status === "Checked In"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <p className="mt-3 text-gray-600">
                Member ID :<span className="font-semibold"> {item.id}</span>
              </p>

              <p className="text-gray-600">
                Time :<span className="font-semibold"> {item.time}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= INFORMATION ================= */}

      <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white p-8 shadow-xl">
        <h2 className="text-3xl font-black">Smart Attendance System</h2>

        <p className="mt-4 text-blue-100 leading-8 max-w-3xl">
          This attendance module records every member's check-in and check-out
          instantly. Daily and monthly reports are generated automatically,
          allowing trainers and administrators to monitor attendance, identify
          inactive members, and improve overall gym management.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <div className="bg-white/10 rounded-2xl p-6">
            <h4 className="text-xl font-bold">Fast Check-In</h4>

            <p className="mt-2 text-blue-100">
              Record attendance within seconds.
            </p>
          </div>

          <div className="bg-white/10 rounded-2xl p-6">
            <h4 className="text-xl font-bold">Accurate Reports</h4>

            <p className="mt-2 text-blue-100">
              Daily & Monthly attendance history.
            </p>
          </div>

          <div className="bg-white/10 rounded-2xl p-6">
            <h4 className="text-xl font-bold">Live Dashboard</h4>

            <p className="mt-2 text-blue-100">
              Real-time attendance statistics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckInOut;