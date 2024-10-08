const express = require('express');
const router = express.Router();
const db = require('../../dbconfig');

// Fetch TrainTrips 
router.get('/', (req, res) => {
    const { selectedDate } = req.query;

    const query =  `SELECT * FROM TrainTrips t
                    LEFT JOIN Stores s ON t.Destination = s.StoreID
                    WHERE DATE(DepartureTime) = ?`;

    db.query(query, [selectedDate], (err, results) => {
        if (err) {
            console.error('Error fetching pending orders:', err);
            return res.status(500).send('Error fetching orders');
        }
        res.json(results);
    });
});

router.put('/decreasecapacity/:trainTripID', (req, res) => {
    const { trainTripID } = req.params;
    const { reqCapacity } = req.body;
    const query = "UPDATE TrainTrips SET AvailableCapacity = AvailableCapacity - ? WHERE TrainTripID = ?";

    db.query(query, [reqCapacity, trainTripID], (err, results) => {
        if (err) {
            console.error('Error decreasing train trip capacity:', err);
            return res.status(500).send('Error decreasing train trip capacity');
        }
        res.send('Train trip capacity decreased');
    });
});

module.exports = router;
