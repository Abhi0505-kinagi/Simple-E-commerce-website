const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart'); // <-- Use the Cart model
const auth = require('../middleware/auth');

router.use(express.json());

// Remove item from cart
router.post('/remove-item', auth, async (req, res) => {
    try {
        const { itemId, quantity } = req.body;

        let cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) return res.status(404).json({ msg: "Cart not found" });

        const itemIndex = cart.items.findIndex(item => item.itemId.toString() === itemId);

        if (itemIndex > -1) {
            if (cart.items[itemIndex].quantity > quantity) {
                // Reduce quantity
                cart.items[itemIndex].quantity -= quantity;
            } else {
                // Remove item completely
                cart.items.splice(itemIndex, 1);
            }
            await cart.save();
            res.json({ msg: "Item removed from cart successfully", cart });
        } else {
            res.status(404).json({ msg: "Item not found in cart" });
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
