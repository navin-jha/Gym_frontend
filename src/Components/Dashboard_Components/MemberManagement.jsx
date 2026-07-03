import React, { useState } from "react";
import AddMember from "./MemberManagement/AddMember";
import MemberList from "./MemberManagement/MemberList";
import EditMember from "./MemberManagement/EditMember";

function MemberManagement() {

    const [selectedMember, setSelectedMember] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [searchName, setSearchName] = useState("");

    const handleEdit = (member) => {
        setSelectedMember(member);
    };

    const handleSuccess = () => {
        setSelectedMember(null);
        setShowAddModal(false);
        setRefresh(prev => !prev);
    };

    return (
        <div className="p-6 bg-gray-50 h-full">

            {/* Header */}

            <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold text-gray-800">
                    👥 Member Management
                </h2>

                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    + Add Member
                </button>

            </div>

            {/* SEARCH */}

            <input
                type="text"
                placeholder="Search member by name..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="border p-2 rounded w-full mb-4"
            />

            {/* TABLE */}

            <MemberList
                onEdit={handleEdit}
                refresh={refresh}
                searchName={searchName}
            />

            {/* ADD MODAL */}

            {showAddModal && (

                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">

                    <div className="bg-white rounded-xl p-6 w-full max-w-xl relative">

                        <button
                            onClick={() => setShowAddModal(false)}
                            className="absolute top-3 right-3"
                        >
                            ✖
                        </button>

                        <AddMember onSuccess={handleSuccess} />

                    </div>

                </div>

            )}

            {/* EDIT MODAL */}

            {selectedMember && (

                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">

                    <div className="bg-white rounded-xl p-6 w-full max-w-xl relative">

                        <button
                            onClick={() => setSelectedMember(null)}
                            className="absolute top-3 right-3"
                        >
                            ✖
                        </button>

                        <EditMember
                            member={selectedMember}
                            onSuccess={handleSuccess}
                        />

                    </div>

                </div>

            )}

        </div>
    );
}

export default MemberManagement;