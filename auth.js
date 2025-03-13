const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("./db");

const SECRET_KEY = "your_secret_key"; // Change this to a secure key

// User Login
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (email === "jessykavi29@gmail.com" && password === "jessy@999") {
        const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "24h" });
        return res.json({ message: "Login successful", token });
    } else {
        return res.status(401).json({ message: "Invalid credentials" });
    }
});

// User Authentication Middleware
function authenticateToken(req, res, next) {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access Denied" });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid Token" });
        req.user = user;
        next();
    });
}

module.exports = router;
