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

router.get('/citySales/:year/:quarter', (req, res) => {
    const { year, quarter } = req.params;

    const query = `
        SELECT * 
        FROM SalesReportByCityRouteAndQuarter 
        WHERE Year = ? AND Quarter = ?;
    `;

    db.query(query, [year, quarter], (err, results) => {
        if (err) {
            console.error('Error fetching city sales:', err);
            return res.status(500).send('Error fetching city sales');
        }
        res.json(results);
    });
});

router.get('/StoreReport/CategoryRevenue/:year/:quarter/:selectedStore', (req, res) => {
    const { year, quarter , selectedStore } = req.params;

    const query = `
        SELECT CategoryName AS name, Revenue as value
        FROM CategoryByStore
        WHERE year =? and StoreID = ? and Quarter = ?;
    `;

    db.query(query, [year, selectedStore, quarter], (err, results) => {
        if (err) {
            console.error('Error fetching category revenue data:', err);
            return res.status(500).send('Error fetching category revenue data');
        }
        res.json(results);
    });
});

router.get('/StoreReport/ProductRevenue/:year/:quarter/:selectedStore', (req, res) => {
    const { year, quarter , selectedStore } = req.params;

    const query = `
        SELECT ProductName AS name, Revenue as value
        FROM ProductByStore
        WHERE year =? and StoreID = ? and Quarter = ?;
    `;

    db.query(query, [year, selectedStore, quarter], (err, results) => {
        if (err) {
            console.error('Error fetching category revenue data:', err);
            return res.status(500).send('Error fetching category revenue data');
        }
        res.json(results);
    });
});

router.get('/RouteReport/ProductSales/:year/:quarter/:selectedRoute', (req, res) => {
    const { year, quarter , selectedRoute } = req.params;

    const query = `
        SELECT ProductName AS name, Revenue as value
        FROM RouteSalesView
        WHERE year =? and Destination = ? and Quarter = ?;
    `;

    db.query(query, [year, selectedRoute, quarter], (err, results) => {
        if (err) {
            console.error('Error fetching product sales data:', err);
            return res.status(500).send('Error fetching product sales data');
        }
        res.json(results);
    });
});

router.get('/RouteReport/CategorySales/:year/:quarter/:selectedRoute', (req, res) => {
    const { year, quarter , selectedRoute } = req.params;

    const query = `
        SELECT CategoryName AS name, sum(Revenue) as value
        FROM RouteSalesView
        WHERE year = ? and Destination = ? and Quarter = ?
        GROUP BY CategoryName;
    `;

    db.query(query, [year, selectedRoute, quarter], (err, results) => {
        if (err) {
            console.error('Error fetching category sales data:', err);
            return res.status(500).send('Error fetching category sales data');
        }
        res.json(results);
    });
});
router.get('/salesbystore', (req, res) => {
    const { year, storeID } = req.query;

    // Validate query parameters
    if (!year || isNaN(year)) {
        return res.status(400).json({ error: 'Valid year is required.' });
    }
    if (!storeID || isNaN(storeID)) {
        return res.status(400).json({ error: 'Valid storeID is required.' });
    }

    // SQL query to fetch sales by store and year
    const query = `
        SELECT * FROM SalesByStore 
        WHERE Year = ? AND StoreID = ?`;

    db.query(query, [year, storeID], (err, results) => {
        if (err) {
            console.error('Error executing query: ', err);
            return res.status(500).json({ error: 'Database query failed.' });
        }
        const data = [
            ['Quater 01 Sales',results[0].Q1_Sales],
            ['Quater 02 Sales',results[0].Q2_Sales],
            ['Quater 03 Sales',results[0].Q3_Sales],
            ['Quater 04 Sales',results[0].Q4_Sales] ]
 
        res.json(data);
    });
});

router.get('/productsbystore', (req, res) => {
    const { year, storeID } = req.query;

    // Validate query parameters
    if (!year || isNaN(year)) {
        return res.status(400).json({ error: 'Valid year is required.' });
    }
    if (!storeID || isNaN(storeID)) {
        return res.status(400).json({ error: 'Valid storeID is required.' });
    }

    // SQL query to fetch sales by store and year
    const query = `
        SELECT ProductName, TotalProductsSold FROM NumberOfProductByStore
        WHERE Year = ? AND StoreID = ?`;

    db.query(query, [year, storeID], (err, results) => {
        if (err) {
            console.error('Error executing query: ', err);
            return res.status(500).json({ error: 'Database query failed.' });
        }

        // Transform results into a 2D array
        const responseArray = results.map(row => [row.ProductName, row.TotalProductsSold]);
        res.json(responseArray);
    });
});



router.get('/driversbystore', (req, res) => {
    const { year, storeID } = req.query;

    // Validate query parameters
    if (!year || isNaN(year)) {
        return res.status(400).json({ error: 'Valid year is required.' });
    }
    if (!storeID || isNaN(storeID)) {
        return res.status(400).json({ error: 'Valid storeID is required.' });
    }

    // SQL query to fetch sales by store and year
    const query = `
        SELECT Name, MonthName, TotalWorkingHours FROM DriverMonthlyHours
        WHERE Year = ? AND StoreID = ?`;

    db.query(query, [year, storeID], (err, results) => {
        if (err) {
            console.error('Error executing query: ', err);
            return res.status(500).json({ error: 'Database query failed.' });
        }

        // Transform results into the desired format
        const driversData = {};

        results.forEach(row => {
            const { Name, MonthName, TotalWorkingHours } = row;
            
            // If driver not yet in the object, initialize with an empty array
            if (!driversData[Name]) {
                driversData[Name] = [];
            }
            
            // Push the month and working hours into the driver's array
            driversData[Name].push([MonthName, TotalWorkingHours]);
        });

        // Return the transformed result as JSON
        res.json(driversData);
    });
});
router.get('/assistdriversbystore', (req, res) => {
    const { year, storeID } = req.query;

    // Validate query parameters
    if (!year || isNaN(year)) {
        return res.status(400).json({ error: 'Valid year is required.' });
    }
    if (!storeID || isNaN(storeID)) {
        return res.status(400).json({ error: 'Valid storeID is required.' });
    }

    // SQL query to fetch sales by store and year
    const query = `
        SELECT Name, MonthName, TotalWorkingHours FROM AssistantDriverMonthlyHours
        WHERE Year = ? AND StoreID = ?`;

    db.query(query, [year, storeID], (err, results) => {
        if (err) {
            console.error('Error executing query: ', err);
            return res.status(500).json({ error: 'Database query failed.' });
        }

        // Transform results into the desired format
        const driversData = {};

        results.forEach(row => {
            const { Name, MonthName, TotalWorkingHours } = row;
            
            // If driver not yet in the object, initialize with an empty array
            if (!driversData[Name]) {
                driversData[Name] = [];
            }
            
            // Push the month and working hours into the driver's array
            driversData[Name].push([MonthName, TotalWorkingHours]);
        });
 
        // Return the transformed result as JSON
        res.json(driversData);
    });
});










module.exports = router; 