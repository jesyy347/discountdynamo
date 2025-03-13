const express = require("express");
const router = express.Router();
const { processCashback, applyDiscount, withdrawCashback } = require("./controllers");

// Apply discount before purchase
router.post("/apply-discount", applyDiscount);

// Process real cashback after real payment confirmation
router.post("/process-cashback", processCashback);

// Withdraw cashback to a bank account
router.post("/withdraw", withdrawCashback);

module.exports = router;
