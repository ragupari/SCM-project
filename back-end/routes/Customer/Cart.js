const express = require('express');
const router = express.Router();
const db = require('../../dbconfig');

// Initialize an empty cart
let cart = [];

// Get all items in the cart
router.get('/', (req, res) => {
    res.json(cart);
});

// Add an item to the cart
router.post('/', (req, res) => {
    const { id, productName, quantity, price, CapacityPerUnit } = req.body;
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        // If item already exists in the cart, update the quantity
        existingItem.quantity += quantity;
    } else {
        // Add new item to the cart
        const newItem = { id, productName, quantity, price, CapacityPerUnit };
        cart.push(newItem);
    }
    res.json(cart);
});

// Update the quantity of an item in the cart
router.put('/:itemId', (req, res) => {
    const { itemId } = req.params;
    const { quantity } = req.body;

    const item = cart.find(item => item.id === parseInt(itemId));

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
router.post('/checkout', (req, res) => {
    const { username } = req.body;

    const sqlGetCustomerID = 'SELECT CustomerID FROM Customers WHERE Username = ?';
    db.query(sqlGetCustomerID, [username], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching customer ID' });
        }
        console.log("this  line works!");
        const customerID = result[0].customer_ID;
        const sqlInsertOrder = `
            INSERT INTO Orders (CustomerID, OrderDate, DeliveryDate, DeliveryAddress, Status, TotalPrice, TotalCapacity)
            VALUES (?, DATE(NOW()), DATE(DATE_ADD(NOW(), INTERVAL 7 DAY)),'address', 'Pending', ?, ?);
        `;

        let totalPrice = 0;
        let totalCapacity = 0;

        cart.forEach(item => {
            totalPrice += item.price * item.quantity;
            totalCapacity += item.quantity * item.CapacityPerUnit;
        });

        db.query(sqlInsertOrder, [customerID, totalPrice, totalCapacity], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error inserting order' });
            }

            const orderID = result.insertId;
            const sqlInsertOrderItems = `
                INSERT INTO OrderItems (OrderID, ProductID, Quantity, Cost)
                VALUES ?
            `;
            const orderItems = cart.map(item => [
                orderID,
                item.id,
                item.quantity,
                item.price * item.quantity
            ]);

            db.query(sqlInsertOrderItems, [orderItems], (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Error inserting order items' });
                }

                cart = [];
                res.json({ message: 'Order placed successfully', cart });
            });
        });
    });
});




module.exports = router;
