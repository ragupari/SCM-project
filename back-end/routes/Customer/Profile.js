const express = require('express');
const router = express.Router();
const db = require('../../dbconfig');
const bcrypt = require('bcrypt');

router.post('/', (req, res) => {
    const { username } = req.body;
    const sql = 'SELECT * FROM Customers WHERE Username = ?';

    db.query(sql, [username], (err, result) => {
        if (err) {
            return err;
        }
        if (result.length > 0) {
            const user = result[0];
            res.json({ 
                'name': user.FullName, 
                'email': user.Email, 
                'img': user.Img, 
                'address': user.Address, 
                'city': user.City 
            });
        }
    });
});

router.put('/', (req, res) => {
    const { username, name, email, password, profileImg, address, city } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !password) {
        return res.status(404).json({ message: 'Required fields missing' });
    } 

    try {
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                return res.status(404).json({ message: 'Error in hashing password' });
            }
            const sqlUpdate = 'UPDATE Customers SET FullName = ?, Email = ?, Password = ?, Img = ?, Address = ?, City = ? WHERE (Username = ?)';
            db.query(sqlUpdate, [name, email, hashedPassword, profileImg, address, city, username], (err, result) => {
                if (err) {
                    return res.status(500).json({ message: 'Server side error' });
                }
                return res.status(200).json({ message: 'Profile updated successfully' });
            });
        });
    } catch (err) {
        return res.status(404).json({ message: 'Error updating profile' });
    }
});

module.exports = router;