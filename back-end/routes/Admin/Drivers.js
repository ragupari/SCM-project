const express = require('express');
const router = express.Router();
const db = require('../../dbconfig');

router.get('/available/:storeID', (req, res) => {
    const { storeID } = req.params;

    const query = `CALL GetAvailableDriver(?);`;

    db.query(query, [storeID], (err, results) => {
        if (err) {
            console.error('Error fetching available drivers:', err);
            return res.status(500).send('Error fetching available drivers');
        }
        res.json(results[0]);
    });
});

module.exports = router;