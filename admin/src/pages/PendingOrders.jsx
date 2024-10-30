import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Table, Button, Container, Row, Col, Pagination } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(10);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const storeID = localStorage.getItem('storeID');

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`/orders?status=pending&storeID=${storeID}`);
                setOrders(response.data);
            } catch (error) {
                toast.error("Error fetching orders. Please try again later.");
                console.error("Error fetching orders: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [storeID]);

    const formatDate = (dateString) => {
        const tempDate = new Date(dateString);
        if (isNaN(tempDate)) return "Invalid date";
        return tempDate.toLocaleDateString('en-CA');
    };

    const handleAssign = (orderID, totalCapacity, orderDate, orderRouteID) => {
        navigate(`/orders/traintrips?OrderID=${orderID}&date=${orderDate}&reqCapacity=${totalCapacity}&routeID=${orderRouteID}`);
    };

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const pageNumbers = useMemo(() => {
        const pages = [];
        for (let i = 1; i <= Math.ceil(orders.length / ordersPerPage); i++) {
            pages.push(i);
        }
        return pages;
    }, [orders.length, ordersPerPage]);

    return (
        <Container fluid className="shadow-sm rounded p-4 h-100" style={{ backgroundColor: "#ffffff2f" }}>
            {loading ? (
                <h3 className="text-center">Loading...</h3>
            ) : (
                <>
                    <Row className="mb-4">
                        <Col>
                            <h2 className="text-center" style={{ fontWeight: "600", color: "#333" }}>Pending Orders</h2>
                        </Col>
                    </Row>
                    <Table striped bordered hover responsive className="shadow-sm rounded bg-white order-table">
                        <thead className="bg-light" style={{ borderBottom: "2px solid #dee2e6" }}>
                            <tr style={{ textAlign: "center", fontWeight: "500", color: "#666", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                <th style={{ padding: "15px" }}>Order ID</th>
                                <th className="text-center align-middle">Customer ID</th>
                                <th className="text-center align-middle">Order Date</th>
                                <th className="text-center align-middle">Delivery Date</th>
                                <th className="text-center align-middle">Total Price</th>
                                <th className="text-center align-middle">Total Capacity</th>
                                <th className="text-center align-middle">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentOrders.map(order => (
                                <tr key={order.OrderID} style={{ textAlign: "center", color: "#333", backgroundColor: "#fff", borderBottom: "1px solid #e9ecef" }}>
                                    <td style={{ padding: "15px" }}>{order.OrderID}</td>
                                    <td>{order.CustomerID}</td>
                                    <td>{formatDate(order.OrderDate)}</td>
                                    <td>{formatDate(order.DeliveryDate)}</td>
                                    <td>{order.TotalPrice}</td>
                                    <td>{order.TotalCapacity}</td>
                                    <td>
                                        <Button 
                                            onClick={() => handleAssign(order.OrderID, order.TotalCapacity, order.OrderDate, order.RouteID)}
                                            variant="outline-primary" 
                                            className="rounded-pill px-3 py-2" 
                                            aria-label={`Assign order ${order.OrderID}`}
                                        >
                                            Ready
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Pagination className="justify-content-center mt-4">
                        {pageNumbers.map(number => (
                            <Pagination.Item
                                key={number}
                                active={number === currentPage}
                                onClick={() => setCurrentPage(number)}
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
                </>
            )}
        </Container>
    );
};

export default Orders;
