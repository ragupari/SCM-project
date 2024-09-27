const express = require('express');
const router = express.Router();
const db = require('../../dbconfig');

router.get('/available/:storeID', (req, res) => {
    const { storeID } = req.params;

    const query = `CALL GetAvailableTrucks(?);`;

    db.query(query, [storeID], (err, results) => {
        if (err) {
            console.error('Error fetching available trucks:', err);
            return res.status(500).send('Error fetching available trucks');
        }
        res.json(results[0]);
    });
});

module.exports = router;