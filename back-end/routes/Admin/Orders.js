const express = require('express');
const router = express.Router();
const db = require('../../dbconfig');

// Fetch orders with status 'pending'
router.get('/', (req, res) => {
    const status = req.query.status;
    const storeID = req.query.storeID;

    if (status === 'processing') {
        const query = ` SELECT * FROM Orders o
                        LEFT JOIN  TrainTrips t ON o.TrainTripID = t.TrainTripID
                        LEFT JOIN  Routes r ON o.RouteID = r.RouteID
                        WHERE o.Status = ? AND r.StoreID = ?
                        ORDER BY o.OrderDate DESC
                    `;

        db.query(query, ['Processing', storeID], (err, results) => {
            if (err) {
                console.error('Error fetching pending orders:', err);
                return res.status(500).send('Error fetching orders');
            }
            res.json(results);
        });
    } else if (status === 'pending' && storeID === '7') {
        const query = "SELECT * FROM Orders WHERE Status = ?";

        db.query(query, ['Pending'], (err, results) => {
            if (err) {
                console.error('Error fetching processing orders:', err);
                return res.status(500).send('Error fetching orders');
            }
            res.json(results);
        });
    } else {
        res.status(400).send('Invalid status or storeID');
    }
});

router.put('/assigntraintrip/:orderID', (req, res) => {
    const { trainTripID } = req.body;
    const orderID = req.params.orderID;
    const query = "UPDATE Orders SET TrainTripID = ?, Status = ? WHERE OrderID = ?";

    db.query(query, [trainTripID, 'Processing', orderID], (err, results) => {
        if (err) {
            console.error('Error assigning train trip:', err);
            return res.status(500).send('Error assigning train trip');
        }
        res.send('Train trip assigned');
    });
});

router.put('/assignschedule/:orderID', (req, res) => {
    const { deliveryID } = req.body;
    const orderID = req.params.orderID;

    const query = "UPDATE Orders SET DeliveryID = ?, Status = ? WHERE OrderID = ?";
    db.query(query, [deliveryID, 'OntheWay', orderID], (err, results) => {
        if (err) {
            console.error('Error assigning schedule:', err);
            return res.status(500).send('Error assigning schedule');
        }
        res.send('Schedule assigned');
    });
});

router.get('/:username', (req, res) => {
    const username = req.params.username;
    const query = `SELECT OrderID, OrderDate, DeliveryDate, Status, TotalPrice, TotalCapacity FROM orders o
                    LEFT JOIN customers c ON o.customer_ID = c.customer_ID
                    WHERE username = ?`;

    db.query(query, [username], (err, results) => {
        if (err) {
            console.error('Error fetching orders:', err);
            return res.status(500).send('Error fetching orders');
        }
        res.json(results);
    });
});

router.put('/:orderID', (req, res) => {
    const orderID = req.params.orderID;
    const { status } = req.body;
    const query = "UPDATE orders SET Status = ? WHERE OrderID = ?";

    db.query(query, [status, orderID], (err, results) => {
        if (err) {
            console.error('Error updating order status:', err);
            return res.status(500).send('Error updating order status');
        }
        res.send(`Order is now ${status}`);
    });
});

router.get('/getbyid/:orderID', (req, res) => {
    const orderID = req.params.orderID;

    const query = `SELECT * FROM Orders WHERE OrderID = ?`;

    db.query(query, [orderID], (err, results) => {
        if (err) {
            console.error('Error fetching order:', err);
            return res.status(500).send('Error fetching order');
        }
        res.json(results[0]);
    });

});

router.post('/status/:orderID', (req, res) => {
    const orderID = req.params.orderID;
    const { status } = req.body;
    const query = "UPDATE orders SET Status = ? WHERE OrderID = ?";

    db.query(query, [status, orderID], (err, results) => {
        if (err) {
            console.error('Error updating order status:', err);
            return res.status(500).send('Error updating order status');
        }
        res.send(`Order is now ${status}`);
    });
});

module.exports = router;
