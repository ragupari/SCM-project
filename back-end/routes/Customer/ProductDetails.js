const express = require('express');
const router = express.Router();
const db = require('../../dbconfig'); // Ensure dbconfig is correctly configured
router.use(express.json());

router.post('/', async (req, res) => {
    const product_ID = req.body.productID;
    if (!product_ID) {
        return res.status(400).json({
            status: 'Bad Request',
            success: false,
            message: 'Product ID is required'
        });
    }

    const sql = `
        SELECT *
        FROM products
        WHERE product_ID = ?
    `;

    db.query(sql, [product_ID], (err, results) => {
        if (err) {
            return res.status(500).json({
                status: 'Server side error',
                success: false,
                err: err
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                status: 'Not Found',
                success: false,
                message: 'No details found for the given product ID'
            });
        }
      
        res.json(results[0]);
    });
});

module.exports = router;
