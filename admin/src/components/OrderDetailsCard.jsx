import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';

const OrderDetailsCard = ({ orderID }) => {
    const [selectedOrder, setOrder] = useState({});

    // Fetch the order details
    useEffect(() => {
        axios.get(`/orders/getbyid/${orderID}`)
            .then(response => setOrder(response.data))
            .catch(error => console.error("Error fetching orders: ", error));
    }, [orderID]);

    // Get the text color based on the value
    const getTextColor = (value) => {
        return value ? 'text-success' : 'text-danger';
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'null';
        const tempDate = new Date(dateString);
        return tempDate.toISOString().split('T')[0];
    };

    return (
        <Card className="mb-4 shadow-sm rounded">
            <Card.Body>
                <h5 className="text-center mb-4">Order Details</h5>
                <div className="row">
                    {/* Left Column */}
                    <div className="col-md-6">
                        <Card.Text>
                            <i className="bi bi-box-seam"></i>
                            <strong className={getTextColor(selectedOrder.OrderID)}>  Order ID:</strong> {selectedOrder.OrderID}
                            <br />
                            <i className="bi bi-geo-alt-fill"></i>
                            <strong className={getTextColor(selectedOrder.DeliveryAddress)}>  Delivery Address:</strong> {selectedOrder.DeliveryAddress}
                            <br />
                            <i className="bi bi-calendar-date"></i>
                            <strong className={getTextColor(selectedOrder.OrderDate)}>  Order Date:</strong> {formatDate(selectedOrder.OrderDate)}
                            <br />
                            <i className="bi bi-calendar2-check"></i>
                            <strong className={getTextColor(selectedOrder.DeliveryDate)}>  Delivery Time:</strong> {formatDate(selectedOrder.DeliveryDate)}
                        </Card.Text>
                    </div>
                    {/* Right Column */}
                    <div className="col-md-6">
                        <Card.Text>
                            <i className="bi bi-boxes"></i>
                            <strong className={getTextColor(selectedOrder.TotalCapacity)}>  Order Capacity:</strong> {selectedOrder.TotalCapacity}
                            <br />
                            <i className="bi bi-currency-dollar"></i>
                            <strong className={getTextColor(selectedOrder.TotalPrice)}>  Total Price:</strong> {selectedOrder.TotalPrice}
                        </Card.Text>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default OrderDetailsCard;