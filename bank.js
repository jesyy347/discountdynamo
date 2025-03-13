const express = require("express");
const router = express.Router();
const db = require("./db");

// Add a new bank account
router.post("/add", async (req, res) => {
    try {
        const { userId, accountNumber, ifsc, bankName } = req.body;

        if (!userId || !accountNumber || !ifsc || !bankName) {
            return res.status(400).json({ message: "Invalid request" });
        }

        await db.addBankAccount(userId, accountNumber, ifsc, bankName);
        res.json({ message: "Bank account added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error adding bank account", error });
    }
});

// Get all bank accounts of a user
router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const bankAccounts = await db.getUserBankAccounts(userId);

        res.json(bankAccounts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching bank accounts", error });
    }
});

// Check bank status before withdrawal
router.get("/status/:accountNumber", async (req, res) => {
    try {
        const { accountNumber } = req.params;
        const bankStatus = await db.checkBankStatus(accountNumber);

        res.json({ bankStatus });
    } catch (error) {
        res.status(500).json({ message: "Error checking bank status", error });
    }
});

module.exports = router;
