
const users = {
    "user123": { 
        walletBalance: 500, 
        name: "John Doe",
        email: "john@example.com",
        transactions: [
            { id: "tx1", type: "cashback", amount: 100, date: "2023-05-15", status: "completed" },
            { id: "tx2", type: "withdrawal", amount: 50, date: "2023-05-20", status: "completed" }
        ],
        bankAccounts: [
            { accountNumber: "1234567890", ifsc: "SBIN0001234", bankName: "State Bank of India" }
        ]
    }
}; // Temporary in-memory storage (Replace with a real database)

module.exports = {
    getUserById: async (userId) => {
        return users[userId] || null;
    },

    addCashback: async (userId, amount) => {
        if (!users[userId]) users[userId] = { walletBalance: 0, transactions: [] };
        users[userId].walletBalance += amount;
        
        // Record transaction
        const txId = `tx${Date.now()}`;
        users[userId].transactions = users[userId].transactions || [];
        users[userId].transactions.push({
            id: txId,
            type: "cashback",
            amount: amount,
            date: new Date().toISOString().split('T')[0],
            status: "completed"
        });
        
        return { success: true, balance: users[userId].walletBalance };
    },

    withdrawCashback: async (userId, amount, bankAccount) => {
        if (!users[userId] || users[userId].walletBalance < amount) {
            throw new Error("Insufficient balance");
        }
        
        users[userId].walletBalance -= amount;
        
        // Record transaction
        const txId = `tx${Date.now()}`;
        users[userId].transactions = users[userId].transactions || [];
        users[userId].transactions.push({
            id: txId,
            type: "withdrawal",
            amount: amount,
            date: new Date().toISOString().split('T')[0],
            bankAccount: bankAccount,
            status: "processing"
        });
        
        console.log(`Withdrawal of ₹${amount} to ${bankAccount} initiated. Processing will take 2-3 working days.`);
        return { success: true, transactionId: txId };
    },

    getUserTransactions: async (userId) => {
        if (!users[userId]) return [];
        return users[userId].transactions || [];
    },

    addBankAccount: async (userId, accountNumber, ifsc, bankName) => {
        if (!users[userId]) users[userId] = { walletBalance: 0, bankAccounts: [] };
        users[userId].bankAccounts = users[userId].bankAccounts || [];
        users[userId].bankAccounts.push({ accountNumber, ifsc, bankName });
        return { success: true };
    },

    getUserBankAccounts: async (userId) => {
        if (!users[userId]) return [];
        return users[userId].bankAccounts || [];
    },

    checkBankStatus: async (accountNumber) => {
        // This is a simulation. In a real app, you would verify with a bank API
        return { status: "active", verified: true };
    }
};
