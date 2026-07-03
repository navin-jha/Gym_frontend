import React, { useState } from "react";
import axios from "axios";
import { Plus } from "lucide-react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddTrainer() {

    const [trainer, setTrainer] = useState({
        fullName: "",
        phone: "",
        email: "",
        specialization: "",
        salary: "",
        joiningDate: "",
        status: "ACTIVE",
        profilePhoto: ""
    });

    const [showForm, setShowForm] = useState(false);

    const handleChange = (e) => {

        setTrainer({
            ...trainer,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.post("http://localhost:8080/trainer/add", trainer);

            toast.success("Trainer added successfully ✅");

            setTrainer({
                fullName: "",
                phone: "",
                email: "",
                specialization: "",
                salary: "",
                joiningDate: "",
                status: "ACTIVE",
                profilePhoto: ""
            });

            setShowForm(false);

        } catch (error) {

            console.error(error);

            toast.error("Failed to add trainer ❌");

        }

    };

    return (

        <div>

            {/* Add Trainer Button */}
            <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
                <Plus className="w-5 h-5" />
                Add Trainer
            </button>


            {showForm && (

                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">

                    <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-3xl">

                        {/* Header */}
                        <div className="flex justify-between items-center mb-6">

                            <h2 className="text-2xl flex font-semibold text-gray-700">
                                🏋️ Add Trainer
                            </h2>

                            <button
                                onClick={() => setShowForm(false)}
                                className="text-gray-500 hover:text-red-500 text-lg"
                            >
                                ✖
                            </button>

                        </div>


                        <form
                            onSubmit={handleSubmit}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >

                            <input
                                name="fullName"
                                placeholder="Full Name"
                                value={trainer.fullName}
                                onChange={handleChange}
                                className="border p-2 rounded-lg"
                            />

                            <input
                                name="phone"
                                placeholder="Phone"
                                value={trainer.phone}
                                onChange={handleChange}
                                className="border p-2 rounded-lg"
                            />

                            <input
                                name="email"
                                placeholder="Email"
                                value={trainer.email}
                                onChange={handleChange}
                                className="border p-2 rounded-lg"
                            />

                            <input
                                name="specialization"
                                placeholder="Specialization"
                                value={trainer.specialization}
                                onChange={handleChange}
                                className="border p-2 rounded-lg"
                            />

                            <input
                                name="salary"
                                type="number"
                                placeholder="Salary"
                                value={trainer.salary}
                                onChange={handleChange}
                                className="border p-2 rounded-lg"
                            />

                            <input
                                name="joiningDate"
                                type="date"
                                value={trainer.joiningDate}
                                onChange={handleChange}
                                className="border p-2 rounded-lg"
                            />

                            <select
                                name="status"
                                value={trainer.status}
                                onChange={handleChange}
                                className="border p-2 rounded-lg"
                            >
                                <option value="ACTIVE">Active</option>
                                <option value="INACTIVE">Inactive</option>
                            </select>

                            <input
                                name="profilePhoto"
                                placeholder="Profile Photo URL"
                                value={trainer.profilePhoto}
                                onChange={handleChange}
                                className="border p-2 rounded-lg"
                            />

                            <div className="md:col-span-2">

                                <button
                                    type="submit"
                                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                                >
                                    Add Trainer
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>
    );
}

export default AddTrainer;