import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card } from "react-bootstrap";
import axios from "axios";

const QuarterlyRevenueChart = ({ year }) => {
    const [selectedYearData, setSelectedYearData] = useState([]);

    const fetchRevenueData = async () => {
        try {
            const response = await axios.get(`/report/quarterly/${year}`);
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
            const quarterData = data.find((d) => d.quarter === quarter);
            return quarterData ? quarterData : { quarter, revenue: 0 };
        });
        return filledData;
    };

    useEffect(() => {
        fetchRevenueData();
    }, [year]);

    return (
        <Card className="shadow-sm rounded">
            <Card.Body>
                <Card.Title className="text-center">Quarterly Revenue for {year}</Card.Title>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={selectedYearData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="quarter" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="revenue" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </Card.Body>
        </Card>
    );
};

export default QuarterlyRevenueChart;