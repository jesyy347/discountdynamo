const express = require("express");
const router = express.Router();
const db = require("./db");

// Get analytics data
router.get("/", async (req, res) => {
    try {
        const totalUsers = await db.getTotalUsers();
        const totalCashback = await db.getTotalCashback();
        const totalWithdrawals = await db.getTotalWithdrawals();
        const totalTransactions = await db.getTotalTransactions();

        res.json({
            totalUsers,
            totalCashback,
            totalWithdrawals,
            totalTransactions
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching analytics", error });
    }
});

module.exports = router;
