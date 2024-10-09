import React, { useState, useEffect } from 'react';
import { Modal, Button, ListGroup, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './Style.css';

const CreateTruckScheduleModal = ({ show, onHide, newSchedule, setNewSchedule, handleCreateSchedule, storeID, routeID }) => {
    const [trucks, setTrucks] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [assistants, setAssistants] = useState([]);
    const [timeforCompletion, setTimeforCompletion] = useState('00:00:00');

    // Fetch trucks, drivers, assistants, and route details
    useEffect(() => {
        axios.get(`/trucks/available/query?storeID=${storeID}&date=${newSchedule.Date}`)
            .then(response => setTrucks(response.data || []))
            .catch(error => console.error('Error fetching trucks:', error));

        axios.get(`/drivers/available?storeID=${storeID}&date=${newSchedule.Date}`)
            .then(response => setDrivers(response.data || []))
            .catch(error => console.error('Error fetching drivers:', error));

        axios.get(`/assistants/available?storeID=${storeID}&date=${newSchedule.Date}`)
            .then(response => setAssistants(response.data || []))
            .catch(error => console.error('Error fetching assistants:', error));

        axios.get(`/roadways/${routeID}`)
            .then(response => setTimeforCompletion(response.data.TimeforCompletion))
            .catch(error => console.error('Error fetching route details:', error));
    }, [storeID, routeID, newSchedule]);

    // Utility function to calculate the maximum time
    const getMaxTime = (...times) => {
        return times.reduce((maxTime, current) => current && current > maxTime ? current : maxTime, '00:00:00');
    };

    // Function to add time for completion to the start time
    const addTime = (startTime, completionTime) => {
        const [startHours, startMinutes, startSeconds] = startTime.split(':').map(Number);
        const [compHours, compMinutes, compSeconds] = completionTime.split(':').map(Number);
        const totalSeconds = (startHours * 3600 + startMinutes * 60 + startSeconds) +
            (compHours * 3600 + compMinutes * 60 + compSeconds);

        const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
        const seconds = (totalSeconds % 60).toString().padStart(2, '0');

        return `${hours}:${minutes}:${seconds}`;
    };

    // Recalculate start and end times based on the selected truck, driver, and assistant
    useEffect(() => {
        if (newSchedule.TruckID && newSchedule.DriverID && newSchedule.DrivingAssistantID) {
            const selectedTruck = trucks.find(truck => truck.TruckID === newSchedule.TruckID);
            const selectedDriver = drivers.find(driver => driver.DriverID === newSchedule.DriverID);
            const selectedAssistant = assistants.find(assistant => assistant.DrivingAssistantID === newSchedule.DrivingAssistantID);

            const maxAvailableTime = getMaxTime(
                selectedTruck?.LastShiftEnd,
                selectedDriver?.DriverAvailableTime,
                selectedAssistant?.DrivingAssistantAvailableTime
            );

            const calculatedEndTime = addTime(maxAvailableTime, timeforCompletion);

            // Update the schedule with calculated start and end times
            setNewSchedule({ ...newSchedule, StartTime: maxAvailableTime, EndTime: calculatedEndTime });
        }
    }, [newSchedule.TruckID, newSchedule.DriverID, newSchedule.DrivingAssistantID, trucks, drivers, assistants, timeforCompletion]);

    return (
        <Modal show={show} onHide={onHide} size='xl'>
            <Modal.Header closeButton>
                <Modal.Title>Create Truck Schedule</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={4}>
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
                                                <span className="detail-label">Last Shift End:</span>
                                                <span className="highlight-time">{truck.LastShiftEnd}</span>
                                            </div>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
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
                                                <span className="detail-label">Available Time:</span>
                                                <span className="highlight-time">{driver.DriverAvailableTime}</span>
                                            </div>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
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
                                                <span className="detail-label">Last Shift End:</span>
                                                <span className="highlight-time">{assistant.DrivingAssistantAvailableTime}</span>
                                            </div>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col md={6}>
                        <Card>
                            <Card.Header>Calculated Start Time</Card.Header>
                            <Card.Body>
                                <div className="detail-item">
                                    <span className="detail-label">Start Time:</span>
                                    <span>{newSchedule.StartTime || 'Not available'}</span>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card>
                            <Card.Header>Calculated End Time</Card.Header>
                            <Card.Body>
                                <div className="detail-item">
                                    <span className="detail-label">End Time:</span>
                                    <span>{newSchedule.EndTime || 'Not available'}</span>
                                </div>
                            </Card.Body>
                        </Card>
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
