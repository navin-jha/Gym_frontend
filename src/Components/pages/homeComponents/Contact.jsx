import React, { useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { toast } from "react-hot-toast";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
} from "react-icons/fa";

export default function Contact() {
  const formRef = useRef(null);

  const sendEmail = async (e) => {
    e.preventDefault();

    try {
      await emailjs.sendForm(
        "service_j7sdppn",
        "template_7818yaq",
        formRef.current,
        "7aAbpS5-MnbAj1cBs",
      );

      toast.success("Message Sent Successfully 🎉");

      formRef.current.reset();
    } catch {
      toast.error("Failed To Send Message");
    }
  };

  const info = [
    {
      icon: <FaPhoneAlt />,
      title: "Call Us",
      value: "+91 9801540575",
    },
    {
      icon: <FaEnvelope />,
      title: "Email Address",
      value: "support@gympro.com",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Office Address",
      value: "New Delhi, India",
    },
    {
      icon: <FaClock />,
      title: "Working Hours",
      value: "Mon - Sat • 9:00 AM - 7:00 PM",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-secondary py-28">
      {/* Background */}

      <div className="absolute inset-0">
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
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
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-2 text-small font-semibold uppercase tracking-[3px] text-primary">
            CONTACT US
          </span>

          <h2 className="mt-6 text-h1 font-black text-white">
            Let's Build
            <span className="block text-primary">Your Fitness Business</span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-body leading-8 text-white/70">
            Have questions or need a demo? Our team is always ready to help you.
          </p>
        </motion.div>

        <div className="mt-20 grid items-start gap-10 lg:grid-cols-2">
          {/* Left */}

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
            className="space-y-5"
          >
            {info.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-5 rounded-card border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:border-primary"
              >
                <div className="center h-16 w-16 rounded-card bg-primary text-2xl text-white">
                  {item.icon}
                </div>

                <div>
                  <h3 className="text-h3 font-bold text-white">{item.title}</h3>

                  <p className="mt-2 leading-7 text-white/70">{item.value}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Right */}

          <motion.form
            ref={formRef}
            onSubmit={sendEmail}
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
              duration: 0.6,
            }}
            className="rounded-card border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="label text-white">Full Name</label>

                <input
                  type="text"
                  name="user_name"
                  placeholder="Enter your name"
                  required
                  className="input bg-white/5 border-white/10 text-white placeholder:text-white/40"
                />
              </div>

              <div>
                <label className="label text-white">Email Address</label>

                <input
                  type="email"
                  name="user_email"
                  placeholder="Enter your email"
                  required
                  className="input bg-white/5 border-white/10 text-white placeholder:text-white/40"
                />
              </div>
            </div>

            <div className="mt-5">
              <label className="label text-white">Subject</label>

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                className="input bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
            </div>

            <div className="mt-5">
              <label className="label text-white">Message</label>

              <textarea
                rows="6"
                name="message"
                required
                placeholder="Write your message..."
                className="textarea bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
            </div>

            <button
              type="submit"
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-button bg-primary py-4 font-semibold text-white transition-all duration-300 hover:scale-[1.02]"
            >
              Send Message
              <FaPaperPlane />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}