import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import CreateTruckScheduleModal from '../components/CreateTruckScheduleModal';

const SelectSchedule = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const storeID = localStorage.getItem('storeID');
    const orderID = query.get('OrderID');
    const routeID = query.get('routeID');
    const date = query.get('arrivalDate');
    const reqCapacity = query.get('reqCapacity');
    const [truckSchedules, setTruckSchedules] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newSchedule, setNewSchedule] = useState({
        RouteID: `${routeID}`,
        StoreID: `${storeID}`,
        TruckID: '',
        DriverID: '',
        DrivingAssistantID: '',
        Date: `${date}`,
        StartTime: '',
        EndTime: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetchTruckSchedules(date);
    }, [date]);

    const fetchTruckSchedules = async (selectedDate) => {
        try {
            const response = await axios.get(`/truck-schedules?date=${selectedDate}&storeID=${storeID}`);
            setTruckSchedules(response.data);
        } catch (error) {
            console.error('Error fetching truck schedules:', error);
        }
    };

    const handleCreateSchedule = async () => {
        try {
            await axios.post('/truck-schedules', newSchedule);
            setShowCreateModal(false);
            fetchTruckSchedules(date);
        } catch (error) {
            console.error('Error creating truck schedule:', error);
        }
    };

    const handleDateChange = (direction) => {
        const newDate = new Date(date);
        if (direction === 'prev') {
            newDate.setDate(newDate.getDate() - 1);
        } else if (direction === 'next') {
            newDate.setDate(newDate.getDate() + 1);
        }
        navigate(`/orders/truck-schedules?OrderID=${orderID}&arrivalDate=${newDate.toISOString().split('T')[0]}&routeID=${routeID}&reqCapacity=${reqCapacity}`);
    };

    const handleSelectTruck = (deliveryID) => {
        try {
            axios.put(`/orders/assignschedule/${orderID}`, { deliveryID });
            navigate(`/orders`);
        } catch (error) {
            console.error('Error selecting truck schedule:', error);
        }
    };

    return (
        <Container>
            <Row className="my-4">
                <Col>
                    <Button variant="outline-primary" onClick={() => handleDateChange('prev')}>
                        Previous Date
                    </Button>
                </Col>
                <Col className="text-center">
                    <h4>Truck Schedules for {date}</h4>
                </Col>
                <Col className="text-end">
                    <Button variant="outline-primary" onClick={() => handleDateChange('next')}>
                        Next Date
                    </Button>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col className="text-center">
                    <Button variant="outline-success" onClick={() => setShowCreateModal(true)}>
                        Create Truck Schedule
                    </Button>
                </Col>
            </Row>

            <Row>
                {truckSchedules.map((schedule) => (
                    <Col md={4} key={schedule.DeliveryID} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>Delivery ID: {schedule.DeliveryID}</Card.Title>
                                <Card.Text>Route Destination: {schedule.Destination}</Card.Text>
                                <Card.Text>Main Towns : {schedule.MainTowns}</Card.Text>
                                <Card.Text>Truck ID: {schedule.TruckID}</Card.Text>
                                <Card.Text>Driver ID: {schedule.DriverID}</Card.Text>
                                <Card.Text>Assistant ID: {schedule.DrivingAssistantID}</Card.Text>
                                <Card.Text>Date: {schedule.Date}</Card.Text>
                                <Card.Text>Start Time: {schedule.StartTime}</Card.Text>
                                <Card.Text>End Time: {schedule.EndTime}</Card.Text>
                                <Card.Text>Remaining Capacity: {schedule.RemainingCapacity}</Card.Text>
                                <Button
                                    variant="info"
                                    className="w-100 rounded"
                                    onClick={() => handleSelectTruck(schedule.DeliveryID)}
                                    disabled={routeID !== schedule.RouteID || reqCapacity > schedule.RemainingCapacity}
                                >
                                    Select Truck
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <CreateTruckScheduleModal
                show={showCreateModal}
                onHide={() => setShowCreateModal(false)}
                newSchedule={newSchedule}
                setNewSchedule={setNewSchedule}
                handleCreateSchedule={handleCreateSchedule}
                storeID={storeID}
            />
        </Container>
    );
};

export default SelectSchedule;