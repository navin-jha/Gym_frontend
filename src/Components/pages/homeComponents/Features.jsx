import React from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaCreditCard,
  FaChartLine,
  FaDumbbell,
  FaCalendarCheck,
  FaMobileAlt,
  FaArrowRight,
} from "react-icons/fa";

const features = [
  {
    icon: <FaUsers />,
    title: "Member Management",
    description:
      "Easily add, edit and manage members with attendance tracking, memberships and complete profiles.",
  },
  {
    icon: <FaCreditCard />,
    title: "Payment Tracking",
    description:
      "Track pending dues, recurring subscriptions, invoices and payment history in one place.",
  },
  {
    icon: <FaChartLine />,
    title: "Business Analytics",
    description:
      "Monitor revenue, member growth and business performance with real-time analytics.",
  },
  {
    icon: <FaDumbbell />,
    title: "Trainer Management",
    description:
      "Assign trainers, manage schedules and track trainer performance efficiently.",
  },
  {
    icon: <FaCalendarCheck />,
    title: "Attendance System",
    description:
      "Smart attendance management with daily, weekly and monthly reports.",
  },
  {
    icon: <FaMobileAlt />,
    title: "Mobile Friendly",
    description:
      "Access your gym dashboard anywhere using mobile, tablet or desktop devices.",
  },
];

export default function Features() {
  return (
    <section className="relative overflow-hidden bg-background py-28">
      {/* Background */}

      <div className="absolute inset-0">
        <div className="absolute -top-40 left-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="content relative z-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="content-sm text-center"
        >
          <span className="badge">OUR FEATURES</span>

          <h2 className="mt-6 text-h1 font-black text-heading">
            Everything You Need
            <span className="block text-primary">To Manage Your Gym</span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-body leading-8 text-text">
            Modern features designed to simplify daily gym operations and help
            you grow your fitness business with confidence.
          </p>
        </motion.div>

        <div className="mt-20 grid-auto-fit">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              whileHover={{
                y: -8,
              }}
              className="group card relative overflow-hidden p-8"
            >
              <div className="absolute right-0 top-0 h-36 w-36 rounded-full bg-primary/5 blur-3xl transition-all duration-500 group-hover:scale-150" />

              <div className="relative center h-16 w-16 rounded-card bg-primary text-3xl text-white shadow-button">
                {feature.icon}
              </div>

              <h3 className="mt-8 text-h3 font-bold text-heading">
                {feature.title}
              </h3>

              <p className="mt-5 leading-8 text-text">{feature.description}</p>

              <button className="mt-8 inline-flex items-center gap-3 font-semibold text-primary transition-all duration-300 group-hover:translate-x-2">
                Learn More
                <FaArrowRight />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}