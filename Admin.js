const express = require("express");
const router = express.Router();
const db = require("./db");

// Get all users
router.get("/users", async (req, res) => {
    try {
        const users = await db.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
});

// Modify a user's cashback balance
router.post("/update-cashback", async (req, res) => {
    try {
        const { userId, amount } = req.body;
        if (!userId || amount === undefined) {
            return res.status(400).json({ message: "Invalid request" });
        }

        await db.updateUserCashback(userId, amount);
        res.json({ message: "Cashback updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating cashback", error });
    }
});

// Delete a discount coupon
router.delete("/delete-discount/:discountId", async (req, res) => {
    try {
        const { discountId } = req.params;

        await db.deleteDiscount(discountId);
        res.json({ message: "Discount deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting discount", error });
    }
});

module.exports = router;
