import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/axiosConfig";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaDumbbell,
  FaUsers,
  FaChartLine,
  FaWallet,
} from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("userLoggedIn")) {
      const role = sessionStorage.getItem("role");

      if (role === "ADMIN" || role === "STAFF" || role === "Trainer") navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password!");

      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      if (res.data.success) {
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("email", res.data.email);
        sessionStorage.setItem("name", res.data.name);
        sessionStorage.setItem("userLoggedIn", "true");
        sessionStorage.setItem("role", res.data.role);

        toast.success("Login Successful");

        setTimeout(() => {
          if (
            res.data.role === "ADMIN" ||
            res.data.role === "STAFF" ||
            res.data.role === "TRAINER"
          ) {
            navigate("/dashboard");
          }
        }, 700);
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden pt-4 pb-4 bg-[#0F172A]">
      {/* Background */}

      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-orange-500/20 blur-[160px]" />

        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-red-500/20 blur-[160px]" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-orange-400/10 blur-[180px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto min-h-screen px-6 grid lg:grid-cols-2 items-center gap-20">
        {/* LEFT SIDE */}

        <motion.div
          initial={{
            opacity: 0,
            x: -80,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="hidden lg:block"
        >
          <span className="px-5 py-2 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-300">
            Premium Gym Management Software
          </span>

          <h1 className="text-6xl font-black text-white mt-8 leading-tight">
            Grow Your
            <span className="block text-orange-500">Fitness Business</span>
            Faster
          </h1>

          <p className="mt-8 text-gray-400 text-lg leading-8 max-w-xl">
            Manage members, trainers, attendance, subscriptions and payments
            from one beautiful dashboard.
          </p>

          {/* Floating Cards */}

          <div className="grid grid-cols-2 gap-6 mt-14">
            <motion.div
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
              className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 p-6"
            >
              <FaUsers className="text-4xl text-orange-400" />

              <h2 className="text-white text-4xl font-black mt-5">12K+</h2>

              <p className="text-gray-400 mt-2">Active Members</p>
            </motion.div>

            <motion.div
              animate={{
                y: [0, 15, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 5,
              }}
              className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 p-6"
            >
              <FaWallet className="text-4xl text-green-400" />

              <h2 className="text-white text-4xl font-black mt-5">₹4.8L</h2>

              <p className="text-gray-400 mt-2">Monthly Revenue</p>
            </motion.div>

            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
              className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 p-6"
            >
              <FaChartLine className="text-4xl text-cyan-400" />

              <h2 className="text-white text-4xl font-black mt-5">+28%</h2>

              <p className="text-gray-400 mt-2">Business Growth</p>
            </motion.div>

            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 6,
              }}
              className="rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 p-6"
            >
              <FaDumbbell className="text-4xl text-white" />

              <h2 className="text-white text-4xl font-black mt-5">250+</h2>

              <p className="text-orange-100 mt-2">Partner Gyms</p>
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT SIDE START */}

        <motion.div
          initial={{
            opacity: 0,
            x: 80,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="w-full max-w-xl mx-auto flex justify-center"
        >
          <div className="relative w-full rounded-[35px] overflow-hidden border border-white/10 bg-white/10 backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,.35)] p-10">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center shadow-2xl">
                <FaDumbbell className="text-white text-4xl" />
              </div>
            </div>

            <h2 className="text-4xl font-black text-center text-white">
              Welcome Back 👋
            </h2>

            <p className="text-center text-gray-400 mt-3 mb-10">
              Login to your Gym Management Dashboard
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}

              <div>
                <label className="text-gray-300 text-sm mb-2 block">
                  Email Address
                </label>

                <div className="relative">
                  <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-orange-400 text-lg" />

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-14 pr-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-orange-500 transition"
                  />
                </div>
              </div>

              {/* Password */}

              <div>
                <label className="text-gray-300 text-sm mb-2 block">
                  Password
                </label>

                <div className="relative">
                  <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-orange-400 text-lg" />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-14 pr-14 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-orange-500 transition"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-400"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Remember */}

              <div className="flex justify-between items-center">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="accent-orange-500" />

                  <span className="text-gray-400">Remember Me</span>
                </label>

                <Link
                  to="/forgot-password"
                  className="text-orange-400 hover:text-orange-300"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Login Button */}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg flex justify-center items-center gap-3 hover:scale-[1.02] transition duration-300 shadow-xl"
              >
                {loading ? (
                  <>
                    <div className="w-6 h-6 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                    Logging In...
                  </>
                ) : (
                  <>
                    Login To Dashboard
                    <FaArrowRight />
                  </>
                )}
              </button>

              {/* Register */}

              <p className="text-center text-gray-400 mt-8">
                Don't have an account?
                <Link
                  to="/register"
                  className="ml-2 text-orange-400 font-semibold hover:text-orange-300"
                >
                  Create Account
                </Link>
              </p>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Floating Decorative Elements */}

      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
        }}
        className="hidden lg:flex absolute top-20 right-20 w-24 h-24 rounded-3xl bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-xl border border-white/10"
      />

      <motion.div
        animate={{
          y: [0, 20, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
        }}
        className="hidden lg:flex absolute bottom-24 left-24 w-20 h-20 rounded-full bg-orange-500/20 blur-md"
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
        }}
        className="hidden lg:flex absolute top-1/2 right-12 w-6 h-6 rounded-full bg-orange-400"
      />

      {/* Toast */}

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </div>
  );
}
