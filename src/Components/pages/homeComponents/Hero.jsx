import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaPlay,
  FaCheckCircle,
} from "react-icons/fa";

import backgroundImage from "../../../assets/backgroundImage.jpg";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen overflow-hidden bg-secondary">
      <div className="content relative z-10">
        <div className="grid min-h-screen items-center gap-20 pt-32 pb-20 lg:grid-cols-2">
          {/* LEFT */}

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            {/* Badge */}

            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-xl">
              <FaCheckCircle className="text-primary" />

              <span className="text-small font-semibold uppercase tracking-[2px] text-white">
                Complete Gym Management Solution
              </span>
            </div>

            {/* Heading */}

            <h1 className="mt-8 max-w-3xl text-hero font-black leading-tight text-white">
              Manage Your Gym
              <span className="mt-2 block text-primary">Faster. Smarter.</span>
              <span className="block">Better.</span>
            </h1>

            {/* Description */}

            <p className="mt-8 max-w-xl text-body leading-8 text-white/70">
              One platform to manage memberships, attendance, trainers, billing,
              reports and complete business operations without any hassle.
            </p>

            {/* CTA */}

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate("/register")}
                className="button-primary"
              >
                <span className="flex items-center gap-3">
                  Start Free Trial
                  <FaArrowRight />
                </span>
              </button>

              <button className="button-secondary border-white/15 bg-white/5 text-white backdrop-blur-xl hover:bg-white/10">
                <span className="flex items-center gap-3">
                  <FaPlay />
                  Watch Demo
                </span>
              </button>
            </div>

            {/* Quick Features */}

            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-primary" />

                <span className="text-white/80">Member Management</span>
              </div>

              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-primary" />

                <span className="text-white/80">Attendance Tracking</span>
              </div>

              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-primary" />

                <span className="text-white/80">Trainer Management</span>
              </div>

              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-primary" />

                <span className="text-white/80">Payment & Billing</span>
              </div>
            </div>
          </motion.div>

          {/* ================= RIGHT ================= */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative mx-auto w-full max-w-[560px]">
              {/* Image Card */}

              <div className="overflow-hidden rounded-[30px] border border-white/10 bg-white/5 p-3 shadow-[0_25px_80px_rgba(0,0,0,.45)] backdrop-blur-xl">
                <img
                  src={backgroundImage}
                  alt="Gym ERP"
                  className="h-[650px] w-full rounded-[22px] object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
              </div>

              {/* Floating Card */}

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
                className="absolute bottom-8 left-8 hidden lg:block"
              >
                <div className="rounded-2xl border border-white/10 bg-[#111827]/80 px-6 py-5 backdrop-blur-xl shadow-xl">
                  <p className="text-xs font-semibold uppercase tracking-[3px] text-primary">
                    Gym Pro ERP
                  </p>

                  <h3 className="mt-2 text-xl font-bold text-white">
                    All-In-One Dashboard
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Members • Attendance • Trainers • Payments
                  </p>
                </div>
              </motion.div>

              {/* Floating Badge */}

              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="absolute right-6 top-6 hidden lg:flex"
              >
                <div className="rounded-full border border-primary/30 bg-primary/15 px-5 py-3 backdrop-blur-xl">
                  <span className="font-semibold text-primary">
                    Trusted by 500+ Gyms
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Fade */}

      <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-secondary via-secondary/90 to-transparent" />

      {/* Trusted Companies */}

      <div className="absolute bottom-0 left-0 w-full border-t border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="content">
          <div className="flex flex-wrap items-center justify-center gap-10 py-6 opacity-70 lg:justify-between">
            <span className="text-small font-semibold uppercase tracking-[3px] text-white/60">
              Trusted By
            </span>

            <span className="text-body font-semibold text-white/70">
              Fitness Club
            </span>

            <span className="text-body font-semibold text-white/70">
              Power Gym
            </span>

            <span className="text-body font-semibold text-white/70">
              Elite Fitness
            </span>

            <span className="text-body font-semibold text-white/70">
              Muscle House
            </span>

            <span className="text-body font-semibold text-white/70">
              Iron Zone
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}