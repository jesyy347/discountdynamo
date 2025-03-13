
const express = require("express");
const router = express.Router();
const db = require("./db");

// Manually mark a payment as done
router.post("/manual-payment", async (req, res) => {
    try {
        const { userId, purchaseAmount, cashbackAmount } = req.body;

        if (!userId || !purchaseAmount || !cashbackAmount) {
            return res.status(400).json({ message: "Invalid request" });
        }

        await db.addCashback(userId, cashbackAmount);
        res.json({ message: "Payment confirmed manually, cashback credited" });
    } catch (error) {
        res.status(500).json({ message: "Error processing manual payment", error });
    }
});

// Automatically detect payment and credit cashback
router.post("/auto-detect", async (req, res) => {
    try {
        const { userId, purchaseAmount, transactionId } = req.body;

        if (!userId || !purchaseAmount || !transactionId) {
            return res.status(400).json({ message: "Invalid request" });
        }

        // Simulate auto-detection (You can replace this with real API integration)
        const isPaymentVerified = true; // Assume payment is verified for now

        if (isPaymentVerified) {
            const cashbackAmount = purchaseAmount * 0.05; // Example: 5% cashback
            await db.addCashback(userId, cashbackAmount);
            res.json({ message: "Payment verified, cashback credited", cashbackAmount });
        } else {
            res.status(400).json({ message: "Payment verification failed" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error processing auto detection", error });
    }
});

module.exports = router;
