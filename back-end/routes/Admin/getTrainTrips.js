const express = require('express');
const router = express.Router();
const db = require('../../dbconfig');

// Fetch TrainTrips 
router.get('/', (req, res) => {
    const { selectedDate } = req.query;

    const query =  `SELECT * FROM traintrips t
                    LEFT JOIN store s ON t.Destination = s.StoreID
                    WHERE DATE(DepartureTime) = ?`;

    db.query(query, [selectedDate], (err, results) => {
        if (err) {
            console.error('Error fetching pending orders:', err);
            return res.status(500).send('Error fetching orders');
        }
        res.json(results);
    });
});

module.exports = router;
