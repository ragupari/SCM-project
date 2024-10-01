import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import OrderDetailsCard from '../components/OrderDetailsCard';
import PreviousShipment from '../components/PreviousShipment';

function SelectResource() {
    const [trucks, setTrucks] = useState([]);
    const [selectedTruck, setSelectedTruck] = useState('');

    const [drivers, setDrivers] = useState([]);
    const [selectedDriver, setSelectedDriver] = useState('');

    const [assistants, setAssistants] = useState([]);
    const [selectedAssistant, setSelectedAssistant] = useState('');

    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [submissionStatus, setSubmissionStatus] = useState(false);

    const location = useLocation();

    const query = new URLSearchParams(location.search);
    const storeID = query.get('storeID');
    const orderID = query.get('OrderID');

    useEffect(() => {
        // Fetch trucks from backend
        axios.get(`/trucks/available/${storeID}`)
            .then(response => setTrucks(response.data))
            .catch(error => console.error('Error fetching trucks:', error));

        // Fetch drivers from backend
        axios.get(`/drivers/available/${storeID}`)
            .then(response => setDrivers(response.data))
            .catch(error => console.error('Error fetching drivers:', error));

        // Fetch assistants from backend
        axios.get(`/assistants/available/${storeID}`)
            .then(response => setAssistants(response.data))
            .catch(error => console.error('Error fetching assistants:', error));
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return 'null';
        const date = new Date(dateString);
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        };
        return date.toLocaleDateString(undefined, options);
    }

    const handleSubmit = () => {
        try {
            axios.put(`/shipments`, {
                truckID: selectedTruck,
                driverID: selectedDriver,
                drivingAssistantID: selectedAssistant,
                date: date,
                startTime: startTime,
                endTime: endTime
            }).then(() => {
                setSubmissionStatus(prevStatus => !prevStatus);
                console.log('Shipment details updated successfully:');
            });
        }
        catch (error) {
            console.error('Error updating shipment details:', error);
        }
    };

    return (
        <Container className="mt-4">
            <OrderDetailsCard orderID={orderID} submissionStatus={submissionStatus} />
            <h1 className="mb-4 text-center">Select Truck, Driver and Assistant</h1>

            <Row>
                <Col className='mb-4' md={6}>
                    {/* Truck Selection */}
                    <Card>
                        <Card.Header>Select Truck</Card.Header>
                        <Card.Body>
                            <ListGroup>
                                {trucks.map(truck => (
                                    <ListGroup.Item
                                        key={truck.TruckID}
                                        action
                                        active={selectedTruck === truck.TruckID}
                                        onClick={() => setSelectedTruck(truck.TruckID)}
                                    >
                                        {`Truck ID: ${truck.TruckID}, Capacity: ${truck.Capacity}, Available Date: ${formatDate(truck.TruckAvailableDate)}, Last Shift End: ${truck.LastShiftEnd}`}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className='mb-4' md={6}>
                    <Card>
                        <Card.Header>Most Recent Shipments</Card.Header>
                        <Card.Body>
                            <PreviousShipment type={'truckLogs'} ID={selectedTruck} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col className='mb-4' md={6}>
                    {/* Driver Selection */}
                    <Card>
                        <Card.Header>Select Driver</Card.Header>
                        <Card.Body>
                            <ListGroup>
                                {drivers.map(driver => (
                                    <ListGroup.Item
                                        key={driver.DriverID}
                                        action
                                        active={selectedDriver === driver.DriverID}
                                        onClick={() => setSelectedDriver(driver.DriverID)}
                                    >
                                        {`Driver ID: ${driver.DriverID}, Work Hours: ${driver.WorkHours}, Available Date: ${formatDate(driver.DriverAvailableDate)}, Available Time: ${driver.DriverAvailableTime}`}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className='mb-4' md={6}>
                    <Card>
                        <Card.Header>Most Recent Shipments</Card.Header>
                        <Card.Body>
                            <PreviousShipment type={'driverLogs'} ID={selectedDriver} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col className='mb-4' md={6}>
                    {/* Assistant Selection */}
                    <Card className="mb-4">
                        <Card.Header>Select Assistant</Card.Header>
                        <Card.Body>
                            <ListGroup>
                                {assistants.map(assistant => (
                                    <ListGroup.Item
                                        key={assistant.DriverAssistantID}
                                        action
                                        active={selectedAssistant === assistant.DriverAssistantID}
                                        onClick={() => setSelectedAssistant(assistant.DriverAssistantID)}
                                    >
                                        {`Assistant ID: ${assistant.DriverAssistantID}, Work Hours: ${assistant.WorkHours}, Available Date: ${formatDate(assistant.DriverAssistantAvailableDate)}, Last Shift End: ${assistant.LastShiftEnd}`}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className='mb-4' md={6}>
                    <Card>
                        <Card.Header>Most Recent Shipments</Card.Header>
                        <Card.Body>
                            <PreviousShipment type={'assistantLogs'} ID={selectedAssistant} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Date and Time Selection */}
            <Card className="mb-4">
                <Card.Header>Select Date and Time</Card.Header>
                <Card.Body>
                    <Row>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Select Date</Form.Label>
                                <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Start Time</Form.Label>
                                <Form.Control type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>End Time</Form.Label>
                                <Form.Control type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                            </Form.Group>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <Button variant="primary" onClick={handleSubmit}>Submit</Button>
        </Container>
    );
}

export default SelectResource;
