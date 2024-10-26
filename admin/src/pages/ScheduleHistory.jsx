import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Button, Collapse, Row, Col, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ScheduleHistory = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [deliveries, setDeliveries] = useState([]);
    const [expandedDelivery, setExpandedDelivery] = useState(null);
    const [orders, setOrders] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orderDetails, setOrderDetails] = useState([]);
    const storeID = localStorage.getItem('storeID');

    // Fetch deliveries for the selected date
    const fetchDeliveries = async (date) => {
        try {
            const response = await axios.get(`/truck-schedules?selectedDate=${date.toISOString().split('T')[0]}&storeID=${storeID}`);
            setDeliveries(response.data);
        } catch (error) {
            console.error("Error fetching deliveries", error);
        }
    };

    // Fetch orders for a specific delivery
    const fetchOrders = async (deliveryId) => {
        try {
            const response = await axios.get(`/orders/getbyDeliveryID/${deliveryId}`);
            setOrders(response.data);
        } catch (error) {
            console.error("Error fetching orders", error);
        }
    };

    // Fetch Order Details
    const fetchOrderDetails = async (orderID) => {
        try {
            const response = await axios.get(`/orders/getProducts/${orderID}`);
            setOrderDetails(response.data);
        } catch (error) {
            console.error("Error fetching order details", error);
        }
    };

    useEffect(() => {
        fetchDeliveries(selectedDate);
    }, [selectedDate]);

    const handleOrderClick = (order) => {
        setSelectedOrder(order);
        fetchOrderDetails(order.OrderID);
        setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

    const formatDate = (dateString) => {
        const tempDate = new Date(dateString);
        const localDate = tempDate.toLocaleDateString('en-CA'); // 'en-CA' format gives 'YYYY-MM-DD'
        return localDate;
    }

    return (
        <Container fluid className="shadow-sm rounded p-4 h-100" style={{ backgroundColor: "#ffffff2f" }}>
            <Row className="mb-4">
                <Col className="d-flex flex-column align-items-center">
                    <h2 className="text-center mb-3" style={{ fontWeight: "600", color: "#333" }}>Delivery History</h2>
                    <DatePicker className="form-control mb-4" selected={selectedDate} onChange={(date) => setSelectedDate(date)} dateFormat="yyyy-MM-dd" />
                </Col>
            </Row>
            {deliveries.map((delivery) => (
                <Card key={delivery.DeliveryID} className="mb-3">
                    <Card.Header>
                        <Row>
                            <Col md={10}>
                                <Row>
                                    <span style={{ fontWeight: "500", textTransform: "uppercase", letterSpacing: "0.05em" }}>Delivery ID: {delivery.DeliveryID}</span>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <span>Truck ID: {delivery.TruckID}</span>
                                        <br />
                                        <span>Start: {delivery.StartTime}</span>
                                    </Col>
                                    <Col md={4}>
                                        <span>Driver ID: {delivery.DriverID}</span>
                                        <br />
                                        <span>End: {delivery.EndTime}</span>
                                    </Col>
                                    <Col md={4}>
                                        <span>Assistant ID : {delivery.DrivingAssistantID}</span>
                                        <br />
                                        <span>Destination: {delivery.Destination}</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={2} className="d-flex align-items-center justify-content-end">
                                <Button
                                    variant="primary"
                                    onClick={() => {
                                        setExpandedDelivery(delivery.DeliveryID);
                                        fetchOrders(delivery.DeliveryID);
                                    }}
                                >
                                    View Orders
                                </Button>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Collapse in={expandedDelivery === delivery.DeliveryID}>
                        <div>
                            <Card.Body>
                                {orders.length > 0 ? (
                                    <ul>
                                        {orders.map((order) => (
                                            <li key={order.OrderID} onClick={() => handleOrderClick(order)} style={{ cursor: "pointer" }}>
                                                Order ID: {order.OrderID} - {order.DeliveryAddress}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No orders found for this delivery.</p>
                                )}
                            </Card.Body>
                        </div>
                    </Collapse>
                </Card>
            ))}
            {/* Modal for showing order details */}
            <Modal show={showModal} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Order Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedOrder ? (
                        <Row>
                            <Col md={6}>
                                <Card>
                                    <Card.Body>
                                        <p><strong>Customer ID:</strong> {selectedOrder.CustomerID}</p>
                                        <p><strong>Order ID:</strong> {selectedOrder.OrderID}</p>
                                        <p><strong>Delivery Address:</strong> {selectedOrder.DeliveryAddress}</p>
                                        <p><strong>Order Date:</strong> {formatDate(selectedOrder.OrderDate)}</p>
                                        <p><strong>Total Price:</strong> {selectedOrder.TotalPrice}</p>
                                        <p><strong>Total Capacity:</strong> {selectedOrder.TotalCapacity}</p>
                                        <p><strong>Status:</strong> {selectedOrder.Status}</p>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card>
                                    <Card.Header>Products</Card.Header>
                                    <Card.Body>
                                        {orderDetails.map((product, index) => (
                                            <Row key={index}>
                                                <Col md={8}> <strong>{product.ProductName}</strong></Col>
                                                <Col md={2}> {product.Quantity}</Col>
                                                <Col md={2}> ${product.Cost}</Col>
                                            </Row>
                                        ))}
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    ) : (
                        <p>Loading order details...</p>
                    )}
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default ScheduleHistory;
