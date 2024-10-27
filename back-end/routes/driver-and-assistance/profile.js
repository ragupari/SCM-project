const express = require('express');
const router = express.Router();
const pool = require('../../dbconfig');

router.get('/driver/:id/profile', async (req, res) => {
  const { id } = req.params;
  

  try {
    // Get weekly hours using MySQL's built-in functions
    const [weeklyHours] = await pool.promise().query(
      `SELECT 
        COALESCE(
          SUM(
            TIME_TO_SEC(TIMEDIFF(EndTime, StartTime)) / 3600
          ), 
          0
        ) as totalHours
       FROM Shipments
       WHERE DriverID = ?
       AND Date >= DATE(DATE_SUB(CURDATE(), 
         INTERVAL (WEEKDAY(CURDATE())) DAY))`,
      [id]
    );

    // Get completed deliveries count
    const [deliveries] = await pool.promise().query(
      `SELECT 
        COUNT(DISTINCT s.DeliveryID) as totalDeliveries,
        SUM(CASE WHEN o.Status = 'Received' THEN 1 ELSE 0 END) as completedDeliveries,
        COUNT(o.OrderID) as totalOrders
       FROM Shipments s
       LEFT JOIN Orders o ON s.DeliveryID = o.DeliveryID
       WHERE s.DriverID = ?
       AND s.Date >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)`,
      [id]
    );

    // Calculate estimated total distance from routes
    const [distance] = await pool.promise().query(
      `SELECT 
        COUNT(DISTINCT r.RouteID) * 10 as estimatedDistance
       FROM Shipments s
       JOIN Routes r ON s.RouteID = r.RouteID
       WHERE s.DriverID = ?
       AND s.Date >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)`,
      [id]
    );

    const profile = {
      weeklyHours: parseFloat(weeklyHours[0].totalHours).toFixed(2),
      deliveriesCompleted: deliveries[0].completedDeliveries,
      totalDistance: distance[0].estimatedDistance,
      onTimeDeliveryRate: Math.round((deliveries[0].completedDeliveries / deliveries[0].totalOrders) * 100) || 0,
      
    };
    
    res.json(profile);
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

router.get('/assistant/:id/profile', async (req, res) => {
  const { id } = req.params;
  

  try {
    // Get weekly hours using MySQL's built-in functions
    const [weeklyHours] = await pool.promise().query(
      `SELECT 
        COALESCE(
          SUM(
            TIME_TO_SEC(TIMEDIFF(EndTime, StartTime)) / 3600
          ), 
          0
        ) as totalHours
       FROM Shipments
       WHERE DrivingAssistantID = ?
       AND Date >= DATE(DATE_SUB(CURDATE(), 
         INTERVAL (WEEKDAY(CURDATE())) DAY))`,
      [id]
    );

    // Get completed deliveries count
    const [deliveries] = await pool.promise().query(
      `SELECT 
        COUNT(DISTINCT s.DeliveryID) as totalDeliveries,
        SUM(CASE WHEN o.Status = 'Received' THEN 1 ELSE 0 END) as completedDeliveries,
        COUNT(o.OrderID) as totalOrders
       FROM Shipments s
       LEFT JOIN Orders o ON s.DeliveryID = o.DeliveryID
       WHERE s.DrivingAssistantID = ?
       AND s.Date >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)`,
      [id]
    );

    // Calculate estimated total distance from routes
    const [distance] = await pool.promise().query(
      `SELECT 
        COUNT(DISTINCT r.RouteID) * 10 as estimatedDistance
       FROM Shipments s
       JOIN Routes r ON s.RouteID = r.RouteID
       WHERE s.DrivingAssistantID = ?
       AND s.Date >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)`,
      [id]
    );

    const profile = {
      weeklyHours: parseFloat(weeklyHours[0].totalHours).toFixed(2),
      deliveriesCompleted: deliveries[0].completedDeliveries,
      totalDistance: distance[0].estimatedDistance,
      onTimeDeliveryRate: Math.round((deliveries[0].completedDeliveries / deliveries[0].totalOrders) * 100) || 0,
      
    };
    
    res.json(profile);
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
