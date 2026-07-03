import React, { useState } from "react";
import api from "../../../services/axiosConfig";
import {
  CalendarRange,
  Search,
  Users,
  UserCheck,
  UserX,
  BarChart3,
  Loader2,
  Download,
} from "lucide-react";

function MonthlyReport() {
  const token = sessionStorage.getItem("token");

  const [month, setMonth] = useState("");

  const [year, setYear] = useState("");

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [attendance, setAttendance] = useState([]);

  const fetchReport = async () => {
    if (!month || !year) {
      alert("Please select Month and Year");

      return;
    }

    try {
      setLoading(true);

      const res = await api.get(
        `/api/attendance/monthly?month=${month}&year=${year}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setAttendance(res.data);
    } catch (error) {
      console.error(error);

      alert("Unable to load monthly report.");
    } finally {
      setLoading(false);
    }
  };

  const filteredAttendance = attendance.filter((item) => {
    return (
      item.userId?.toString().includes(search) ||
      item.memberName?.toLowerCase().includes(search.toLowerCase())
    );
  });

  const totalMembers = attendance.length;

  const presentMembers = attendance.filter(
    (item) => item.status === "Present",
  ).length;

  const absentMembers = attendance.filter(
    (item) => item.status === "Absent",
  ).length;

  return (
    <div className="space-y-8">
      {/* ================= HERO ================= */}

      <div className="rounded-3xl bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 text-white shadow-xl p-6 md:p-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div>
            <p className="uppercase tracking-[4px] text-purple-100 text-sm">
              Gym ERP
            </p>

            <h1 className="text-4xl md:text-5xl font-black mt-3">
              Monthly Attendance Report
            </h1>

            <p className="mt-4 text-purple-100 max-w-2xl leading-8">
              Analyze complete monthly attendance, monitor member engagement and
              generate powerful attendance reports.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8">
            <CalendarRange size={55} className="text-white" />

            <h2 className="text-5xl font-black mt-4">MONTHLY</h2>

            <p className="mt-2 text-purple-100">Analytics Dashboard</p>
          </div>
        </div>
      </div>

      {/* ================= SUMMARY ================= */}

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl shadow-sm p-6 hover:shadow-xl transition">
          <Users className="text-blue-600" size={34} />

          <p className="mt-4 text-gray-500">Members</p>

          <h2 className="text-4xl font-black mt-2">{totalMembers}</h2>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-6 hover:shadow-xl transition">
          <UserCheck className="text-green-600" size={34} />

          <p className="mt-4 text-gray-500">Present</p>

          <h2 className="text-4xl font-black mt-2 text-green-600">
            {presentMembers}
          </h2>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-6 hover:shadow-xl transition">
          <UserX className="text-red-500" size={34} />

          <p className="mt-4 text-gray-500">Absent</p>

          <h2 className="text-4xl font-black mt-2 text-red-500">
            {absentMembers}
          </h2>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-6 hover:shadow-xl transition">
          <BarChart3 className="text-orange-500" size={34} />

          <p className="mt-4 text-gray-500">Attendance %</p>

          <h2 className="text-4xl font-black mt-2 text-orange-500">
            {totalMembers
              ? Math.round((presentMembers / totalMembers) * 100)
              : 0}
            %
          </h2>
        </div>
      </div>
      {/* ================= FILTER SECTION ================= */}

      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
        <div className="border-b px-8 py-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Monthly Report Filter
            </h2>

            <p className="text-gray-500 mt-2">
              Select month and year to generate attendance analytics.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-2xl transition">
              <Download size={18} />
              Excel
            </button>

            <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-2xl transition">
              <Download size={18} />
              PDF
            </button>
          </div>
        </div>

        <div className="p-8">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* MONTH */}

            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Month
              </label>

              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 px-4 py-4 outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition"
              >
                <option value="">Select Month</option>

                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((m, index) => (
                  <option key={index + 1} value={index + 1}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            {/* YEAR */}

            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Year
              </label>

              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="2026"
                className="w-full rounded-2xl border border-gray-300 px-4 py-4 outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition"
              />
            </div>

            {/* SEARCH */}

            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Search Member
              </label>

              <div className="relative">
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Member ID / Name"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-2xl border border-gray-300 pl-12 pr-4 py-4 outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition"
                />
              </div>
            </div>

            {/* BUTTON */}

            <div className="flex items-end">
              <button
                onClick={fetchReport}
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl py-4 font-semibold flex items-center justify-center gap-3 transition-all"
              >
                {loading ? (
                  <Loader2 size={22} className="animate-spin" />
                ) : (
                  <CalendarRange size={22} />
                )}
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= REPORT TABLE ================= */}

      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
        <div className="border-b px-8 py-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Monthly Attendance Records
          </h2>

          <p className="text-gray-500 mt-2">
            Complete monthly attendance details for every member.
          </p>
        </div>

        {/* Desktop Table */}

        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-8 py-4 text-left font-semibold">Member</th>

                <th className="px-8 py-4 text-center font-semibold">Present</th>

                <th className="px-8 py-4 text-center font-semibold">Absent</th>

                <th className="px-8 py-4 text-center font-semibold">
                  Attendance %
                </th>

                <th className="px-8 py-4 text-center font-semibold">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredAttendance.map((item) => (
                <tr
                  key={item.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-8 py-5">
                    <div>
                      <h4 className="font-semibold">{item.memberName}</h4>

                      <p className="text-gray-500 text-sm">#{item.userId}</p>
                    </div>
                  </td>

                  <td className="px-8 py-5 text-center font-semibold text-green-600">
                    {item.presentDays}
                  </td>

                  <td className="px-8 py-5 text-center font-semibold text-red-500">
                    {item.absentDays}
                  </td>

                  <td className="px-8 py-5 text-center font-bold text-indigo-600">
                    {item.attendancePercentage}%
                  </td>

                  <td className="px-8 py-5 text-center">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        item.attendancePercentage >= 75
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {item.attendancePercentage >= 75 ? "Good" : "Low"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* ================= MOBILE CARDS ================= */}

        <div className="lg:hidden p-5 space-y-5">
          {filteredAttendance.length === 0 ? (
            <div className="text-center py-16">
              <CalendarRange size={60} className="mx-auto text-gray-300" />

              <h3 className="mt-5 text-2xl font-bold text-gray-700">
                No Monthly Report Found
              </h3>

              <p className="text-gray-500 mt-3">
                Select month and year to generate the attendance report.
              </p>
            </div>
          ) : (
            filteredAttendance.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl border border-gray-200 shadow-sm p-6 hover:shadow-lg transition"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {item.memberName}
                    </h3>

                    <p className="text-sm text-gray-500">
                      Member ID #{item.userId}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold
                    ${
                      item.attendancePercentage >= 75
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {item.attendancePercentage >= 75 ? "Good" : "Low"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-green-50 rounded-2xl p-4">
                    <p className="text-gray-500 text-sm">Present</p>

                    <h3 className="text-2xl font-black text-green-600 mt-2">
                      {item.presentDays}
                    </h3>
                  </div>

                  <div className="bg-red-50 rounded-2xl p-4">
                    <p className="text-gray-500 text-sm">Absent</p>

                    <h3 className="text-2xl font-black text-red-500 mt-2">
                      {item.absentDays}
                    </h3>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-gray-600">
                      Attendance
                    </span>

                    <span className="font-bold text-indigo-600">
                      {item.attendancePercentage}%
                    </span>
                  </div>

                  <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-blue-600"
                      style={{
                        width: `${item.attendancePercentage}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ================= ANALYTICS ================= */}

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-700 to-blue-700 text-white p-8 shadow-xl">
          <h2 className="text-3xl font-black">Monthly Insights</h2>

          <p className="mt-4 text-indigo-100 leading-8">
            Monthly attendance analytics help you identify inactive members,
            evaluate trainer performance, improve engagement, and maintain
            accurate attendance records throughout the month.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span>Total Members</span>

              <strong>{totalMembers}</strong>
            </div>

            <div className="flex justify-between">
              <span>Present Members</span>

              <strong>{presentMembers}</strong>
            </div>

            <div className="flex justify-between">
              <span>Absent Members</span>

              <strong>{absentMembers}</strong>
            </div>

            <div className="flex justify-between">
              <span>Attendance Rate</span>

              <strong>
                {totalMembers
                  ? Math.round((presentMembers / totalMembers) * 100)
                  : 0}
                %
              </strong>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white shadow-sm p-8">
          <h2 className="text-3xl font-black text-gray-800">
            Performance Overview
          </h2>

          <div className="space-y-6 mt-8">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Attendance Rate</span>

                <span className="font-bold text-blue-600">
                  {totalMembers
                    ? Math.round((presentMembers / totalMembers) * 100)
                    : 0}
                  %
                </span>
              </div>

              <div className="w-full h-3 rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-blue-600"
                  style={{
                    width: `${
                      totalMembers
                        ? Math.round((presentMembers / totalMembers) * 100)
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Member Engagement</span>

                <span className="font-bold text-green-600">Excellent</span>
              </div>

              <div className="w-full h-3 rounded-full bg-gray-200">
                <div className="h-full w-[88%] rounded-full bg-green-500" />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Overall Performance</span>

                <span className="font-bold text-purple-600">Very Good</span>
              </div>

              <div className="w-full h-3 rounded-full bg-gray-200">
                <div className="h-full w-[92%] rounded-full bg-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MonthlyReport;