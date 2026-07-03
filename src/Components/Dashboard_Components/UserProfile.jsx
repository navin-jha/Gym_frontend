import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import api from "../../services/axiosConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const weightData = [
  { month: "Jan", weight: 78 },
  { month: "Feb", weight: 76 },
  { month: "Mar", weight: 74 },
  { month: "Apr", weight: 73 },
  { month: "May", weight: 71 },
];

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      toast.error("🔐 Please login again");
      return;
    }

    // Fetch user info
    api.get("/admin/overview", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setUser(res.data))
      .catch((error) => {
        if (error.response?.status === 401) toast.error("🔐 Session expired");
        else toast.error("❌ Failed to load user data");
      });

    // Fetch profile image
    api.get("/admin/profile-image", {
      headers: { Authorization: `Bearer ${token}` },
      responseType: "blob",
    })
      .then((res) => setProfileImage(URL.createObjectURL(res.data)))
      .catch((error) => {
        if (error.response?.status === 404) toast.info("👤 No profile image found");
        else if (error.response?.status === 401) toast.error("🔐 Session expired");
        else toast.error("❌ Error loading profile image");
      });
  }, [token]);

  // Image select
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("❌ Only JPG, JPEG or PNG images are allowed.");
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.warning("⚠️ Image too large! Please upload image under 5MB.");
      return;
    }

    setSelectedImage(file);
    setProfileImage(URL.createObjectURL(file));
    toast.success("✅ Image selected. Click Upload Photo.");
  };

  // Upload image
  const handleUpload = async () => {
    if (!selectedImage) {
      toast.warning("⚠️ Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", selectedImage);

    try {
      await api.post("/admin/upload-profile", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("🚀 Profile photo uploaded successfully");
      setSelectedImage(null);
    } catch (err) {
      if (err.response?.status === 413) toast.error("❌ Image too large. Maximum allowed 5MB");
      else if (err.response?.status === 401) toast.error("🔐 Unauthorized. Please login again");
      else toast.error("❌ Upload failed");
    }
  };

  if (!user) return <div className="p-6">Loading...</div>;

  const daysRemaining = 120;

  return (
    <div className="min-h-screen p-6">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-6xl mx-auto space-y-6">

        {/* Profile Header */}
        <div className="bg-white shadow-md rounded-xl p-6 flex items-center justify-between">
          <div className="flex items-center space-x-6">

            {/* Profile Image Section */}
            <div className="flex flex-col items-center">
              <label
                className={`cursor-pointer flex flex-col items-center
                  ${selectedImage ? "ring-4 ring-blue-400 ring-offset-2" : "opacity-80 hover:opacity-100"} 
                  transition`}
              >
                <img
                  src={profileImage || "https://i.pravatar.cc/150?img=3"}
                  alt="profile"
                  className={`w-24 h-24 rounded-full object-cover border-4 
                    ${selectedImage ? "border-blue-500" : "border-green-500"} 
                    transition-all`}
                />

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              <span className="text-xs text-gray-500 mt-2">
                Click image to change
              </span>

              <button
                onClick={handleUpload}
                className="bg-blue-500 text-white px-3 py-1 rounded-md mt-3 hover:bg-blue-600"
              >
                Upload Photo
              </button>
            </div>

            {/* User Info */}
            <div>
              <h2 className="text-2xl font-bold">{user.name || "User"}</h2>
              <p className="text-gray-500">{user.email || "-"}</p>
              <span className="inline-block mt-2 px-3 py-1 text-sm rounded-full bg-green-100 text-green-600">
                Active
              </span>
            </div>
          </div>

          <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg">
            Edit Profile
          </button>
        </div>

        {/* Membership */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Membership Details</h3>
          <p><strong>Plan:</strong> {user.plan || "Not Assigned"}</p>
          <p><strong>Start Date:</strong> {user.startDate || "-"}</p>
          <p><strong>Expiry Date:</strong> {user.expiryDate || "-"}</p>
          <p><strong>Days Remaining:</strong> {daysRemaining}</p>
        </div>

        {/* Weight Chart */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Weight Progress</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weightData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="weight" stroke="#22c55e" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default UserProfile;
