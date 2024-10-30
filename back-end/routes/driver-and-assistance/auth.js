const express = require('express');
const router = express.Router();
const pool = require('../../dbconfig');

router.post('/login', async (req, res) => {

  const { role, id } = req.body;
  
  
  try {
    const table = role === 'driver' ? 'Drivers' : 'DrivingAssistants';
    const idField = role === 'driver' ? 'DriverID' : 'DrivingAssistantID';
    
    const [users] = await pool.promise().query(
      `SELECT ${idField} as id, Name as name, EmploymentStatus 
       FROM ${table} 
       WHERE ${idField} = ?`,
      [id]
    );

    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = users[0];
    

    res.json({
      id: user.id,
      name: user.name,
      role
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});


module.exports = router;