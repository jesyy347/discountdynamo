const express = require("express");
const router = express.Router();
const db = require("./db");

// Record a new transaction
router.post("/record", async (req, res) => {
    try {
        const { userId, type, amount, details } = req.body;

        if (!userId || !type || !amount) {
            return res.status(400).json({ message: "Invalid request" });
        }

        await db.recordTransaction(userId, type, amount, details);
        res.json({ message: "Transaction recorded successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error recording transaction", error });
    }
});

// Fetch transaction history for a user
router.get("/history/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const transactions = await db.getTransactionHistory(userId);

        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: "Error fetching transactions", error });
    }
});

module.exports = router;
