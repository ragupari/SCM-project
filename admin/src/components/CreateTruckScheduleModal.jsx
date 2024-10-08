import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, ListGroup, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import PreviousShipment from './PreviousShipment';
import './Style.css';

const CreateTruckScheduleModal = ({ show, onHide, newSchedule, setNewSchedule, handleCreateSchedule, storeID }) => {
    const [trucks, setTrucks] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [assistants, setAssistants] = useState([]);

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
    }, [storeID]);

    const formatDate = (dateString) => {
        if (!dateString) return 'null';
        const date = new Date(dateString);
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        };
        return date.toLocaleDateString(undefined, options);
    };

    return (
        <Modal show={show} onHide={onHide} size='xl'>
            <Modal.Header closeButton>
                <Modal.Title>Create Truck Schedule</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={6}>
                        <Card>
                            <Card.Header>Select Truck</Card.Header>
                            <Card.Body>
                                <ListGroup>
                                    {trucks.map(truck => (
                                        <ListGroup.Item
                                            key={truck.TruckID}
                                            action
                                            active={newSchedule.TruckID === truck.TruckID}
                                            onClick={() => setNewSchedule({ ...newSchedule, TruckID: truck.TruckID })}
                                        >
                                            <div className="detail-item">
                                                <span className="detail-label">Truck ID:</span>
                                                <span>{truck.TruckID}</span>
                                                <span className="detail-label">Capacity:</span>
                                                <span>{truck.Capacity}</span>
                                            </div>
                                            <div className="detail-item">
                                                <span className="detail-label">Available Date:</span>
                                                <span>{formatDate(truck.TruckAvailableDate)}</span>
                                                <span className="detail-label">Last Shift End:</span>
                                                <span>{truck.LastShiftEnd}</span>
                                            </div>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className='mb-4' md={6}>
                        <Card>
                            <Card.Header>Most Recent Schedules</Card.Header>
                            <Card.Body>
                                <PreviousShipment type={'truckLogs'} ID={newSchedule.TruckID} />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Card>
                            <Card.Header>Select Driver</Card.Header>
                            <Card.Body>
                                <ListGroup>
                                    {drivers.map(driver => (
                                        <ListGroup.Item
                                            key={driver.DriverID}
                                            action
                                            active={newSchedule.DriverID === driver.DriverID}
                                            onClick={() => setNewSchedule({ ...newSchedule, DriverID: driver.DriverID })}
                                        >
                                            <div className="detail-item">
                                                <span className="detail-label">Driver ID:</span>
                                                <span>{driver.DriverID}</span>
                                                <span className="detail-label">Work Hours:</span>
                                                <span>{driver.WorkHours}</span>
                                            </div>
                                            <div className="detail-item">
                                                <span className="detail-label">Available Date:</span>
                                                <span>{formatDate(driver.DriverAvailableDate)}</span>
                                                <span className="detail-label">Available Time:</span>
                                                <span>{driver.DriverAvailableTime}</span>
                                            </div>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className='mb-4' md={6}>
                        <Card>
                            <Card.Header>Most Recent Schedules</Card.Header>
                            <Card.Body>
                                <PreviousShipment type={'driverLogs'} ID={newSchedule.DriverID} />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Card>
                            <Card.Header>Select Assistant</Card.Header>
                            <Card.Body>
                                <ListGroup>
                                    {assistants.map(assistant => (
                                        <ListGroup.Item
                                            key={assistant.DrivingAssistantID}
                                            action
                                            active={newSchedule.DrivingAssistantID === assistant.DrivingAssistantID}
                                            onClick={() => setNewSchedule({ ...newSchedule, DrivingAssistantID: assistant.DrivingAssistantID })}
                                        >
                                            <div className="detail-item">
                                                <span className="detail-label">Assistant ID:</span>
                                                <span>{assistant.DrivingAssistantID}</span>
                                                <span className="detail-label">Work Hours:</span>
                                                <span>{assistant.WorkHours}</span>
                                            </div>
                                            <div className="detail-item">
                                                <span className="detail-label">Available Date:</span>
                                                <span>{formatDate(assistant.DrivingAssistantAvailableDate)}</span>
                                                <span className="detail-label">Last Shift End:</span>
                                                <span>{assistant.LastShiftEnd}</span>
                                            </div>
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
                                <PreviousShipment type={'assistantLogs'} ID={newSchedule.DrivingAssistantID} />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Start Time</Form.Label>
                            <Form.Control
                                type="time"
                                value={newSchedule.StartTime}
                                onChange={(e) => setNewSchedule({ ...newSchedule, StartTime: e.target.value })}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>End Time</Form.Label>
                            <Form.Control
                                type="time"
                                value={newSchedule.EndTime}
                                onChange={(e) => setNewSchedule({ ...newSchedule, EndTime: e.target.value })}
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleCreateSchedule}>
                    Save Schedule
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateTruckScheduleModal;