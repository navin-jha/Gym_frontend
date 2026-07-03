import React from "react";
import {
  Users,
  IndianRupee,
  Dumbbell,
  UserCheck,
  UserPlus,
  CreditCard,
  CalendarCheck,
  TrendingUp,
} from "lucide-react";

function Home() {
  const stats = [
    {
      title: "Total Members",
      value: "1,248",
      icon: Users,
      color: "bg-blue-500",
      growth: "+12%",
    },
    {
      title: "Monthly Revenue",
      value: "₹4.8L",
      icon: IndianRupee,
      color: "bg-green-500",
      growth: "+18%",
    },
    {
      title: "Active Trainers",
      value: "18",
      icon: Dumbbell,
      color: "bg-purple-500",
      growth: "+5%",
    },
    {
      title: "Today's Attendance",
      value: "214",
      icon: UserCheck,
      color: "bg-orange-500",
      growth: "+8%",
    },
  ];

  const actions = [
    {
      title: "Add Member",
      icon: UserPlus,
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "New Payment",
      icon: CreditCard,
      color: "bg-green-600 hover:bg-green-700",
    },
    {
      title: "Attendance",
      icon: CalendarCheck,
      color: "bg-orange-600 hover:bg-orange-700",
    },
    {
      title: "Reports",
      icon: TrendingUp,
      color: "bg-purple-600 hover:bg-purple-700",
    },
  ];

  return (
    <div className="space-y-8">
      {/* ================= HERO ================= */}

      <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 p-8 text-white shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div>
            <p className="uppercase tracking-widest text-blue-100">
              Gym ERP Dashboard
            </p>

            <h1 className="text-4xl md:text-5xl font-black mt-3">
              Welcome Back 👋
            </h1>

            <p className="text-blue-100 mt-4 text-lg max-w-xl">
              Manage members, trainers, payments, attendance and reports from
              one modern dashboard.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-2xl p-6 min-w-[260px]">
            <p className="text-blue-100">Today's Overview</p>

            <h2 className="text-5xl font-black mt-2">214</h2>

            <p className="mt-2 text-blue-100">Members Checked In</p>
          </div>
        </div>
      </div>

      {/* ================= QUICK ACTIONS ================= */}

      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-5">Quick Actions</h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((item, index) => {
            const Icon = item.icon;

            return (
              <button
                key={index}
                className={`${item.color} rounded-2xl text-white p-5 transition-all duration-300 hover:scale-105 shadow-lg`}
              >
                <Icon size={34} />

                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= STATS ================= */}

      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-5">
          Dashboard Statistics
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 p-6"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500">{item.title}</p>

                    <h2 className="text-4xl font-black mt-2">{item.value}</h2>
                  </div>

                  <div
                    className={`${item.color} w-16 h-16 rounded-2xl flex items-center justify-center`}
                  >
                    <Icon className="text-white" size={30} />
                  </div>
                </div>

                <div className="mt-6">
                  <span className="text-green-600 font-semibold">
                    {item.growth}
                  </span>

                  <span className="text-gray-500 ml-2">this month</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* ================= ANALYTICS ================= */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Revenue Chart */}

        <div className="xl:col-span-2 bg-white rounded-3xl shadow-sm p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Revenue Analytics
              </h2>

              <p className="text-gray-500 mt-1">Monthly Revenue Overview</p>
            </div>

            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
              +18%
            </span>
          </div>

          <div className="flex items-end gap-4 h-72 mt-10">
            {[60, 120, 90, 170, 140, 210, 180, 240, 200, 260, 220, 300].map(
              (bar, index) => (
                <div key={index} className="flex-1 flex flex-col justify-end">
                  <div
                    className="rounded-t-2xl bg-gradient-to-t from-blue-600 to-blue-400 hover:scale-105 transition-all"
                    style={{
                      height: `${bar}px`,
                    }}
                  />
                </div>
              ),
            )}
          </div>
        </div>

        {/* Today's Summary */}

        <div className="bg-white rounded-3xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-800">Today's Summary</h2>

          <div className="space-y-6 mt-8">
            <div className="flex justify-between">
              <span className="text-gray-500">New Members</span>

              <span className="font-bold">12</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Attendance</span>

              <span className="font-bold">214</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Payments</span>

              <span className="font-bold text-green-600">₹18,500</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Expiring Plans</span>

              <span className="font-bold text-red-500">8</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= TABLES ================= */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Members */}

        <div className="bg-white rounded-3xl shadow-sm p-6">
          <h2 className="text-2xl font-bold mb-6">Recent Members</h2>

          <div className="space-y-5">
            {[
              {
                name: "Rahul Sharma",
                plan: "Premium",
              },
              {
                name: "Amit Kumar",
                plan: "Gold",
              },
              {
                name: "Priya Singh",
                plan: "Monthly",
              },
              {
                name: "Rohit Verma",
                plan: "Yearly",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b pb-4"
              >
                <div>
                  <h3 className="font-semibold">{member.name}</h3>

                  <p className="text-sm text-gray-500">{member.plan}</p>
                </div>

                <span className="text-green-600 font-semibold">Active</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Payments */}

        <div className="bg-white rounded-3xl shadow-sm p-6">
          <h2 className="text-2xl font-bold mb-6">Recent Payments</h2>

          <div className="space-y-5">
            {[
              {
                name: "Rahul Sharma",
                amount: "₹1500",
              },
              {
                name: "Priya Singh",
                amount: "₹2500",
              },
              {
                name: "Rohit Verma",
                amount: "₹5000",
              },
              {
                name: "Amit Kumar",
                amount: "₹2000",
              },
            ].map((payment, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b pb-4"
              >
                <div>
                  <h3 className="font-semibold">{payment.name}</h3>

                  <p className="text-sm text-gray-500">Membership Payment</p>
                </div>

                <span className="font-bold text-green-600">
                  {payment.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* ================= ACTIVITY & MEMBERSHIP ================= */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Activity */}

        <div className="bg-white rounded-3xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Recent Activity
          </h2>

          <div className="space-y-6">
            {[
              {
                title: "Rahul Sharma joined Premium Plan",
                time: "10 min ago",
                color: "bg-green-500",
              },
              {
                title: "Monthly payment received",
                time: "35 min ago",
                color: "bg-blue-500",
              },
              {
                title: "Attendance updated",
                time: "1 hour ago",
                color: "bg-orange-500",
              },
              {
                title: "Trainer assigned",
                time: "2 hours ago",
                color: "bg-purple-500",
              },
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className={`w-4 h-4 rounded-full mt-2 ${item.color}`} />

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{item.title}</h3>

                  <p className="text-sm text-gray-500 mt-1">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Membership Expiry */}

        <div className="bg-white rounded-3xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Upcoming Membership Expiry
          </h2>

          <div className="space-y-5">
            {[
              {
                name: "Amit Kumar",
                days: "2 Days",
              },
              {
                name: "Rohit Verma",
                days: "4 Days",
              },
              {
                name: "Priya Singh",
                days: "6 Days",
              },
              {
                name: "Neha Gupta",
                days: "8 Days",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b pb-4"
              >
                <div>
                  <h3 className="font-semibold">{member.name}</h3>

                  <p className="text-sm text-gray-500">Membership Expiry</p>
                </div>

                <span className="px-4 py-2 rounded-full bg-red-100 text-red-600 text-sm font-semibold">
                  {member.days}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= PERFORMANCE ================= */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl text-white p-8">
          <p className="text-blue-100">Attendance Rate</p>

          <h2 className="text-5xl font-black mt-4">92%</h2>

          <p className="mt-4 text-blue-100">
            Excellent performance this month.
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl text-white p-8">
          <p className="text-green-100">Monthly Revenue</p>

          <h2 className="text-5xl font-black mt-4">₹4.8L</h2>

          <p className="mt-4 text-green-100">+18% compared to last month.</p>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl text-white p-8">
          <p className="text-orange-100">Active Members</p>

          <h2 className="text-5xl font-black mt-4">1248</h2>

          <p className="mt-4 text-orange-100">
            Highest growth in last 6 months.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;