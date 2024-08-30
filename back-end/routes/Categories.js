const express = require('express');
const router = express.Router();
const db = require('../dbconfig'); // Assuming dbconfig is where you configure your MySQL connection

router.use(express.json());

// Handle GET request to fetch categories
router.get('/', (req, res) => {
    db.query('SELECT * FROM categories', (err, rows) => {
        if (err) {
            res.json({ status: 'An error occurred. Please try again.' });
            return;
        }
        res.json(rows);
    });
});

module.exports = router;
