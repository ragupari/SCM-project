import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import OrderDetailsCard from '../components/OrderDetailsCard';

const OrdersSubLayout = () => {
    const [shipmentDetails, setShipmentDetails] = useState({});
    const isFormValid = shipmentDetails[0] && Object.values(shipmentDetails[0]).every(field => field !== null); // Check if all required fields are filled

    // Fetch the shipment details
    const updateShipmentDetails = () => {
        axios.get('/shipments')
        .then(response => {
            setShipmentDetails(response.data);
        })
        .catch(error => console.error("Error fetching shipment details: ", error));
    };

    // Fetch shipment details on component mount
    useEffect(() => {
        updateShipmentDetails();
    }, []);

    // Submit all details to the backend
    const handleSubmit = () => {
        axios.post('/shipments/submit')
            .then(response => {
                console.log("Shipment details submitted successfully:", response.data);
            })
            .catch(error => console.error("Error submitting shipment details: ", error));
    };

    return (
        <div>
            {/* Display the order details */}
            <OrderDetailsCard shipmentDetails={shipmentDetails} />
            {/* Container for the child routes */}
            <Container fluid className="p-4">
                {/* Use Outlet to render child routes */}
                <Outlet context={{ shipmentDetails, updateShipmentDetails }} />
                {/* Submit button */}
                <div className="d-flex justify-content-center mt-4">
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
