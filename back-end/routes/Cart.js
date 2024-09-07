const express = require('express');
const router = express.Router();

// Initialize an empty cart
let cart = [];

// Get all items in the cart
router.get('/', (req, res) => {
    res.json(cart);
});

// Add an item to the cart
router.post('/', (req, res) => {
    const { id, productName, quantity, price } = req.body;
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        // If item already exists in the cart, update the quantity
        existingItem.quantity += quantity;
    } else {
        // Add new item to the cart
        const newItem = { id, productName, quantity, price };
        cart.push(newItem);
    }
    res.json(cart);
});

// Update the quantity of an item in the cart
router.put('/:itemId', (req, res) => {
    const { itemId } = req.params;
    const { quantity } = req.body;

    const item = cart.find(item => item.id === parseInt(itemId));
    console.log(cart);

    if (item) {
        item.quantity = quantity;
        res.json(cart);
    } else {
        res.status(404).send('Item not found');
    }
});

// Remove an item from the cart
router.delete('/:itemId', (req, res) => {
    const { itemId } = req.params;
    cart = cart.filter(item => item.id !== parseInt(itemId));
    res.json(cart);
});

// Clear the cart
router.delete('/', (req, res) => {
    cart = [];
    res.json(cart);
});

module.exports = router;
