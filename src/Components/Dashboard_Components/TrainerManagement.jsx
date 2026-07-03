import React, { useState } from "react";
import AddTrainer from "./TrainerManagement/AddTrainer";
import TrainerList from "./TrainerManagement/TrainerList";

import { Search, Plus } from "lucide-react";

function TrainerManagement() {

    const [searchQuery, setSearchQuery] = useState("");

    return (

        <div className="h-full bg-gray-100 p-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">

                <div>

                    <h1 className="text-3xl font-bold text-gray-800">
                        Trainer Management
                    </h1>

                    <p className="text-gray-500">
                        Manage trainers, add new trainers and update details
                    </p>

                </div>

                {/* Add Trainer Button */}
                <AddTrainer />

            </div>


            {/* Search Bar */}
            <div className="bg-white shadow-md rounded-xl p-4 mb-6">

                <div className="relative w-full md:w-96">

                    <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />

                    <input
                        type="text"
                        placeholder="Search trainer by name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                    />

                </div>

            </div>


            {/* Trainer Table */}
            <div className="bg-white shadow-md rounded-xl p-5">

                <TrainerList searchQuery={searchQuery} />

            </div>

        </div>

    );

}

export default TrainerManagement;