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
    const navigate = useNavigate();

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const orderID = query.get('OrderID');
    const orderDate = query.get('date');
    const reqCapacity = query.get('reqCapacity');

    const fetchTrainTrips = async (selectedDate) => {
        try {
            const response = await axios.get(`/traintrips?selectedDate=${selectedDate}`);
            setTrainTrips(response.data);
        } catch (error) {
            console.error('Error fetching train trips:', error);
        }
    };

    function convertToDateTime(dateString) {
        const date = new Date(dateString);
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };
        const formattedDate = date.toLocaleString(undefined, options);
        return formattedDate.replace(/GMT.*$/, '');
    }

    useEffect(() => {
        if (orderDate) {
            const newDate = new Date(orderDate);
            newDate.setDate(newDate.getDate() + 1); 
            const localDate = newDate.toLocaleDateString('en-CA');
            setDate(localDate);
            fetchTrainTrips(localDate); // Fetch train trips for the next day
        }
    }, [orderDate]);

    const handleNextDate = () => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 1);
        const localDate = newDate.toLocaleDateString('en-CA');
        setDate(localDate);
        fetchTrainTrips(localDate);
    };

    const handlePrevDate = () => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() - 1);
        const localDate = newDate.toLocaleDateString('en-CA');

        // Prevent fetching train trips for past dates
        const orderDay = new Date(orderDate);
        const orderLocalDate = orderDay.toLocaleDateString('en-CA');
        
        if (localDate < orderLocalDate) return;

        setDate(localDate);
        fetchTrainTrips(localDate);
    };

    const handleSelectTrain = async(trainId) => {
        try{
            await Promise.all([
                axios.put(`/orders/assigntraintrip/${orderID}`, { trainTripID: trainId }),
                axios.put(`/traintrips/decreasecapacity/${trainId}`, { reqCapacity })
            ]).then(() => {
                toast.success('Train Trip selected successfully!', {
                    position: "top-right",
                    autoClose: 3000,
                });
            });

            // Add a 2-second delay before navigating
            await new Promise((resolve) => setTimeout(resolve, 2000));
            navigate(`/orders`);
        } catch (error) {
            console.error('Error assigning train trip:', error);
        }
    };

    return (
        <Container fluid className="shadow-sm rounded p-4 h-100" style={{ backgroundColor: "#ffffff2f" }}>
            <h2 className="text-center mb-4">Train Trips for {date}</h2>
            <OrderDetailsCard orderID={orderID} />
            {trainTrips.length > 0 ? (
                <Row>
                    {trainTrips.map((train) => (
                        <Col key={train.TrainTripID} md={4} className="mb-4">
                            <Card className="shadow-sm rounded">
                                <Card.Body>
                                    <Card.Title>{train.City}</Card.Title>
                                    <Card.Text>
                                        Departure: {convertToDateTime(train.DepartureTime)}
                                        <br />
                                        Capacity: {train.AvailableCapacity}
                                    </Card.Text>
                                    <Button
                                        variant="outline-info" className="w-100 rounded-pill px-3 py-2"
                                        onClick={() => handleSelectTrain(train.TrainTripID)}
                                        // Disable button if train capacity is less than required capacity
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
                <Button variant="outline-primary" className="rounded-pill px-3 py-2 me-5" onClick={handlePrevDate}>
                    Prev Date
                </Button>
                <Button variant="outline-primary" className="rounded-pill px-3 py-2" onClick={handleNextDate}>
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
