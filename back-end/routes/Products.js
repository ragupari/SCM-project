const express = require('express');
const router = express.Router();
const db = require('../dbconfig'); // Assuming dbconfig is where you configure your MySQL connection

router.use(express.json());

router.post('/', async (req, res) => {
    const { categoryId } = req.body;
    if (!categoryId) {
      return res.status(400).json({ error: 'Category ID is required' });
    }
    try {
      // Query to get products for the given category ID
      const query = 'SELECT * FROM products WHERE category_ID = ?';
      const products = await queryDatabase(query, [categoryId]);
  
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching products' });
    }
  });

module.exports = router;