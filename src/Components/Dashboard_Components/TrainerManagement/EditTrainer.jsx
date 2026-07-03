import React, { useState, useEffect } from "react";
import api from "../../../services/axiosConfig";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditTrainer({ trainer, onUpdate, onCancel }) {

    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        email: "",
        specialization: "",
        salary: ""
    });

    useEffect(() => {
        if (trainer) {
            setFormData(trainer);
        }
    }, [trainer]);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.put(
                `/trainer/update/${trainer.trainerId}`,
                formData
            );

            onUpdate();

        } catch (error) {

            console.error(error);

            toast.error("Failed to update trainer ❌");

        }

    };

    return (

        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">

            <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-3xl">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">

                    <h2 className="text-2xl font-semibold text-gray-700">
                        ✏️Edit Trainer
                    </h2>

                    <button
                        onClick={onCancel}
                        className="text-gray-500 hover:text-red-500 text-lg"
                    >
                        ✖
                    </button>

                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >

                    <input
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                    />

                    <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone"
                        className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                    />

                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                    />

                    <input
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleChange}
                        placeholder="Specialization"
                        className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                    />

                    <input
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        placeholder="Salary"
                        className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                    />

                    <div className="md:col-span-2 flex gap-3">

                        <button
                            type="submit"
                            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                        >
                            Update Trainer
                        </button>

                        <button
                            type="button"
                            onClick={onCancel}
                            className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500"
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );
}

export default EditTrainer;