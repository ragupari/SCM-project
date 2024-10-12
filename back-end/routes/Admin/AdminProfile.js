const express = require('express');
const router = express.Router();
const db = require('../../dbconfig');

router.get('/:Username', (req, res) => {
    const { Username } = req.params;
    const sql = 'SELECT * FROM StoreManagers WHERE Username = ?';

    db.query(sql,[Username], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Server side error' });
        }
        res.json(result[0]);
    });
});

module.exports = router;