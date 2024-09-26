const express = require('express');
const router = express.Router();
const db = require('../../dbconfig');

// Initialize an empty shipments list
let shipmentDetails = [{
    orderID: null,
    totalCapacity: null,
    trainTripID: null,
    truckID: null,
    driverID: null,
    drivingAssistantID: null,
    routeID: null,
    date: null,
    startTime: null,
    endTime: null,
}];

// Get shipment details
router.get('/', (req, res) => {
    res.json(shipmentDetails);
});

// Update shipment details
router.put('/', (req, res) => {
    const updates = req.body;

    // Update only the fields provided in the request body
    Object.keys(updates).forEach(key => {
        if (shipmentDetails[0].hasOwnProperty(key)) {
            shipmentDetails[0][key] = updates[key];
        }
    });
    res.json({ message: "Shipment updated successfully", shipmentDetails });
});

// Reset shipment details
router.delete('/', (req, res) => {
    shipmentDetails = [{
        orderID: null,
        totalCapacity: null,
        trainTripID: null,
        truckID: null,
        driverID: null,
        drivingAssistantID: null,
        routeID: null,
        date: null,
        startTime: null,
        endTime: null,
    }];
    res.json({ message: "Shipment details reset successfully" });
});

// Submit shipmentDetails
router.post('/submit', (req, res) => {
    const { orderID, trainTripID, truckID, driverID, drivingAssistantID, routeID, date, startTime, endTime } = shipmentDetails[0];
    const sql = `
        INSERT INTO shipment (   
            OrderID, TrainTripID, TruckID, DriverID, 
            DriverAssistantID, RouteID, Date, StartTime, EndTime 
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    db.query(sql, [
        orderID, trainTripID, truckID, driverID, drivingAssistantID,
        routeID, date, startTime, endTime
    ], (err, result) => {
        if (err) {
            return res.status(500).send('Error submitting shipment details.');
        }
        shipmentDetails = [{
            orderID: null,
            totalCapacity: null,
            trainTripID: null,
            truckID: null,
            driverID: null,
            drivingAssistantID: null,
            routeID: null,
            date: null,
            startTime: null,
            endTime: null,
        }];
        res.send('Shipment details submitted successfully.');
    });
});

module.exports = router;