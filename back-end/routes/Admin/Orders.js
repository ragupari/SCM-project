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

router.get('/:orderID', (req, res) => {
    const orderID = req.params.orderID;
    const query =  `SELECT OrderID, fullName, address, city, TotalCapacity FROM orders o
                    LEFT JOIN customers c ON o.customer_ID = c.customer_ID
                    WHERE OrderID = ?`;
 
    db.query(query, [orderID], (err, results) => {
        if (err) {
            console.error('Error fetching order:', err);
            return res.status(500).send('Error fetching order');
        }
        res.json(results[0]);
    });

});

module.exports = router;
