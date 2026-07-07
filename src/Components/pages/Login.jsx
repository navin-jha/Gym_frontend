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
  FaWallet,
  FaChartLine,
} from "react-icons/fa";

const LOGIN_IMAGE =
  "https://res.cloudinary.com/dc62ucmsx/image/upload/v1783438893/loginImg_fwjmvr.png";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("userLoggedIn")) {
      const role = sessionStorage.getItem("role");

      if (role === "ADMIN" || role === "STAFF" || role === "TRAINER") {
        navigate("/dashboard");
      }
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
        sessionStorage.setItem("role", res.data.role);
        sessionStorage.setItem("userLoggedIn", "true");

        toast.success("Login Successful");

        setTimeout(() => {
          navigate("/dashboard");
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
   <div className="relative min-h-screen overflow-hidden bg-[#0B1220]">
     {/* Premium Background */}

     <div className="absolute inset-0">
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.14),transparent_35%)]" />

       <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(37,99,235,0.10),transparent_40%)]" />

       <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(2,6,23,.35))]" />
     </div>

     <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-8">
       <div className="grid w-full max-w-7xl overflow-hidden rounded-[32px] border border-white/5 bg-[#111827]/70 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,.45)] lg:grid-cols-2">
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
               src={LOGIN_IMAGE}
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
                     Fast • Secure • Reliable
                   </p>
                 </div>
               </div>
             </div>
           </div>
         </motion.div>

         {/* ================= MOBILE IMAGE ================= */}

         <div className="relative h-64 overflow-hidden lg:hidden">
           <img
             src={LOGIN_IMAGE}
             alt="Gym"
             className="h-full w-full object-cover"
           />

           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
         </div>

         {/* ================= RIGHT ================= */}

         {/* ================= MOBILE HERO ================= */}

         <div className="relative h-64 lg:hidden">
           <img
             src={LOGIN_IMAGE}
             alt="Gym"
             className="h-full w-full object-cover"
           />

           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

           <div className="absolute bottom-6 left-6">
             <h2 className="text-3xl font-black text-white">Gym Pro ERP</h2>

             <p className="mt-2 text-slate-200">Power Your Fitness Business</p>
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
             {/* Logo */}

             <div className="mb-8 flex justify-center">
               <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-r from-primary to-secondary  shadow-[0_18px_45px_rgba(37,99,235,0.45)] ">
                 <FaDumbbell className="text-4xl text-white" />
               </div>
             </div>

             {/* Heading */}

             <div className="text-center">
               <h2 className="text-4xl font-black text-white">
                 Welcome Back 👋
               </h2>

               <p className="mt-3 text-slate-400">
                 Sign in to access your dashboard.
               </p>
             </div>

             {/* Login Card */}

             <div className="mt-10 rounded-[28px] border border-white/10 bg-white/10 p-7 backdrop-blur-xl">
               <form onSubmit={handleSubmit} className="space-y-6">
                 {/* Email */}

                 <div>
                   <label className="mb-2 block text-sm font-medium text-slate-300">
                     Email Address
                   </label>

                   <div className="relative">
                     <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" />

                     <input
                       type="email"
                       placeholder="Enter your email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-14 pr-5 text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-primary  focus:bg-white/10"
                     />
                   </div>
                 </div>

                 {/* Password */}

                 <div>
                   <label className="mb-2 block text-sm font-medium text-slate-300">
                     Password
                   </label>

                   <div className="relative">
                     <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" />

                     <input
                       type={showPassword ? "text" : "password"}
                       placeholder="Enter password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-14 pr-14 text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-primary focus:bg-white/10"
                     />

                     <button
                       type="button"
                       onClick={() => setShowPassword(!showPassword)}
                       className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-primary/80"
                     >
                       {showPassword ? <FaEyeSlash /> : <FaEye />}
                     </button>
                   </div>
                 </div>

                 {/* Remember */}

                 <div className="flex items-center justify-between text-sm">
                   <label className="flex cursor-pointer items-center gap-3 text-slate-400">
                     <input type="checkbox" className="accent-primary" />
                     Remember Me
                   </label>

                   <Link
                     to="/forgot-password"
                     className="font-medium text-primary hover:text-primary/80"
                   >
                     Forgot Password?
                   </Link>
                 </div>

                 {/* Login */}

                 <button
                   type="submit"
                   disabled={loading}
                   className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-primary via-blue-500 to-primaryDark text-lg font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(37,99,235,0.45)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                 >
                   {loading ? (
                     <>
                       <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
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

                 <p className="pt-3 text-center text-slate-400">
                   Don't have an account?
                   <Link
                     to="/register"
                     className="ml-2 font-semibold text-primary hover:text-primary/80"
                   >
                     Create Account
                   </Link>
                 </p>
               </form>
             </div>
           </div>
         </motion.div>
       </div>
     </div>

     {/* Floating Elements */}

     <motion.div
       animate={{
         y: [0, -18, 0],
       }}
       transition={{
         repeat: Infinity,
         duration: 5,
       }}
       className="hidden lg:block absolute top-20 right-20 h-20 w-20 rounded-full bg-orange-500/10 blur-xl"
     />

     <motion.div
       animate={{
         y: [0, 18, 0],
       }}
       transition={{
         repeat: Infinity,
         duration: 6,
       }}
       className="hidden lg:block absolute bottom-24 left-16 h-24 w-24 rounded-full bg-red-500/10 blur-xl"
     />

     <motion.div
       animate={{
         scale: [1, 1.15, 1],
       }}
       transition={{
         repeat: Infinity,
         duration: 4,
       }}
       className="hidden lg:block absolute top-1/2 right-10 h-4 w-4 rounded-full bg-primary"
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
