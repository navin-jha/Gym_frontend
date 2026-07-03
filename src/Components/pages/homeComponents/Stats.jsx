import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { FaUsers, FaDumbbell, FaChartLine, FaAward } from "react-icons/fa";

const stats = [
  {
    icon: <FaUsers />,
    number: 10000,
    suffix: "+",
    title: "Active Members",
    description: "Trusted by thousands of fitness enthusiasts.",
  },
  {
    icon: <FaDumbbell />,
    number: 250,
    suffix: "+",
    title: "Gym Partners",
    description: "Gyms using our management platform.",
  },
  {
    icon: <FaChartLine />,
    number: 98,
    suffix: "%",
    title: "Retention Rate",
    description: "High customer satisfaction and loyalty.",
  },
  {
    icon: <FaAward />,
    number: 5,
    suffix: "+",
    title: "Years Experience",
    description: "Building reliable gym management software.",
  },
];

export default function Stats() {
  return (
    <section className="relative overflow-hidden bg-secondary pb-28 pt-10">
      {/* Top Divider */}

      <div className="absolute top-0 left-0 h-28 w-full bg-gradient-to-b from-secondary to-transparent" />

      {/* Background Glow */}

      <div className="absolute inset-0">
        <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute right-0 bottom-10 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="content relative z-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
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
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-small font-semibold uppercase tracking-[3px] text-primary">
            OUR ACHIEVEMENTS
          </span>

          <h2 className="mt-6 text-h1 font-black text-white">
            Trusted By
            <span className="block text-primary">Growing Fitness Brands</span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-body leading-8 text-white/70">
            Our Gym ERP helps fitness clubs automate operations, improve member
            experience and increase business growth from a single dashboard.
          </p>
        </motion.div>

        <div className="mt-20 grid-auto-fit">
          {stats.map((item, index) => (
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
                delay: index * 0.12,
              }}
              whileHover={{
                y: -8,
              }}
              className="group relative overflow-hidden rounded-card border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
            >
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/5 duration-500 group-hover:scale-150" />

              <div className="relative center h-16 w-16 rounded-card bg-primary text-3xl text-white shadow-button">
                {item.icon}
              </div>

              <h3 className="mt-8 text-hero font-black text-white">
                <CountUp end={item.number} duration={3} enableScrollSpy />

                {item.suffix}
              </h3>

              <h4 className="mt-4 text-h3 font-bold text-white">
                {item.title}
              </h4>

              <p className="mt-5 leading-8 text-white/70">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Divider */}

      <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-full bg-gradient-to-b from-transparent via-background/40 to-background" />
    </section>
  );
}
