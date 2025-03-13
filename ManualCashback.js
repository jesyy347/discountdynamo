import React, { useState } from "react";

const ManualCashback = () => {
  const [amount, setAmount] = useState("");

  const handleCashback = () => {
    alert(`Cashback of ₹${amount} added!`);
  };

  return (
    <div className="p-5 text-gray-800">
      <h2 className="text-xl font-bold mb-4">Add Manual Cashback</h2>
      <input
        type="number"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 rounded"
      />
      <button onClick={handleCashback} className="ml-2 p-2 bg-purple-700 text-white rounded">
        Add Cashback
      </button>
    </div>
  );
};

export default ManualCashback;
