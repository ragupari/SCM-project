import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import OrderDetailsCard from '../components/OrderDetailsCard';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TrainTripsPage = () => {
    const [trainTrips, setTrainTrips] = useState([]);
    const [date, setDate] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    
    const query = new URLSearchParams(location.search);
    const orderID = query.get('OrderID');
    const orderDate = query.get('date');
    const reqCapacity = parseInt(query.get('reqCapacity'), 10) || 0; // Ensure reqCapacity is a number
    const [selectedRoute, setSelectedRoute] = useState(query.get('routeID'));

    useEffect(() => {
        setSelectedRoute(query.get('routeID'));
    }, [location.search]);

    useEffect(() => {
        if (orderDate) {
            const newDate = new Date(orderDate);
            newDate.setDate(newDate.getDate() + 1);
            const localDate = newDate.toLocaleDateString('en-CA');
            setDate(localDate);
            fetchTrainTrips(localDate, selectedRoute); // Fetch train trips for the next day
        } else {
            // Set a default date if orderDate is not provided
            const defaultDate = new Date();
            const localDefaultDate = defaultDate.toLocaleDateString('en-CA');
            setDate(localDefaultDate);
            fetchTrainTrips(localDefaultDate, selectedRoute); // Fetch train trips for today
        }
    }, [orderDate, selectedRoute]); // Added selectedRoute to dependencies

    const fetchTrainTrips = async (selectedDate, selectedRoute) => {
        setLoading(true);
        try {
            const response = await axios.get(`/traintrips/gettrains?selectedDate=${selectedDate}&routeId=${selectedRoute}`); // Corrected 'routeID' to 'routeId'
            setTrainTrips(response.data);
        } catch (error) {
            toast.error('Error fetching train trips. Please try again.', {
                position: "top-right",
                autoClose: 3000,
            });
            console.error('Error fetching train trips:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDateChange = (increment) => {

        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + increment);
        const localDate = newDate.toLocaleDateString('en-CA');

        // Prevent fetching train trips for past dates
        if (increment < 0) {
            const orderDay = new Date(orderDate);
            const orderLocalDate = orderDay.toLocaleDateString('en-CA');
            if (localDate < orderLocalDate) return; 
        }

        setDate(localDate);
        fetchTrainTrips(localDate, selectedRoute);
    };

    const handleSelectTrain = async (trainId, capacity) => {
        // Input validation
        if (!trainId || !capacity || !date || !orderID) {
            toast.error('All fields are required.', {
                position: "top-right",
                autoClose: 3000,
            });
            return;
        }
    
        // Ensure capacity is a number
        const availableCapacity = Number(capacity);
        if (isNaN(availableCapacity) || availableCapacity <= 0) {
            toast.error('Available capacity must be a positive number.', {
                position: "top-right",
                autoClose: 3000,
            });
            return;
        }
    
        try {
            // Make the API call to assign the train trip using GET request with query parameters
            const response = await axios.post('/traintrips/assigntraintrip', { trainID:trainId, date, availableCapacity,  orderID });
    
            // Check the response status
            if (response.status === 200) {
                toast.success('Train trip assigned successfully!', {
                    position: "top-right",
                    autoClose: 3000,
                });
    
                // Navigate to orders page after a brief delay
                await new Promise(resolve => setTimeout(resolve, 2000));
                navigate(`/orders`);
            } else {
                throw new Error('Failed to assign train trip');
            }
        } catch (error) {
            toast.error('Error assigning train trip. Please try again.', {
                position: "top-right",
                autoClose: 3000,
            });
            console.error('Error assigning train trip:', error);
        }
    };

    const convertToDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return date.toLocaleString('en-CA', { dateStyle: 'short', timeStyle: 'short' });
    };

    return (
        <Container fluid className="shadow-sm rounded p-4 h-100" style={{ backgroundColor: "#ffffff2f" }}>
            <h2 className="text-center mb-4">Train Trips for {date}</h2>
            <OrderDetailsCard orderID={orderID} />
            {loading ? (
                <p className="text-center">Loading train trips...</p>
            ) : trainTrips.length > 0 ? (
                <Row>
                    {trainTrips.map((train) => (
                        <Col key={train.TrainID} md={4} className="mb-4">
                            <Card className="shadow-sm rounded">
                                <Card.Body>
                                    <Card.Title><i className="bi bi-train-front" style={{ fontSize: '20px', marginRight: '10px', color: 'red' }}></i> {train.City}</Card.Title>
                                    <Card.Text>
                                        Departure: {(train.DepartureTime)}
                                        <br />
                                        Capacity: {train.AvailableCapacity}
                                    </Card.Text>
                                    <Button
                                        variant="outline-info" 
                                        className="w-100 rounded-pill px-3 py-2"
                                        onClick={() => handleSelectTrain(train.TrainID, Number(train.AvailableCapacity-reqCapacity))}   
                                        disabled={train.AvailableCapacity < reqCapacity} 
                                    >
                                        Select Train
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <p className="text-center">No train trips available for this date.</p>
            )}
            <div className="d-flex justify-content-center mt-4 mb-4">
                <Button variant="outline-primary" className="rounded-pill px-3 py-2 me-5" onClick={() => handleDateChange(-1)}>
                    Prev Date
                </Button>
                <Button variant="outline-primary" className="rounded-pill px-3 py-2" onClick={() => handleDateChange(1)}>
                    Next Date
                </Button>
            </div>
            <Row>
                <Col>
                    {/* Google Maps iFrame */}
                    <iframe
                        title="Google Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63314.33732268998!2d79.81088162240182!3d6.927078585202556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2595f9b0a3af5%3A0xf60e3bf69be38a3a!2sColombo!5e0!3m2!1sen!2slk!4v1608237056450!5m2!1sen!2slk"
                        width="100%"
                        height="700px"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </Col>
            </Row>
            <ToastContainer/>
        </Container>
    );
};

export default TrainTripsPage;
