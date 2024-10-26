import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

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

  const viewWorkingHours = (driver) => {
    navigate(`/viewWorkingHours?personID=${driver.DriverID}&type=driver&name=${driver.Name}`);
  };

  return (
    <Container fluid className="shadow-sm rounded p-4 h-100" style={{ backgroundColor: "#ffffff2f" }}>
      <Row className="mb-4">
        <Col className="d-flex flex-column align-items-center">
          <h2 className="text-center mb-4" style={{ fontWeight: "600", color: "#333" }}>Drivers Management</h2>
          <Button variant="outline-primary" className="rounded-pill px-3 py-2" onClick={() => setShowAddModal(true)}>
            Add Driver
          </Button>
        </Col>
      </Row>
      <Table striped bordered hover responsive className="shadow-sm rounded bg-white" style={{ borderCollapse: "separate", borderSpacing: "0 10px" }}>
        <thead className="bg-light" style={{ borderBottom: "2px solid #dee2e6" }}>
          <tr style={{ textAlign: "center", fontWeight: "500", color: "#666", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            <th className="text-center align-middle">Driver ID</th>
            <th className="align-middle">Name</th>
            <th className="align-middle">Employment Status</th>
            <th className="text-center align-middle">Actions</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver) => (
            <tr key={driver.DriverID} style={{ textAlign: "center", color: "#333", backgroundColor: "#fff", borderBottom: "1px solid #e9ecef" }}>
              <td className="text-center align-middle p-3">
                {driver.DriverID}
              </td>
              <td className="align-middle p-3">{driver.Name}</td>
              <td className="align-middle p-3">
                <Form.Control
                  as="select"
                  value={driver.EmploymentStatus}
                  onChange={(e) =>
                    handleEmploymentStatusChange(
                      driver.DriverID,
                      e.target.value
                    )
                  }
                  className="form-select-sm"
                >
                  <option value="PresentEmployer">PresentEmployer</option>
                  <option value="PastEmployer">PastEmployer</option>
                </Form.Control>
              </td>
              <td className="text-center align-middle p-3">
                <Button
                  variant="outline-primary" className="rounded-pill px-3 py-2"
                  onClick={() => saveDriverUpdate(driver)}
                >
                  Save
                </Button>{"  "}
                <Button
                  variant="outline-primary" className="rounded-pill px-3 py-2"
                  onClick={() => viewWorkingHours(driver)}
                >
                  Working Hours
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

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
                className="form-control-sm"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Employment Status</Form.Label>
              <Form.Control
                as="select"
                name="EmploymentStatus"
                value={newDriver.EmploymentStatus}
                onChange={handleNewDriverChange}
                className="form-select-sm"
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
      {/* Toast container for notifications */}
      <ToastContainer />
    </Container>
  );
};

export default DriversByStore;
