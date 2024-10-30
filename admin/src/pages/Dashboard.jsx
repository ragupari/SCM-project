import React, { useState, useEffect } from "react";
import { Tabs, Tab, Col, Row, Container, Form } from "react-bootstrap";
import TopCards from "../components/TopCards";
import PieChartComponent from "../components/PieChart"; // Ensure this path is correct and the component is properly exported
import axios from "axios";
import QuarterlyRevenueChart from "../components/QuarterlyRevenueChart";
import CitySalesChart from "../components/CitySalesChart";

const Dashboard = () => {
  const [ordersbyCategory, setOrdersbyCategory] = useState([]);
  const [ordersbyProduct, setOrdersbyProduct] = useState([]);
  const [revenuebyCategory, setRevenuebyCategory] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear()); // Default to current year
  const [quarter, setQuarter] = useState('4'); // Default to current quarter
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState("1");
  const [revenuePerProduct, setRevenuePerProduct] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState("1");
  const [revenuePerCategory, setRevenuePerCategory] = useState([]);

  const [productSalesPerRoute, setProductSalesPerRoute] = useState([]);
  const [categorySalesPerRoute, setCategorySalesPerRoute] = useState([]);

  // Fetch orders by category for the selected store
  const fetchOrdersbyCategory = async () => {
    try {
      const response = await axios.get(`/report/categoryReport/Quantity`);
      setOrdersbyCategory(response.data);
    } catch (error) {
      console.error("Error fetching orders by category:", error);
    }
  };

  const fetchOrdersbyProduct = async () => {
    try {
      const response = await axios.get(`/report/productReport/Quantity`);
      setOrdersbyProduct(response.data);
    } catch (error) {
      console.error("Error fetching orders by product:", error);
    }
  };

  const fetchRevenuebyCategory = async () => {
    try {
      const response = await axios.get(`/report/categoryReport/Revenue`);
      setRevenuebyCategory(response.data);
    } catch (error) {
      console.error("Error fetching revenue by category:", error);
    }
  };

  const fetchStores = async () => {
    try {
      const response = await axios.get("/stores/getStores");
      setStores(response.data);
    } catch (error) {
      console.error("Error fetching stores:", error);
    }
  };

  const fetchRoutes = async () => {
    try {
      const response = await axios.get(`/roadways/getRoutes/${selectedStore}`);
      setRoutes(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchRevenuePerCategory = async () => {
    try {
      const response = await axios.get(
        `/report/StoreReport/CategoryRevenue/${year}/${quarter}/${selectedStore}`
      );
      setRevenuePerCategory(response.data);
    } catch (error) {
      console.error("Error fetching revenue per category:", error);
    }
  };

  const fetchRevenuePerProduct = async () => {
    try {
      const response = await axios.get(
        `/report/StoreReport/ProductRevenue/${year}/${quarter}/${selectedStore}`
      );
      setRevenuePerProduct(response.data);
    } catch (error) {
      console.error("Error fetching revenue per product:", error);
    }
  };

  const fetchProductSalesPerRoute = async () => {
    try {
      const response = await axios.get(
        `/report/RouteReport/ProductSales/${year}/${quarter}/${selectedRoute}`
      );
      setProductSalesPerRoute(response.data);
    } catch (error) {
      console.error("Error fetching product sales per route:", error);
    }
  };

  const fetchCategorySalesPerRoute = async () => {
    try {
      const response = await axios.get(
        `/report/RouteReport/CategorySales/${year}/${quarter}/${selectedRoute}`
      );
      setCategorySalesPerRoute(response.data);
    } catch (error) {
      console.error("Error fetching category sales per route:", error);
    }
  };

  useEffect(() => {
    fetchRevenuePerProduct();
    fetchRevenuePerCategory();
    fetchCategorySalesPerRoute();
    fetchProductSalesPerRoute();
  }, [year, quarter, selectedStore, selectedRoute]);

  useEffect(() => {
    fetchOrdersbyCategory();
    fetchOrdersbyProduct();
    fetchRevenuebyCategory();
  }, [year, quarter]);

  useEffect(() => {
    fetchRoutes();
  }, [selectedStore]);

  useEffect(() => {
    fetchStores();
  }, []);

  const getTotalRevenue = () => {
    return revenuebyCategory.reduce(
      (acc, item) => acc + parseInt(item.value),
      0
    );
  };

  return (
    <Container
      fluid
      className="shadow-sm rounded p-4 h-100"
      style={{ backgroundColor: "#ffffff2f" }}
    >
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
            earning={
              ordersbyCategory.length > 0 ? ordersbyCategory[0].name : ""
            }
            icon="bi bi-basket3"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-info text-info"
            title="Top Product"
            subtitle="Most ordered product"
            earning={ordersbyProduct.length > 0 ? ordersbyProduct[0].name : ""}
            icon="bi bi-bag"
          />
        </Col>
      </Row>

      {/* Pie Charts */}
      <Row className="mb-4">
        <Col md={4}>
          <PieChartComponent
            title="Orders by Category"
            data={ordersbyCategory}
          />
        </Col>
        <Col md={4}>
          <PieChartComponent title="Orders by Product" data={ordersbyProduct} />
        </Col>
        <Col md={4}>
          <PieChartComponent
            title="Revenue by Category"
            data={revenuebyCategory}
          />
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
                return (
                  <option key={yearOption} value={yearOption}>
                    {yearOption}
                  </option>
                );
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
        <Col sm="6">
          <Form.Group>
            <Form.Label>Select Store</Form.Label>
            <Form.Control
              as="select"
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
            >
              <option value="">Select a store</option>
              {stores.map((store) => (
                <option key={store.StoreID} value={store.StoreID}>
                  {store.City}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        {/* Routes Selector */}
        <Col sm="6">
          <Form.Group>
            <Form.Label>Select Route</Form.Label>
            <Form.Control
              as="select"
              value={selectedRoute}
              onChange={(e) => setSelectedRoute(e.target.value)}
            >
              <option value="">Select a Route</option>
              {routes.map((route) => (
                <option key={route.RouteID} value={route.Destination}>
                  {route.Destination}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      <Row className="d-flex shadow-sm rounded p-3" style={{ backgroundColor: "#ffffff2f"}}>
        <Col
          md={6}
          className="d-flex flex-column"
          style={{ flex: 1 }}
        >
          <Row>
            <Col md={6}>
              <PieChartComponent
                title="Revenue per Product by Store"
                data={revenuePerProduct}
                innerRadius={"40%"}
              />
            </Col>
            <Col md={6}>
              <PieChartComponent
                title="Revenue per Category by Store"
                data={revenuePerCategory}
                innerRadius={"40%"}
              />
            </Col>
          </Row>
        </Col>

        <Col
          md={6}
          className="d-flex flex-column"
          style={{ flex: 1 }}
        >
          <Row>
            <Col md={6}>
              <PieChartComponent
                title="Revenue per Product by Route"
                data={productSalesPerRoute}
                innerRadius={"40%"}
              />
            </Col>
            <Col md={6}>
              <PieChartComponent
                title="Revenue per Category by Route"
                data={categorySalesPerRoute}
                innerRadius={"40%"}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
