// Get all items
const Item = require('../models/Items'); // Adjust path if needed
require('dotenv').config();
const user = process.env.admin;
const password = process.env.adminpassword;
const express = require('express');
const router = express.Router();
router.use(express.json());
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.post('/add-item', async (req, resp) => {
    const { admin, adminpassword, title, price, category, imageUrl } = req.body;
    if (admin !== user || adminpassword !== password) {
        return resp.status(403).json({ msg: "Unauthorized" });
    }
    try {
        const newItem = new Item({ title, price, category, imageUrl });
        await newItem.save();
        resp.json({ msg: "Item added successfully", item: newItem });
    } catch (err) {
        resp.status(500).json({ error: err.message });
    }
});

module.exports = router;