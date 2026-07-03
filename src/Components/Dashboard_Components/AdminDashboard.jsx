import React, { useEffect, useState } from "react";
import api from "../../services/axiosConfig";

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // ✅ 1. Load user only once
        const storedUserJSON = sessionStorage.getItem("user");
        if (!storedUserJSON) {
            setUser(null);
            setLoading(false);
            return;
        }

        const storedUser = JSON.parse(storedUserJSON);
        setUser(storedUser);

        // ✅ 2. Only fetch stats if ADMIN
        if (storedUser.role === "ADMIN" && storedUser.token) {
            api
                .get("/api/dashboard/stats", {
                    headers: { Authorization: `Bearer ${storedUser.token}` },
                })
                .then((res) => {
                    setStats(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Error fetching stats:", err);
                    setLoading(false);
                });
        } else {
            // User not admin
            setLoading(false);
        }
    }, []);

    // ✅ 3. Loading user state
    if (!user) return <p className="text-gray-500 text-lg">Loading user...</p>;

    // ✅ 4. Access check
    if (user.role !== "ADMIN") return <p className="text-red-500">Access Denied</p>;

    // ✅ 5. Stats still loading
    if (loading) return <p className="text-gray-500 text-lg">Loading stats...</p>;

    // ✅ 6. Render stats
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">
                Welcome, {stats.name}
            </h1>
            <p className="mb-6 text-gray-600">Email: {stats.email}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-blue-500 text-white rounded-lg p-4 shadow">
                    <h2 className="text-lg font-semibold">Total Members</h2>
                    <p className="text-3xl font-bold">{stats.totalMembers}</p>
                </div>

                <div className="bg-green-500 text-white rounded-lg p-4 shadow">
                    <h2 className="text-lg font-semibold">Active Members</h2>
                    <p className="text-3xl font-bold">{stats.activeMembers}</p>
                </div>

                <div className="bg-purple-500 text-white rounded-lg p-4 shadow">
                    <h2 className="text-lg font-semibold">Total Trainers</h2>
                    <p className="text-3xl font-bold">{stats.totalTrainers}</p>
                </div>

                <div className="bg-yellow-500 text-white rounded-lg p-4 shadow">
                    <h2 className="text-lg font-semibold">Total Staff</h2>
                    <p className="text-3xl font-bold">{stats.totalStaff}</p>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-2">Quick Actions</h2>
                <div className="flex gap-4">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Add Member
                    </button>
                    <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                        Add Trainer
                    </button>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                        Add Staff
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;