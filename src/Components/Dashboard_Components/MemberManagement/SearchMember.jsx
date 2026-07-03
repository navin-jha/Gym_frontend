import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Search } from "lucide-react";

function SearchMember({ onEdit, refresh }) {

    const [members, setMembers] = useState([]);
    const [searchName, setSearchName] = useState("");

    const fetchMembers = async () => {

        try {

            const res = await axios.get("http://localhost:8080/member/all");

            setMembers(res.data.slice(0, 5)); // dashboard pe top 5

        } catch (error) {

            toast.error("Failed to load members");

        }
    };

    useEffect(() => {

        fetchMembers();

    }, [refresh]);


    // Auto search when typing
    useEffect(() => {

        const delay = setTimeout(async () => {

            if (!searchName.trim()) {

                fetchMembers();
                return;

            }

            try {

                const res = await axios.get(
                    `http://localhost:8080/member/search?name=${searchName}`
                );

                setMembers(res.data);

            } catch (error) {

                toast.error("Search failed");

            }

        }, 400); // debounce

        return () => clearTimeout(delay);

    }, [searchName]);



    return (

        <div>

            {/* Search Box */}

            <div className="flex items-center gap-3 mb-4">

                <div className="relative w-full">

                    <Search
                        size={18}
                        className="absolute left-3 top-3 text-gray-400"
                    />

                    <input
                        type="text"
                        placeholder="Search member by name..."
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        className="border pl-10 pr-3 py-2 rounded-md w-full"
                    />

                </div>

            </div>


            {/* Member Table */}

            <table className="w-full border rounded-lg overflow-hidden">

                <thead className="bg-gray-100">

                    <tr>
                        <th className="p-3">Photo</th>
                        <th className="p-3">Name</th>
                        <th className="p-3">Phone</th>
                        <th className="p-3">Gender</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Action</th>
                    </tr>

                </thead>

                <tbody>

                    {members.map((member) => (

                        <tr
                            key={member.id}
                            className="text-center border-t hover:bg-gray-50"
                        >

                            {/* PHOTO */}

                            <td className="p-2 flex justify-center">

                                <img
                                    src={
                                        member.photo ||
                                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                    }
                                    alt="member"
                                    className="w-10 h-10 rounded-full"
                                />

                            </td>

                            <td className="p-2 font-medium">
                                {member.name}
                            </td>

                            <td className="p-2">
                                {member.phone}
                            </td>

                            <td className="p-2">
                                {member.gender}
                            </td>

                            <td className="p-2">

                                <span
                                    className={`px-2 py-1 rounded text-xs font-medium
                                    ${member.membershipStatus === "ACTIVE"
                                            ? "bg-green-100 text-green-700"
                                            : member.membershipStatus === "FROZEN"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-gray-200 text-gray-700"
                                        }`}
                                >
                                    {member.membershipStatus || "ACTIVE"}
                                </span>

                            </td>

                            <td className="p-2 flex justify-center gap-2">

                                <button
                                    onClick={() => onEdit(member)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                                >
                                    Edit
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );
}

export default SearchMember;