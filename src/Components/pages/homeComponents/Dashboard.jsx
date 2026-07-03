import React from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaMoneyBillWave,
  FaChartLine,
  FaDumbbell,
  FaCheckCircle,
} from "react-icons/fa";

export default function Dashboard() {
  return (
    <section className="relative overflow-hidden bg-background py-28">
      {/* Background */}

      <div className="absolute inset-0">
        <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="content relative z-10 grid items-center gap-20 lg:grid-cols-2">
        {/* LEFT */}

        <motion.div
          initial={{
            opacity: 0,
            x: -40,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
        >
          <span className="badge">DASHBOARD</span>

          <h2 className="mt-6 text-h1 font-black text-heading">
            Everything You Need
            <span className="block text-primary">In One Dashboard</span>
          </h2>

          <p className="mt-6 max-w-xl text-body leading-8 text-text">
            Monitor your members, attendance, trainers, revenue, subscriptions
            and reports from one clean dashboard.
          </p>

          <div className="mt-10 space-y-5">
            {[
              "Real-Time Analytics",
              "Attendance Tracking",
              "Membership Management",
              "Trainer Management",
              "Revenue Reports",
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: index * 0.1,
                }}
                viewport={{
                  once: true,
                }}
                className="flex items-center gap-4"
              >
                <div className="center h-10 w-10 rounded-full bg-primary text-white">
                  <FaCheckCircle />
                </div>

                <p className="font-medium text-heading">{item}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{
            opacity: 0,
            x: 40,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
          className="relative"
        >
          <div className="card overflow-hidden p-8">
            <div className="flex-between">
              <div>
                <p className="text-small text-text">Dashboard Overview</p>

                <h3 className="mt-2 text-h2 font-black text-heading">
                  Business Summary
                </h3>
              </div>

              <div className="center h-16 w-16 rounded-card bg-primary text-white shadow-button">
                <FaDumbbell className="text-3xl" />
              </div>
            </div>

            {/* Revenue */}

            <div className="mt-10 rounded-card border border-border bg-surface p-6">
              <div className="flex-between">
                <div>
                  <p className="text-small text-text">Total Revenue</p>

                  <h2 className="mt-2 text-hero font-black text-heading">
                    ₹4.8L
                  </h2>
                </div>

                <span className="rounded-full bg-success/10 px-4 py-2 font-semibold text-success">
                  +18%
                </span>
              </div>

              {/* Chart */}

              <div className="mt-10 flex h-44 items-end gap-3">
                {[45, 70, 60, 95, 80, 120, 90, 135].map((bar, index) => (
                  <motion.div
                    key={index}
                    initial={{
                      height: 0,
                    }}
                    whileInView={{
                      height: bar,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: index * 0.08,
                    }}
                    className="flex-1 rounded-t-card bg-primary"
                  />
                ))}
              </div>
            </div>

            {/* Overview Cards */}

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              <div className="rounded-card border border-border bg-surface p-6">
                <FaUsers className="text-4xl text-primary" />

                <h3 className="mt-5 text-h2 font-black text-heading">1,248</h3>

                <p className="mt-2 text-text">Total Members</p>
              </div>

              <div className="rounded-card border border-border bg-surface p-6">
                <FaMoneyBillWave className="text-4xl text-success" />

                <h3 className="mt-5 text-h2 font-black text-heading">₹48K</h3>

                <p className="mt-2 text-text">Monthly Revenue</p>
              </div>

              <div className="rounded-card border border-border bg-surface p-6">
                <FaChartLine className="text-4xl text-primary" />

                <h3 className="mt-5 text-h2 font-black text-heading">87%</h3>

                <p className="mt-2 text-text">Business Growth</p>
              </div>
            </div>
          </div>

          {/* Floating Card */}

          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="absolute -left-6 top-10 hidden lg:block"
          >
            <div className="rounded-card border border-border bg-card p-5 shadow-card">
              <p className="text-small text-text">New Members</p>

              <h3 className="mt-2 text-h2 font-black text-heading">+42</h3>

              <span className="mt-2 inline-flex rounded-full bg-success/10 px-3 py-1 text-small font-semibold text-success">
                This Week
              </span>
            </div>
          </motion.div>

          {/* Floating Revenue */}

          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="absolute -right-6 bottom-10 hidden lg:block"
          >
            <div className="rounded-card bg-primary p-6 text-white shadow-button">
              <p className="text-small text-white/80">Today's Revenue</p>

              <h3 className="mt-2 text-h2 font-black">₹18K</h3>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}