import React, { useEffect, useState } from "react";
import axios from "axios";
import EditTrainer from "./EditTrainer";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Swal from "sweetalert2";

function TrainerList({ searchQuery }) {

    const [trainers, setTrainers] = useState([]);
    const [editingTrainer, setEditingTrainer] = useState(null);

    useEffect(() => {
        fetchTrainers();
    }, []);

    const fetchTrainers = async () => {

        try {

            const res = await axios.get("http://localhost:8080/trainer/all");
            setTrainers(res.data);

        } catch (error) {

            console.error("Error fetching trainers", error);
            toast.error("Failed to fetch trainers ❌");

        }

    };

    const deleteTrainer = async (id, name) => {

        const result = await Swal.fire({
            title: "Delete Trainer?",
            text: `${name} will be permanently deleted.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#3b82f6",
            confirmButtonText: "Yes, Delete",
            cancelButtonText: "Cancel"
        });

        if (!result.isConfirmed) return;

        try {

            await axios.delete(`http://localhost:8080/trainer/delete/${id}`);

            toast.success("Trainer deleted successfully ✅");

            fetchTrainers();

        } catch (error) {

            console.error("Delete error", error);
            toast.error("Failed to delete trainer ❌");

        }

    };

    // 🔍 Search Filter
    const filteredTrainers = trainers.filter((trainer) =>
        trainer.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (

        <div className="bg-white shadow-lg rounded-xl p-6">

            <div className="overflow-x-auto">

                <table className="min-w-full border border-gray-200 rounded-lg">

                    <thead className="bg-gray-100">

                        <tr className="text-left text-gray-600">

                            <th className="p-3 border">Name</th>
                            <th className="p-3 border">Email</th>
                            <th className="p-3 border">Phone</th>
                            <th className="p-3 border">Specialization</th>
                            <th className="p-3 border">Salary</th>
                            <th className="p-3 border text-center">Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredTrainers.length === 0 ? (

                            <tr>
                                <td colSpan="6" className="text-center p-6 text-gray-500">
                                    No Trainers Found
                                </td>
                            </tr>

                        ) : (

                            filteredTrainers.map((trainer) => (

                                <tr
                                    key={trainer.trainerId}
                                    className="hover:bg-gray-50 transition"
                                >

                                    <td className="p-3 border">{trainer.fullName}</td>

                                    <td className="p-3 border">{trainer.email}</td>

                                    <td className="p-3 border">{trainer.phone}</td>

                                    <td className="p-3 border">{trainer.specialization}</td>

                                    <td className="p-3 border">₹ {trainer.salary}</td>

                                    <td className="p-3 border text-center space-x-2">

                                        <button
                                            onClick={() => setEditingTrainer(trainer)}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() =>
                                                deleteTrainer(
                                                    trainer.trainerId,
                                                    trainer.fullName
                                                )
                                            }
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

            {/* Edit Trainer Modal */}

            {editingTrainer && (

                <EditTrainer
                    trainer={editingTrainer}
                    onUpdate={() => {

                        setEditingTrainer(null);
                        fetchTrainers();

                        toast.success("Trainer updated successfully ✅");

                    }}
                    onCancel={() => setEditingTrainer(null)}
                />

            )}

            {/* Toast Notification */}

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="colored"
            />

        </div>

    );

}

export default TrainerList;