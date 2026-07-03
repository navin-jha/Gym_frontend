// import React, { useState, useEffect } from "react";
// import BillGenerater from "./BillGenerator";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Plans() {
//     const [selectedPlan, setSelectedPlan] = useState(null);
//     const [selectedTrainer, setSelectedTrainer] = useState(null);
//     const [showBill, setShowBill] = useState(false);
//     const [finalPlan, setFinalPlan] = useState(null);
//     const [trainers, setTrainers] = useState([]);

//     const TRAINER_CHARGE = 2000;
//     const DIET_PLAN_CHARGE = 1500;

//     const userData = {
//         id: sessionStorage.getItem("memberId"),
//         name: sessionStorage.getItem("memberName")
//     };

//     const plans = [
//         { name: "Basic", price: 1000, durationMonths: 1, features: ["Gym Access", "Cardio Equipment"] },
//         { name: "Standard", price: 2700, durationMonths: 3, popular: true, features: ["Gym Access", "Cardio", "Locker Facility"] },
//         { name: "Premium", price: 5000, durationMonths: 6, features: ["Gym Access", "Cardio", "Locker", "Personal Trainer"] },
//         { name: "Elite", price: 9000, durationMonths: 12, features: ["Gym Access", "Cardio", "Locker", "Personal Trainer", "Diet Plan"] },
//     ];

//     useEffect(() => {
//         setTrainers([{ id: 1, name: "John Doe" }, { id: 2, name: "Jane Smith" }, { id: 3, name: "Mike Johnson" }]);
//     }, []);

//     const handlePlanSelect = (plan) => {
//         setSelectedPlan(plan);
//         setSelectedTrainer(null);
//         setShowBill(false);
//         setFinalPlan(null);
//     };

//     const handleGenerateBill = () => {
//         if (!selectedPlan) { toast.warning("Select a plan first"); return; }
//         let extraCharges = 0;
//         if (selectedTrainer) extraCharges += TRAINER_CHARGE;
//         if (selectedPlan.features.includes("Diet Plan")) extraCharges += DIET_PLAN_CHARGE;
//         setFinalPlan({ ...selectedPlan, trainer: selectedTrainer, extraCharges });
//         setShowBill(true);
//     };

//     const getTotal = () => finalPlan ? finalPlan.price + (finalPlan.extraCharges || 0) : 0;

//     return (
//         <div>
//             <ToastContainer position="top-right" autoClose={3000} />
//             <h1 className="text-3xl font-bold mb-6 text-center">Welcome {userData.name}</h1>
//             <div className="grid md:grid-cols-4 gap-6">
//                 {plans.map((plan, index) => (
//                     <div key={index} onClick={() => handlePlanSelect(plan)} className={`border rounded-xl p-6 cursor-pointer flex flex-col ${selectedPlan?.name === plan.name ? "border-blue-500 shadow-xl" : "hover:shadow-lg"}`}>
//                         {plan.popular && <div className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full w-fit mb-2">Most Popular</div>}
//                         <h2 className="text-xl font-bold">{plan.name}</h2>
//                         <p className="text-3xl font-bold mt-2">₹{plan.price}</p>
//                         <p className="text-gray-500 mb-4">{plan.durationMonths} Month</p>
//                         <ul className="space-y-2 mb-6">{plan.features.map((f, i) => <li key={i}>✔ {f}</li>)}</ul>
//                         <button className={`mt-auto py-2 rounded-lg w-full ${selectedPlan?.name === plan.name ? "bg-blue-600 text-white" : "bg-gray-200"}`}>{selectedPlan?.name === plan.name ? "Selected" : "Choose Plan"}</button>
//                     </div>
//                 ))}
//             </div>

//             <div className="mt-6">
//                 <h2 className="text-lg font-semibold mb-2">Select Personal Trainer:</h2>
//                 <select value={selectedTrainer?.id || ""} onChange={e => {
//                     const trainer = trainers.find(t => t.id === parseInt(e.target.value));
//                     setSelectedTrainer(trainer);
//                 }} className="border px-3 py-2 rounded-lg">
//                     <option value="">-- Select Trainer --</option>
//                     {trainers.map(t => <option key={t.id} value={t.id}>{t.name} (+₹{TRAINER_CHARGE})</option>)}
//                 </select>
//             </div>

//             {selectedPlan && <div className="mt-8 text-center">
//                 <h2>Selected Plan: {selectedPlan.name}</h2>
//                 <p>Plan Price: ₹{selectedPlan.price}</p>
//                 {selectedTrainer && <p>Trainer: {selectedTrainer.name} (+₹{TRAINER_CHARGE})</p>}
//                 {selectedPlan.features.includes("Diet Plan") && <p>Diet Plan: +₹{DIET_PLAN_CHARGE}</p>}
//                 <button onClick={handleGenerateBill} className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg">Generate Bill</button>
//             </div>}

//             {showBill && finalPlan && <BillGenerater userData={userData} selectedPlan={{ ...finalPlan, total: getTotal() }} />}
//         </div>
//     );
// }

// export default Plans;


import React, { useState, useEffect } from "react";
import BillGenerater from "./BillGenerator";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Plans() {
    const [plans, setPlans] = useState([]);
    const [trainers, setTrainers] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [selectedTrainer, setSelectedTrainer] = useState(null);
    const [showBill, setShowBill] = useState(false);
    const [finalPlan, setFinalPlan] = useState(null);

    const TRAINER_CHARGE = 2000;

    const userData = {
        id: sessionStorage.getItem("memberId"),
        name: sessionStorage.getItem("memberName")
    };

    // 🔥 FETCH DATA
    useEffect(() => {

        fetch("http://localhost:8080/plans")
            .then(res => res.json())
            .then(data => setPlans(data || []))
            .catch(() => toast.error("Failed to load plans"));

        fetch("http://localhost:8080/trainer/all")
            .then(res => res.json())
            .then(data => setTrainers(data || []))
            .catch(() => toast.error("Failed to load trainers"));

    }, []);

    // 🔥 SELECT PLAN
    const handlePlanSelect = (plan) => {
        setSelectedPlan(plan);
        setSelectedTrainer(null);
        setShowBill(false);
        setFinalPlan(null);
    };

    // 🔥 GENERATE BILL
    const handleGenerateBill = () => {
        if (!selectedPlan) {
            toast.warning("Select a plan first");
            return;
        }

        let extraCharges = 0;
        if (selectedTrainer) extraCharges += TRAINER_CHARGE;

        setFinalPlan({
            ...selectedPlan,
            trainer: selectedTrainer,
            extraCharges
        });

        setShowBill(true);
    };

    // 🔥 TOTAL
    const getTotal = () => {
        return finalPlan
            ? finalPlan.finalPrice + (finalPlan.extraCharges || 0)
            : 0;
    };

    return (
        <div className="p-6">
            <ToastContainer position="top-right" autoClose={3000} />

            <h1 className="text-3xl font-bold mb-6 text-center">
                Welcome {userData.name}
            </h1>

            {/* 🔥 PLANS */}
            <div className="grid md:grid-cols-4 gap-6">
                {plans?.map((plan, index) => (
                    <div
                        key={plan.id || index}
                        onClick={() => {
                            if (!plan.active) {
                                toast.warning("This plan is inactive");
                                return;
                            }
                            handlePlanSelect(plan);
                        }}
                        className={`border rounded-xl p-6 cursor-pointer flex flex-col ${selectedPlan?.id === plan.id
                                ? "border-blue-500 shadow-xl"
                                : "hover:shadow-lg"
                            } ${!plan.active ? "opacity-60 cursor-not-allowed" : ""}`}
                    >
                        <h2 className="text-xl font-bold">
                            {plan.planName}
                        </h2>

                        <div className="mt-3">
                            <p className="text-3xl font-bold text-green-600">
                                ₹{plan.finalPrice}
                            </p>

                            <p className="text-sm text-gray-400 line-through">
                                ₹{plan.price}
                            </p>

                            <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">
                                {plan.discount}% OFF
                            </span>
                        </div>

                        <p className="text-gray-500 mt-3">
                            {plan.durationMonths} Month
                        </p>

                        <span
                            className={`text-xs px-2 py-1 rounded mt-3 w-fit ${plan.active
                                    ? "bg-green-500 text-white"
                                    : "bg-gray-300"
                                }`}
                        >
                            {plan.active ? "Active" : "Inactive"}
                        </span>

                        <button
                            disabled={!plan.active}
                            className={`py-2 rounded-lg w-full mt-4 ${selectedPlan?.id === plan.id
                                    ? "bg-blue-600 text-white"
                                    : plan.active
                                        ? "bg-gray-200"
                                        : "bg-gray-300 cursor-not-allowed"
                                }`}
                        >
                            {plan.active
                                ? selectedPlan?.id === plan.id
                                    ? "Selected"
                                    : "Choose Plan"
                                : "Inactive"}
                        </button>
                    </div>
                ))}
            </div>

            {/* 🔥 TRAINER DROPDOWN */}
            <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">
                    Select Personal Trainer:
                </h2>

                <select
                    value={selectedTrainer?.trainerId || ""}
                    onChange={(e) => {
                        const trainer = trainers.find(
                            (t) =>
                                t.trainerId === parseInt(e.target.value)
                        );
                        setSelectedTrainer(trainer);
                    }}
                    className="border px-3 py-2 rounded-lg"
                >
                    <option value="">-- Select Trainer --</option>

                    {trainers.map((t, index) => (
                        <option
                            key={t.trainerId || index}
                            value={t.trainerId}
                        >
                            {t.fullName} (+₹{TRAINER_CHARGE})
                        </option>
                    ))}
                </select>
            </div>

            {/* 🔥 SUMMARY */}
            {selectedPlan && (
                <div className="mt-8 text-center">
                    <h2>
                        Selected Plan: {selectedPlan.planName}
                    </h2>

                    <p>
                        Plan Price: ₹{selectedPlan.finalPrice}
                    </p>

                    {selectedTrainer && (
                        <p>
                            Trainer: {selectedTrainer.fullName} (+₹
                            {TRAINER_CHARGE})
                        </p>
                    )}

                    <button
                        onClick={handleGenerateBill}
                        className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg"
                    >
                        Generate Bill
                    </button>
                </div>
            )}

            {/* 🔥 BILL */}
            {showBill && finalPlan && (
                <BillGenerater
                    userData={userData}
                    selectedPlan={{
                        ...finalPlan,
                        total: getTotal()
                    }}
                />
            )}
        </div>
    );
}

export default Plans;