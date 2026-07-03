import React, { useEffect, useState } from "react";
import api from "../../../services/axiosConfig";
import EditPlan from "./EditPlan";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PlanList() {

    const [plans, setPlans] = useState([]);
    const [editingPlan, setEditingPlan] = useState(null);

    const token = sessionStorage.getItem("token");

    useEffect(() => {
        fetchPlans();
    }, []);

    const fetchPlans = async () => {

        try {

            const res = await api.get("/plans", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setPlans(res.data);

        } catch (error) {

            console.error(error);
            toast.error("Failed to load plans");

        }

    };

    const deletePlan = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this plan?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/plans/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success("Plan deleted successfully");

            fetchPlans();

        } catch (error) {

            console.error(error);
            toast.error("Delete failed");

        }

    };

    return (

        <div className="bg-white p-6 rounded-xl shadow-md">

            <ToastContainer />

            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                Membership Plans
            </h2>

            {/* Edit Plan Form */}

            {editingPlan && (
                <EditPlan
                    planId={editingPlan}
                    onUpdate={() => {
                        fetchPlans();
                        setEditingPlan(null);
                    }}
                />
            )}

            <div className="overflow-x-auto">

                <table className="w-full border border-gray-200 rounded-lg">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="p-3 text-left">Plan</th>
                            <th className="p-3 text-left">Price</th>
                            <th className="p-3 text-left">Duration</th>
                            <th className="p-3 text-left">Trainer</th>
                            <th className="p-3 text-center">Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {plans.length === 0 ? (

                            <tr>
                                <td
                                    colSpan="5"
                                    className="text-center p-6 text-gray-500"
                                >
                                    No plans found
                                </td>
                            </tr>

                        ) : (

                            plans.map((plan) => (

                                <tr
                                    key={plan.id}
                                    className="border-t hover:bg-gray-50"
                                >

                                    <td className="p-3">{plan.planName}</td>

                                    <td className="p-3">
                                        ₹{plan.price}
                                    </td>

                                    <td className="p-3">
                                        {plan.durationMonths} Months
                                    </td>

                                    <td className="p-3">
                                        {plan.trainerName}
                                    </td>

                                    <td className="p-3 text-center space-x-2">

                                        <button
                                            onClick={() => setEditingPlan(plan.id)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => deletePlan(plan.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default PlanList;