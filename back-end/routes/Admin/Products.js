const express = require("express");
const router = express.Router();
const db = require("../../dbconfig");

// Fetch all products with their categories
router.get("/", (req, res) => {
  const query = `
    SELECT 
        p.ProductID, 
        p.ProductName, 
        p.UnitPrice, 
        p.CapacityPerUnit, 
        p.AvailableStock, 
        p.Description, 
        c.CategoryName 
    FROM Products p
    JOIN ProductCategories c ON p.CategoryID = c.CategoryID
    ORDER BY c.CategoryName;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      return res.status(500).send("Error fetching products");
    }
    res.json(results);
  });
});

// Fetch all categories
router.get("/categories", (req, res) => {
  const query = "SELECT * FROM ProductCategories";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching categories:", err);
      return res.status(500).send("Error fetching categories");
    }
    res.json(results);
  });
});

// Add a product to a specific category
router.post("/categories/:categoryID/products", (req, res) => {
  const { categoryID } = req.params;
  const {
    ProductName,
    UnitPrice,
    CapacityPerUnit,
    AvailableStock,
    Description,
  } = req.body;

  const query = `
    INSERT INTO Products (ProductName, UnitPrice, CapacityPerUnit, AvailableStock, Description, CategoryID)
    VALUES (?, ?, ?, ?, ?, ?);
  `;

  db.query(
    query,
    [
      ProductName,
      UnitPrice,
      CapacityPerUnit,
      AvailableStock,
      Description,
      categoryID,
    ],
    (err, results) => {
      if (err) {
        console.error("Error adding product:", err);
        return res.status(500).send("Error adding product");
      }
      res.send("Product added successfully");
    }
  );
});

// Update product details
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { ProductName, UnitPrice, AvailableStock } = req.body;

  const query = `
    UPDATE Products 
    SET 
        ProductName = ?, 
        UnitPrice = ?, 
        AvailableStock = ? 
    WHERE 
        ProductID = ?;
  `;

  db.query(
    query,
    [ProductName, UnitPrice, AvailableStock, id],
    (err, results) => {
      if (err) {
        console.error("Error updating product:", err);
        return res.status(500).send("Error updating product");
      }
      res.send("Product updated successfully");
    }
  );
});

module.exports = router;
