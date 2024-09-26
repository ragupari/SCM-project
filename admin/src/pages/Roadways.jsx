import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, ListGroup, Image } from 'react-bootstrap';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';

const RouteSelector = () => {
    const { updateShipmentDetails } = useOutletContext();
    const [routes, setRoutes] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    const query = new URLSearchParams(location.search);
    const TrainID = query.get('TrainID');
    const orderID = query.get('OrderID');

    // Fetch the roadways from the database
    useEffect(() => {
        axios.get(`/roadways/${TrainID}`)
            .then(response => {
                setRoutes(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the routes!', error);
            });
    }, []);

    const handleRouteSelect = (route) => {
        setSelectedRoute(route);
    };

    const handleNextPage = () => {
        try {
            axios.put(`/shipments`, { routeID: selectedRoute.RouteID });
            updateShipmentDetails();
            console.log('RouteID updated successfully:');
            navigate(`/orders/driver?OrderID=${orderID}&storeID=${selectedRoute.StoreID}`);
        }
        catch (error) {
            console.error('Error updating shipment details:', error);
        }
    };

    return (
        <Container fluid>
            <Row>
                <Col md={4}>
                    <h4>Select a Route</h4>
                    <ListGroup>
                        {routes.map((route, index) => (
                            <ListGroup.Item
                                key={index}
                                action
                                onClick={() => handleRouteSelect(route)}
                                active={selectedRoute && selectedRoute.Destination === route.Destination}
                            >
                                {`${route.City} -> ${route.MainTowns !== 'N/A' ? route.MainTowns + '->' : ''}${route.Destination}`}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>

                <Col md={4}>
                    {selectedRoute ? (
                        <>
                            <h4>Route Information</h4>
                            <p><strong>Destination:</strong> {selectedRoute.Destination}</p>
                            <p><strong>Time to Completion:</strong> {selectedRoute.TimeToCompletion} h</p>
                            <p><strong>Main Towns:</strong> {selectedRoute.MainTowns}</p>

                            <div className="d-flex mt-3">
                                <Button variant="primary" onClick={handleNextPage}>
                                    Select Route
                                </Button>
                            </div>
                        </>
                    ) : (
                        <p>Please select a route to see the details.</p>
                    )}
                </Col>
                <Col md={4}>
                    {/* Google Maps iFrame */}
                    <iframe
                        title="Google Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63314.33732268998!2d79.81088162240182!3d6.927078585202556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2595f9b0a3af5%3A0xf60e3bf69be38a3a!2sColombo!5e0!3m2!1sen!2slk!4v1608237056450!5m2!1sen!2slk"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </Col>
            </Row>
        </Container>
    );
};

export default RouteSelector;
