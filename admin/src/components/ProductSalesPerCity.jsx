import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, Spinner } from "react-bootstrap";
import axios from "axios";

const ProductSalesPerCity = ({ selectedProduct, year, quarter }) => {
    const [salesData, setSalesData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProductSalesPerCity = async () => {
        if (selectedProduct) {
            try {
                const response = await axios.get(`/report/productSalesPerCity?product=${selectedProduct}&year=${year}&quarter=${quarter}`);
                setSalesData(response.data);
            } catch (error) {
                console.error('Error fetching product sales per city data:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchProductSalesPerCity();
    }, [selectedProduct, year, quarter]);

    return (
        <Card className="shadow-sm rounded">
            <Card.Body>
                <Card.Title>Sales of {selectedProduct} per City</Card.Title>
                {loading ? (
                    <Spinner animation="border" />
                ) : (
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={salesData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="city" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="sales" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer> 
                )}
            </Card.Body>
        </Card>
    );
};

export default ProductSalesPerCity;