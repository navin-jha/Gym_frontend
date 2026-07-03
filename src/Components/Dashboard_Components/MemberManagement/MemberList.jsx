import React, { useEffect, useState } from "react";
import api from "../../../services/axiosConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MemberList({ onEdit, refresh, searchName }) {

    const [members, setMembers] = useState([]);

    const fetchMembers = async () => {
        try {
            let res;
            if (searchName && searchName.trim() !== "") {
                res = await api.get(`/member/search?name=${searchName}`);
            } else {
                res = await api.get("/member/all");
                res.data = res.data.slice(0, 8); // limit first 8
            }
            setMembers(res.data);
        } catch (error) {
            toast.error("Error fetching members!");
            console.error(error);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, [refresh, searchName]);

    const deleteMember = async (id) => {
        try {
            await api.delete(`/member/delete/${id}`);
            toast.success("Member deleted successfully ✅");
            fetchMembers();
        } catch (err) {
            toast.error("Error deleting member!");
            console.error(err);
        }
    };

    const freezeMembership = async (id) => {
        try {
            await api.put(`/member/freeze/${id}`);
            toast.success("Membership frozen ✅");
            fetchMembers();
        } catch (err) {
            toast.error("Error freezing membership!");
            console.error(err);
        }
    };

    const renewMembership = async (id) => {
        try {
            await api.put(`/member/renew/${id}`);
            toast.success("Membership renewed ✅");
            fetchMembers();
        } catch (err) {
            toast.error("Error renewing membership!");
            console.error(err);
        }
    };

    return (
        <div className="mt-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                Members
            </h2>

            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full text-sm text-left text-gray-600">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                        <tr>
                            <th className="px-4 py-3"></th>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Phone</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map(member => (
                            <tr key={member.id} className="border-b hover:bg-gray-50">
                                <td className="px-4 py-3">
                                    <img
                                        src={
                                            member.profileImage
                                                ? `data:image/jpeg;base64,${member.profileImage}`
                                                : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                        }
                                        alt="member"
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                </td>
                                <td className="px-4 py-3 font-medium text-gray-900">{member.name}</td>
                                <td className="px-4 py-3 break-words">{member.email}</td>
                                <td className="px-4 py-3">{member.phone}</td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`px-2 py-1 rounded text-xs font-medium
                                            ${member.membershipStatus === "ACTIVE"
                                                ? "bg-green-100 text-green-700"
                                                : member.membershipStatus === "FROZEN"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-gray-100 text-gray-600"
                                            }`}
                                    >
                                        {member.membershipStatus || "ACTIVE"}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={() => onEdit(member)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteMember(member.id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                                        >
                                            Delete
                                        </button>
                                        <button
                                            onClick={() => freezeMembership(member.id)}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs"
                                        >
                                            Freeze
                                        </button>
                                        <button
                                            onClick={() => renewMembership(member.id)}
                                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
                                        >
                                            Renew
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ToastContainer position="top-right" />
        </div>
    );
}

export default MemberList;