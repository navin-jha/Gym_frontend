import React, { useState } from "react";
import axios from "axios";
import {
  CalendarDays,
  Search,
  Users,
  UserCheck,
  UserX,
  Clock3,
  Loader2,
  Download,
} from "lucide-react";

function DailyReport() {
  const token = sessionStorage.getItem("token");

  const [date, setDate] = useState("");

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [attendance, setAttendance] = useState([]);

  const fetchReport = async () => {
    if (!date) {
      alert("Please select date");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:8080/api/attendance/daily?date=${date}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setAttendance(res.data);
    } catch (error) {
      console.error(error);

      alert("Unable to fetch report.");
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

      <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white shadow-xl p-6 md:p-10">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-8">
          <div>
            <p className="uppercase tracking-[4px] text-blue-100 text-sm">
              Gym ERP
            </p>

            <h1 className="text-4xl md:text-5xl font-black mt-3">
              Daily Attendance Report
            </h1>

            <p className="text-blue-100 mt-4 max-w-2xl leading-8">
              View member attendance for any selected date with complete
              reporting and analytics.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8">
            <CalendarDays size={55} className="text-white" />

            <h2 className="text-5xl font-black mt-4">DAILY</h2>

            <p className="mt-2 text-blue-100">Attendance Report</p>
          </div>
        </div>
      </div>

      {/* ================= SUMMARY ================= */}

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl shadow-sm p-6">
          <Users className="text-blue-600" size={34} />

          <p className="mt-4 text-gray-500">Total Members</p>

          <h2 className="text-4xl font-black mt-2">{totalMembers}</h2>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-6">
          <UserCheck className="text-green-600" size={34} />

          <p className="mt-4 text-gray-500">Present</p>

          <h2 className="text-4xl font-black mt-2 text-green-600">
            {presentMembers}
          </h2>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-6">
          <UserX className="text-red-500" size={34} />

          <p className="mt-4 text-gray-500">Absent</p>

          <h2 className="text-4xl font-black mt-2 text-red-500">
            {absentMembers}
          </h2>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-6">
          <Clock3 className="text-orange-500" size={34} />

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
        <div className="border-b px-8 py-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Attendance Filter
          </h2>

          <p className="text-gray-500 mt-2">
            Select date and search member attendance.
          </p>
        </div>

        <div className="p-8">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* DATE */}

            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Select Date
              </label>

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 px-4 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
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
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Member ID / Name"
                  className="w-full rounded-2xl border border-gray-300 pl-12 pr-4 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                />
              </div>
            </div>

            {/* BUTTON */}

            <div className="flex items-end">
              <button
                onClick={fetchReport}
                disabled={loading}
                className="w-full rounded-2xl bg-blue-600 hover:bg-blue-700 text-white py-4 font-semibold transition-all flex items-center justify-center gap-3"
              >
                {loading ? (
                  <Loader2 size={22} className="animate-spin" />
                ) : (
                  <CalendarDays size={22} />
                )}
                Get Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= REPORT TABLE ================= */}

      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 border-b px-8 py-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Daily Attendance
            </h2>

            <p className="text-gray-500 mt-2">
              Complete attendance list for selected date.
            </p>
          </div>

          <button className="rounded-2xl bg-green-600 hover:bg-green-700 text-white px-6 py-3 font-semibold flex items-center gap-3 transition">
            <Download size={20} />
            Export Report
          </button>
        </div>

        {/* Desktop Table */}

        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-8 py-4 text-left font-semibold">Member ID</th>

                <th className="px-8 py-4 text-left font-semibold">
                  Member Name
                </th>

                <th className="px-8 py-4 text-left font-semibold">Check In</th>

                <th className="px-8 py-4 text-left font-semibold">Check Out</th>

                <th className="px-8 py-4 text-left font-semibold">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredAttendance.map((item) => (
                <tr
                  key={item.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-8 py-5 font-semibold">#{item.userId}</td>

                  <td className="px-8 py-5">{item.memberName}</td>

                  <td className="px-8 py-5">{item.checkInTime || "--"}</td>

                  <td className="px-8 py-5">{item.checkOutTime || "--"}</td>

                  <td className="px-8 py-5">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        item.status === "Present"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* ================= MOBILE CARDS ================= */}

        <div className="lg:hidden p-5 space-y-4">
          {filteredAttendance.length === 0 ? (
            <div className="text-center py-12">
              <Users size={55} className="mx-auto text-gray-300" />

              <h3 className="mt-5 text-xl font-bold text-gray-700">
                No Attendance Found
              </h3>

              <p className="text-gray-500 mt-2">
                Select a date to load attendance records.
              </p>
            </div>
          ) : (
            filteredAttendance.map((item) => (
              <div key={item.id} className="border rounded-3xl p-5 shadow-sm">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg">{item.memberName}</h3>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                    ${
                      item.status === "Present"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Member ID</span>

                    <span className="font-semibold">#{item.userId}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Check In</span>

                    <span className="font-semibold">
                      {item.checkInTime || "--"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Check Out</span>

                    <span className="font-semibold">
                      {item.checkOutTime || "--"}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ================= INSIGHTS ================= */}

      <div className="rounded-3xl bg-gradient-to-r from-indigo-700 via-blue-700 to-cyan-700 text-white shadow-xl p-8">
        <h2 className="text-3xl font-black">Attendance Insights</h2>

        <p className="mt-4 text-blue-100 max-w-3xl leading-8">
          Monitor daily attendance to understand member engagement, identify
          inactive members, and improve overall gym performance. Attendance
          reports help trainers and administrators make better operational
          decisions.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <div className="bg-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold">Live Tracking</h3>

            <p className="mt-2 text-blue-100">
              Monitor check-ins and check-outs in real time.
            </p>
          </div>

          <div className="bg-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold">Better Reports</h3>

            <p className="mt-2 text-blue-100">
              Daily attendance analytics improve management.
            </p>
          </div>

          <div className="bg-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold">Smart Decisions</h3>

            <p className="mt-2 text-blue-100">
              Understand member activity with detailed reports.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DailyReport;
