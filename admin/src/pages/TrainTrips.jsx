import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import OrderDetailsCard from '../components/OrderDetailsCard';

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
            newDate.setDate(newDate.getDate() - 1); 
            const prevDateStr = newDate.toISOString().split('T')[0];
            setDate(prevDateStr);
            fetchTrainTrips(prevDateStr);
        }
    }, [orderDate]);

    const handleNextDate = () => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 1);
        const nextDateStr = newDate.toISOString().split('T')[0];
        setDate(nextDateStr);
        fetchTrainTrips(nextDateStr);
    };

    const handlePrevDate = () => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() - 1);
        const prevDateStr = newDate.toISOString().split('T')[0];
        setDate(prevDateStr);
        fetchTrainTrips(prevDateStr);
    };

    const handleSelectTrain = (trainId) => {
        try {
            axios.put('/shipments', { trainTripID: trainId })
            console.log('Train trip updated successfully');
            navigate(`/orders/roadways?OrderID=${orderID}&TrainID=${trainId}`);
        } catch (error) {
            console.error('Error updating train trip:', error);
        }
    };

    return (
        <Container fluid className="py-4">
            <OrderDetailsCard orderID={orderID} />
            <h2 className="text-center mb-4">Train Trips for {date}</h2>
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
                                        variant="info"
                                        className="w-100 rounded"
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

            <div className="d-flex justify-content-center mt-4">
                <Button variant="primary" className="rounded me-4" onClick={handlePrevDate}>
                    Prev Date
                </Button>
                <Button variant="primary" className="rounded" onClick={handleNextDate}>
                    Next Date
                </Button>
            </div>

        </Container>
    );
};

export default TrainTripsPage;
