import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { jsPDF } from "jspdf";
import api from "../../../services/axiosConfig";
import "react-toastify/dist/ReactToastify.css";

function BillGenerater({ userData, selectedPlan }) {

    const [showBill, setShowBill] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [upiId, setUpiId] = useState("");
    const [cashAmount, setCashAmount] = useState("");

    const admissionFee = 1000;

    const memberId = userData?.id || sessionStorage.getItem("memberId");
    const memberName = userData?.name || sessionStorage.getItem("memberName");

    useEffect(() => {
        if (!memberId) {
            toast.error("Member ID not found. Please register first.");
            return;
        }

        if (selectedPlan) {
            setShowBill(true);
            resetPaymentFields();
        }
    }, [selectedPlan]);

    const resetPaymentFields = () => {
        setPaymentMethod("");
        setUpiId("");
        setCashAmount("");
    };

    const getTotal = () => {
        const planPrice = selectedPlan?.finalPrice || 0;
        const extras = selectedPlan?.extraCharges || 0;
        return planPrice + extras + admissionFee;
    };

    const savePlanToBackend = async () => {
        if (!memberId) return;

        try {
            await api.post(
                `/plans/member/${memberId}`,
                {
                    planName: selectedPlan?.planName,
                    price: selectedPlan?.finalPrice,
                    durationMonths: selectedPlan?.durationMonths,
                    trainerName: selectedPlan?.trainer?.fullName || null,
                    admissionFee: admissionFee,
                    totalAmount: getTotal(),
                    paymentMethod: paymentMethod.toUpperCase()
                }
            );
        } catch (error) {
            console.error(error);
            toast.error("Failed to save plan");
        }
    };

    const handlePayment = async () => {
        if (!paymentMethod) return toast.error("Select payment method");

        if (paymentMethod === "upi" && !upiId)
            return toast.error("Enter UPI ID");

        if (paymentMethod === "cash") {
            if (!cashAmount) return toast.error("Enter cash amount");
            if (Number(cashAmount) < getTotal())
                return toast.error("Insufficient cash");
        }

        toast.success("Payment Successful!");
        await savePlanToBackend();
        generateReceipt();

        setTimeout(() => {
            setShowBill(false);
            resetPaymentFields();
        }, 1500);
    };

    // ✅ FINAL FIXED RECEIPT
    const generateReceipt = () => {
        const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: [80, 220] });

        let y = 8;

        const receiptNo = "RCPT-" + Date.now();
        const date = new Date().toLocaleDateString();
        const time = new Date().toLocaleTimeString();

        // HEADER
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("GYM RECEIPT", 40, y, { align: "center" });

        y += 6;
        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        doc.text(`Date: ${date}`, 5, y);
        doc.text(`Time: ${time}`, 55, y);

        y += 5;
        doc.text(`Receipt No: ${receiptNo}`, 5, y);

        y += 4;
        doc.line(5, y, 75, y);

        // MEMBER
        y += 6;
        doc.setFont("helvetica", "bold");
        doc.text("Member Details", 5, y);

        y += 5;
        doc.setFont("helvetica", "normal");
        doc.text(`Name: ${memberName}`, 5, y);

        y += 4;
        doc.line(5, y, 75, y);

        // PLAN
        y += 6;
        doc.setFont("helvetica", "bold");
        doc.text("Plan Details", 5, y);

        y += 5;
        doc.setFont("helvetica", "normal");
        doc.text(`Plan: ${selectedPlan?.planName}`, 5, y);

        y += 5;
        doc.text(`Duration: ${selectedPlan?.durationMonths} Month`, 5, y);

        if (selectedPlan?.trainer) {
            y += 5;
            doc.text(`Trainer: ${selectedPlan.trainer.fullName}`, 5, y);
        }

        y += 4;
        doc.line(5, y, 75, y);

        // PAYMENT DETAILS
        y += 6;
        doc.setFont("helvetica", "bold");
        doc.text("Payment Details", 5, y);

        y += 5;
        doc.setFont("helvetica", "normal");
        doc.text(`Plan Price: Rs. ${selectedPlan?.finalPrice}`, 5, y);

        y += 5;
        doc.text(`Admission Fee: Rs. ${admissionFee}`, 5, y);

        y += 5;
        doc.setFont("helvetica", "bold");
        doc.text(`TOTAL: Rs. ${getTotal()}`, 5, y);

        y += 4;
        doc.line(5, y, 75, y);

        // PAYMENT MODE
        y += 6;
        doc.setFont("helvetica", "normal");
        doc.text(`Payment Mode: ${paymentMethod.toUpperCase()}`, 5, y);

        // ✅ CLEAN FOOTER (FIXED)
        y += 8;
        doc.line(10, y, 70, y);

        y += 6;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.text("Payment Successful", 40, y, { align: "center" });

        y += 6;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.text("Thank You! Visit Again", 40, y, { align: "center" });

        doc.save(`Receipt_${receiptNo}.pdf`);
    };

    if (!showBill) return null;

    return (
        <div>
            <ToastContainer />

            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">

                    <h3 className="text-xl font-semibold mb-4 text-center">
                        Bill Summary
                    </h3>

                    <p className="text-center">
                        Welcome <b>{memberName}</b>
                    </p>

                    <hr className="my-3" />

                    <p>Plan: {selectedPlan?.planName}</p>
                    <p>Duration: {selectedPlan?.durationMonths} Month</p>

                    {selectedPlan?.trainer && (
                        <p>Trainer: {selectedPlan.trainer.fullName} (+₹2000)</p>
                    )}

                    <p>Admission Fee: ₹{admissionFee}</p>
                    <p>Plan Fee: ₹{selectedPlan?.finalPrice}</p>

                    <h4 className="font-bold mt-2">
                        Total: ₹{getTotal()}
                    </h4>

                    <div className="flex flex-col gap-2 my-4">
                        <label>
                            <input
                                type="radio"
                                value="upi"
                                checked={paymentMethod === "upi"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            /> UPI
                        </label>

                        <label>
                            <input
                                type="radio"
                                value="cash"
                                checked={paymentMethod === "cash"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            /> Cash
                        </label>
                    </div>

                    {paymentMethod === "upi" && (
                        <input
                            type="text"
                            placeholder="Enter UPI ID"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            className="border p-2 rounded-lg w-full mb-3"
                        />
                    )}

                    {paymentMethod === "cash" && (
                        <input
                            type="number"
                            placeholder="Enter Cash"
                            value={cashAmount}
                            onChange={(e) => setCashAmount(e.target.value)}
                            className="border p-2 rounded-lg w-full mb-3"
                        />
                    )}

                    <button
                        onClick={handlePayment}
                        className="bg-blue-600 text-white py-2 rounded-lg w-full"
                    >
                        Pay Now
                    </button>

                    <button
                        onClick={() => setShowBill(false)}
                        className="mt-2 text-gray-500 w-full"
                    >
                        Cancel
                    </button>

                </div>
            </div>
        </div>
    );
}

export default BillGenerater;