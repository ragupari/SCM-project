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


router.get('/getRoutes/:storeID', (req, res) => {
    const { storeID } = req.params;
    const query =`SELECT * FROM Routes WHERE StoreID = ?;`;

    db.query(query,[storeID], (err, results) => {
        if (err) {
            console.error('Error fetching routes:', err);
            return res.status(500).send('Error fetching routes');
        }
        res.json(results);
    });
});

module.exports = router;