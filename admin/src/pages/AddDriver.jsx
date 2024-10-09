import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Navbar,
  Container,
  Table,
  Button,
  Form,
  Modal,
  Card,
  Row,
  Col,
  Dropdown,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DriversByStore = () => {
  const [drivers, setDrivers] = useState([]);
  const [newDriver, setNewDriver] = useState({
    Name: "",
    EmploymentStatus: "PresentEmployer",
  });
  const [showAddModal, setShowAddModal] = useState(false);

  // Get StoreID from localStorage
  const storeID = localStorage.getItem("storeID");

  useEffect(() => {
    // Fetch drivers for the store
    axios.get(`/drivers/addDriver/store/${storeID}`).then((response) => {
      setDrivers(response.data);
    });
  }, [storeID]);

  const handleEmploymentStatusChange = (driverID, newStatus) => {
    const updatedDrivers = drivers.map((driver) =>
      driver.DriverID === driverID
        ? { ...driver, EmploymentStatus: newStatus }
        : driver
    );
    setDrivers(updatedDrivers);
  };

  const saveDriverUpdate = (driver) => {
    axios.put(`/drivers/addDriver/${driver.DriverID}`, driver).then(() => {
      toast.success("Driver updated successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    });
  };

  const handleNewDriverChange = (e) => {
    setNewDriver({ ...newDriver, [e.target.name]: e.target.value });
  };

  const handleNewDriverSubmit = (e) => {
    e.preventDefault();
    axios.post(`/drivers/addDriver/store/${storeID}`, newDriver).then(() => {
      toast.success("Driver added successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      setShowAddModal(false);
      axios.get(`/drivers/addDriver/store/${storeID}`).then((response) => {
        setDrivers(response.data);
      });
    });
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Driver Management</Navbar.Brand>
        </Container>
      </Navbar>

      <Container className="mt-5">
        <Card className="shadow-sm mb-4">
          <Card.Body>
            <Row className="align-items-center mb-3">
              <Col>
                <h3>Drivers</h3>
              </Col>
              <Col className="text-end">
                <Button variant="primary" onClick={() => setShowAddModal(true)}>
                  Add Driver
                </Button>
              </Col>
            </Row>

            <Table striped bordered hover responsive="md">
              <thead>
                <tr>
                  <th>Driver ID</th>
                  <th>Name</th>
                  <th>Employment Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((driver) => (
                  <tr key={driver.DriverID}>
                    <td>{driver.DriverID}</td>
                    <td>{driver.Name}</td>
                    <td>
                      <Form.Control
                        as="select"
                        value={driver.EmploymentStatus}
                        onChange={(e) =>
                          handleEmploymentStatusChange(
                            driver.DriverID,
                            e.target.value
                          )
                        }
                      >
                        <option value="PresentEmployer">PresentEmployer</option>
                        <option value="PastEmployer">PastEmployer</option>
                      </Form.Control>
                    </td>
                    <td>
                      <Button
                        variant="success"
                        onClick={() => saveDriverUpdate(driver)}
                      >
                        Save
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        {/* Modal to add a new driver */}
        <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Driver</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleNewDriverSubmit}>
              <Form.Group>
                <Form.Label>Driver Name</Form.Label>
                <Form.Control
                  type="text"
                  name="Name"
                  value={newDriver.Name}
                  onChange={handleNewDriverChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Employment Status</Form.Label>
                <Form.Control
                  as="select"
                  name="EmploymentStatus"
                  value={newDriver.EmploymentStatus}
                  onChange={handleNewDriverChange}
                >
                  <option value="PresentEmployer">PresentEmployer</option>
                  <option value="PastEmployer">PastEmployer</option>
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Add Driver
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>

      {/* Toast container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default DriversByStore;
