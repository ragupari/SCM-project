import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card } from "react-bootstrap";

const PieChartComponent = ({ title, data = [] }) => {
  const COLORS = [
    "#6A1B9A", // Dark Purple
    "#8E24AA", // Medium Purple
    "#AB47BC", // Light Purple
    "#5C6BC0", // Soft Blue
    "#3F51B5", // Medium Blue
    "#1976D2", // Blue
    "#0288D1", // Light Blue
    "#B39DDB", // Light Lavender
    "#90CAF9", // Soft Sky Blue
    "#BBDEFB", // Pale Blue
  ];
  

  // Convert value to number
  const formattedData = data.map(item => ({
    ...item,
    value: parseInt(item.value)
  }));

  // Group extra items into "Others" category if there are more than 9 items
  const processedData = formattedData.length > 9 ? [
    ...formattedData.slice(0, 9),
    {
      name: "Others",
      value: formattedData.slice(9).reduce((acc, item) => acc + item.value, 0)
    }
  ] : formattedData;

  return (
    <Card className="shadow-sm rounded">
      <Card.Body>
        <Card.Title className="text-center">{title}</Card.Title>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={processedData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
            >
              {processedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
};

export default PieChartComponent;