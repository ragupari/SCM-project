import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DisplayCard from '../components/PageTitleCard'; 
import NavBar from '../components/NavBar';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetchCartItems();
    }, []);

    // Fetch all items in the cart
    const fetchCartItems = async () => {
        try {
            const response = await axios.get('/cart');
            setCartItems(response.data);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    // Update item quantity in the cart
    const updateCartItem = async (itemId, quantity) => {
        try {
            await axios.put(`/cart/${itemId}`, { quantity });
            fetchCartItems();
        } catch (error) {
            console.error('Error updating cart item:', error);
        }
    };

    // Remove an item from the cart
    const removeCartItem = async (itemId) => {
        try {
            await axios.delete(`/cart/${itemId}`);
            fetchCartItems();
        } catch (error) {
            console.error('Error removing cart item:', error);
        }
    };

    // Proceed to checkout (clears the cart)
    const checkout = async () => {
        try {
            await axios.delete('/cart');
            alert('Checkout successful!');
            fetchCartItems();
        } catch (error) {
            console.error('Error during checkout:', error);
        }
    };

    const totalAmount = cartItems.reduce(
        (total, item) => total + item.price * item.quantity
    ,0);

    return (
        <div>
            <NavBar currentPage={'Products'} />
            <DisplayCard title={'Cart'} />
            <div className="container py-5">
                {cartItems.length === 0 ? (
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
                                        <th style={{ width: '120px' }}>Quantity</th>
                                        <th>Price</th>
                                        <th>Total</th>
                                        <th style={{ width: '100px' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.productName}</td>
                                            <td>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={item.quantity}
                                                    onChange={(e) =>
                                                        updateCartItem(item.id, parseInt(e.target.value))
                                                    }
                                                    className="form-control form-control-sm"
                                                />
                                            </td>
                                            <td>${item.price}</td>
                                            <td>${(item.price * item.quantity).toFixed(2)}</td>
                                            <td>
                                                <button
                                                    className="btn btn-outline-danger btn-sm"
                                                    onClick={() => removeCartItem(item.id)}
                                                >
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan="3" className="text-end">
                                            <strong>Total Amount:</strong>
                                        </td>
                                        <td colSpan="2">${totalAmount.toFixed(2)}</td>
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
