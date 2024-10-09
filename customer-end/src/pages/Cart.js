import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DisplayCard from '../components/PageTitleCard';
import NavBar from '../components/NavBar';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the username from the token
  const getUsernameFromToken = async () => {
    try {
      const res = await axios.get('/tokenauth', {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      });
      setUsername(res.data.username);
      return res.data.username;
    } catch (error) {
      console.error(error);
      setError('Failed to get username from token.');
      setLoading(false);
    }
  };

  // Fetch items in the cart using the retrieved username
  const fetchCartItems = async (username) => {
    try {
      const response = await axios.post('/cart2/cartitems', { username });
      setCartItems(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadCartItems = async () => {
      const retrievedUsername = await getUsernameFromToken();
      if (retrievedUsername) {
        fetchCartItems(retrievedUsername);
      }
    };
    loadCartItems();
  }, []);

  // Calculate total amount for the cart
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.UnitPrice * item.Number, 0);
  };

  // Proceed to checkout (clears the cart)
  const checkout = async () => {
    try {
      await axios.post('/cart2/checkout', { username });
      alert('Checkout successful!');
      fetchCartItems(username);
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  // Update item quantity (increment or decrement)
  const updateCartItem = async (itemId, action) => {
    try {
      // Choose the appropriate endpoint based on action
      console.log(username);
      console.log(itemId);
      console.log(action);
      const endpoint = action === 'increment' ? '/cart2/addquantity' : '/cart2/reducequantity';
      await axios.post(endpoint, { username, productID: itemId });
      // Fetch updated cart items to reflect changes in the UI
      fetchCartItems(username);
    } catch (error) {
      console.error('Failed to update item quantity:', error);
    }
  };

  // Remove item from cart
  const removeCartItem = async (itemId) => {
    try {
      await axios.post('/cart2/removeitem', { username, productID: itemId });
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  };
  

  return (
    <div>
      <NavBar currentPage={'Cart'} />
      <DisplayCard title={'Cart'} />
      <div className="container py-5">
        {loading ? (
          <div className="alert alert-info text-center" role="alert">
            Loading cart items...
          </div>
        ) : error ? (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        ) : cartItems.length === 0 ? (
          <div className="alert alert-info text-center" role="alert">
            Your cart is empty.
          </div>
        ) : (
          <>
            <div className="table-responsive border rounded-3 shadow-sm">
              <table className="table table-hover align-middle" style={{ tableLayout: 'fixed' }}>
                <thead className="table-light">
                  <tr>
                    <th>Product Name</th>
                    <th className="d-none d-sm-table-cell" style={{ width: '120px' }}>
                      Quantity
                    </th>
                    <th className="d-none d-md-table-cell">Price</th>
                    <th className="d-none d-lg-table-cell">Total</th>
                    <th style={{ width: '100px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td>{item.ProductName}</td>
                      <td className="d-none d-sm-table-cell">
                        <div className="input-group">
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => updateCartItem(item.ProductID, 'decrement')}
                            disabled={item.Number <= 1} // Disable if quantity is 1
                          >
                            -
                          </button>
                          <span className="form-control text-center">{item.Number}</span>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => updateCartItem(item.ProductID, 'increment')}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="d-none d-md-table-cell">${item.UnitPrice}</td>
                      <td className="d-none d-lg-table-cell">${(item.UnitPrice * item.Number).toFixed(2)}</td>
                      <td>
                        <button
                          className="btn btn-lg"
                          style={{ color: 'red' }}
                          onClick={() => removeCartItem(item.ProductID)}
                        >
                          <i className="bi bi-dash-square"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="3" className="text-end d-none d-lg-table-cell">
                      <strong>Total Amount:</strong>
                    </td>
                    <td colSpan="3" className="text-end d-lg-none">
                      <strong>Total:</strong>
                    </td>
                    <td colSpan="2">${calculateTotalAmount().toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="d-flex justify-content-end mt-3">
              <button className="btn btn-success btn-lg" onClick={checkout}>
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
