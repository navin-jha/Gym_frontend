import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-secondary text-white">
      {/* Background */}

      <div className="absolute inset-0">
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="content relative z-10 py-20">
        <div className="grid gap-14 lg:grid-cols-3">
          {/* Company */}

          <div>
            <h2 className="text-h1 font-black text-white">
              GYM
              <span className="text-primary">PRO</span>
            </h2>

            <p className="mt-6 max-w-md leading-8 text-white/70">
              Powerful Gym Management Software designed to simplify memberships,
              attendance, trainers, billing, reports and complete business
              management from one platform.
            </p>

            <div className="mt-8 flex gap-4">
              {[
                <FaFacebookF />,
                <FaInstagram />,
                <FaTwitter />,
                <FaLinkedinIn />,
              ].map((icon, index) => (
                <button
                  key={index}
                  className="center h-12 w-12 rounded-card border border-white/10 bg-white/5 text-lg transition-all duration-300 hover:border-primary hover:bg-primary"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}

          <div>
            <h3 className="text-h3 font-bold text-white">
              Contact Information
            </h3>

            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="center h-12 w-12 rounded-card bg-primary text-white">
                  <FaPhoneAlt />
                </div>

                <div>
                  <p className="text-small text-white/50">Phone</p>

                  <p className="mt-1 text-white/80">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="center h-12 w-12 rounded-card bg-primary text-white">
                  <FaEnvelope />
                </div>

                <div>
                  <p className="text-small text-white/50">Email</p>

                  <p className="mt-1 text-white/80">support@gympro.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="center h-12 w-12 rounded-card bg-primary text-white">
                  <FaMapMarkerAlt />
                </div>

                <div>
                  <p className="text-small text-white/50">Address</p>

                  <p className="mt-1 text-white/80">New Delhi, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}

          <div>
            <h3 className="text-h3 font-bold text-white">Newsletter</h3>

            <p className="mt-6 leading-8 text-white/70">
              Subscribe to receive product updates, feature releases and fitness
              business tips.
            </p>

            <div className="mt-8">
              <input
                type="email"
                placeholder="Enter your email"
                className="input border-white/10 bg-white/5 text-white placeholder:text-white/40"
              />

              <button className="mt-5 flex w-full items-center justify-center gap-3 rounded-button bg-primary py-4 font-semibold text-white transition-all duration-300 hover:scale-[1.02]">
                Subscribe
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-small text-white/50">
            © 2026 Gym Pro. All Rights Reserved.
          </p>

          <div className="flex flex-wrap items-center gap-8">
            <button className="text-small text-white/60 transition hover:text-primary">
              Privacy Policy
            </button>

            <button className="text-small text-white/60 transition hover:text-primary">
              Terms & Conditions
            </button>

            <button className="text-small text-white/60 transition hover:text-primary">
              Help Center
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
