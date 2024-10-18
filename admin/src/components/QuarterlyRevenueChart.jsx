import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, Form } from "react-bootstrap";
import axios from "axios";

const QuarterlyRevenueChart = () => {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedYearData, setSelectedYearData] = useState([]);

    const fetchRevenueData = async () => {
        try {
            const response = await axios.get(`/report/quarterly/${selectedYear}`);
            const data = response.data;
            const completeData = fillMissingQuarters(data);
            setSelectedYearData(completeData);
        } catch (error) {
            console.error('Error fetching quarterly revenue:', error);
        }
    };

    const fillMissingQuarters = (data) => {
        const quarters = [1, 2, 3, 4];
        const filledData = quarters.map((quarter) => {
            const quarterData = data.find((item) => item.quarter === quarter);
            return quarterData ? quarterData : { quarter, revenue: 0 };
        });
        return filledData;
    };

    useEffect(() => {
        if (selectedYear) {
            fetchRevenueData();
        }
    }, [selectedYear]);

    const handleYearChange = (event) => {
        setSelectedYear(parseInt(event.target.value));
    };

    return (
        <Card className="shadow-sm p-4">
            <h4 className="text-center mb-4">Quarterly Revenue for {selectedYear}</h4>
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
            <ResponsiveContainer width="100%" height={300}>
                <BarChart 
                    data={selectedYearData}
                    barSize={50}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="quarter" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" fill="#48cae4" />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    );
};

export default QuarterlyRevenueChart;
