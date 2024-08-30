const express = require('express');
const router = express.Router();
const db = require('../dbconfig');
const bcrypt = require('bcrypt');
router.use(express.json());


router.post('/', async (req, res) => {
    const { fullName, email, username, password, confirmPassword } = req.body;

    // Check if all required fields are provided
    if (!fullName || !email || !username || !password || !confirmPassword) {
        return res.json({
            status: 'Please provide fullName, email, username, password, and confirmPassword',
            success: false
        });
    }

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
        return res.json({
            status: 'Password and confirmPassword do not match',
            success: false
        });
    }

    try {
        // Check if the email or username already exists
        const sqlCheck = 'SELECT * FROM customers WHERE email = ? OR username = ?';
        db.query(sqlCheck, [email, username], (err, result) => {
            if (err) {
                res.json({
                    status: 'Server side error',
                    success: false,
                    err: err
                });
                return;
            }
            if (result.length > 0) {
                res.json({
                    status: 'Email or username already exists',
                    success: false
                });
            } else {
                // Hash the password
                bcrypt.hash(password, 10, (err, hashedPassword) => {
                    if (err) {
                        res.json({
                            status: 'Error in hashing password',
                            success: false
                        });
                        return;
                    }

                    // Insert new user into the database
                    const sqlInsert = 'INSERT INTO customers (fullName, email, username, password) VALUES (?, ?, ?, ?)';
                    db.query(sqlInsert, [fullName, email, username, hashedPassword], (err, result) => {
                        if (err) {
                            res.json({
                                status: 'Server side error',
                                success: false,
                                err: err
                            });
                            return;
                        }
                        res.json({
                            status: 'User registered successfully!',
                            success: true
                        });
                    });
                });
            }
        });
    } catch (err) {
        res.json({
            status: 'Server side error',
            success: false,
            err: err
        });
    }
});

module.exports = router;
