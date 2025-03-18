
const express = require("express");
const router = express.Router();
const db = require("./db");

// Fetch wallet balance
router.get("/balance/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await db.getUserById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ balance: user.walletBalance });
    } catch (error) {
        res.status(500).json({ message: "Error fetching balance", error: error.message });
    }
});

// Add cashback to wallet
router.post("/add-cashback", async (req, res) => {
    try {
        const { userId, amount, source } = req.body;
        if (!userId || !amount) return res.status(400).json({ message: "Invalid request" });

        const result = await db.addCashback(userId, parseFloat(amount));
        res.json({ 
            message: "Cashback added successfully", 
            balance: result.balance,
            source: source || "purchase"
        });
    } catch (error) {
        res.status(500).json({ message: "Error adding cashback", error: error.message });
    }
});

// Withdraw money
router.post("/withdraw", async (req, res) => {
    try {
        const { userId, amount, bankAccount, ifsc } = req.body;
        if (!userId || !amount || !bankAccount || !ifsc) 
            return res.status(400).json({ message: "Invalid request" });

        const user = await db.getUserById(userId);
        if (!user || user.walletBalance < parseFloat(amount)) 
            return res.status(400).json({ message: "Insufficient balance" });

        const result = await db.withdrawCashback(userId, parseFloat(amount), bankAccount);
        res.json({ 
            message: "Withdrawal request processed successfully. Funds will be credited to your account in 2-3 working days.", 
            transactionId: result.transactionId 
        });
    } catch (error) {
        res.status(500).json({ message: "Error processing withdrawal", error: error.message });
    }
});

// Get transaction history
router.get("/transactions/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const transactions = await db.getUserTransactions(userId);
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: "Error fetching transactions", error: error.message });
    }
});

module.exports = router;
