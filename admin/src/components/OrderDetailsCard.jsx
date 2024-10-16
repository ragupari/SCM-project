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
        return value ? 'text-black' : 'text-danger';
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'null';
        const tempDate = new Date(dateString);
        const localDate = tempDate.toLocaleDateString('en-CA'); // 'en-CA' format gives 'YYYY-MM-DD'
        return localDate;
    };

    return (
        <Card className="mb-4 shadow-lg rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.2)', padding: '20px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37)' }}>
            <Card.Body>
                <h5 className="text-center mb-4" style={{ fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>Order Details</h5>
                <div className="row">
                    {/* Left Column */}
                    <div className="col-md-6">
                        <Card.Text style={{ fontSize: '16px', lineHeight: '1.6' }}>
                            <i className="bi bi-box-seam" style={{ fontSize: '20px', marginRight: '10px', color: '#ffdd57' }}></i>
                            <strong className={getTextColor(selectedOrder.OrderID)} style={{ fontWeight: '500', color: '#ffdd57' }}>Order ID:</strong> {selectedOrder.OrderID}
                            <br />
                            <i className="bi bi-geo-alt-fill" style={{ fontSize: '20px', marginRight: '10px', color: '#ff6b6b' }}></i>
                            <strong className={getTextColor(selectedOrder.DeliveryAddress)} style={{ fontWeight: '500', color: '#ff6b6b' }}>Delivery Address:</strong> {selectedOrder.DeliveryAddress}
                            <br />
                            <i className="bi bi-calendar-date" style={{ fontSize: '20px', marginRight: '10px', color: '#1dd1a1' }}></i>
                            <strong className={getTextColor(selectedOrder.OrderDate)} style={{ fontWeight: '500', color: '#1dd1a1' }}>Order Date:</strong> {formatDate(selectedOrder.OrderDate)}
                            <br />
                            <i className="bi bi-calendar2-check" style={{ fontSize: '20px', marginRight: '10px', color: '#48dbfb' }}></i>
                            <strong className={getTextColor(selectedOrder.DeliveryDate)} style={{ fontWeight: '500', color: '#48dbfb' }}>Delivery Time:</strong> {formatDate(selectedOrder.DeliveryDate)}
                        </Card.Text>
                    </div>
                    {/* Right Column */}
                    <div className="col-md-6">
                        <Card.Text style={{ fontSize: '16px', lineHeight: '1.6' }}>
                            <i className='bi bi-shop' style={{ fontSize: '20px', marginRight: '10px', color: '#ff6b6b' }}></i>
                            <strong className={getTextColor(selectedOrder.City)} style={{ fontWeight: '500', color: '#ff9f43' }}>Near-by Store:</strong> {selectedOrder.City}
                            <br />
                            <i className="bi bi-boxes" style={{ fontSize: '20px', marginRight: '10px', color: '#feca57' }}></i>
                            <strong className={getTextColor(selectedOrder.TotalCapacity)} style={{ fontWeight: '500', color: '#feca57' }}>Order Capacity:</strong> {selectedOrder.TotalCapacity}
                            <br />
                            <i className="bi bi-currency-dollar" style={{ fontSize: '20px', marginRight: '10px', color: '#54a0ff' }}></i>
                            <strong className={getTextColor(selectedOrder.TotalPrice)} style={{ fontWeight: '500', color: '#54a0ff' }}>Total Price:</strong> {selectedOrder.TotalPrice}
                        </Card.Text>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default OrderDetailsCard;