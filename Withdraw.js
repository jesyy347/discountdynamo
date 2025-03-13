import React, { useState } from "react";

const Withdraw = () => {
  const [amount, setAmount] = useState("");

  const handleWithdraw = () => {
    alert(`₹${amount} has been withdrawn to your bank.`);
  };

  return (
    <div className="p-5 text-gray-800">
      <h2 className="text-xl font-bold mb-4">Withdraw Cashback</h2>
      <input
        type="number"
        placeholder="Enter Amount"
        className="border p-2 rounded w-full mb-3"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleWithdraw} className="bg-purple-700 text-white p-2 rounded w-full">
        Withdraw
      </button>
    </div>
  );
};

export default Withdraw;
