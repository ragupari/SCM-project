const express = require('express');
const router = express.Router();
const db = require('../../dbconfig');

router.get('/:TrainID', (req, res) => {
    const { TrainID } = req.params;

    const query =  `SELECT r.RouteID, s.StoreID, s.City, r.MainTowns, r.Destination, r.TimeToCompletion FROM traintrips t
                    LEFT JOIN  store s ON t.Destination = s.StoreID
                    LEFT JOIN routes r ON s.StoreID = r.StoreID
                    WHERE TrainTripID = ?`;

    db.query(query, [TrainID], (err, results) => {
        if (err) {
            console.error('Error fetching roadways:', err);
            return res.status(500).send('Error fetching roadways');
        }
        res.json(results);
    });
});

module.exports = router;