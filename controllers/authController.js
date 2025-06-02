const User = require('../models/User');
const jwt = require('jsonwebtoken');


exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Basic validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { username: username.toLowerCase() }]
        });

        if (existingUser) {
            return res.status(409).json({ message: "User with email or username already exists" });
        }

        // Create new user
        const user = await User.create({
            username: username.toLowerCase(),
            email,
            password,
        });

        // Remove sensitive fields from the response
        const { password: _, refreshToken, ...userData } = user.toObject();

        return res.status(201).json({
            message: "User registered successfully",
            user: userData
        });

    } catch (err) {
        console.error("Signup error:", err.message);
        return res.status(500).json({ message: "Something went wrong", error: err.message });
    }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User Not Exists" });
        }

        // Validate password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid Password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // Remove sensitive fields
        const { password: _, ...userData } = user.toObject();

        // Send response
        res.status(200).json({
            message: "Login successful",
            token,
            user: userData
        });

    } catch (err) {
        console.error("Login error:", err.message);
        res.status(500).json({ message: "Login error", error: err.message });
    }
};
