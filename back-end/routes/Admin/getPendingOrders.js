const express = require('express');
const router = express.Router();
const db = require('../../dbconfig');

// Fetch orders with status 'pending'
router.get('/', (req, res) => {
    const status = req.query.status;

    if (status === 'pending') {
        const query = "SELECT * FROM orders WHERE Status = ?";
        
        db.query(query, ['Pending'], (err, results) => {
            if (err) {
                console.error('Error fetching pending orders:', err);
                return res.status(500).send('Error fetching orders');
            }
            res.json(results);
        });
    } else {
        res.status(400).send('Invalid status');
    }
});

module.exports = router;
