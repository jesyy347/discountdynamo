const express = require("express");
const router = express.Router();
const db = require("./db");

// Middleware to check if purchase is real
async function verifyRealPurchase(req, res, next) {
    const { userId, purchaseAmount, transactionId, cashbackAmount } = req.body;

    if (!userId || !purchaseAmount || !transactionId || !cashbackAmount) {
        return res.status(400).json({ message: "Invalid request" });
    }

    // Check if transaction is real (Replace with actual verification logic)
    const realTransaction = await db.checkTransaction(transactionId);

    if (!realTransaction) {
        return res.status(400).json({ message: "Fake purchase detected, cashback not credited" });
    }

    req.cashbackAmount = cashbackAmount; // Use manually selected cashback
    next();
}

// Route to process payment and manually selected cashback
router.post("/process-payment", verifyRealPurchase, async (req, res) => {
    try {
        const { userId } = req.body;
        const cashbackAmount = req.cashbackAmount;

        await db.addCashback(userId, cashbackAmount);
        res.json({ message: `Real purchase verified, ₹${cashbackAmount} cashback credited` });
    } catch (error) {
        res.status(500).json({ message: "Error processing payment", error });
    }
});

module.exports = router;

