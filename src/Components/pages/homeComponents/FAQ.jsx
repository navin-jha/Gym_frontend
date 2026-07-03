import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqs = [
  {
    question: "Can I manage multiple gym branches?",
    answer:
      "Yes. Manage unlimited gym branches from one dashboard with separate members, reports and business insights.",
  },
  {
    question: "Can I track member attendance?",
    answer:
      "Yes. Record attendance daily and monitor complete attendance history with detailed reports.",
  },
  {
    question: "Does it support online payments?",
    answer:
      "Yes. Easily manage subscriptions, invoices, pending payments and recurring billing from one place.",
  },
  {
    question: "Can trainers access the system?",
    answer:
      "Yes. Trainers can manage members, schedules, workouts and attendance securely.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. Your data is protected using secure authentication, encrypted communication and regular backups.",
  },
  {
    question: "Does it work on mobile devices?",
    answer:
      "Yes. The entire Gym ERP is fully responsive and works perfectly on desktop, tablet and mobile.",
  },
];

export default function FAQ() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative overflow-hidden bg-surface py-28">
      {/* Background */}

      <div className="absolute inset-0">
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="content content-md relative z-10">
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
          className="text-center"
        >
          <span className="badge">FAQ</span>

          <h2 className="mt-6 text-h1 font-black text-heading">
            Frequently Asked
            <span className="block text-primary">Questions</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-body leading-8 text-text">
            Everything you need to know before choosing our Gym Management
            Software.
          </p>
        </motion.div>

        {/* FAQ */}

        <div className="mt-16 space-y-5">
          {faqs.map((faq, index) => {
            const open = active === index;

            return (
              <motion.div
                key={index}
                layout
                transition={{
                  duration: 0.25,
                }}
                className={`overflow-hidden rounded-card border transition-all duration-300
                ${
                  open
                    ? "border-primary bg-card shadow-card"
                    : "border-border bg-card"
                }`}
              >
                <button
                  onClick={() => setActive(open ? -1 : index)}
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <h3
                    className={`pr-6 text-lg font-bold transition-colors
                    ${open ? "text-primary" : "text-heading"}`}
                  >
                    {faq.question}
                  </h3>

                  <div
                    className={`center h-11 w-11 rounded-full transition-all duration-300
                    ${
                      open ? "bg-primary text-white" : "bg-surface text-heading"
                    }`}
                  >
                    {open ? <FaMinus /> : <FaPlus />}
                  </div>
                </button>

                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                    >
                      <div className="border-t border-border px-6 py-6">
                        <p className="leading-8 text-text">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}