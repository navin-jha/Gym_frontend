import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditPlan({ planId, onUpdate }) {

    const [plan, setPlan] = useState({
        planName: "",
        price: "",
        discount: "",
        durationMonths: "",
        admissionFee: "",
        paymentMethod: "",
        active: true
    });

    const token = sessionStorage.getItem("token");

    useEffect(() => {
        if (planId) {
            fetchPlan();
        }
    }, [planId]);

    // 🔥 FETCH PLAN
    const fetchPlan = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/plans/${planId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setPlan({
                ...response.data,
                active: response.data.active ?? true
            });

        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch plan");
        }
    };

    // 🔥 HANDLE CHANGE
    const handleChange = (e) => {
        const { name, value } = e.target;

        setPlan({
            ...plan,
            [name]: value
        });
    };

    // 🔥 ACTIVE RADIO
    const handleStatusChange = (value) => {
        setPlan({
            ...plan,
            active: value
        });
    };

    // 🔥 UPDATE PLAN
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                ...plan,
                price: Number(plan.price),
                discount: Number(plan.discount || 0),
                durationMonths: Number(plan.durationMonths),
                admissionFee: Number(plan.admissionFee || 0),
                active: plan.active
            };

            await axios.put(
                `http://localhost:8080/plans/${planId}`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            toast.success("Plan Updated Successfully");

            if (onUpdate) onUpdate();

        } catch (error) {
            console.error(error);
            toast.error("Update Failed");
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">

            <ToastContainer />

            <h3 className="text-xl font-semibold text-gray-700 mb-6">
                Edit Membership Plan
            </h3>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

                <input
                    type="text"
                    name="planName"
                    value={plan.planName}
                    onChange={handleChange}
                    placeholder="Plan Name"
                    className="border p-2 rounded-md"
                />

                <input
                    type="number"
                    name="price"
                    value={plan.price}
                    onChange={handleChange}
                    placeholder="Price"
                    className="border p-2 rounded-md"
                />

                <input
                    type="number"
                    name="discount"
                    value={plan.discount}
                    onChange={handleChange}
                    placeholder="Discount %"
                    className="border p-2 rounded-md"
                />

                <input
                    type="number"
                    name="durationMonths"
                    value={plan.durationMonths}
                    onChange={handleChange}
                    placeholder="Duration (Months)"
                    className="border p-2 rounded-md"
                />

                {/* ❌ TRAINER FIELD REMOVED */}

                <input
                    type="number"
                    name="admissionFee"
                    value={plan.admissionFee}
                    onChange={handleChange}
                    placeholder="Admission Fee"
                    className="border p-2 rounded-md"
                />

                <select
                    name="paymentMethod"
                    value={plan.paymentMethod}
                    onChange={handleChange}
                    className="border p-2 rounded-md col-span-2"
                >
                    <option value="">Select Payment Method</option>
                    <option value="Cash">Cash</option>
                    <option value="UPI">UPI</option>
                    <option value="Card">Card</option>
                </select>

                {/* 🔥 ACTIVE / INACTIVE */}
                <div className="col-span-2 mt-2">
                    <label className="block text-gray-700 font-medium mb-1">
                        Status
                    </label>

                    <div className="flex gap-6">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                checked={plan.active === true}
                                onChange={() => handleStatusChange(true)}
                            />
                            Active
                        </label>

                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                checked={plan.active === false}
                                onChange={() => handleStatusChange(false)}
                            />
                            Inactive
                        </label>
                    </div>
                </div>

                <button
                    type="submit"
                    className="col-span-2 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
                >
                    Update Plan
                </button>

            </form>
        </div>
    );
}

export default EditPlan;