const express = require('express');
const router = express.Router();
const db = require('../../dbconfig');

router.get('/', (req, res) => {
    const { selectedDate, storeID } = req.query;
    const query = ` SELECT * FROM Shipments s 
                    LEFT JOIN Routes r ON s.RouteID = r.RouteID
                    WHERE s.Date = ? AND s.StoreID = ?`;

    db.query(query, [selectedDate, storeID], (err, results) => {
        if (err) {
            console.error('Error fetching truck schedule:', err);
            return res.status(500).send('Error fetching truck schedule');
        }
        res.json(results);
    });
});

module.exports = router;