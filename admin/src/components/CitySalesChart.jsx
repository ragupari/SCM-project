import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, Spinner, Form } from "react-bootstrap";
import axios from "axios";

const CitySalesChart = () => {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [salesData, setSalesData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCitySalesData = async () => {
        try {
            const response = await axios.get(`/report/citySales/${selectedYear}`);
            const formattedData = formatData(response.data);
            setSalesData(formattedData);
        } catch (error) {
            console.error('Error fetching city sales data:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatData = (data) => {
        const cities = ["Colombo", "Negombo", "Galle", "Matara", "Jaffna", "Trinco"];
        return cities.map(city => {
            const cityData = data.filter(item => item.StoreCity === city);
            const totalSales = cityData.reduce((sum, item) => sum + parseInt(item.TotalSales), 0);
            return { city, totalSales };
        });
    };

    useEffect(() => {
        if (selectedYear) {
            fetchCitySalesData();
        }
    }, [selectedYear]);

    const handleYearChange = (event) => {
        setSelectedYear(parseInt(event.target.value));
    };

    return (
        <Card className="shadow-sm p-4">
            <h4 className="text-center mb-4">Total Sales by Store {selectedYear}</h4>
            <Form.Group controlId="yearSelect" className="text-center">
                <Form.Label className="p-3">Select Year</Form.Label>
                <Form.Control
                    as="select"
                    value={selectedYear}
                    onChange={handleYearChange}
                    className="w-auto mx-auto p-2"
                    style={{ display: 'inline-block', fontSize: '0.875rem' }}
                >
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                </Form.Control>
            </Form.Group>
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
            ) : (
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart 
                        data={salesData}
                        barSize={50}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="city" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="totalSales" fill="#005f8d" />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </Card>
    );
};

export default CitySalesChart;
