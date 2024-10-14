import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DisplayCard from '../components/PageTitleCard';
import NavBar from '../components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [routeID, setRouteID] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState(''); // New state for delivery address

  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState('');
  const [routes, setRoutes] = useState([]);

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

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.UnitPrice * item.Number, 0);
  };

  // Fetch destinations
  const fetchDestinations = async () => {
    try {
      const response = await axios.get('cart2/routes/destinations');
      setDestinations(response.data);
    } catch (error) {
      console.error('Failed to fetch destinations:', error);
    }
  };

  // Fetch routes based on selected destination
  const fetchRoutesByDestination = async (destination) => {
    try {
      const response = await axios.get('cart2/routes/by-destination', {
        params: { destination },
      });
      setRoutes(response.data);
    } catch (error) {
      console.error('Failed to fetch routes:', error);
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
    fetchDestinations(); // Load destinations when component mounts
  }, []);

  // Handle destination change
  const handleDestinationChange = (event) => {
    const destination = event.target.value;
    setSelectedDestination(destination);
    fetchRoutesByDestination(destination); // Fetch routes based on selected destination
  };

  // Show modal when checkout is clicked
  const handleCheckout = () => {
    setShowModal(true); // Show the modal
  };

  // Proceed to checkout (clears the cart)
  const checkout = async () => {
    console.log('checkout', routeID, deliveryAddress);
    try {
      await axios.post('/cart2/checkout', { username, routeID, deliveryAddress }); // Include delivery address
      alert('Checkout successful!');
      fetchCartItems(username);
      setShowModal(false); // Close the modal after successful checkout
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  // Update item quantity (increment or decrement)
  const updateCartItem = async (itemId, action) => {
    try {
      const endpoint = action === 'increment' ? '/cart2/addquantity' : '/cart2/reducequantity';
      await axios.post(endpoint, { username, productID: itemId });
      fetchCartItems(username); // Fetch updated cart items
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
              <button className="btn btn-success btn-lg" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Select Your Delivery Route</h5>
              <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              {/* Destination Dropdown */}
              <label htmlFor="destinationSelect">Store</label>
              <select
                id="destinationSelect"
                className="form-select"
                value={selectedDestination}
                onChange={handleDestinationChange}
              >
                <option value="">Select Near-by Store</option>
                {destinations.map((destination) => (
                  <option key={destination.Destination} value={destination.Destination}>
                    {destination.Destination}
                  </option>
                ))}
              </select>

              {/* Route Dropdown */}
              {selectedDestination && (
                <>
                  <label htmlFor="routeSelect" className="mt-3">Route (Main Towns)</label>
                  <select
                    id="routeSelect"
                    className="form-select"
                    value={routeID}
                    onChange={(e) => setRouteID(e.target.value)}
                  >
                    <option value="">Select Route</option>
                    {routes.map((route) => (
                      <option key={route.RouteID} value={route.RouteID}>
                        {route.MainTowns}
                      </option>
                    ))}
                  </select>
                </>
              )}

              {/* Delivery Address Input */}
              <label htmlFor="deliveryAddress" className="mt-3">Delivery Address</label>
              <input
                type="text"
                id="deliveryAddress"
                className="form-control"
                placeholder="Enter delivery address"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => checkout(routeID)}
                disabled={!routeID || !deliveryAddress} // Disable if routeID or address is empty
              >
                Confirm Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
