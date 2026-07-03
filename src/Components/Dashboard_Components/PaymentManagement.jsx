import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

const PaymentManagement = () => {
  const [members, setMembers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [payments, setPayments] = useState([]);
  const [searchName, setSearchName] = useState("");

  const handleEdit = (member) => {
    setSelectedMember(member);
  };
   const handleSuccess = () => {
     setSelectedMember(null);
     setShowAddModal(false);
     setRefresh((prev) => !prev);
   };
   
  const filteredPayments = payments.filter((payment) =>
    payment.member?.name
      ?.replace(/\s+/g, "")
      .toLowerCase()
      .includes(searchName.replace(/\s+/g, "").toLowerCase()),
  );

  const [formData, setFormData] = useState({
    memberId: "",
    planId: "",
    amountPaid: "",
    paymentMode: "Cash",
    paymentDate: "",
    dueDate: "",
    status: "Paid",
  });

  // 🔹 Fetch Data
  useEffect(() => {
    fetchMembers();
    fetchPlans();
    fetchPayments();
  }, []);

  const fetchMembers = async () => {
    const res = await axios.get("http://localhost:8080/member/all");
    setMembers(res.data);
  };

  const fetchPlans = async () => {
    const res = await axios.get("http://localhost:8080/plans");
    setPlans(res.data);
  };

  const fetchPayments = async () => {
    const res = await axios.get("http://localhost:8080/payment");
    setPayments(res.data);
  };

  // 🔹 Handle Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Auto-fill amount from selected plan
    if (name === "planId") {
      const selectedPlan = plans.find((p) => p.id == value);

      setFormData({
        ...formData,
        planId: value,
        amountPaid: selectedPlan ? selectedPlan.price : "",
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // 🔹 Submit Payment
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      member: { id: formData.memberId },
      plan: { id: formData.planId },
      amountPaid: formData.amountPaid,
      paymentMode: formData.paymentMode,
      paymentDate: formData.paymentDate,
      dueDate: formData.dueDate,
      status: formData.status,
    };

    try {
      await axios.post("http://localhost:8080/payment", payload);
      alert("Payment Saved ✅");

      fetchPayments();

      setFormData({
        memberId: "",
        planId: "",
        amountPaid: "",
        paymentMode: "Cash",
        paymentDate: "",
        dueDate: "",
        status: "Paid",
      });
    } catch (err) {
      console.error(err);
      alert("Error saving payment ❌");
    }
  };

  // 🔹 Generate Invoice PDF
  const generateInvoice = (payment) => {
    const doc = new jsPDF("p", "mm", "a4");

    // 🔷 Logo (TOP LEFT)
    if (typeof logo !== "undefined") {
      doc.addImage(logo, "PNG", 20, 10, 25, 20);
    }

    // 🔷 Header Title (CENTER)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("GYM INVOICE", 105, 20, { align: "center" });

    // 🔷 Right Side Info
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Invoice No: ${payment.invoiceNumber}`, 140, 30);
    doc.text(`Date: ${payment.paymentDate}`, 140, 36);

    // 🔷 Gym Info (LEFT)
    doc.setFont("helvetica", "bold");
    doc.text("Your Gym Name", 20, 40);

    doc.setFont("helvetica", "normal");
    doc.text("Address: Delhi, India", 20, 46);
    doc.text("Phone: 9876543210", 20, 52);

    // 🔷 Line
    doc.line(20, 60, 190, 60);

    // 🔷 Bill To
    doc.setFont("helvetica", "bold");
    doc.text("Bill To:", 20, 70);

    doc.setFont("helvetica", "normal");
    doc.text(`Member: ${payment.member?.name}`, 20, 78);
    doc.text(`Plan: ${payment.plan?.planName}`, 20, 84);

    // 🔷 Table Header
    doc.setFont("helvetica", "bold");
    doc.text("Description", 20, 100);
    doc.text("Amount", 150, 100);

    doc.line(20, 105, 190, 105);

    // 🔷 Table Data
    doc.setFont("helvetica", "normal");
    doc.text(`${payment.plan?.planName} Membership`, 20, 115);
    doc.text(`Rs. ${payment.amountPaid}`, 150, 115);

    // 🔷 Total Line
    doc.line(20, 125, 190, 125);

    doc.setFont("helvetica", "bold");
    doc.text("Total:", 130, 135);
    doc.text(`Rs. ${payment.amountPaid}`, 150, 135);

    // 🔷 Payment Info
    doc.setFont("helvetica", "normal");
    doc.text(`Payment Mode: ${payment.paymentMode}`, 20, 160);
    doc.text(`Status: ${payment.status}`, 20, 166);

    // 🔷 Footer
    doc.setFont("helvetica", "italic");
    doc.text("Thank you for choosing our gym!", 105, 280, { align: "center" });

    // 🔷 Save
    doc.save(`Invoice_${payment.invoiceNumber}.pdf`);
  };

  return (
    <div className="space-y-8">
      {/* ================= HEADER ================= */}

      <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white p-6 md:p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <p className="uppercase tracking-[3px] text-blue-100 text-sm">
              Gym ERP
            </p>

            <h1 className="text-3xl md:text-5xl font-black mt-2">
              Payment Management
            </h1>

            <p className="text-blue-100 mt-3 max-w-2xl">
              Manage member payments, invoices and payment history from one
              place.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl px-8 py-6">
            <p className="text-blue-100">Today's Collection</p>

            <h2 className="text-5xl font-black mt-2">₹18K</h2>

            <p className="mt-2 text-blue-100">+12% from yesterday</p>
          </div>
        </div>
      </div>

      {/* ================= SUMMARY ================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all p-6">
          <p className="text-gray-500">Total Payments</p>

          <h2 className="text-4xl font-black mt-3">{payments.length}</h2>

          <p className="text-green-600 font-semibold mt-3">
            Completed Payments
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all p-6">
          <p className="text-gray-500">Paid</p>

          <h2 className="text-4xl font-black mt-3 text-green-600">
            {payments.filter((p) => p.status === "Paid").length}
          </h2>
        </div>

        <div className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all p-6">
          <p className="text-gray-500">Pending</p>

          <h2 className="text-4xl font-black mt-3 text-red-500">
            {payments.filter((p) => p.status === "Pending").length}
          </h2>
        </div>

        <div className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all p-6">
          <p className="text-gray-500">Revenue</p>

          <h2 className="text-4xl font-black mt-3 text-blue-600">
            ₹{payments.reduce((sum, p) => sum + Number(p.amountPaid || 0), 0)}
          </h2>
        </div>
      </div>

      {/* ================= PAYMENT FORM ================= */}

      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
        <div className="border-b px-8 py-6">
          <h2 className="text-2xl font-bold text-gray-800">New Payment</h2>

          <p className="text-gray-500 mt-2">
            Fill payment details to generate invoice.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Member */}

            <div>
              <label className="block text-sm font-semibold mb-2">Member</label>

              <select
                name="memberId"
                value={formData.memberId}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
              >
                <option value="">Select Member</option>

                {members.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Plan */}

            <div>
              <label className="block text-sm font-semibold mb-2">
                Membership Plan
              </label>

              <select
                name="planId"
                value={formData.planId}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
              >
                <option value="">Select Plan</option>

                {plans.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.planName}
                  </option>
                ))}
              </select>
            </div>

            {/* Amount */}

            <div>
              <label className="block text-sm font-semibold mb-2">Amount</label>

              <input
                type="number"
                name="amountPaid"
                value={formData.amountPaid}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
              />
            </div>
            {/* Payment Mode */}

            <div>
              <label className="block text-sm font-semibold mb-2">
                Payment Mode
              </label>

              <select
                name="paymentMode"
                value={formData.paymentMode}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
              >
                <option>Cash</option>
                <option>UPI</option>
                <option>Card</option>
              </select>
            </div>

            {/* Payment Date */}

            <div>
              <label className="block text-sm font-semibold mb-2">
                Payment Date
              </label>

              <input
                type="date"
                name="paymentDate"
                value={formData.paymentDate}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
              />
            </div>

            {/* Due Date */}

            <div>
              <label className="block text-sm font-semibold mb-2">
                Due Date
              </label>

              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
              />
            </div>

            {/* Status */}

            <div>
              <label className="block text-sm font-semibold mb-2">Status</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
              >
                <option>Paid</option>
                <option>Pending</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105"
            >
              💳 Save Payment
            </button>

            <button
              type="reset"
              onClick={() =>
                setFormData({
                  memberId: "",
                  planId: "",
                  amountPaid: "",
                  paymentMode: "Cash",
                  paymentDate: "",
                  dueDate: "",
                  status: "Paid",
                })
              }
              className="px-8 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      {/* ================= PAYMENT LIST ================= */}

      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
        {/* Header */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Payment History
            </h2>

            <p className="text-gray-500 mt-1">
              Manage invoices and payment records.
            </p>
          </div>

          <input
            type="text"
            placeholder="🔍 Search Member..."
            onChange={(e) => setSearchName(e.target.value)}
            className="w-full lg:w-80 rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
          />
        </div>

        {/* Desktop Table */}
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="text-left px-6 py-4">Member</th>

              <th className="text-left px-6 py-4">Plan</th>

              <th className="text-left px-6 py-4">Amount</th>

              <th className="text-left px-6 py-4">Mode</th>

              <th className="text-left px-6 py-4">Status</th>

              <th className="text-left px-6 py-4">Invoice</th>
            </tr>
          </thead>

          <tbody>
            {filteredPayments.length > 0 ? (
              filteredPayments.map((p) => (
                <tr
                  key={p.paymentId}
                  className="border-b hover:bg-blue-50 transition"
                >
                  <td className="px-6 py-5 font-semibold">{p.member?.name}</td>

                  <td className="px-6 py-5">{p.plan?.planName}</td>

                  <td className="px-6 py-5 font-bold text-green-600">
                    ₹{p.amountPaid}
                  </td>

                  <td className="px-6 py-5">{p.paymentMode}</td>

                  <td className="px-6 py-5">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold
                      ${
                        p.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <button
                      onClick={() => generateInvoice(p)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-12 text-gray-500">
                  No Payment Records Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE PAYMENT CARDS ================= */}

      <div className="lg:hidden p-4 space-y-4">
        {filteredPayments.length > 0 ? (
          filteredPayments.map((p) => (
            <div
              key={p.paymentId}
              className="bg-white border rounded-2xl shadow-sm p-5"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">{p.member?.name}</h3>

                  <p className="text-gray-500">{p.plan?.planName}</p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold
                  ${
                    p.status === "Paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {p.status}
                </span>
              </div>

              <div className="mt-5 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Amount</span>

                  <span className="font-bold text-green-600">
                    ₹{p.amountPaid}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Payment Mode</span>

                  <span>{p.paymentMode}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Payment Date</span>

                  <span>{p.paymentDate}</span>
                </div>
              </div>

              <button
                onClick={() => generateInvoice(p)}
                className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"
              >
                Download Invoice
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            No Payment Records Found
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentManagement;
