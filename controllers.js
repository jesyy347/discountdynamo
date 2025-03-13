const applyDiscount = (req, res) => {
    const { discountCode, amount } = req.body;
    if (!discountCode || !amount) {
        return res.status(400).json({ error: "Invalid request" });
    }
    const discountedAmount = amount * 0.90; // Example: 10% discount
    res.json({ success: true, discountedAmount });
};

const processCashback = (req, res) => {
    const { paymentConfirmed, amount } = req.body;
    if (!paymentConfirmed || !amount) {
        return res.status(400).json({ error: "Payment not confirmed" });
    }
    const cashback = amount * 0.05; // Example: 5% cashback
    res.json({ success: true, cashback });
};

const withdrawCashback = (req, res) => {
    const { bankAccount, amount } = req.body;
    if (!bankAccount || !amount) {
        return res.status(400).json({ error: "Invalid withdrawal request" });
    }
    res.json({ success: true, message: "Withdrawal successful" });
};

module.exports = { applyDiscount, processCashback, withdrawCashback };
