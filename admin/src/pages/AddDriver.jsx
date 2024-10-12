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

  const removeDriver = (driverID) => {
    if (window.confirm("Are you sure you want to remove this driver?")) {
      axios.delete(`/drivers/addDriver/${driverID}`).then(() => {
        toast.success("Driver removed successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        // Update the drivers list after deletion
        setDrivers(drivers.filter((driver) => driver.DriverID !== driverID));
      });
    }
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

            {/* Styled Table */}
            <Table striped bordered hover responsive="md" className="table-sm">
              <thead className="table-dark">
                <tr>
                  <th className="text-center align-middle">Driver ID</th>
                  <th className="align-middle">Name</th>
                  <th className="align-middle">Employment Status</th>
                  <th className="text-center align-middle">Actions</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((driver) => (
                  <tr key={driver.DriverID}>
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
                        variant="success"
                        size="sm"
                        onClick={() => saveDriverUpdate(driver)}
                      >
                        Save
                      </Button>{" "}
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removeDriver(driver.DriverID)}
                      >
                        Remove
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
      </Container>

      {/* Toast container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default DriversByStore;
