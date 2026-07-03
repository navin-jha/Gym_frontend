import React from "react";
import { motion } from "framer-motion";
import {
  FaStar,
  FaQuoteLeft,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Owner • Power Gym",
    image: "https://i.pravatar.cc/150?img=12",
    review:
      "This software completely changed how we manage our gym. Attendance, memberships and payments are now effortless.",
  },
  {
    name: "Priya Mehta",
    role: "Founder • Fit Studio",
    image: "https://i.pravatar.cc/150?img=32",
    review: "The dashboard is beautiful, fast and very easy to use",
  },
  {
    name: "Amit Patel",
    role: "Manager • Fitness World",
    image: "https://i.pravatar.cc/150?img=45",
    review:
      "Implementation was seamless and the support team is incredibly helpful.",
  },
  {
    name: "Sneha Gupta",
    role: "Co-Founder • Health & Fitness",
    image: "https://i.pravatar.cc/150?img=67",
    review: "The automation features have saved us countless hours each week.",
  },
];

const Testimonials = () => {
  return (
    <section className="relative overflow-hidden bg-background py-28">
      {/* Background */}

      <div className="absolute inset-0">
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="content relative z-10">
        {/* Heading */}

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
          <span className="badge">TESTIMONIALS</span>

          <h2 className="mt-6 text-h1 font-black text-heading">
            Loved By
            <span className="block text-primary">Gym Owners</span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-body leading-8 text-text">
            Thousands of fitness businesses trust our platform to manage
            members, payments and daily operations.
          </p>
        </motion.div>

        {/* Cards */}

        <div className="mt-20 grid-auto-fit">
          {testimonials.map((item, index) => (
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
                delay: index * 0.12,
              }}
              whileHover={{
                y: -8,
              }}
              className="group card relative flex h-full flex-col overflow-hidden p-8"
            >
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-primary/5 blur-3xl transition-all duration-500 group-hover:scale-150" />

              <FaQuoteLeft className="relative text-5xl text-primary/20" />

              <p className="relative mt-6 flex-1 leading-8 text-text">
                {item.review}
              </p>

              <div className="relative mt-8 flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star} className="text-warning" />
                ))}
              </div>

              {/* User */}

              <div className="relative mt-auto flex items-center gap-4 pt-8 border-t border-border">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 rounded-full border-2 border-primary/20 object-cover"
                />

                <div>
                  <h4 className="font-bold text-heading">{item.name}</h4>

                  <p className="mt-1 text-small text-text">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Controls */}

        <div className="mt-16 flex-center gap-5">
          <button className="center h-14 w-14 rounded-full border border-border bg-card text-heading transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white">
            <FaChevronLeft />
          </button>

          <button className="center h-14 w-14 rounded-full bg-primary text-white shadow-button transition-all duration-300 hover:scale-105">
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};
export default Testimonials;
