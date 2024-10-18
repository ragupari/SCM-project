import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card } from "react-bootstrap";

const PieChartComponent = ({ title, data = [] }) => {
  const COLORS = [
    "#003f5c",
    "#005f8d",
    "#0077b6",
    "#219ebc",
    "#48cae4",
    "#90e0ef",
    "#ade8f4",
    "#caf0f8",
    "#1f4b7c",
    "#4682b4"
  ];

  // Convert value to number
  const formattedData = data.map(item => ({
    ...item,
    value: parseInt(item.value)
  }));

  return (
    <Card className="shadow-sm p-4">
      <h5 className="text-center mb-4">{title}</h5>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={formattedData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            innerRadius={40}
            paddingAngle={2}
            cornerRadius={2}
            fill="#8884d8"
          >
            {formattedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            layout="horizontal"
            align="center"
            verticalAlign="bottom"
            iconType="plainline"
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default PieChartComponent;
