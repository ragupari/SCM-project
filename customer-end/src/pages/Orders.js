import React, { useEffect, useState } from "react";
import axios from "axios";
import DisplayCard from '../components/PageTitleCard';
import NavBar from '../components/NavBar';

const Orders = () => {
    const [username, setUsername] = useState('');
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fecthData = async () => {
            try {
                const username = await getUsernameFromToken();
                if (!username) {
                    throw new Error('No username found in token');
                }
                const res = await axios.get(`/orders/${username}`);
                setOrders(res.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fecthData();
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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        };
        return date.toLocaleDateString(undefined, options);
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
        const steps = ['Pending', 'Processing', 'OnTheWay', 'Received'];

        return (
            <div>
                <ul className="step-line list-inline">
                    {steps.map((step, index) => {
                        // Determine if the step is completed or active
                        const isCompleted = steps.indexOf(status) > index;
                        const isActive = status === step;

                        return (
                            <li key={index} className="list-inline-item">
                                <div className={`step ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''} ${index < steps.length - 1 ? 'with-arrow' : ''}`}>
                                    <div className="step-circle">{step}</div>
                                    {statusDates[step.toLowerCase()] && (
                                        <small>{formatDate(statusDates[step.toLowerCase()])}</small>
                                    )}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    };

    return (
        <div>
            <NavBar currentPage={'My Orders'} />
            <DisplayCard title={'My Orders'} />
            <div className="container-fluid p-4">
                <div className="row">
                    {orders.map((order, index) => (
                        <div key={order.OrderID} className="col-12 col-md-6 col-lg-4 mb-4">
                            <div className="card order-card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-8">
                                            <h5 className="card-title mb-2">Order ID: {order.OrderID}</h5>
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
                                        <div className="col-4 text-end">
                                            <button
                                                onClick={() => toggleExpand(index)}
                                                className="btn btn-outline-primary"
                                            >
                                                {order.expanded ? 'Collapse' : 'Expand'}
                                            </button>
                                            {order.Status === 'OnTheWay' && (
                                                <button
                                                    onClick={() => handleReceive(order.OrderID)}
                                                    className="btn btn-outline-success mt-2"
                                                >
                                                    Mark as Received
                                                </button>
                                            )}
                                        </div>
                                    </div>
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
                                {renderStepLine(order.Status, order.StatusDates)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Orders
