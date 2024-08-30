const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser'); // Make sure this is added in your main app file

// Middleware to parse cookies
router.use(cookieParser());

router.get('/', (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        res.json({
            success: false,
            message: 'Token not provided'
        });
        return;
    } else {
        jwt.verify(token, 'secretkey', (err, decoded) => {
            if (err) {
                res.json({
                    success: false,
                    message: 'Failed to authenticate token'
                });
            } else {
                res.json({
                    success: true,
                    message: 'Token authenticated',
                    username: decoded.username
                });
            }
        });
    }

    

});

module.exports = router;
