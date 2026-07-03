import React, { useState, useEffect } from "react";
import api from "../../services/axiosConfig";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem("token");

  useEffect(() => {
    if (isLoggedIn) {
      const role = sessionStorage.getItem("role");
      if (role === "ADMIN") navigate("/dashboard");
      else if (role === "STAFF") navigate("/staff-dashboard");
      else if (role === "TRAINER") navigate("/trainer-dashboard");
    }
  }, [isLoggedIn, navigate]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword || !role) {
      toast.error("Please fill all fields!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      if (res.data.success) {
        toast.success("Registration Successful! Please login.");

        setTimeout(() => {
          navigate("/Dashboard");
        }, 1000);
      } else {
        toast.error(res.data.message || "User already exists!");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        p-16
        theme="light"
      />

      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-100 via-white to-indigo-50 flex items-center justify-center px-6 py-10">
        {/* Background Blur */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl"></div>
          <div className="absolute top-20 right-0 w-[420px] h-[420px] bg-violet-200/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/3 w-[350px] h-[350px] bg-pink-200/30 rounded-full blur-3xl"></div>
        </div>

        <div className="relative w-full max-w-6xl grid lg:grid-cols-2 rounded-[30px] overflow-hidden bg-white/80 backdrop-blur-xl shadow-[0_25px_70px_rgba(0,0,0,0.08)] border border-white">
          {/* Left Side */}

          <div className="hidden lg:flex flex-col justify-between p-14 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <div>
              <span className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-600 text-sm font-semibold">
                GYM MANAGEMENT SYSTEM
              </span>

              <h1 className="mt-10 text-5xl font-extrabold text-slate-800 leading-tight">
                Welcome
                <br />
                Back To
                <br />
                Success.
              </h1>

              <p className="mt-6 text-slate-500 leading-8 text-lg">
                Manage Members, Trainers, Attendance, Payments and Reports from
                one beautiful dashboard.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="rounded-2xl bg-white p-6 shadow-md border border-slate-100">
                <h2 className="text-3xl font-bold text-indigo-600">500+</h2>
                <p className="mt-2 text-slate-500">Active Members</p>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-md border border-slate-100">
                <h2 className="text-3xl font-bold text-indigo-600">24/7</h2>
                <p className="mt-2 text-slate-500">Cloud Access</p>
              </div>
            </div>
          </div>

          {/* Right */}

          <div className="bg-white p-10 sm:p-14">
            <div className="max-w-md mx-auto">
              <div className="text-center">
                <div className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-r from-indigo-500 to-sky-500 flex items-center justify-center text-white text-4xl shadow-lg">
                  🚀
                </div>

                <h2 className="mt-6 text-4xl font-bold text-slate-800">
                  Create Account
                </h2>

                <p className="mt-3 text-slate-500">
                  Register your account to continue.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 mt-10">
                <div>
                  <label className="text-sm font-medium text-slate-600">
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-5 py-3.5 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-600">
                    Email
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-5 py-3.5 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-600">
                      Password
                    </label>

                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="********"
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-5 py-3.5 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-600">
                      Confirm Password
                    </label>

                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="********"
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-5 py-3.5 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-600">
                    Select Role
                  </label>

                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-5 py-3.5 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                  >
                    <option value="">Choose Role</option>
                    <option value="ADMIN">Admin</option>
                    <option value="STAFF">Staff</option>
                    <option value="TRAINER">Trainer</option>
                  </select>
                </div>

                <button
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 text-white font-semibold text-lg transition hover:shadow-xl hover:scale-[1.01]"
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </form>

              <p className="mt-8 text-center text-slate-500">
                Already have an account?
                <Link
                  to="/login"
                  className="ml-2 text-indigo-600 font-semibold hover:underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
