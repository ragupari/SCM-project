const express = require('express');
const router = express.Router();
const pool = require('../../dbconfig');
const { calculateExpectedTimes, getShipmentStatus } = require('./utils/timeUtils');

router.get('/:role/:id/schedule', async (req, res) => {
  const { role, id } = req.params;
  
  const mDay = new Date();
  const today = mDay.getFullYear() + '-' + 
    String(mDay.getMonth() + 1).padStart(2, '0') + '-' + 
    String(mDay.getDate()).padStart(2, '0');
  
  const getStatus = getShipmentStatus();

  
  try {
    const idField = role === 'driver' ? 'DriverID' : 'DrivingAssistantID';
    const [shipments] = await pool.promise().query(
      `SELECT 
        s.DeliveryID, s.RouteID, s.StartTime, s.EndTime,
        s.TruckID, s.DriverID, s.DrivingAssistantID, s.RemainingCapacity,
        r.Destination, r.MainTowns,
        d.Name as DriverName,
        da.Name as AssistantName
       FROM Shipments s
       JOIN Routes r ON s.RouteID = r.RouteID
       JOIN Drivers d ON s.DriverID = d.DriverID
       JOIN DrivingAssistants da ON s.DrivingAssistantID = da.DrivingAssistantID
       WHERE s.${idField} = ? AND s.Date = ?`,
      [id, today]
    );

    const formattedShipments = shipments.map(shipment => ({
      id: shipment.DeliveryID,
      startTime: shipment.StartTime,
      endTime: shipment.EndTime,
      route: shipment.RouteName,
      mainTowns: shipment.MainTowns,
      truck: `TRK-${shipment.TruckID}`,
      remainingCapacity: shipment.RemainingCapacity,
      status: getStatus(shipment.StartTime, shipment.EndTime),
      [role === 'driver' ? 'assistant' : 'driver']: 
        role === 'driver' ? shipment.AssistantName : shipment.DriverName
    }));

    res.json(formattedShipments);
  } catch (error) {
    console.error('Schedule fetch error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

router.get('/destinations/:shipmentId', async (req, res) => {
  const { shipmentId } = req.params;

  try {
    // Get shipment details
    const [shipments] = await pool.promise().query(
      `SELECT s.*, r.Destination, r.MainTowns
       FROM Shipments s
       JOIN Routes r ON s.RouteID = r.RouteID
       WHERE s.DeliveryID = ?`,
      [shipmentId]
    );

    if (shipments.length === 0) {
      return res.status(404).json({ error: 'Shipment not found' });
    }

    const shipment = shipments[0];

    // Get orders for this shipment
    const [orders] = await pool.promise().query(
      `SELECT o.*, c.FullName as CustomerName, c.Address as CustomerAddress
       FROM Orders o
       JOIN Customers c ON o.CustomerID = c.CustomerID
       WHERE o.DeliveryID = ?
       ORDER BY o.OrderID`,
      [shipmentId]
    );

    // Calculate expected times for each order
    const getExpectedTime = calculateExpectedTimes(
      shipment.StartTime,
      shipment.EndTime,
      orders.length
    );

    const formattedOrders = orders.map((order, index) => ({
      orderId: `ORD-${order.OrderID.toString().padStart(3, '0')}`,
      customerId: order.CustomerID,
      customerName: order.CustomerName,
      deliveryAddress: order.DeliveryAddress || order.CustomerAddress,
      status: order.Status === 'Received' ? 'Completed' : 'Pending',
      expectedTime: getExpectedTime(index),
      totalCapacity: order.TotalCapacity
    }));

    res.json({
      route: {
        id: shipment.RouteID,
        name: shipment.RouteName,
        mainTowns: shipment.MainTowns
      },
      shipment: {
        startTime: shipment.StartTime,
        endTime: shipment.EndTime,
        truckId: `TRK-${shipment.TruckID}`,
        driverId: shipment.DriverID,
        remainingCapacity: shipment.RemainingCapacity
      },
      orders: formattedOrders
    });
  } catch (error) {
    console.error('Destinations fetch error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;