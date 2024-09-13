const express = require('express');
const router = express.Router();
const db = require('../dbconfig');

router.get('/:searchTerm', (req, res) => {
    const { searchTerm } = req.params;

    const sql = `SELECT * FROM products WHERE product_name LIKE ?`;
    db.query(sql, [`%${searchTerm}%`], (err, results) => {
        if (err) {
            console.log('Error fetching data:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

module.exports = router;