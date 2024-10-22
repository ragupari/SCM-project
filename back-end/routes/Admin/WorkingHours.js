const express = require('express');
const router = express.Router();
const db = require('../../dbconfig');

// Route to get working hours for a driver
router.get('/driver/:personID', (req, res) => {
    const { personID } = req.params;
    const { month } = req.query;
    const { year } = req.query;


    const query = `
        SELECT WeekNumber, TotalHours
        FROM DriverWeeklyHours
        WHERE PersonID = ? AND MonthNumber = ? AND Year = ?
    `;

    db.query(query, [personID, month, year], (error, results) => {
        if (error) {
            console.error("Error fetching working hours for driver: ", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        res.json(results);
    });
});

// Route to get working hours for an assistant
router.get('/assistant/:personID', (req, res) => {
    const { personID } = req.params;
    const { month } = req.query;
    const { year } = req.query;

    const query = `
        SELECT WeekNumber, TotalHours
        FROM AssistantWeeklyHours
        WHERE PersonID = ? AND MonthNumber = ? AND Year = ?
    `;

    db.query(query, [personID, month, year], (error, results) => {
        if (error) {
            console.error("Error fetching working hours for assistant: ", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        res.json(results);
    });
});

router.get('/truck/:truckID', (req, res) => {
    const { truckID } = req.params;
    const { month } = req.query;
    const { year } = req.query;

    const query = `
        SELECT WeekNumber, TotalHours
        FROM TruckWeeklyHours
        WHERE TruckID = ? AND MonthNumber = ? AND Year = ?
    `;

    db.query(query, [truckID, month, year], (error, results) => {
        if (error) {
            console.error("Error fetching working hours for trucks: ", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        res.json(results);
    });
});
module.exports = router;