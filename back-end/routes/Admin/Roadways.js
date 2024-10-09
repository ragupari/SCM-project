const express = require('express');
const router = express.Router();
const db = require('../../dbconfig');

router.get('/:routeID', (req, res) => {
    const { routeID } = req.params;

    const query =  `SELECT * FROM Routes WHERE RouteID = ?;`;

    db.query(query, [routeID], (err, results) => {
        if (err) {
            console.error('Error fetching roadways:', err);
            return res.status(500).send('Error fetching roadways');
        }
        res.json(results[0]);
    });
});

module.exports = router;