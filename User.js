const express = require("express");
const router = express.Router();
const db = require("./db");

// Get user details
router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await db.getUserById(userId);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user details", error });
    }
});

// Update user information
router.put("/update", async (req, res) => {
    try {
        const { userId, name, email } = req.body;

        if (!userId || !name || !email) {
            return res.status(400).json({ message: "Invalid request" });
        }

        await db.updateUser(userId, { name, email });
        res.json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
});

module.exports = router;
