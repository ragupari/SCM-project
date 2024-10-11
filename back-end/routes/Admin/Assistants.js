const express = require("express");
const router = express.Router();
const db = require("../../dbconfig");

router.get("/available/:storeID", (req, res) => {
  const { storeID } = req.params;

  const query = `CALL GetAvailableDrivingAssistant(?);`;

  db.query(query, [storeID], (err, results) => {
    if (err) {
      console.error("Error fetching available assistants:", err);
      return res.status(500).send("Error fetching available assistants");
    }
    res.json(results[0]);
  });
});

router.get("/logs/:assistantID", (req, res) => {
  const { assistantID } = req.params;

  const query = `SELECT 
                        DrivingAssistantID AS ID,
                        Date, 
                        StartTime, 
                        EndTime
                    FROM 
                        Shipments
                    WHERE 
                        DrivingAssistantID = ?
                    ORDER BY 
                        Date DESC
                    LIMIT 4;`;

  db.query(query, [assistantID], (err, results) => {
    if (err) {
      console.error("Error fetching assistant logs:", err);
      return res.status(500).send("Error fetching assistant logs");
    }
    res.json(results);
  });
});

// Fetch all driver assistants for a specific store
router.get("/addAssistants/store/:storeID", (req, res) => {
  const { storeID } = req.params;

  const query = `SELECT * FROM DrivingAssistants WHERE StoreID = ?;`;

  db.query(query, [storeID], (err, results) => {
    if (err) {
      console.error("Error fetching assistants for the store:", err);
      return res.status(500).send("Error fetching assistants");
    }
    res.json(results);
  });
});

// Add a new driver assistant to a store
router.post("/addAssistants/store/:storeID", (req, res) => {
  const { storeID } = req.params;
  const { Name, EmploymentStatus } = req.body;

  const query = `INSERT INTO DrivingAssistants (StoreID, Name, EmploymentStatus) VALUES (?, ?, ?);`;

  db.query(query, [storeID, Name, EmploymentStatus], (err, results) => {
    if (err) {
      console.error("Error adding new assistant:", err);
      return res.status(500).send("Error adding new assistant");
    }
    res.status(201).send("Assistant added successfully");
  });
});

// Update a driver assistant's details
router.put("/addAssistants/:assistantID", (req, res) => {
  const { assistantID } = req.params;
  const { Name, EmploymentStatus } = req.body;

  const query = `UPDATE DrivingAssistants SET Name = ?, EmploymentStatus = ? WHERE DrivingAssistantID = ?;`;

  db.query(query, [Name, EmploymentStatus, assistantID], (err, results) => {
    if (err) {
      console.error("Error updating assistant:", err);
      return res.status(500).send("Error updating assistant");
    }
    res.send("Assistant updated successfully");
  });
});

// Delete a driver assistant by ID
router.delete("/addAssistants/:assistantID", (req, res) => {
  const { assistantID } = req.params;

  const query = `DELETE FROM DrivingAssistants WHERE DrivingAssistantID = ?;`;

  db.query(query, [assistantID], (err, results) => {
    if (err) {
      console.error("Error deleting assistant:", err);
      return res.status(500).send("Error deleting assistant");
    }
    res.send("Assistant deleted successfully");
  });
});

module.exports = router;
