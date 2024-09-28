import axios from 'axios';
import { Container, Table } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

const PreviousShipment = ({ type, ID }) => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        if (type === '' || ID === '') return;
        const fetchLogs = async () => {
            try {
                let response;
                if (type === 'truckLogs') {
                    response = await axios.get(`/trucks/logs/${ID}`);
                } else if (type === 'driverLogs') {
                    response = await axios.get(`/drivers/logs/${ID}`);
                } else if (type === 'assistantLogs') {
                    response = await axios.get(`/assistants/logs/${ID}`);
                }
                setLogs(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error(`Error fetching ${type}:`, error);
            }
        };
        fetchLogs();
    }, [ID, type]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        };
        return date.toLocaleDateString(undefined, options);
    }

    return (
        <Container fluid className="p-4">
            <Table striped bordered hover responsive className="shadow-sm rounded bg-white">
                <thead className="bg-primary text-white">
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map(log => (
                        <tr key={log.ID}>
                            <td>{log.ID}</td>
                            <td>{formatDate(log.Date)}</td>
                            <td>{log.StartTime}</td>
                            <td>{log.EndTime}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default PreviousShipment;