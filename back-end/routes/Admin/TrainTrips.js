const express = require('express');
const router = express.Router();
const db = require('../../dbconfig');

// Fetch TrainTrips 
router.get('/', (req, res) => {
    const { selectedDate } = req.query;

    const query =  `SELECT * FROM TrainTrips t
                    LEFT JOIN Stores s ON t.Destination = s.StoreID
                    WHERE DATE(DepartureTime) = ?`;

    db.query(query, [selectedDate], (err, results) => {
        if (err) {
            console.error('Error fetching pending orders:', err);
            return res.status(500).send('Error fetching orders');
        }
        res.json(results);
    });
});

router.get('/gettrains', async (req, res) => {

    // Input validation
    if (!req.query.selectedDate || isNaN(Date.parse(req.query.selectedDate))) {
        return res.status(400).json({ message: 'Invalid date format. Please use YYYY-MM-DD.' });
    }

    if (!req.query.routeId) {
        return res.status(400).json({ message: 'Route ID is required.' });
    }

    const query = `CALL GetAvailableTrains(?, ?)`;

    try {
        // Use async/await directly
        const results = await new Promise((resolve, reject) => {
            db.query(query, [req.query.routeId, req.query.selectedDate], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });

        // Check for results
        if (results && results.length > 0) {
            return res.json(results[0]);
        } else {
            return res.status(404).json({ message: 'No trains found for the given criteria.' });
        }
    } catch (err) {
        console.error('Error fetching available trains:', err);
        return res.status(500).json({ message: 'Error fetching available trains. Please try again later.' });
    }
}); 




router.put('/decreasecapacity/:trainTripID', (req, res) => {
    const { trainTripID } = req.params;
    const { reqCapacity } = req.body;
    const query = "UPDATE TrainTrips SET AvailableCapacity = AvailableCapacity - ? WHERE TrainTripID = ?";

    db.query(query, [reqCapacity, trainTripID], (err, results) => {
        if (err) {
            console.error('Error decreasing train trip capacity:', err);
            return res.status(500).send('Error decreasing train trip capacity');
        }
        res.send('Train trip capacity decreased');
    });
});


router.post('/assigntraintrip', async (req, res) => {
    const { trainID, date, availableCapacity, orderID } = req.body;
 
    // Validate required fields
    if (!trainID || !date || availableCapacity === undefined) {
        return res.status(400).json({ message: 'TrainID, date, and availableCapacity are required.' });
    }

    // Check if date is a valid date format
    if (isNaN(Date.parse(date))) {
        return res.status(400).json({ message: 'Invalid date format.' });
    }

    try {
        // Call the stored procedure
        await db.promise().query('CALL AssignTrainTrip(?, ?, ?, ?)', [trainID, date, availableCapacity, orderID]);
        return res.status(200).json({ message: 'Train trip assigned successfully.' });
    } catch (error) {
        console.error('Error assigning train trip:', error);
        return res.status(500).json({ message: 'Internal server error.' }); 
    }
});

router.put('/reducecapacity/:trainTripID', (req, res) => {
    const { trainTripID } = req.params;
    const { reqCapacity } = req.body;
    const query = "UPDATE TrainTrips2 SET AvailableCapacity = AvailableCapacity - ? WHERE TrainTripID = ?";

    db.query(query, [reqCapacity, trainTripID], (err, results) => {
        if (err) {
            console.error('Error decreasing train trip capacity:', err);
            return res.status(500).send('Error decreasing train trip capacity');
        }
        res.send('Train trip capacity decreased');
    });
});

module.exports = router;
