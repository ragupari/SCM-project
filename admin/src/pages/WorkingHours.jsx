import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Card, Container, Row, Col, Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const WorkingHours = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const personID = queryParams.get("personID");
  const type = queryParams.get("type");
  const name = queryParams.get("name");

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [workingHours, setWorkingHours] = useState([]);

  const fetchWorkingHours = async () => {
    if (personID && type) {
      try {
        const response = await axios.get(
          `/workinghours/${type}/${personID}?month=${month}&year=${year}`
        );
        const fetchedData = response.data;

        // Ensure we have data for each week, fill missing weeks with 0 hours
        const weekData = generateWeeksInMonth(month, year).map((week) => {
          const existingData = fetchedData.find(
            (data) => data.WeekNumber === week
          ) || { WeekNumber: week, TotalHours: 0 };
          return existingData;
        });

        setWorkingHours(weekData);
      } catch (error) {
        console.error("Error fetching working hours: ", error);
      }
    }
  };

  useEffect(() => {
    if (personID && type) {
      fetchWorkingHours();
    }
  }, [month, year, personID, type]);

  const handleMonthSelect = (eventKey) => {
    setMonth(parseInt(eventKey, 10));
  };

  const handleYearSelect = (eventKey) => {
    setYear(parseInt(eventKey, 10));
  };

  const generateWeeksInMonth = (month, year) => {
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const weeks = new Set();

    for (let day = firstDay; day <= lastDay; day.setDate(day.getDate() + 1)) {
      const weekNumber = getWeekNumber(day);
      weeks.add(weekNumber);
    }

    return Array.from(weeks);
  };

  const getWeekNumber = (date) => {
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    return weekNo;
  };

  return (
    <Container
      fluid
      className="shadow-sm rounded p-4 h-100"
      style={{ backgroundColor: "#ffffff2f" }}
    >
      <Row className="mb-4">
        <Col className="d-flex flex-column align-items-center">
          <h2
            className="text-center mb-4"
            style={{ fontWeight: "600", color: "#333" }}
          >
            Working Hours for {name}
          </h2>
          {/* Month and Year Selectors */}
          <Row className="mb-4">
            <Col sm="6">
              <Form.Group>
                <Form.Label>Month</Form.Label>
                <Form.Control
                  as="select"
                  value={month}
                  onChange={(e) => setMonth(parseInt(e.target.value))}
                >
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col sm="6">
              <Form.Group>
                <Form.Label>Year</Form.Label>
                <Form.Control
                  as="select"
                  value={year}
                  onChange={(e) => setYear(parseInt(e.target.value))}
                >
                  {Array.from({ length: 5 }, (_, i) => currentYear - i).map(
                    (yr) => (
                      <option key={yr} value={yr}>
                        {yr}
                      </option>
                    )
                  )}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Working Hours Chart */}
      <Card className="shadow-sm rounded mx-auto" style={{ width: "60%" }}>
        {" "}
        {/* Center and set width */}
        <Card.Body>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              width={400}
              height={300}
              data={workingHours}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="WeekNumber" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="TotalHours" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default WorkingHours;
