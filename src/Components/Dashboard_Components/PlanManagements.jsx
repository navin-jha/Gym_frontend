import React, { useEffect, useState } from "react";
import AddPlan from "./PlansManagement/AddPlan";
import EditPlan from "./PlansManagement/EditPlan";
import api from "../../services/axiosConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PlanManagements() {
    const [plans, setPlans] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingPlanId, setEditingPlanId] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [planToDelete, setPlanToDelete] = useState(null);

    useEffect(() => {
        fetchPlans();
    }, []);

    const fetchPlans = async () => {
        try {
            const res = await api.get("/plans");

            const fixedPlans = (res.data || []).map(plan => ({
                ...plan,
                active: plan.active === null ? false : plan.active
            }));

            setPlans(fixedPlans);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load plans");
        }
    };

    const toggleStatus = async (id, currentStatus) => {
        try {
            await api.put(`/plans/${id}/status`, {
                active: !currentStatus
            });

            setPlans(prev =>
                prev.map(p =>
                    p.id === id ? { ...p, active: !currentStatus } : p
                )
            );

            toast.success("Status Updated");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update status");
        }
    };

    const handleDeleteClick = (id) => {
        setPlanToDelete(id);
        setShowConfirm(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await api.delete(`/plans/${planToDelete}`);
            toast.success("Plan Deleted Successfully");
            fetchPlans();
        } catch (error) {
            console.error(error);
            toast.error("Delete Failed");
        } finally {
            setShowConfirm(false);
            setPlanToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setShowConfirm(false);
        setPlanToDelete(null);
    };

    const ConfirmModal = ({ message, onConfirm, onCancel }) => (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm relative">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                    Confirm Action
                </h2>
                <p className="mb-6 text-gray-600">{message}</p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );

    return (
      <div className="h-full bg-gray-100 p-6">
        <ToastContainer />

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Membership Plans
            </h2>
            <p className="text-gray-500">
              Manage plans, add new plans, and update details
            </p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Plan
          </button>
        </div>

        {/* Add Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
              <button
                className="absolute top-2 right-2 text-gray-500 text-lg hover:text-gray-700"
                onClick={() => setIsAddModalOpen(false)}
              >
                ✖
              </button>
              <AddPlan
                onClose={() => setIsAddModalOpen(false)}
                onSuccess={() => {
                  fetchPlans();
                  setIsAddModalOpen(false);
                }}
              />
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editingPlanId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
              <button
                className="absolute top-2 right-2 text-gray-500 text-lg hover:text-gray-700"
                onClick={() => setEditingPlanId(null)}
              >
                ✖
              </button>
              <EditPlan
                planId={editingPlanId}
                onUpdate={() => {
                  fetchPlans();
                  setEditingPlanId(null);
                }}
              />
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {showConfirm && (
          <ConfirmModal
            message="Are you sure you want to delete this plan?"
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        )}

        {/* Table */}
        <div className="bg-white shadow-md rounded-xl p-5 mt-4">
          <table className="w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Plan</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Discount</th>
                <th className="p-3 text-left">Duration</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {plans.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-6 text-gray-500">
                    No plans available
                  </td>
                </tr>
              ) : (
                plans.map((plan) => (
                  <tr key={plan.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{plan.planName}</td>
                    <td className="p-3">₹{plan.price}</td>
                    <td className="p-3">{plan.discount}%</td>
                    <td className="p-3">{plan.durationMonths} Months</td>

                    <td className="p-3 text-center">
                      <div
                        className={`px-3 py-1 rounded text-white ${
                          plan.active ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {plan.active ? "Active" : "Inactive"}
                      </div>
                    </td>

                    <td className="p-3 text-center space-x-2">
                      <button
                        onClick={() => setEditingPlanId(plan.id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(plan.id)}
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

export default PlanManagements;