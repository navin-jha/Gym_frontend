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
      {/* Background */}

      <div className="absolute inset-0">
        <img src={backgroundImage} alt="Gym" className="img-cover opacity-15" />

        <div className="absolute inset-0 bg-secondary/90" />

        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/90 to-secondary/70" />
      </div>

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

          {/* RIGHT */}
          <motion.div
            initial={{
              opacity: 0,
              x: 50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="relative"
          >
            <div className="relative mx-auto max-w-xl">
              {/* Hero Image */}

              <img
                src={backgroundImage}
                alt="Gym Management"
                className="w-full rounded-card border border-white/10 object-cover shadow-2xl"
              />

              {/* Top Card */}

              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
                className="absolute -left-8 top-8 hidden lg:block"
              >
                <div className="rounded-card border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
                  <p className="text-small text-white/70">Active Members</p>

                  <h3 className="mt-2 text-h2 font-black text-white">
                    10,000+
                  </h3>
                </div>
              </motion.div>

              {/* Bottom Card */}

              <motion.div
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
                className="absolute -right-8 bottom-10 hidden lg:block"
              >
                <div className="rounded-card border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
                  <p className="text-small text-white/70">Customer Rating</p>

                  <h3 className="mt-2 text-h2 font-black text-white">
                    ⭐ 4.9/5
                  </h3>
                </div>
              </motion.div>

              {/* Center Card */}

              <motion.div
                animate={{
                  y: [0, -6, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="absolute bottom-6 left-6 hidden lg:block"
              >
                <div className="rounded-card border border-white/10 bg-secondary/80 px-6 py-4 backdrop-blur-xl">
                  <p className="text-small uppercase tracking-[2px] text-primary">
                    All In One
                  </p>

                  <h4 className="mt-1 font-bold text-white">
                    Gym ERP Solution
                  </h4>
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