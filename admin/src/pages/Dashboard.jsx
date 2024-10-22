import React, { useState, useEffect } from 'react';
import { Col, Row, Container, Form } from 'react-bootstrap';
import TopCards from '../components/TopCards';
import PieChartComponent from '../components/PieChart'; // Ensure this path is correct and the component is properly exported
import axios from 'axios';
import QuarterlyRevenueChart from '../components/QuarterlyRevenueChart';
import CitySalesChart from '../components/CitySalesChart';
import ProductSalesPerCity from '../components/ProductSalesPerCity'; // Ensure this path is correct and the component is properly exported

const Dashboard = () => {
    const [ordersbyCategory, setOrdersbyCategory] = useState([]);
    const [ordersbyProduct, setOrdersbyProduct] = useState([]);
    const [revenuebyCategory, setRevenuebyCategory] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear()); // Default to current year
    const [quarter, setQuarter] = useState(1); 
    const [stores, setStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState('');
    const [revenuePerProduct, setRevenuePerProduct] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [revenuePerCategory, setRevenuePerCategory] = useState([]);

    // Fetch orders by category for the selected store
    const fetchOrdersbyCategory = async () => {
        try {
            const response = await axios.get(`/report/categoryReport/Quantity`);
            setOrdersbyCategory(response.data);
        } catch (error) {
            console.error('Error fetching orders by category:', error);
        }
    };

    const fetchOrdersbyProduct = async () => {
        try {
            const response = await axios.get(`/report/productReport/Quantity`);
            setOrdersbyProduct(response.data);
        } catch (error) {
            console.error('Error fetching orders by product:', error);
        }
    };

    const fetchRevenuebyCategory = async () => {
        try {
            const response = await axios.get(`/report/categoryReport/Revenue`);
            setRevenuebyCategory(response.data);
        } catch (error) {
            console.error('Error fetching revenue by category:', error);
        }
    };

    const fetchStores = async () => {
        try {
            const response = await axios.get('/stores/getStores');
            console.log(response.data);
            setStores(response.data);
        } catch (error) {
            console.error('Error fetching stores:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get('/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchRevenuePerCategory = async () => {
        try {
            const response = await axios.get(`/report/StoreReport/CategoryRevenue`);
            setRevenuePerCategory(response.data);
        } catch (error) {
            console.error('Error fetching revenue per category:', error);
        }
    };

    const fetchRevenuePerProduct = async () => {
        try {
            const response = await axios.get(`/report/StoreReport/ProductRevenue`);
            setRevenuePerProduct(response.data);
        } catch (error) {
            console.error('Error fetching revenue per product:', error);
        }
    };

    useEffect(() => {
        fetchRevenuePerProduct();
        fetchRevenuePerCategory();
    }, [year, quarter, selectedStore]);

    useEffect(() => {
        fetchOrdersbyCategory();
        fetchOrdersbyProduct();
        fetchRevenuebyCategory();
    }, [year, quarter]);

    useEffect(() =>{
        fetchStores();
        fetchProducts();
    },[]);

    const getTotalRevenue = () => {
        return revenuebyCategory.reduce((acc, item) => acc + parseInt(item.value), 0);
    }

    return (
        <Container fluid className="shadow-sm rounded p-4 h-100" style={{ backgroundColor: "#ffffff2f" }}>

            {/* Top Data Cards */}
            <Row className="mb-4">
                <Col sm="6" lg="3">
                    <TopCards
                        bg="bg-light-success text-success"
                        title="Profit"
                        subtitle="Total revenue"
                        earning={"$" + getTotalRevenue()}
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
                        earning={ordersbyProduct.length > 0 ? ordersbyProduct[0].name : ''}
                        icon="bi bi-bag"
                    />
                </Col>
            </Row>

            {/* Pie Charts */}
            <Row className="mb-4">
                <Col md={4}>
                    <PieChartComponent title="Orders by Category" data={ordersbyCategory} />
                </Col>
                <Col md={4}>
                    <PieChartComponent title="Orders by Product" data={ordersbyProduct} />
                </Col>
                <Col md={4}>
                    <PieChartComponent title="Revenue by Category" data={revenuebyCategory} />
                </Col>
            </Row>

            {/* Year and Quarter Selectors */}
            <Row className="mb-4">
                <Col sm="6">
                    <Form.Group>
                        <Form.Label>Year</Form.Label>
                        <Form.Control
                            as="select"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                        >
                            {[...Array(10)].map((_, i) => {
                                const yearOption = new Date().getFullYear() - i;
                                return <option key={yearOption} value={yearOption}>{yearOption}</option>;
                            })}
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col sm="6">
                    <Form.Group>
                        <Form.Label>Quarter</Form.Label>
                        <Form.Control
                            as="select"
                            value={quarter}
                            onChange={(e) => setQuarter(e.target.value)}
                        >
                            <option value={1}>Q1</option>
                            <option value={2}>Q2</option>
                            <option value={3}>Q3</option>
                            <option value={4}>Q4</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>

            {/* Quarterly Revenue and Total Sales by Store */}
            <Row className="mb-4">
                <Col md={6}>
                    <QuarterlyRevenueChart year={year} quarter={quarter} />
                </Col>
                <Col md={6}>
                    <CitySalesChart year={year} quarter={quarter} />
                </Col>
            </Row>

            {/* Store Selector */}
            <Row className="mb-4">
                <Col sm="12">
                    <Form.Group>
                        <Form.Label>Select Store</Form.Label>
                        <Form.Control
                            as="select"
                            value={selectedStore}
                            onChange={(e) => setSelectedStore(e.target.value)}
                        >
                            <option value="">Select a store</option>
                            {stores.map(store => (
                                <option key={store.StoreID} value={store.StoreID}>{store.City}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>

            {/* Pie Charts */}
            <Row className="mb-4">
                <Col md={2}/>
                <Col md={4}>
                    <PieChartComponent title="Revenue per Product" data={revenuePerProduct} />
                </Col>
                <Col md={4}>
                    <PieChartComponent title="Revenue per Category" data={revenuePerCategory} />
                </Col>
                <Col md={2}/>
            </Row>

            {/* Product Selector */}
            <Row className="mb-4">
                <Col sm="12">
                    <Form.Group>
                        <Form.Label>Select Product</Form.Label>
                        <Form.Control
                            as="select"
                            value={selectedProduct}
                            onChange={(e) => setSelectedProduct(e.target.value)}
                        >
                            <option value="">Select a product</option>
                            {products.map(product => (
                                <option key={product.id} value={product.id}>{product.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>

            {/* Product Sales Graph */}
            <Row className="mb-4">
                <Col sm="12">
                    <ProductSalesPerCity selectedProduct={selectedProduct} year={year} quarter={quarter} />
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;