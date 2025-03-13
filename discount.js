const express = require("express");
const router = express.Router();
const db = require("./db");

// Create a new discount coupon
router.post("/create", async (req, res) => {
    try {
        const { discountName, percentage } = req.body;

        if (!discountName || !percentage) {
            return res.status(400).json({ message: "Invalid request" });
        }

        await db.createDiscount(discountName, percentage);
        res.json({ message: "Discount created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error creating discount", error });
    }
});

// Fetch all discount coupons
router.get("/all", async (req, res) => {
    try {
        const discounts = await db.getAllDiscounts();
        res.json(discounts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching discounts", error });
    }
});

// Apply a discount to a purchase
router.post("/apply", async (req, res) => {
    try {
        const { userId, discountId, purchaseAmount } = req.body;

        const discount = await db.getDiscountById(discountId);
        if (!discount) return res.status(404).json({ message: "Discount not found" });

        const discountAmount = (purchaseAmount * discount.percentage) / 100;
        const finalPrice = purchaseAmount - discountAmount;

        res.json({ message: "Discount applied", finalPrice, discountAmount });
    } catch (error) {
        res.status(500).json({ message: "Error applying discount", error });
    }
});

module.exports = router;
