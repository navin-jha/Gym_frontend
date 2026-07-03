import React, { useEffect, useState } from "react";
import api from "../../services/axiosConfig";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function MemberOverview() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const email = sessionStorage.getItem("email");

    if (!email) return;

    api
      .get(`/users/overview/${email}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (!user) {
    return <div className="p-6">Loading...</div>;
  }

  const attendanceData = user.monthlyAttendance
    ? Object.entries(user.monthlyAttendance).map(([month, days]) => ({
      month,
      days,
    }))
    : [];
  const totalDays = attendanceData.reduce((sum, item) => sum + item.days, 0);  

  return (
    <div className="p-6 space-y-6">

      {/* Welcome */}
      <h1 className="text-2xl font-bold text-gray-800">
        Welcome, {user.name} 👋
      </h1>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white shadow-xl rounded-2xl p-6 border-l-4 border-green-500">
          <h3 className="text-gray-500">Paid</h3>
          <p className="text-2xl font-bold text-green-600">
            ₹{user.paidAmount}
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-6 border-l-4 border-red-500">
          <h3 className="text-gray-500">Due</h3>
          <p className="text-2xl font-bold text-red-500">
            ₹{user.dueAmount}
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-6 border-l-4 border-blue-500">
          <h3 className="text-gray-500">Attendance</h3>
          <p className="text-2xl font-bold text-blue-600">
            {user.attendanceDays} Days
          </p>
        </div>
      </div>

      {/* Graph */}
      <div className="bg-white shadow-xl rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">
          Monthly Attendance
        </h3>

        {attendanceData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="days" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500">No attendance data available</p>
        )}
      </div>

    </div>
  );
}

export default MemberOverview;