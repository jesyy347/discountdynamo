const users = {}; // Temporary in-memory storage (Replace with a real database)

module.exports = {
    getUserById: async (userId) => {
        return users[userId] || null;
    },

    addCashback: async (userId, amount) => {
        if (!users[userId]) users[userId] = { walletBalance: 0 };
        users[userId].walletBalance += amount;
    },

    withdrawCashback: async (userId, amount, bankAccount) => {
        if (!users[userId] || users[userId].walletBalance < amount) {
            throw new Error("Insufficient balance");
        }
        users[userId].walletBalance -= amount;
        console.log(`Withdrawal of ₹${amount} to ${bankAccount} successful.`);
    }
};
