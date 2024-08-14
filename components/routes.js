// src/components/routes.js
const express = require('express');
const router = express.Router();
const ProductModel = require('../models/Product');
const UserModel = require('../models/User'); // Import the User model
const { compressAndEncodeImage } = require('./handler');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

// Get all products
router.get("/products", async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.json(products);
    } catch (err) {
        res.json({ message: err });
    }
});

// Add a new product with image compression
router.post("/products", upload.single('image'), async (req, res) => {
    try {
        const { name, price, description } = req.body;
        const compressedImage = await compressAndEncodeImage(req.file.buffer);

        const newProduct = new ProductModel({
            name,
            image: compressedImage,
            price,
            description,
        });

        await newProduct.save();
        res.json(newProduct);
    } catch (err) {
        res.status(500).json({ message: "Failed to create product", error: err.message });
    }
});

// User registration endpoint
router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Create a new user
        const newUser = new UserModel({ username, password });
        await newUser.save();

        res.status(201).json({ message: "Registration successful!" });
    } catch (err) {
        res.status(500).json({ message: "Registration failed", error: err.message });
    }
});

// Simple authentication endpoint
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await UserModel.findOne({ username, password });
        if (user) {
            res.json({ message: "Login successful!" });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (err) {
        res.status(500).json({ message: "Login failed", error: err.message });
    }
});

module.exports = router;
