import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/axiosConfig";

import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Camera,
  Calendar,
  Users,
} from "lucide-react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RegisterPage({ redirectPath = "/dashboard" }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    address: "",
    password: "",
    profileImage: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData({
      ...formData,
      profileImage: file,
    });

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.age ||
      !formData.gender ||
      !formData.address ||
      !formData.password
    ) {
      setError("Please fill all required fields.");
      return;
    }

    if (formData.age < 10 || formData.age > 80) {
      setError("Age must be between 10 and 80.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      const response = await api.post(
        "/member/register",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      const member = response.data;

      sessionStorage.setItem("memberId", member.id);
      sessionStorage.setItem("memberName", member.name);

      toast.success("Member Registered Successfully 🎉");

      setTimeout(() => {
        navigate(redirectPath, {
          state: {
            defaultActivePage: "plans",
          },
        });
      }, 1200);
    } catch (err) {
      console.error(err);

      toast.error(err.response?.data || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 py-8 px-4">
      <ToastContainer position="top-right" />

      <div className="max-w-5xl mx-auto">
        {/* ================= HEADER ================= */}

        <div className="rounded-3xl overflow-hidden shadow-xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700">
          <div className="px-8 py-10 text-white">
            <p className="uppercase tracking-[4px] text-blue-100 text-sm">
              Gym ERP
            </p>

            <h1 className="text-3xl md:text-5xl font-black mt-3">
              Register New Member
            </h1>

            <p className="mt-4 text-blue-100 max-w-2xl leading-7">
              Create a new gym member profile with complete personal
              information, contact details and profile photo.
            </p>
          </div>
        </div>

        {/* ================= FORM CARD ================= */}

        <div className="bg-white rounded-3xl shadow-xl mt-8 overflow-hidden">
          <div className="border-b px-8 py-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Member Information
            </h2>

            <p className="text-gray-500 mt-2">
              Fill all required information carefully.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            {/* PROFILE IMAGE */}

            <div className="flex justify-center mb-10">
              <label className="relative group cursor-pointer">
                <div className="w-40 h-40 rounded-full border-[3px] border-dashed border-blue-300 bg-blue-50 overflow-hidden shadow-lg">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <Camera size={40} className="text-blue-500" />

                      <span className="mt-3 text-sm text-gray-500">
                        Upload Photo
                      </span>
                    </div>
                  )}
                </div>

                <div className="absolute bottom-2 right-2 w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                  <Camera size={20} />
                </div>

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            {error && (
              <div className="mb-6 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* ================= FORM GRID START ================= */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* ================= FULL NAME ================= */}

              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Full Name
                </label>

                <div className="relative">
                  <User
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter Full Name"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-300 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                    required
                  />
                </div>
              </div>

              {/* ================= EMAIL ================= */}

              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Email"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-300 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                    required
                  />
                </div>
              </div>

              {/* ================= PHONE ================= */}

              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Phone Number
                </label>

                <div className="relative">
                  <Phone
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter Mobile Number"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-300 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                    required
                  />
                </div>
              </div>

              {/* ================= AGE ================= */}

              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Age
                </label>

                <div className="relative">
                  <Calendar
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Enter Age"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-300 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                    required
                  />
                </div>
              </div>

              {/* ================= GENDER ================= */}

              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Gender
                </label>

                <div className="relative">
                  <Users
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10"
                  />

                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full appearance-none pl-12 pr-4 py-4 rounded-2xl border border-gray-300 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                    required
                  >
                    <option value="">Select Gender</option>

                    <option value="Male">Male</option>

                    <option value="Female">Female</option>

                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* ================= PASSWORD ================= */}

              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create Password"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-300 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                    required
                  />
                </div>
              </div>

              {/* ================= ADDRESS ================= */}

              <div className="lg:col-span-2">
                <label className="block mb-2 font-semibold text-gray-700">
                  Address
                </label>

                <div className="relative">
                  <MapPin
                    size={20}
                    className="absolute left-4 top-5 text-gray-400"
                  />

                  <textarea
                    rows={4}
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter Complete Address"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-300 outline-none resize-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                    required
                  />
                </div>
              </div>
            </div>

            {/* ================= FOOTER ================= */}

            <div className="mt-10 border-t pt-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                {/* Left Side */}

                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    Ready to Register?
                  </h3>

                  <p className="text-gray-500 mt-2 leading-7">
                    Once the member is registered, they can immediately be
                    assigned a membership plan, trainer, attendance tracking,
                    and payment records within the Gym ERP system.
                  </p>
                </div>

                {/* Right Side */}

                <div className="flex flex-col sm:flex-row gap-4 lg:min-w-[340px]">
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        age: "",
                        gender: "",
                        address: "",
                        password: "",
                        profileImage: null,
                      });

                      setPreview(null);
                      setError("");
                    }}
                    className="flex-1 rounded-2xl border border-gray-300 bg-white py-4 font-semibold text-gray-700 hover:bg-gray-100 transition-all duration-300"
                  >
                    Reset Form
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-4 font-bold text-white shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-3">
                        <svg
                          className="animate-spin h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />

                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          />
                        </svg>
                        Registering...
                      </div>
                    ) : (
                      "Register Member"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;