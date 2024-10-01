const express = require('express');
const router = express.Router();
const db = require('../../dbconfig'); // Ensure dbconfig is correctly configured
router.use(express.json());

router.post('/', async (req, res) => {
    const category_ID = req.body.categoryID;

    if (!category_ID) {
        return res.status(400).json({
            status: 'Bad Request',
            success: false,
            message: 'Category ID is required'
        });
    }

    const sql = `
        SELECT p.*, c.category_name
        FROM products p
        JOIN product_categories c ON p.category_ID = c.category_ID
        WHERE p.category_ID = ?
    `;

    db.query(sql, [category_ID], (err, results) => {
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
                message: 'No products found for the given category ID'
            });
        }
        res.json({
            category_name: results[0].category_name,
            products: results
        });
    });
});

module.exports = router;
