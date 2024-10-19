import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import CreateTruckScheduleModal from '../components/CreateTruckScheduleModal';
import AlertBox from '../components/AlertBox';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SelectSchedule = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const storeID = localStorage.getItem('storeID');
    const orderID = query.get('OrderID');
    const routeID = query.get('routeID');
    const date = query.get('date');
    const arrivalDate = query.get('arrivalDate');
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
        RemainingCapacity: 0,
    });
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('success');
    const navigate = useNavigate();

    useEffect(() => {
        fetchTruckSchedules(date);
    }, [date]);

    const validateSchedule = () => {
        const { TruckID, DriverID, DrivingAssistantID, Date, StartTime, EndTime } = newSchedule;
        return TruckID && DriverID && DrivingAssistantID && Date && StartTime && EndTime;
    };

    const formatDate = (dateString) => {
        const tempDate = new Date(dateString);
        const localDate = tempDate.toLocaleDateString('en-CA'); // 'en-CA' format gives 'YYYY-MM-DD'
        return localDate;
    };

    const fetchTruckSchedules = async (selectedDate) => {
        try {
            const response = await axios.get(`/truck-schedules?selectedDate=${selectedDate}&storeID=${storeID}`);
            setTruckSchedules(response.data);
        } catch (error) {
            console.error('Error fetching truck schedules:', error);
        }
    };

    const handleCreateSchedule = async () => {
        if (!validateSchedule()) {
            setAlertMessage('Please select Driver, Assistant and Truck');
            setAlertType('danger');
            setShowAlert(true);
            return;
        }

        try {
            const res = await axios.get(`/trucks/${newSchedule.TruckID}`);
            const truck = res.data;
            newSchedule.RemainingCapacity = truck.Capacity;
            await axios.post('/truck-schedules', newSchedule);
            setShowCreateModal(false);
            fetchTruckSchedules(date);
            setAlertMessage('Schedule created successfully');
            setAlertType('success');
            setShowAlert(true);
            setNewSchedule({ ...newSchedule, TruckID: '', DriverID: '', DrivingAssistantID: '', StartTime: '', EndTime: '' });
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
        const localDate = newDate.toLocaleDateString('en-CA');
        if (localDate < arrivalDate) return;
        setNewSchedule({ ...newSchedule, Date: localDate, TruckID: '', DriverID: '', DrivingAssistantID: '', StartTime: '', EndTime: '' });
        navigate(`/orders/truck-schedules?OrderID=${orderID}&arrivalDate=${arrivalDate}&date=${localDate}&routeID=${routeID}&reqCapacity=${reqCapacity}`);
    };

    const handleSelectTruck = async (deliveryID) => {
        try {
            await Promise.all([
                axios.put(`/orders/assignschedule/${orderID}`, { deliveryID }),
            ]);
            await axios.put(`/truck-schedules/decreasecapacity/${deliveryID}`, { reqCapacity })
                .then(() => {
                    toast.success("Truck schedule selected successfully!", {
                        position: "top-right",
                        autoClose: 3000,
                });
            });
            // Add a 2-second delay before navigating
            await new Promise((resolve) => setTimeout(resolve, 2000));
            navigate(`/orders`);
        } catch (error) {
            console.error('Error selecting truck schedule:', error);
        }
    };

    return (
        <Container fluid className="shadow-sm rounded p-4 h-100" style={{ backgroundColor: "#ffffff2f" }}>
            <AlertBox
                show={showAlert}
                variant={alertType}
                message={alertMessage}
                onClose={() => setShowAlert(false)} // Reset the show state when alert closes
            />
            <Row className="my-4">
                <Col>
                    <Button onClick={() => handleDateChange('prev')}
                        variant="outline-primary" className="rounded-pill px-3 py-2"
                    >
                        Previous Date
                    </Button>
                </Col>
                <Col className="text-center">
                    <h2>Truck Schedules for {date}</h2>
                </Col>
                <Col className="text-end">
                    <Button onClick={() => handleDateChange('next')}
                        variant="outline-primary" className="rounded-pill px-3 py-2"
                    >
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
                            <Card.Header as="h5">Delivery Schedule: {schedule.DeliveryID}</Card.Header>
                            <Card.Body>
                                <Card.Text>Route Destination: {schedule.Destination}</Card.Text>
                                <Card.Text>Main Towns : {schedule.MainTowns}</Card.Text>
                                <Card.Text>Truck ID: {schedule.TruckID}</Card.Text>
                                <Card.Text>Driver ID: {schedule.DriverID}</Card.Text>
                                <Card.Text>Assistant ID: {schedule.DrivingAssistantID}</Card.Text>
                                <Card.Text>Date: {formatDate(schedule.Date)}</Card.Text>
                                <Card.Text>Start Time: {schedule.StartTime}</Card.Text>
                                <Card.Text>End Time: {schedule.EndTime}</Card.Text>
                                <Card.Text>Remaining Capacity: {schedule.RemainingCapacity}</Card.Text>
                                <Button
                                    variant="info"
                                    className="w-100 rounded"
                                    onClick={() => handleSelectTruck(schedule.DeliveryID)}
                                    disabled={routeID != schedule.RouteID || reqCapacity > schedule.RemainingCapacity}
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
                routeID={routeID}
                setAlertMessage={setAlertMessage}
                setAlertType={setAlertType}
                setShowAlert={setShowAlert}
            />
            <ToastContainer />
        </Container>
    );
};

export default SelectSchedule;