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

router.put('/decreasecapacity/:deliveryID', (req, res) => {
    const { deliveryID } = req.params;
    const { reqCapacity } = req.body;
    const query = `UPDATE Shipments
                   SET RemainingCapacity = RemainingCapacity - ?
                   WHERE DeliveryID = ?`;

    db.query(query, [reqCapacity, deliveryID], (err, results) => {
        if (err) {
            console.error('Error updating truck schedule:', err);
            return res.status(500).send('Error updating truck schedule');
        }
        res.send('Truck schedule updated');
    });
});

router.post('/', (req, res) => {
    const { RouteID, StoreID, TruckID, DriverID, DrivingAssistantID, Date, StartTime, EndTime, RemainingCapacity } = req.body;
    const query = `INSERT INTO Shipments (RouteID, StoreID, TruckID, DriverID, DrivingAssistantID, Date, StartTime, EndTime, RemainingCapacity)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(query, [RouteID, StoreID, TruckID, DriverID, DrivingAssistantID, Date, StartTime, EndTime, RemainingCapacity], (err, results) => {
        if (err) {
            console.error('Error creating truck schedule:', err);
            return res.status(500).send('Error creating truck schedule');
        }
        res.send('Truck schedule created');
    });
});

module.exports = router;