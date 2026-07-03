import React, { useState } from "react";
import api from "../../../services/axiosConfig";
import { toast } from "react-toastify";

function EditMember({ member, onSuccess }) {

    const [formData, setFormData] = useState(member);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const updateMember = async () => {

        try {

            await api.put(
                `/member/update/${member.id}`,
                formData
            );

            toast.success("Member updated successfully ✅");

            onSuccess();

        } catch (error) {

            console.error(error);

            toast.error("Failed to update member ❌");

        }

    };

    return (

        <div className="max-w-xl w-full mx-auto bg-white shadow-lg rounded-xl p-4 sm:p-6">

            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                ✏️ Edit Member
            </h2>

            <div className="space-y-4">

                <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full border border-gray-300 rounded-md px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full border border-gray-300 rounded-md px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Address"
                    className="w-full border border-gray-300 rounded-md px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <button
                    onClick={updateMember}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 sm:py-3 rounded-md transition duration-200"
                >
                    Update Member
                </button>

            </div>

        </div>

    );

}

export default EditMember;