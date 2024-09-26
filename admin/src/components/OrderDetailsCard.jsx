import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const OrderDetailsCard = ({ shipmentDetails = [] }) => {
    const [selectedOrder, setOrder] = useState({});
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const orderID = query.get('OrderID');

    // Fetch the order details
    useEffect(() => {
        axios.get(`/orders/${orderID}`)
            .then(response => setOrder(response.data))
            .catch(error => console.error("Error fetching orders: ", error));
    }, [orderID]);

    const getTextColor = (value) => {
        return value ? 'text-success' : 'text-danger';
    };

    const shipment = shipmentDetails[0] || {};

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
                            <strong className={getTextColor(selectedOrder.address)}>  Customer Address:</strong> {selectedOrder.address}, {selectedOrder.city}
                            <br />
                            <i className="bi bi-bar-chart-fill"></i> 
                            <strong className={getTextColor(selectedOrder.TotalCapacity)}>  Order Capacity:</strong> {selectedOrder.TotalCapacity}
                            <br />
                            <i className="bi bi-calendar-date"></i> 
                            <strong className={getTextColor(shipment.date)}>  Date:</strong> {shipment.date || 'Not selected'}
                            <br />
                            <i className="bi bi-clock"></i> 
                            <strong className={getTextColor(shipment.startTime)}>  Start Time:</strong> {shipment.startTime || 'Not selected'}
                            <br />
                            <i className="bi bi-clock-history"></i> 
                            <strong className={getTextColor(shipment.endTime)}>  End Time:</strong> {shipment.endTime || 'Not selected'}
                        </Card.Text>
                    </div>
                    {/* Right Column */}
                    <div className="col-md-6">
                        <Card.Text>
                            <i className="bi bi-train-front"></i> 
                            <strong className={getTextColor(shipment.trainTripID)}>  Train Trip:</strong> {shipment.trainTripID || 'Not selected'}
                            <br />
                            <i className="bi bi-truck"></i> 
                            <strong className={getTextColor(shipment.truckID)}>  Truck:</strong> {shipment.truckID || 'Not selected'}
                            <br />
                            <i className="bi bi-person-circle"></i> 
                            <strong className={getTextColor(shipment.driverID)}>  Driver:</strong> {shipment.driverID || 'Not selected'}
                            <br />
                            <i className="bi bi-person-check-fill"></i> 
                            <strong className={getTextColor(shipment.drivingAssistantID)}>  Driving Assistant:</strong> {shipment.drivingAssistantID || 'Not selected'}
                            <br />
                            <i className="bi bi-map"></i> 
                            <strong className={getTextColor(shipment.routeID)}>  Route:</strong> {shipment.routeID || 'Not selected'}
                        </Card.Text>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default OrderDetailsCard;