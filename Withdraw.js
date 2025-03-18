
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const Withdraw = () => {
  const [amount, setAmount] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleWithdraw = async () => {
    if (!amount || !bankAccount || !ifsc) {
      toast.error("Please fill all fields");
      return;
    }

    if (parseFloat(amount) < 100) {
      toast.error("Minimum withdrawal amount is ₹100");
      return;
    }

    setIsProcessing(true);
    
    // This is a simulation, in a real app this would connect to a payment gateway
    try {
      // Simulate API call to backend
      console.log(`Processing withdrawal of ₹${amount} to account ${bankAccount}`);
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success message
      toast.success(`₹${amount} has been processed for withdrawal to your bank account. It will be credited within 2-3 working days.`);
      
      // Reset form
      setAmount("");
      setBankAccount("");
      setIfsc("");
    } catch (error) {
      toast.error("Withdrawal failed. Please try again later.");
      console.error("Withdrawal error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-5 text-gray-800 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Withdraw Cashback</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Amount (₹)</label>
          <input
            type="number"
            placeholder="Enter Amount (Min ₹100)"
            className="border p-2 rounded w-full"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Bank Account Number</label>
          <input
            type="text"
            placeholder="Enter Account Number"
            className="border p-2 rounded w-full"
            value={bankAccount}
            onChange={(e) => setBankAccount(e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">IFSC Code</label>
          <input
            type="text"
            placeholder="Enter IFSC Code"
            className="border p-2 rounded w-full"
            value={ifsc}
            onChange={(e) => setIfsc(e.target.value)}
          />
        </div>

        <button 
          onClick={handleWithdraw} 
          disabled={isProcessing}
          className={`bg-purple-700 text-white p-2 rounded w-full ${isProcessing ? 'opacity-70 cursor-not-allowed' : 'hover:bg-purple-800'}`}
        >
          {isProcessing ? 'Processing...' : 'Withdraw to Bank'}
        </button>
        
        <p className="text-xs text-gray-500 mt-2">
          Note: Withdrawals are processed within 2-3 working days. Minimum withdrawal amount is ₹100.
        </p>
      </div>
    </div>
  );
};

export default Withdraw;
