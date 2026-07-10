import React, { useState, useEffect } from "react";
import api from "../../services/axiosConfig";
import { useRegister } from "../../hooks/useRegister";

import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { motion } from "framer-motion";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserShield,
  FaDumbbell,
  FaArrowRight,
} from "react-icons/fa";

function Register() {
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem("token");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const REGISTER_IMAGE =
    "https://res.cloudinary.com/dc62ucmsx/image/upload/v1783438893/loginImg_fwjmvr.png";

  useEffect(() => {
    if (isLoggedIn) {
      const role = sessionStorage.getItem("role");
      if (role === "ADMIN" || role === "STAFF" || role === "TRAINER")
        navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const registerMutation = useRegister();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword || !role) {
      toast.error("Please fill all fields!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    registerMutation.mutate(
      {
        name,
        email,
        password,
        role,
      },
      {
        onSuccess: (data) => {
          if (data.success) {
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("role", data.role);

            toast.success("Registration Successful!");

            setTimeout(() => {
              navigate("/dashboard");
            }, 1000);
          }
        },

        onError: (error) => {
          toast.error(error.response?.data?.message || "Something went wrong!");
        },
      },
    );
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} theme="dark" />

      <div className="relative min-h-screen overflow-hidden bg-secondary">
        {/* Background */}

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/20 blur-[140px]" />

          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-primary/10 blur-[120px]" />
        </div>

        <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8 lg:px-8">
          <div className="grid w-full max-w-7xl overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl shadow-modal lg:grid-cols-2">
            {/* ================= LEFT ================= */}

            <motion.div
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="hidden lg:block p-6"
            >
              <div className="relative h-full overflow-hidden rounded-[28px] shadow-2xl">
                {/* Image */}

                <img
                  src={REGISTER_IMAGE}
                  alt="Gym"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />

                {/* Overlay */}

                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-10 left-10 right-10">
                  {/* Bottom Feature */}

                  <div className="mt-8 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-md">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                      <FaDumbbell className="text-xl text-primary" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-white">
                        Premium Gym Management
                      </h3>

                      <p className="text-sm text-slate-300">
                        Simple • Secure • Fast
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ================= MOBILE IMAGE ================= */}

            <div className="relative h-64 lg:hidden">
              <img
                src={REGISTER_IMAGE}
                alt="Gym"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              <div className="absolute bottom-6 left-6">
                <h2 className="text-3xl font-black text-white">Gym Pro ERP</h2>

                <p className="mt-2 text-slate-300">Create Your Account</p>
              </div>
            </div>

            {/* ================= RIGHT ================= */}

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="flex items-center justify-center p-6 sm:p-10 lg:p-14"
            >
              <div className="w-full max-w-md">
                <div className="mb-8 flex justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-r from-primary to-primaryDark shadow-[0_12px_35px_rgba(37,99,235,.35)]">
                    <FaDumbbell className="text-4xl text-white" />
                  </div>
                </div>

                <div className="text-center">
                  <h2 className="text-4xl font-black text-white">
                    Create Account
                  </h2>

                  <p className="mt-3 text-slate-400">
                    Register to continue your fitness journey.
                  </p>
                </div>

                <div className="mt-10 rounded-[28px] border border-white/10 bg-white/10 p-7 backdrop-blur-xl">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* ================= NAME ================= */}

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-300">
                        Full Name
                      </label>

                      <div className="relative">
                        <FaUser className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" />

                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="John Doe"
                          className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-14 pr-5 text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-primary focus:bg-white/10 focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>

                    {/* ================= EMAIL ================= */}

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-300">
                        Email Address
                      </label>

                      <div className="relative">
                        <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" />

                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="example@gmail.com"
                          className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-14 pr-5 text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-primary focus:bg-white/10 focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>

                    {/* ================= PASSWORD ================= */}

                    <div className="grid gap-5 md:grid-cols-2">
                      {/* Password */}

                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-300">
                          Password
                        </label>

                        <div className="relative">
                          <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" />

                          <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="********"
                            className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-14 pr-14 text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-primary focus:bg-white/10 focus:ring-2 focus:ring-primary/20"
                          />

                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary"
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>

                      {/* Confirm Password */}

                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-300">
                          Confirm Password
                        </label>

                        <div className="relative">
                          <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" />

                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="********"
                            className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-14 pr-14 text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-primary focus:bg-white/10 focus:ring-2 focus:ring-primary/20"
                          />

                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary"
                          >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* ================= ROLE ================= */}

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-300">
                        Select Role
                      </label>

                      <div className="relative">
                        <FaUserShield className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" />

                        <select
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-14 pr-5 text-white outline-none transition-all duration-300 focus:border-primary focus:bg-white/10 focus:ring-2 focus:ring-primary/20"
                        >
                          <option className="bg-slate-900" value="">
                            Choose Role
                          </option>

                          <option className="bg-slate-900" value="ADMIN">
                            Admin
                          </option>

                          <option className="bg-slate-900" value="STAFF">
                            Staff
                          </option>

                          <option className="bg-slate-900" value="TRAINER">
                            Trainer
                          </option>
                        </select>
                      </div>
                    </div>

                    {/* ================= BUTTON ================= */}

                    <button
                      type="submit"
                      disabled={registerMutation.isPending}
                      className="mt-3 flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-primary to-primaryDark text-lg font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_15px_40px_rgba(37,99,235,.35)] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {registerMutation.isPending ? (
                        "Creating Account..."
                      ) : (
                        <>
                          Create Account
                          <FaArrowRight />
                        </>
                      )}
                    </button>

                    <p className="pt-3 text-center text-slate-400">
                      Already have an account?
                      <Link
                        to="/login"
                        className="ml-2 font-semibold text-primary hover:text-primaryDark"
                      >
                        Login
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
