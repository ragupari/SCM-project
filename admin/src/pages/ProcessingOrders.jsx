import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container, Row, Col, Pagination } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);  // State for pagination
    const [ordersPerPage] = useState(10);  // Rows per page
    const navigate = useNavigate();
    const storeID = localStorage.getItem('storeID');

    // Fetch pending orders
    useEffect(() => {
        axios.get(`/orders?status=processing&storeID=${storeID}`)
            .then(response => setOrders(response.data))
            .catch(error => console.error("Error fetching orders: ", error));
    }, [storeID]);

    // Function to format date
    const formatDate = (dateString) => {
        const tempDate = new Date(dateString);
        return tempDate.toISOString().split('T')[0];
    };

    const handleAssign = (orderID, departureTime, routeID, reqCapacity) => {
        const newDate = new Date(departureTime);
        newDate.setDate(newDate.getDate() + 1);
        const nextDateStr = newDate.toISOString().split('T')[0];
        navigate(`/orders/truck-schedules?OrderID=${orderID}&arrivalDate=${nextDateStr}&date=${nextDateStr}&routeID=${routeID}&reqCapacity=${reqCapacity}`);
    };

    // Logic for displaying current page orders
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Render pagination numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(orders.length / ordersPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <Container fluid className="shadow-sm rounded p-4" style={{ backgroundColor: "#ffffff2f" }}>
            <Row className="mb-4">
                <Col>
                    <h2 className="text-center" style={{ fontWeight: "600", color: "#333" }}>Processing Orders</h2>
                </Col>
            </Row>
            <Table striped bordered hover responsive className="shadow-sm rounded bg-white" style={{ borderCollapse: "separate", borderSpacing: "0 10px" }}>
                <thead className="bg-light" style={{ borderBottom: "2px solid #dee2e6" }}>
                    <tr style={{ textAlign: "center", fontWeight: "500", color: "#666", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        <th style={{ padding: "15px" }}>Order ID</th>
                        <th>Customer ID</th>
                        <th>Order Date</th>
                        <th>Arrival Date</th>
                        <th>Delivery Date</th>
                        <th>Total Price</th>
                        <th>Total Capacity</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentOrders.map(order => (
                        <tr key={order.OrderID} style={{ textAlign: "center", color: "#333", backgroundColor: "#fff", borderBottom: "1px solid #e9ecef" }}>
                            <td style={{ padding: "15px" }}>{order.OrderID}</td>
                            <td>{order.CustomerID}</td>
                            <td>{formatDate(order.OrderDate)}</td>
                            <td>{formatDate(order.DepartureTime)}</td>
                            <td>{formatDate(order.DeliveryDate)}</td>
                            <td>{order.TotalPrice}</td>
                            <td>{order.TotalCapacity}</td>
                            <td>
                                <Button onClick={() => handleAssign(order.OrderID, order.DepartureTime, order.RouteID, order.TotalCapacity)}
                                    variant="outline-primary" className="rounded-pill px-3 py-2">
                                    Schedule 
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Pagination */}
            <Pagination className="justify-content-center mt-4">
                {pageNumbers.map(number => (
                    <Pagination.Item
                        key={number}
                        active={number === currentPage}
                        onClick={() => paginate(number)}
                        className="rounded"
                        style={{
                            borderColor: "#007bff",
                            color: number === currentPage ? "white" : "#007bff",
                            backgroundColor: number === currentPage ? "#007bff" : "white",
                        }}
                    >
                        {number}
                    </Pagination.Item>
                ))}
            </Pagination>
        </Container>
    );
};

export default Orders;
