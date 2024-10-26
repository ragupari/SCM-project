import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, Spinner } from "react-bootstrap";
import axios from "axios";

const CitySalesChart = ({ year, quarter }) => {
    const [salesData, setSalesData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCitySalesData = async () => {
        try { 
            const response = await axios.get(`/report/citySales/${year}/${quarter}`);
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
        if (year && quarter) { 
            fetchCitySalesData();
        }
    }, [year, quarter]); 

    return (
        <Card className="shadow-sm rounded">
            <Card.Body>
                <Card.Title className="text-center">{year} Revenue per City for the Quarter {quarter}</Card.Title>
                {loading ? (
                    <Spinner animation="border" />
                ) : (
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart 
                            data={salesData} 
                            margin={{ top: 20, right: 30, left: 20, bottom: 20 }} // Added margin
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="city" interval={0} angle={-45} textAnchor="end" /> {/* Rotated X-axis labels */}
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="totalSales" fill="#8884d8" barSize={30} /> {/* Set barSize */}
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </Card.Body>
        </Card>
    );
};

export default CitySalesChart;
