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

router.put(`/:trainTripID`, (req, res) => {
    const { reqCapacity } = req.body;
    const trainTripID = req.params.trainTripID;

    const query = `UPDATE traintrips SET AvailableCapacity = AvailableCapacity - ? WHERE TrainTripID = ?`;
    db.query(query, [reqCapacity, trainTripID], (error, results) => {
        if (error) {
            console.error("Error updating available capacity: ", error);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json({ message: "Available capacity updated successfully" });
    });
});

module.exports = router;
