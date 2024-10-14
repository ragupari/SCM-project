const express = require('express');
const router = express.Router();
const db = require('../../dbconfig');

// Route to check if the cart service is running
router.get('/', async (req, res) => {
  res.send('Cart is running!');
});

// Route to add a product to the cart
router.post('/add', async (req, res) => {
  const { username, productID, number } = req.body;

  // Validate input
  if (!username || !productID || !number || isNaN(number) || number <= 0) {
    return res.status(400).json({ message: 'Username, ProductID, and a positive Number are required.' });
  }

  try {
    // Step 1: Fetch customerID using the provided username
    const customerQuery = 'SELECT CustomerID FROM Customers WHERE Username = ?';
    const [customerResult] = await db.promise().query(customerQuery, [username]);

    if (customerResult.length === 0) {
      return res.status(404).json({ message: 'Customer not found.' });
    }

    const customerID = customerResult[0].CustomerID;

    // Step 2: Check if the customer already has this product in the cart
    const selectQuery = 'SELECT Number FROM Cart WHERE CustomerID = ? AND ProductID = ?';
    const [existingItems] = await db.promise().query(selectQuery, [customerID, productID]);

    if (existingItems.length > 0) {
      // Step 3: If the product already exists, update the quantity
      const existingNumber = existingItems[0].Number;
      const newNumber = existingNumber + parseInt(number, 10);

      const updateQuery = 'UPDATE Cart SET Number = ? WHERE CustomerID = ? AND ProductID = ?';
      await db.promise().query(updateQuery, [newNumber, customerID, productID]);
      return res.status(200).json({ message: 'Cart item quantity updated successfully.' });
    } else {
      // Step 4: If the product doesn't exist, insert a new row
      const insertQuery = 'INSERT INTO Cart (CustomerID, ProductID, Number) VALUES (?, ?, ?)';
      await db.promise().query(insertQuery, [customerID, productID, parseInt(number, 10)]);
      return res.status(201).json({ message: 'New cart item added successfully.' });
    }
  } catch (error) {
    console.error('Error handling cart operation:', error);
    return res.status(500).json({ message: 'Server error.' });
  }
});

router.post('/cartitems', async (req, res) => {
    const { username } = req.body;
    
    // Validate input
    if (!username) {
        return res.status(400).json({ message: 'Username is required.' });
    }
    
    try {
        // Step 1: Fetch customerID using the provided username
        const customerQuery = 'SELECT CustomerID FROM Customers WHERE Username = ?';
        const [customerResult] = await db.promise().query(customerQuery, [username]);
    
        if (customerResult.length === 0) {
        return res.status(404).json({ message: 'Customer not found.' });
        }
    
        const customerID = customerResult[0].CustomerID;
    
        // Step 2: Fetch all items in the cart
        const cartQuery = 'SELECT c.ProductID, p.ProductName, p.UnitPrice, c.Number FROM Cart c JOIN Products p ON c.ProductID = p.ProductID WHERE c.CustomerID = ?';
        const [cartItems] = await db.promise().query(cartQuery, [customerID]);
    
        return res.status(200).json(cartItems);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        return res.status(500).json({ message: 'Server error.' });
    }
});

router.post('/addquantity', async (req, res) => {
  const { username, productID } = req.body;

  // Validate input
  if (!username || !productID) {
    return res.status(400).json({ message: 'Username and ProductID are required.' });
  }

  try {
    // Step 1: Fetch CustomerID using the provided username
    const customerQuery = 'SELECT CustomerID FROM Customers WHERE Username = ?';
    const [customerResult] = await db.promise().query(customerQuery, [username]);

    if (customerResult.length === 0) {
      return res.status(404).json({ message: 'Customer not found.' });
    }

    const customerID = customerResult[0].CustomerID;

    // Step 2: Update the quantity of the specified product in the cart
    const updateQuantityQuery = `
      UPDATE Cart 
      SET Number = Number + 1 
      WHERE CustomerID = ? AND ProductID = ?`;

    const [updateResult] = await db.promise().query(updateQuantityQuery, [customerID, productID]);

    if (updateResult.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found in the cart.' });
    } else {
      return res.status(200).json({ message: 'Cart quantity updated successfully.' });
    }

  } catch (error) {
    console.error('Error updating cart quantity:', error);
    return res.status(500).json({ message: 'Server error.' });
  }
});

router.post('/reducequantity', async (req, res) => {
  const { username, productID } = req.body;

  // Validate input
  if (!username || !productID) {
    return res.status(400).json({ message: 'Username and ProductID are required.' });
  }

  try {
    // Step 1: Fetch CustomerID using the provided username
    const customerQuery = 'SELECT CustomerID FROM Customers WHERE Username = ?';
    const [customerResult] = await db.promise().query(customerQuery, [username]);

    if (customerResult.length === 0) {
      return res.status(404).json({ message: 'Customer not found.' });
    }

    const customerID = customerResult[0].CustomerID;

    // Step 2: Fetch the current quantity of the product in the cart
    const getQuantityQuery = 'SELECT Number FROM Cart WHERE CustomerID = ? AND ProductID = ?';
    const [quantityResult] = await db.promise().query(getQuantityQuery, [customerID, productID]);

    if (quantityResult.length === 0) {
      return res.status(404).json({ message: 'Product not found in the cart.' });
    }

    const currentQuantity = quantityResult[0].Number;

    // Step 3: Ensure that the quantity is not below 1 before updating
    if (currentQuantity <= 1) {
      return res.status(400).json({ message: 'Cannot reduce quantity below 1.' });
    }

    // Step 4: Update the quantity of the specified product in the cart
    const updateQuantityQuery = `
      UPDATE Cart 
      SET Number = Number - 1 
      WHERE CustomerID = ? AND ProductID = ?`;

    const [updateResult] = await db.promise().query(updateQuantityQuery, [customerID, productID]);

    if (updateResult.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found in the cart.' });
    }

    return res.status(200).json({ message: 'Cart quantity reduced successfully.' });
  } catch (error) {
    console.error('Error updating cart quantity:', error);
    return res.status(500).json({ message: 'Server error.' });
  }
});

router.post('/removeitem', async (req, res) => {
  const { username, productID } = req.body;

  // Validate input
  if (!username || !productID) {
    return res.status(400).json({ message: 'Username and ProductID are required.' });
  }

  try {
    // Step 1: Fetch CustomerID using the provided username
    const customerQuery = 'SELECT CustomerID FROM Customers WHERE Username = ?';
    const [customerResult] = await db.promise().query(customerQuery, [username]);

    if (customerResult.length === 0) {
      return res.status(404).json({ message: 'Customer not found.' });
    }

    const customerID = customerResult[0].CustomerID;

    // Step 2: Delete the specified product from the cart
    const deleteItemQuery = `
      DELETE FROM Cart 
      WHERE CustomerID = ? AND ProductID = ?`;

    const [deleteResult] = await db.promise().query(deleteItemQuery, [customerID, productID]);

    if (deleteResult.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found in the cart.' });
    } else {
      return res.status(200).json({ message: 'Product removed from the cart successfully.' });
    }

  } catch (error) {
    console.error('Error removing item from the cart:', error);
    return res.status(500).json({ message: 'Server error.' });
  }
});

router.post('/checkout', (req, res) => {
  const { username } = req.body;

  // Step 1: Fetch the CustomerID for the given username
  const sqlGetCustomerID = 'SELECT CustomerID FROM Customers WHERE Username = ?';
  db.query(sqlGetCustomerID, [username], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching customer ID' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    const customerID = result[0].CustomerID;

    // Step 2: Fetch the items in the cart for this customer
    const sqlGetCartItems = `
      SELECT c.ProductID, c.Number AS CartQuantity, p.ProductName, p.UnitPrice, p.AvailableStock
      FROM Cart c 
      JOIN Products p ON c.ProductID = p.ProductID 
      WHERE c.CustomerID = ?`;

    db.query(sqlGetCartItems, [customerID], (err, cartItems) => {
      if (err) {
        return res.status(500).json({ error: 'Error fetching cart items' });
      }

      if (cartItems.length === 0) {
        return res.status(400).json({ error: 'Your cart is empty.' });
      }

      // Step 3: Check stock availability
      let itemsToOrder = [];
      let itemsToRemove = [];
      let totalPrice = 0;
      let totalCapacity = 0;

      cartItems.forEach(item => {
        if (item.CartQuantity <= item.AvailableStock) {
          // Item has enough stock, prepare for order insertion
          itemsToOrder.push(item);
          totalPrice += item.UnitPrice * item.CartQuantity;
          totalCapacity += item.CartQuantity; // Assume capacity is number of units for simplicity
        } else {
          // Item does not have enough stock, mark it for removal
          itemsToRemove.push(item.ProductID);
        }
      });

      if (itemsToRemove.length > 0) {
        // Step 4: Remove out-of-stock items from the cart
        const sqlRemoveItems = `
          DELETE FROM Cart 
          WHERE CustomerID = ? AND ProductID IN (?)`;
        db.query(sqlRemoveItems, [customerID, itemsToRemove], (err, result) => {
          if (err) {
            return res.status(500).json({ error: 'Error removing out-of-stock items from cart.' });
          }
        });
      }

      if (itemsToOrder.length === 0) {
        return res.status(400).json({ error: 'No items available for checkout.' });
      }

      // Step 5: Insert the order into the Orders table
      const sqlInsertOrder = `
        INSERT INTO Orders (CustomerID, OrderDate, DeliveryDate, DeliveryAddress, Status, TotalPrice, TotalCapacity, RouteID)
        VALUES (?, NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY), 'Default Address', 'Pending', ?, ?, 15)`;

      db.query(sqlInsertOrder, [customerID, totalPrice, totalCapacity], (err, result) => {
        if (err) {
          return res.status(500).json({ error: 'Error inserting order.' });
        }

        const orderID = result.insertId;

          // Step 7: Update stock for each product
          const sqlUpdateStock = `
            UPDATE Products 
            SET AvailableStock = AvailableStock - ? 
            WHERE ProductID = ?`;

          const stockUpdatePromises = itemsToOrder.map(item => 
            db.promise().query(sqlUpdateStock, [item.CartQuantity, item.ProductID])
          );

          Promise.all(stockUpdatePromises)
            .then(() => {
              // Step 8: Clear the cart for the customer
              const sqlClearCart = 'DELETE FROM Cart WHERE CustomerID = ?';
              db.query(sqlClearCart, [customerID], (err, result) => {
                if (err) {
                  return res.status(500).json({ error: 'Error clearing the cart after checkout.' });
                }

                // Step 9: Return success response
                res.status(200).json({ message: 'Order placed successfully', orderID });
              });
            })
            .catch(error => {
              console.error('Error updating stock:', error);
              res.status(500).json({ error: 'Error updating product stock.' });
            });
        });
      });
    });
  });



module.exports = router;
