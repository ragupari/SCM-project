import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';

const OrderDetailsCard = ({ orderID, submissionStatus }) => {
    const [selectedOrder, setOrder] = useState({});
    const [shipmentDetails, setShipmentDetails] = useState({});
    const shipment = shipmentDetails[0] || {};
    const [isFormValid, setIsFormValid] = useState(false);

    // Fetch the order details
    useEffect(() => {
        axios.get(`/orders/${orderID}`)
            .then(response => setOrder(response.data))
            .catch(error => console.error("Error fetching orders: ", error));

        axios.get('/shipments')
            .then(response => {
                setShipmentDetails(response.data);
                validateForm(response.data);
            })
            .catch(error => console.error("Error fetching shipment details: ", error));
    }, [submissionStatus]);

    // Get the text color based on the value
    const getTextColor = (value) => {
        return value ? 'text-success' : 'text-danger';
    };

    // Validate the form
    const validateForm = (details) => {
        const isValid = details[0] && Object.values(details[0]).every(field => field !== null);
        setIsFormValid(isValid);
    };

    // Submit all details to the backend
    const handleSubmit = () => {
        axios.post('/shipments/submit', shipmentDetails)
            .then(response => {
                console.log("Shipment details submitted successfully:", response.data);
            })
            .catch(error => console.error("Error submitting shipment details: ", error));
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
                            <i className="bi bi-calendar-date"></i>
                            <strong className={getTextColor(shipment.deliveryDate)}>  Delivery Date:</strong> {shipment.deliveryDate || 'Not selected'}
                            <br />
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
                {/* Submit button */}
                <div className="d-flex justify-content-center mt-4">
                    <Button
                        variant="danger"
                        className="rounded"
                        onClick={handleSubmit}
                        disabled={!isFormValid}
                    >
                        Submit Shipment
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default OrderDetailsCard;