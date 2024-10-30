const express = require('express');
const router = express.Router();
const db = require('../../dbconfig');

// Fetch orders with status 'pending'
router.get('/', (req, res) => {
    const status = req.query.status;
    const storeID = req.query.storeID;

    if (status === 'processing') {
        const query = ` SELECT * FROM Orders o
                        LEFT JOIN  TrainTrips2 t ON o.TrainTripID = t.TrainTripID
                        LEFT JOIN  Routes r ON o.RouteID = r.RouteID
                        WHERE o.Status = ? AND r.StoreID = ?
                        ORDER BY o.OrderDate
                    `;

        db.query(query, ['Processing', storeID], (err, results) => {
            if (err) {
                console.error('Error fetching pending orders:', err);
                return res.status(500).send('Error fetching orders');
            }
            res.json(results);
        });
    } else if (status === 'pending' && storeID === '7') {
        const query = "SELECT * FROM Orders WHERE Status = ? ORDER BY OrderDate";

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
    db.query(query, [deliveryID, 'OnTheWay', orderID], (err, results) => {
        if (err) {
            console.error('Error assigning schedule:', err);
            return res.status(500).send('Error assigning schedule');
        }
        res.send('Schedule assigned');
    });
});

router.get('/:username', (req, res) => {
    const username = req.params.username;
    const query = `CALL GetCustomerOrdersByUsername(?)`;

  db.query(query, [username], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error fetching orders' });
    } else {
      const orders = results[0].map((order) => ({
        ...order,
        Products: order.ProductNames.split(',').map((name, index) => ({
          ProductName: name,
          Quantity: order.Quantities.split(',')[index]
        })),
        StatusDates: {
          pending: order.OrderDate,
          processing: order.TrainTripDate || '_',  // Train trip date indicates processing stage
          ontheway: order.ShipmentDate || '_',     // Shipment date indicates on the way stage
          received: order.Status === 'Received' ? order.ShipmentDate : '_'  // Delivery date for received status
        }
      }));
      res.json(orders);
    }
  });
});

router.put('/:orderID', (req, res) => {
    const orderID = req.params.orderID;
    const { status } = req.body;
    const query = "UPDATE Orders SET Status = ? WHERE OrderID = ?";

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

    const query = `SELECT * FROM Orders o
                    LEFT JOIN Routes r ON o.RouteID = r.RouteID
                    LEFT JOIN Stores s ON s.StoreID = r.StoreID 
                    WHERE OrderID = ?`;

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
    const query = "UPDATE Orders SET Status = ? WHERE OrderID = ?";

    db.query(query, [status, orderID], (err, results) => {
        if (err) {
            console.error('Error updating order status:', err);
            return res.status(500).send('Error updating order status');
        }
        res.send(`Order is now ${status}`);
    });
});

router.get('/getbyDeliveryID/:deliveryID', (req, res) => {
    const deliveryID = req.params.deliveryID;
    const query = `SELECT * FROM Orders WHERE DeliveryID = ?`;

    db.query(query, [deliveryID], (err, results) => {
        if (err) {
            console.error('Error fetching order:', err);
            return res.status(500).send('Error fetching order');
        }
        res.json(results);
    });
});

router.get('/getProducts/:OrderID', (req, res) => {
    const OrderID = req.params.OrderID;
    const query = `SELECT p.ProductName, o.Quantity, o.Cost 
                    FROM OrderItems o
                    LEFT JOIN Products p ON o.ProductID = p.ProductID
                    WHERE o.OrderID = ?`;
                    
    db.query(query, [OrderID], (err, results) => {
        if (err) {
            console.error('Error fetching order details:', err);
            return res.status(500).send('Error fetching order details');
        }
        res.json(results);
    });
});

module.exports = router;
