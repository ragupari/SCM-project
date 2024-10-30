import React, { useState, useEffect } from 'react';
import { Col, Row, Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import jsPDF from "jspdf";
import "jspdf-autotable";

const Dashboard = () => {
    const [ordersbyCategory, setOrdersbyCategory] = useState([]);
    const [ordersbyProduct, setOrdersbyProduct] = useState([]);
    const [revenuebyCategory, setRevenuebyCategory] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear()); // Default to current year
    const [quarter, setQuarter] = useState(1);
    const [data, setData] = useState([]);
    const [stores, setStores] = useState([]);
    const [selectedStoreID, setSelectedStoreID] = useState('');
    const [revenuePerProduct, setRevenuePerProduct] = useState([]);
    const [products, setProducts] = useState([]);
    const [revenuePerCategory, setRevenuePerCategory] = useState([]);
    const [userRole, setUserRole] = useState('');

    // New states to track selections
    const [selectedReport, setSelectedReport] = useState('');
    const [selectedStore, setSelectedStore] = useState('');
    const [selectedYear, setSelectedYear] = useState(''); // Correct type

    // Store map
    const storeMap = [
        { storeID: 1, name: 'Colombo' },
        { storeID: 2, name: 'Negombo' },
        { storeID: 3, name: 'Galle' },
        { storeID: 4, name: 'Matara' },
        { storeID: 5, name: 'Jaffna' },
        { storeID: 6, name: 'Trinco' },
        { storeID: 7, name: 'Main - Kandy' },
    ];

    useEffect(() => {
        const role = localStorage.getItem('role'); // 'manager' or 'admin'
        const storeID = localStorage.getItem('storeID'); // Manager's storeID if manager
        setUserRole(role);

        if (role === 'manager') {
            const store = storeMap.find(store => store.storeID === parseInt(storeID));
            if (store) {
                console.log("Manager's store", store);
                setStores([store]); // Manager can only see their store
                setSelectedStore(store.name); // Pre-select the store name for manager
                setSelectedStoreID(store.storeID); // Pre-select the store ID for manager
            } else {
                console.error('Store not found');
            }
        } else if (role === 'admin') {
            console.log(role);
            setStores(storeMap); // Admin can see all stores
            console.log("Admin sees stores", storeMap);
        }
    }, []);


    const getStoreIDByName = async (storeName) => {
        const store = storeMap.find(store => store.name === storeName);
        return store ? store.storeID : null; // Returns null if the store is not found
    }

    // Generate the PDF
    const handleGenerate = async () => {
        console.log('Generating PDF for:', selectedReport);
        console.log('Selected store:', selectedStore);
        console.log('Selected year:', selectedYear);

        switch (selectedReport) {
            case 'quarterly_sales':
                try {
                    const storeID = await getStoreIDByName(selectedStore);
                    const response = await axios.get(`/report/salesByStore?year=${selectedYear}&storeID=${storeID}`);
                    const data = response.data; // Store the fetched data

                    // Make sure data is formatted correctly for the PDF
                    generatePDF('Quarterly Sales Report For The Year: ' + selectedYear, selectedStore,
                        ['Quarter Of The Year', 'Sales Per Quarter'],
                        data);
                } catch (error) {
                    console.error('Error fetching quarterly sales data:', error);

                }
                break;
            case 'customer_order_report':
                try {
                    const storeID = await getStoreIDByName(selectedStore);
                    const response = await axios.get(`/report/customerordersbystore?year=${selectedYear}&storeID=${storeID}`);
                    const data = response.data; // Store the fetched data
    
                    // Make sure data is formatted correctly for the PDF
                    generatePDF('Customer Order Summary For The Year: ' + selectedYear, selectedStore,
                                ['Customer ID', 'Total Amount (in LKR)'], 
                                data);
                } catch (error) {
                    console.error('Error fetching customer orders data:', error);
                    
                }
                break;
            case 'most_ordered_items':
                try {
                    const storeID = await getStoreIDByName(selectedStore);
                    const response = await axios.get(`/report/ProductsByStore?year=${selectedYear}&storeID=${storeID}`);
                    const data = response.data; // Store the fetched data

                    // Make sure data is formatted correctly for the PDF
                    generatePDF('Most Ordered Items Over The Year: ' + selectedYear, selectedStore,
                        ['Ordered Item', 'Number of Orders'],
                        data);
                } catch (error) {
                    console.error('Error fetching quarterly sales data:', error);

                }
                break;
    
            case 'route_sales':
                try {
                    const storeID = await getStoreIDByName(selectedStore);
                    const response = await axios.get(`/report/salesbyroute?year=${selectedYear}&storeID=${storeID}`);
                    const data = response.data; // Store the fetched data
    
                    // Make sure data is formatted correctly for the PDF
                    generatePDF('Sales Per Route Summary For The Year: ' + selectedYear, selectedStore,
                                ['Route Destination', 'Total Amount (in LKR)'], 
                                data);
                } catch (error) {
                    console.error('Error fetching route salses details data:', error);
                    
                }

            case 'driver_hours':
                try {
                    const storeID = await getStoreIDByName(selectedStore);
                    const response = await axios.get(`/report/DriversByStore?year=${selectedYear}&storeID=${storeID}`);
                    const data = response.data; // Store the fetched data

                    // Make sure data is formatted correctly for the PDF
                    generateDriverPDF('Working Hours Of Each Driver Over The Year: ' + selectedYear, selectedStore,
                        data);
                } catch (error) {
                    console.error('Error fetching quarterly sales data:', error);

                }
                break;
            case 'assist_driver_hours':
                try {
                    const storeID = await getStoreIDByName(selectedStore);
                    const response = await axios.get(`/report/AssistDriversByStore?year=${selectedYear}&storeID=${storeID}`);
                    const data = response.data; // Store the fetched data

                    // Make sure data is formatted correctly for the PDF
                    generateDriverPDF('Working hours of each assistant driver over the year: ' + selectedYear, selectedStore,
                        data);
                } catch (error) {
                    console.error('Error fetching quarterly sales data:', error);

                }
                break;

            default:
                console.error('Unknown report type:', selectedReport);
                break;
        }
    };

    const generatePDF = (title, storeName, header, data) => {
        // Create a new jsPDF instance
        const doc = new jsPDF();

        // Set title font style and color
        doc.setFontSize(16);
        doc.setTextColor(0, 102, 204); // Blue color for the title
        doc.text(title, 14, 22);

        // Set store name font style and color
        doc.setFontSize(12);
        doc.setTextColor(51, 51, 51); // Dark gray color for store name
        doc.text(`Store Name: ${storeName}`, 14, 30);

        // Define table columns and rows
        const columns = header;
        const rows = data.map(item => Object.values(item)); // Convert objects to arrays for table rows

        // Create the table in the PDF
        doc.autoTable({
            head: [columns],
            body: rows,
            startY: 35, // Starting position on the Y axis
            theme: 'grid', // Optional: Set table theme
            styles: {
                cellPadding: 5,
                fontSize: 10,
                textColor: [0, 0, 0], // Black text for table
            },
            headStyles: {
                fillColor: [0, 102, 204], // Blue header background
                textColor: [255, 255, 255], // White text for header
            },
            alternateRowStyles: {
                fillColor: [240, 240, 240], // Light gray for alternate rows
            },
        });

        // Add footer
        const finalY = doc.lastAutoTable.finalY; // Get the Y position after the table
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100); // Medium gray color for footer
        doc.text("Supply Chain Management Project By Group 40", 70, finalY + 10); // Position footer below the table

        // Save the PDF with a dynamic name
        doc.save(`${storeName}_Report.pdf`);
    };

    








    const generateDriverPDF = (title, storeName, driversData) => {
        // Create a new jsPDF instance
        const doc = new jsPDF();

        // Set title font style and color
        doc.setFontSize(16);
        doc.setTextColor(0, 102, 204); // Blue color for the title
        doc.text(title, 14, 22);

        // Set store name font style and color
        doc.setFontSize(12);
        doc.setTextColor(51, 51, 51); // Dark gray color for store name
        doc.text(`Store Name: ${storeName}`, 14, 30);

        let currentY = 40; // Initial Y position after title

        // Loop through each driver and create a table
        Object.keys(driversData).forEach((driver, index) => {
            // Set the driver name title
            doc.setFontSize(14);
            doc.setTextColor(0, 0, 0); // Black color for driver name
            doc.text(`Name: ${driver}`, 14, currentY);

            // Table header for the month and working hours
            const columns = ['Month', 'Working Hours (Hours)'];

            // Table body data for each driver
            const rows = driversData[driver]; // This is already in [[Month, Hours]] format

            // Create the table in the PDF for each driver
            doc.autoTable({
                head: [columns],
                body: rows,
                startY: currentY + 5, // Starting position on the Y axis, 5 units below the driver name
                theme: 'grid',
                styles: {
                    cellPadding: 5,
                    fontSize: 10,
                    textColor: [0, 0, 0], // Black text for table
                },
                headStyles: {
                    fillColor: [0, 102, 204], // Blue header background
                    textColor: [255, 255, 255], // White text for header
                },
                alternateRowStyles: {
                    fillColor: [240, 240, 240], // Light gray for alternate rows
                },
            });

            // Update Y position after each table
            currentY = doc.lastAutoTable.finalY + 10; // Add some padding after each table

            // Check if space is running out, create a new page if necessary
            if (currentY > 270) { // Page break condition
                doc.addPage();
                currentY = 20; // Reset Y position for the new page
            }
        });

        // Add footer
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100); // Medium gray color for footer
        doc.text("Supply Chain Management Project By Group 40", 70, currentY + 10); // Position footer below the last table

        // Save the PDF with a dynamic name
        doc.save(`${storeName}_Drivers_Report.pdf`);
    };



    return (
        <Container fluid className="shadow-sm rounded p-4 h-100" style={{ backgroundColor: "#ffffff2f" }}>
            <Row className="mb-4">
                {/* Select Report */}
                <Col xs={12} sm={6} md={4} className="mb-3 mb-md-0">
                    <Form.Group controlId="formCategory">
                        <Form.Label>Select Report</Form.Label>
                        <Form.Select
                            value={selectedReport}
                            onChange={(e) => setSelectedReport(e.target.value)}
                        >
                            <option value="">Select a report</option>
                            <option value="quarterly_sales">Quarterly sales report</option>
                            <option value="most_ordered_items">Most ordered items</option>
                            <option value="route_sales">Sales report by city and route</option>
                            <option value="driver_hours">Driver working hours</option>
                            <option value="assist_driver_hours">Assistant driver working hours</option>
                            <option value="customer_order_report">Customer order report</option>
                        </Form.Select>
                    </Form.Group>
                </Col>

                {/* Select Store */}
                <Col xs={12} sm={6} md={4} className="mb-3 mb-md-0">
                    <Form.Group controlId="formStore">
                        <Form.Label>Select Store</Form.Label>

                        {userRole === 'admin' && (
                            <Form.Select
                                value={selectedStore}  // Bind to selectedStore state
                                onChange={(e) => setSelectedStore(e.target.value)}  // Allow admins to change the value
                                disabled={!selectedReport}  // This becomes unnecessary now, as it will only render for admin
                            >
                                <option value="">Select a store</option>
                                {stores.length > 0 && stores.map((store) => (
                                    <option key={store.storeID} value={store.City}>
                                        {store.name}
                                    </option>
                                ))}
                            </Form.Select>
                        )}
                        {userRole === 'manager' && (
                            <Form.Select
                                value={selectedStore}  // Bind to selectedStore state
                                onChange={(e) => setSelectedStore(e.target.value)}  // Allow admins to change the value
                                disabled  // This becomes unnecessary now, as it will only render for admin
                            >
                                <option value={selectedStore}>{selectedStore}</option>
                            </Form.Select>
                        )}

                    </Form.Group>
                </Col>

                {/* Select Year */}
                <Col xs={12} sm={6} md={4} className="mb-3 mb-md-0">
                    <Form.Group controlId="formYear">
                        <Form.Label>Select Year</Form.Label>
                        <Form.Select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            disabled={(!selectedReport && userRole === 'manager') || (!selectedStore && userRole === 'admin')}  // Disable if no store is selected
                        >
                            <option value="">Select a year</option>
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                {/* Generate Button */}
                <Col xs={12} sm={12} md={4} className="d-grid mx-auto">
                    <Button
                        variant="primary"
                        onClick={handleGenerate}
                        disabled={!selectedYear}  // Disable if no year is selected
                    >
                        Generate
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
 