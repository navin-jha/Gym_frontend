import React, { useState } from "react";
import api from "../../../services/axiosConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddPlan({ onClose, onSuccess }) {
    
  const [formData, setFormData] = useState({
    planName: "",
    price: "",
    discount: "",
    durationMonths: "",
    admissionFee: "",
    paymentMethod: "Cash",
    active: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleStatusChange = (value) => {
    setFormData({
      ...formData,
      active: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = sessionStorage.getItem("token");

      const payload = {
        ...formData,
        price: Number(formData.price),
        discount: Number(formData.discount || 0),
        durationMonths: Number(formData.durationMonths),
        admissionFee: Number(formData.admissionFee || 0),
        active: formData.active,
      };

      await api.post("/plans", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      toast.success("Plan Added Successfully!");

      setFormData({
        planName: "",
        price: "",
        discount: "",
        durationMonths: "",
        admissionFee: "",
        paymentMethod: "Cash",
        active: true,
      });

      if (onSuccess) {
        onSuccess();
      } else if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("ERROR:", error);
      toast.error(error.response?.data?.message || "Error adding plan");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 text-lg hover:text-gray-700"
        >
          ✖
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Add Membership Plan
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="planName"
            placeholder="Plan Name"
            value={formData.planName}
            onChange={handleChange}
            required
            className="border px-3 py-2 rounded-md"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
            className="border px-3 py-2 rounded-md"
          />

          <input
            type="number"
            name="discount"
            placeholder="Discount %"
            value={formData.discount}
            onChange={handleChange}
            className="border px-3 py-2 rounded-md"
          />

          <input
            type="number"
            name="durationMonths"
            placeholder="Duration (Months)"
            value={formData.durationMonths}
            onChange={handleChange}
            required
            className="border px-3 py-2 rounded-md"
          />

          <input
            type="number"
            name="admissionFee"
            placeholder="Admission Fee"
            value={formData.admissionFee}
            onChange={handleChange}
            className="border px-3 py-2 rounded-md"
          />

          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="border px-3 py-2 rounded-md"
          >
            <option value="Cash">Cash</option>
            <option value="UPI">UPI</option>
            <option value="Card">Card</option>
          </select>

          {/* 🔥 STATUS */}
          <div className="mt-2">
            <label className="block text-gray-700 font-medium mb-1">
              Status
            </label>

            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={formData.active === true}
                  onChange={() => handleStatusChange(true)}
                />
                Active
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={formData.active === false}
                  onChange={() => handleStatusChange(false)}
                />
                Inactive
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md mt-2"
          >
            Add Plan
          </button>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
}

export default AddPlan;