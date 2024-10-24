import React, { useEffect, useState } from "react";
import axios from "axios";
import DisplayCard from '../components/PageTitleCard';
import NavBar from '../components/NavBar';
import OrderTracking from "../components/OrderTracking";
import 'bootstrap/dist/css/bootstrap.min.css';

const Orders = () => {
    const [username, setUsername] = useState('');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const username = await getUsernameFromToken();
                if (!username) {
                    throw new Error('No username found in token');
                }
                const res = await axios.get(`/orders/${username}`);
                setOrders(res.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const getUsernameFromToken = async () => {
        try {
            const res = await axios.get('/tokenauth', {
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            });
            setUsername(res.data.username);
            return res.data.username;
        } catch (error) {
            console.error(error);
        }
    };

    const fetchOrders = async () => {
        try {
            const res = await axios.get(`/orders/${username}`);
            setOrders(res.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleReceive = async (orderID) => {
        try {
            await axios.put(`/orders/${orderID}`, { status: 'Received' });
            fetchOrders();
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    const toggleExpand = (index) => {
        const updatedOrders = [...orders];
        updatedOrders[index].expanded = !updatedOrders[index].expanded;
        setOrders(updatedOrders);
    };

    const renderStepLine = (status, statusDates) => {
        let currentStatus = 'Ordered';

        if (status === 'Pending') { currentStatus = 'Ordered'; }
        else if (status === 'Processing') { currentStatus = 'Packed'; }
        else if (status === 'OnTheWay') { currentStatus = 'In Transit'; }
        else if (status === 'Received') { currentStatus = 'Delivered'; }

        return (
            <OrderTracking status={currentStatus} dates={statusDates} />
        );
    };

    return (
        <div>
            <NavBar currentPage={'My Orders'} />
            <DisplayCard title={'My Orders'} />
            <div className="container-fluid p-4">
                {loading ? (
                    <div>Loading orders...</div>
                ) : orders.length === 0 ? (
                    <div className="alert alert-info text-center" role="alert">
                        No orders found.
                    </div>
                ) : (
                    <div className="row">
                        {orders.map((order, index) => (
                            <div key={order.OrderID} className="col-8 mb-4 mx-auto">
                                <div className="card order-card">
                                    {/* Card Header */}
                                    <div className="card-header d-flex justify-content-between align-items-center">
                                        <h5 className="mb-0">Order ID: {order.OrderID}</h5>
                                        <div className="d-flex gap-2">
                                            <button
                                                onClick={() => toggleExpand(index)}
                                                className="btn btn-outline-primary"
                                            >
                                                {order.expanded ? 'Collapse' : 'Expand'}
                                            </button>
                                            {order.Status === 'OnTheWay' && (
                                                <button
                                                    onClick={() => handleReceive(order.OrderID)}
                                                    className="btn btn-outline-success"
                                                >
                                                    Mark as Received
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    {/* Card Body */}
                                    <div className="card-body">
                                        <div className="row">
                                            {/* Order Summary */}
                                            <div className="col-6">
                                                <div className="d-flex align-items-center mb-2">
                                                    <span className="me-2">Total Price:</span>
                                                    <strong>${order.TotalPrice.toFixed(2)}</strong>
                                                </div>
                                                <div className="d-flex align-items-center mb-2">
                                                    <span className="me-2">Total Capacity:</span>
                                                    <strong>{order.TotalCapacity}</strong>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <span className="me-2">Status:</span>
                                                    <strong className="text-primary">{order.Status}</strong>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                {/* Horizontal Step Line */}
                                                {renderStepLine(order.Status, order.StatusDates)}
                                            </div>
                                        </div>
                                        {/* Expanded Details */}
                                        {order.expanded && (
                                            <div className="mt-3">
                                                <div className="row">
                                                    <div className="col-6">
                                                        <h6>Delivery Address:</h6>
                                                        <p className="mb-2">{order.DeliveryAddress}</p>
                                                    </div>
                                                    <div className="col-6">
                                                        <h6>Route Main Towns:</h6>
                                                        <p className="mb-2">{order.MainTowns}</p>
                                                    </div>
                                                    <div className="col-12">
                                                        <h6>Products:</h6>
                                                        <ul className="list-unstyled">
                                                            {order.Products.map((product, idx) => (
                                                                <li key={idx} className="mb-1">
                                                                    <div className="row">
                                                                        <div className="col-6">
                                                                            {product.ProductName}
                                                                        </div>
                                                                        <div className="col-6">
                                                                            {product.Quantity}
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Orders;
