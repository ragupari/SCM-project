import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import OrderDetailsCard from '../components/OrderDetailsCard';

function SelectResource() {
    const [trucks, setTrucks] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [assistants, setAssistants] = useState([]);

    const [selectedTruck, setSelectedTruck] = useState('');
    const [selectedDriver, setSelectedDriver] = useState('');
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

    const handleSubmit = () => {
        try{
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

            {/* Truck Selection */}
            <Card className="mb-4">
                <Card.Header>Select Truck</Card.Header>
                <Card.Body>
                    <Form.Group>
                        <Form.Label>Truck</Form.Label>
                        <Form.Control as="select" value={selectedTruck} onChange={(e) => setSelectedTruck(e.target.value)}>
                            <option value="">Select a Truck</option>
                            {trucks.map(truck => (
                                <option key={truck.TruckID} value={truck.TruckID}>
                                    {`Truck ID: ${truck.TruckID}, Capacity: ${truck.Capacity}, Available Date: ${truck.TruckAvailableDate}, Last Shift End: ${truck.LastShiftEnd}`}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Card.Body>
            </Card>

            {/* Driver Selection */}
            <Card className="mb-4">
                <Card.Header>Select Driver</Card.Header>
                <Card.Body>
                    <Form.Group>
                        <Form.Label>Driver</Form.Label>
                        <Form.Control as="select" value={selectedDriver} onChange={(e) => setSelectedDriver(e.target.value)}>
                            <option value="">Select a Driver</option>
                            {drivers.map(driver => (
                                <option key={driver.DriverID} value={driver.DriverID}>
                                    {`Driver ID: ${driver.DriverID}, Work Hours: ${driver.WorkHours}, Available Date: ${driver.DriverAvailableDate}, Available Time: ${driver.DriverAvailableTime}`}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Card.Body>
            </Card>

            {/* Assistant Selection */}
            <Card className="mb-4">
                <Card.Header>Select Assistant</Card.Header>
                <Card.Body>
                    <Form.Group>
                        <Form.Label>Assistant</Form.Label>
                        <Form.Control as="select" value={selectedAssistant} onChange={(e) => setSelectedAssistant(e.target.value)}>
                            <option value="">Select an Assistant</option>
                            {assistants.map(assistant => (
                                <option key={assistant.DriverAssistantID} value={assistant.DriverAssistantID}>
                                    {`Assistant ID: ${assistant.DriverAssistantID}, Work Hours: ${assistant.WorkHours}, Available Date: ${assistant.DriverAssistantAvailableDate}, Last Shift End: ${assistant.LastShiftEnd}`}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Card.Body>
            </Card>

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
