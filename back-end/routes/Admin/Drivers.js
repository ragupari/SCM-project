const express = require("express");
const router = express.Router();
const db = require("../../dbconfig");

router.get('/available', (req, res) => {
    const { storeID, date } = req.query;

    const query = `CALL GetAvailableDriver(?,?);`;

    db.query(query, [storeID, date], (err, results) => {
        if (err) {
            console.error('Error fetching available drivers:', err);
            return res.status(500).send('Error fetching available drivers');
        }
        res.json(results[0]);
    });
});

router.get("/logs/:driverID", (req, res) => {
  const { driverID } = req.params;

  const query = `SELECT 
                        DriverID AS ID,
                        Date, 
                        StartTime, 
                        EndTime
                    FROM 
                        Shipments
                    WHERE 
                        DriverID = ?
                    ORDER BY 
                        Date DESC
                    LIMIT 4;`;

  db.query(query, [driverID], (err, results) => {
    if (err) {
      console.error("Error fetching assistant logs:", err);
      return res.status(500).send("Error fetching assistant logs");
    }
    res.json(results);
  });
});

// Fetch all drivers for a specific store
router.get("/addDriver/store/:storeID", (req, res) => {
  const { storeID } = req.params;

  const query = `SELECT * FROM Drivers WHERE StoreID = ?;`;

  db.query(query, [storeID], (err, results) => {
    if (err) {
      console.error("Error fetching drivers for the store:", err);
      return res.status(500).send("Error fetching drivers");
    }
    res.json(results);
  });
});

// Add a new driver to a store
router.post("/addDriver/store/:storeID", (req, res) => {
  const { storeID } = req.params;
  const { Name, EmploymentStatus } = req.body;

  const query = `INSERT INTO Drivers (StoreID, Name, EmploymentStatus) VALUES (?, ?, ?);`;

  db.query(query, [storeID, Name, EmploymentStatus], (err, results) => {
    if (err) {
      console.error("Error adding new driver:", err);
      return res.status(500).send("Error adding new driver");
    }
    res.status(201).send("Driver added successfully");
  });
});

// Update a driver's details
router.put("/addDriver/:driverID", (req, res) => {
  const { driverID } = req.params;
  const { Name, EmploymentStatus } = req.body;

  const query = `UPDATE Drivers SET Name = ?, EmploymentStatus = ? WHERE DriverID = ?;`;

  db.query(query, [Name, EmploymentStatus, driverID], (err, results) => {
    if (err) {
      console.error("Error updating driver:", err);
      return res.status(500).send("Error updating driver");
    }
    res.send("Driver updated successfully");
  });
});

// Delete a driver by ID
router.delete("/addDriver/:driverID", (req, res) => {
  const { driverID } = req.params;

  const query = `DELETE FROM Drivers WHERE DriverID = ?;`;

  db.query(query, [driverID], (err, results) => {
    if (err) {
      console.error("Error deleting driver:", err);
      return res.status(500).send("Error deleting driver");
    }
    res.send("Driver deleted successfully");
  });
});

module.exports = router;
