const express = require('express');
const router = express.Router();
const db = require('../../dbconfig');

router.get('/categoryReport/Quantity', (req, res) => {
    const query = `SELECT CategoryName AS name, TotalOrderedQuantity AS value FROM OrderedQuantityByCategory`;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching orders by category:', err);
            return res.status(500).send('Error fetching orders by category');
        }
        res.json(results);
    });
});

router.get('/productReport/Quantity', (req, res) => {
    const query = `SELECT ProductName AS name, TotalQuantityOrdered AS value FROM MostOrderedItems LIMIT 10`;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching orders by category:', err);
            return res.status(500).send('Error fetching orders by category');
        }
        res.json(results);
    });
});

router.get('/categoryReport/Revenue', (req, res) => {
    const query = `SELECT CategoryName AS name, TotalRevenue AS value FROM RevenueByCategory`;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching revenue by category:', err);
            return res.status(500).send('Error fetching revenue by category');
        }
        res.json(results);
    });
});

router.get('/quarterly/:year', (req, res) => {
    const { year } = req.params;

    const query = `SELECT Quarter AS quarter, TotalSales AS revenue FROM QuarterlySalesReport WHERE YEAR = ?`;

    db.query(query, [year], (err, results) => {
        if (err) {
            console.error('Error fetching quarterly revenue:', err);
            return res.status(500).send('Error fetching quarterly revenue');
        }
        res.json(results);
    });
});

router.get('/citySales/:year', (req, res) => {
    const { year } = req.params;
    const query = `SELECT * FROM SalesReportByCityRouteAndYear WHERE YEAR = ?;`;

    db.query(query, [year], (err, results) => {
        if (err) {
            console.error('Error fetching city sales:', err);
            return res.status(500).send('Error fetching city sales');
        }
        res.json(results);
    });
});

module.exports = router;