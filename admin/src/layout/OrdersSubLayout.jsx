import React, { useState, useEffect } from 'react';
import { Card, Container, Button } from 'react-bootstrap';
import axios from 'axios';
import { Outlet } from 'react-router-dom';

const OrdersSubLayout = () => {
    const [selectedOrder, setOrder] = useState({});
    const [shipmentDetails, setShipmentDetails] = useState({
        orderID: null,
        totalCapacity: null,
        trainTripID: null,
        truckID: null,
        driverID: null,
        drivingAssistantID: null,
        routeID: null,
    });

    const query = new URLSearchParams(location.search);
    const orderID = query.get('OrderID');

    // Fetch the order details
    useEffect(() => {
        axios.get(`/orders/${orderID}`)
            .then(response => {
                setOrder(response.data);
                setShipmentDetails(prev => ({
                    ...prev,
                    totalCapacity: response.data.TotalCapacity
                }));
            })
            .catch(error => console.error("Error fetching orders: ", error));
    }, [orderID]);

    // Update shipment details from child components
    const updateShipmentDetails = (details) => {
        setShipmentDetails(prev => ({ ...prev, ...details }));
    };

    // Submit all details to the backend
    const handleSubmit = () => {
        const finalDetails = {
            OrderID: selectedOrder.OrderID,
            ...shipmentDetails,
        };

        axios.post('/orders/shipment', finalDetails)
            .then(response => {
                console.log("Shipment details submitted successfully:", response.data);
            })
            .catch(error => console.error("Error submitting shipment details: ", error));
    };

    // Check if all required fields are filled
    const isFormValid = Object.values(shipmentDetails).every(field => field !== null);

    return (
        <div>
            <Card className="mb-4 shadow-sm rounded">
                <Card.Body>
                    <h5>Order Details</h5>
                    <Card.Text>
                        <strong>Order ID:</strong> {selectedOrder.OrderID}
                        <br />
                        <strong>Customer Address:</strong> {selectedOrder.address}, {selectedOrder.city}
                        <br />
                        <strong>Order Capacity:</strong> {selectedOrder.TotalCapacity}
                        <br />
                        <strong>Train Trip:</strong> {shipmentDetails.trainTripID || 'Not selected'}
                        <br />
                        <strong>Truck:</strong> {shipmentDetails.truckID || 'Not selected'}
                        <br />
                        <strong>Driver:</strong> {shipmentDetails.driverID || 'Not selected'}
                        <br />
                        <strong>Driving Assistant:</strong> {shipmentDetails.drivingAssistantID || 'Not selected'}
                        <br />
                        <strong>Route:</strong> {shipmentDetails.routeID || 'Not selected'}
                    </Card.Text>
                </Card.Body>
            </Card>

            <Container fluid className="p-4">
                {/* Use Outlet to render child routes and pass the update function */}
                <Outlet context={{ shipmentDetails, updateShipmentDetails }} />

                <div className="d-flex justify-content-center mt-4">
                    {/* Submit the selected shipment details */}
                    <Button
                        variant="Danger"
                        className="rounded"
                        onClick={handleSubmit}
                        disabled={!isFormValid}
                    >
                        Submit Shipment
                    </Button>
                </div>
            </Container>
        </div>
    );
};

export default OrdersSubLayout;
