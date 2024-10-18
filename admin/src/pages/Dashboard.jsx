import React, { useState, useEffect } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import TopCards from '../components/TopCards';
import PieChart from '../components/PieChart';
import axios from 'axios';
import QuarterlyRevenueChart from '../components/QuarterlyRevenueChart';
import CitySalesChart from '../components/CitySalesChart';

const Dashboard = () => {
    const [ordersbyCategory, setOrdersbyCategory] = useState([]);
    const [ordersbyProduct, setOrdersbyProduct] = useState([]);
    const [revenuebyCategory, setRevenuebyCategory] = useState([]);

    const fetchOrdersbyCategory = async () => {
        try {
            const response = await axios.get('/report/categoryReport/Quantity');
            setOrdersbyCategory(response.data);
        } catch (error) {
            console.error('Error fetching orders by category:', error);
        }
    };

    const fetchOrdersbyProduct = async () => {
        try {
            const response = await axios.get('/report/productReport/Quantity');
            setOrdersbyProduct(response.data);
        } catch (error) {
            console.error('Error fetching orders by product:', error);
        }
    };

    const fetchRevenuebyCategory = async () => {
        try {
            const response = await axios.get('/report/categoryReport/Revenue');
            setRevenuebyCategory(response.data);
        } catch (error) {
            console.error('Error fetching revenue by category:', error);
        }
    };

    useEffect(() => {
        fetchOrdersbyCategory();
        fetchOrdersbyProduct();
        fetchRevenuebyCategory();
    }, []);

    const getTotalRevenue = () => {
        return revenuebyCategory.reduce((acc, item) => acc + parseInt(item.value), 0);
    }

    return (
        <Container fluid className="shadow-sm rounded p-4 h-100" style={{ backgroundColor: "#ffffff2f" }}>
            <Row>
                <Col sm="6" lg="3">
                    <TopCards
                        bg="bg-light-success text-success"
                        title="Profit"
                        subtitle="Total revenue"
                        earning= {"$" + getTotalRevenue() }
                        icon="bi bi-wallet"
                    />
                </Col>
                <Col sm="6" lg="3">
                    <TopCards
                        bg="bg-light-danger text-danger"
                        title="Refunds"
                        subtitle="Refund given"
                        earning="$500"
                        icon="bi bi-coin"
                    />
                </Col>
                <Col sm="6" lg="3">
                    <TopCards
                        bg="bg-light-warning text-warning"
                        title="Top Category"
                        subtitle="Most ordered category"
                        earning={ordersbyCategory.length > 0 ? ordersbyCategory[0].name : ''}
                        icon="bi bi-basket3"
                    />
                </Col>
                <Col sm="6" lg="3">
                    <TopCards
                        bg="bg-light-info text-info"
                        title="Top Product"
                        subtitle="Most ordered product"
                        earning= {ordersbyProduct.length > 0 ? ordersbyProduct[0].name : ''}
                        icon="bi bi-bag"
                    />
                </Col>
            </Row>
            <Row className='mt-3'>
                <Col md={4}>
                    <PieChart title="Ordered Quantity by Category" data={ordersbyCategory}/>
                </Col>
                <Col md={4}>
                    <PieChart title="Ordered Quantity by Product" data={ordersbyProduct}/>
                </Col>
                <Col md={4}>
                    <PieChart title="Revenue by Category" data={revenuebyCategory}/>
                </Col>
            </Row>
            <Row className='mt-3'>
                <Col md={6}>
                    <QuarterlyRevenueChart />
                </Col>
                <Col md={6}>
                    <CitySalesChart />
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
