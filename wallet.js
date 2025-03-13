const express = require("express");
const router = express.Router();
const db = require("./db"); // Assuming you have a database setup

// Fetch wallet balance
router.get("/balance/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await db.getUserById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ balance: user.walletBalance });
    } catch (error) {
        res.status(500).json({ message: "Error fetching balance", error });
    }
});

// Add cashback to wallet
router.post("/add-cashback", async (req, res) => {
    try {
        const { userId, amount } = req.body;
        if (!userId || !amount) return res.status(400).json({ message: "Invalid request" });

        await db.addCashback(userId, amount);
        res.json({ message: "Cashback added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error adding cashback", error });
    }
});

// Withdraw money
router.post("/withdraw", async (req, res) => {
    try {
        const { userId, amount, bankAccount } = req.body;
        if (!userId || !amount || !bankAccount) return res.status(400).json({ message: "Invalid request" });

        const user = await db.getUserById(userId);
        if (!user || user.walletBalance < amount) return res.status(400).json({ message: "Insufficient balance" });

        await db.withdrawCashback(userId, amount, bankAccount);
        res.json({ message: "Withdrawal successful" });
    } catch (error) {
        res.status(500).json({ message: "Error processing withdrawal", error });
    }
});

module.exports = router;
