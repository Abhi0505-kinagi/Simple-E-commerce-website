const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart'); // <-- use the Cart model
const auth = require('../middleware/auth'); // <-- auth middleware
const Item = require('../models/Items'); // if needed

router.use(express.json());

// Add item to cart
router.post('/add-item', auth, async (req, res) => {
    const { itemId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ userId: req.user.id });

        if (!cart) {
            cart = new Cart({
                userId: req.user.id,
                items: [{ itemId, quantity }]
            });
        } else {
            const itemIndex = cart.items.findIndex(item => item.itemId.toString() === itemId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ itemId, quantity });
            }
        }

        await cart.save();
        res.json({ msg: "Item added to cart successfully", cart });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
