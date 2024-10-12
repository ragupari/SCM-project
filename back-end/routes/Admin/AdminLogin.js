const express = require('express');
const router = express.Router();
const db = require('../../dbconfig');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config(); // Ensure this line is added to load environment variables
const secretkey = process.env.SECRET_KEY;
router.use(express.json());

router.post('/', (req, res) => {
    const { username, password } = req.body;

    // Query to find the user by username
    const sql = 'SELECT * FROM StoreManagers WHERE Username = ?';
    db.query(sql, [username], (err, result) => {
        if (err) {
            console.error('Database error:', err); // Added logging
            res.status(500).json({
                status: 'Server side error',
                success: false
            });
            return;
        }

        // Check if the user exists
        if (result.length > 0) {
            const user = result[0];

            // Compare the provided password with the hashed password in the database
            bcrypt.compare(password, user.Password, (err, isMatch) => {
                if (err) {
                    console.error('Bcrypt error:', err); // Added logging
                    res.status(500).json({
                        status: 'Server side error',
                        success: false
                    });
                    return;
                }

                if (isMatch) {
                    // If passwords match, generate a JWT token with an expiry of 1 hour
                    if(user.StoreID === 7){
                        const token = jwt.sign({ username: user.Username, role: 'admin' }, secretkey, { expiresIn: '1h' });
                        res.json({
                            status: 'Login Successful!',
                            success: true,
                            token: token,
                            storeID: user.StoreID,
                            role: 'admin'
                        });
                    } else {
                        const token = jwt.sign({ username: user.Username, role: 'manager' }, secretkey, { expiresIn: '1h' });
                        res.json({
                            status: 'Login Successful!',
                            success: true,
                            token: token,
                            storeID: user.StoreID,
                            role: 'manager'
                        });
                    }
                } else {
                    // If passwords do not match
                    res.status(401).json({
                        status: 'Username or password is incorrect',
                        success: false
                    });
                }
            });
        } else {
            // If user does not exist
            res.status(401).json({
                status: 'Username or password is incorrect',
                success: false
            });
        }
    });
});

module.exports = router;
