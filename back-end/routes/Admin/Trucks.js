const express = require('express');
const router = express.Router();
const db = require('../../dbconfig');

router.get('/:truckID', (req, res) => {
    const { truckID } = req.params;

    const query = `SELECT * FROM Trucks WHERE TruckID = ?;`;

    db.query(query, [truckID], (err, results) => {
        if (err) {
            console.error('Error fetching truck details:', err);
            return res.status(500).send('Error fetching truck details');
        }
        res.json(results[0]);
    });
});

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

router.get('/logs/:truckID', (req, res) => {
    const { truckID } = req.params;

    const query =  `SELECT 
                        TruckID AS ID,
                        Date, 
                        StartTime, 
                        EndTime
                    FROM 
                        Shipments
                    WHERE 
                        TruckID = ?
                    ORDER BY 
                        Date DESC
                    LIMIT 4;`;

    db.query(query, [truckID], (err, results) => {
        if (err) {
            console.error('Error fetching assistant logs:', err);
            return res.status(500).send('Error fetching assistant logs');
        }
        res.json(results);
    });
});

module.exports = router;