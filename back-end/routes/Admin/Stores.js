const express = require("express");
const router = express.Router();
const db = require("../../dbconfig");

router.get('/getStores', (req, res) => {
    const query = `SELECT * FROM Stores WHERE StoreID != 7;`;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching stores:', err);
            return res.status(500).send('Error fetching stores');
        }
        res.json(results);
    });
});

module.exports = router;