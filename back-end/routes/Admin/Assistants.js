const express = require('express');
const router = express.Router();
const db = require('../../dbconfig');

router.get('/available/:storeID', (req, res) => {
    const { storeID } = req.params;

    const query = `CALL GetAvailableDrivingAssistant(?);`;

    db.query(query, [storeID], (err, results) => {
        if (err) {
            console.error('Error fetching available assistants:', err);
            return res.status(500).send('Error fetching available assistants');
        }
        res.json(results[0]);
    });
});

router.get('/logs/:assistantID', (req, res) => {
    const { assistantID } = req.params;

    const query =  `SELECT 
                        DriverAssistantID AS ID,
                        Date, 
                        StartTime, 
                        EndTime
                    FROM 
                        shipment
                    WHERE 
                        DriverAssistantID = ?
                    ORDER BY 
                        Date DESC
                    LIMIT 4;`;

    db.query(query, [assistantID], (err, results) => {
        if (err) {
            console.error('Error fetching assistant logs:', err);
            return res.status(500).send('Error fetching assistant logs');
        }
        res.json(results);
    });
});


module.exports = router;