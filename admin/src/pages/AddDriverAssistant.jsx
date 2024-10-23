import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {
  Container,
  Table,
  Button,
  Form,
  Modal,
  Row,
  Col,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddDriverAssistant = () => {
  const [assistants, setAssistants] = useState([]);
  const [newAssistant, setNewAssistant] = useState({
    Name: "",
    EmploymentStatus: "PresentEmployer",
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const navigate = useNavigate();

  const storeID = localStorage.getItem("storeID");

  useEffect(() => {
    axios
      .get(`/assistants/addAssistants/store/${storeID}`)
      .then((response) => {
        setAssistants(response.data);
      })
      .catch((error) => {
        console.error("Error fetching assistants:", error);
      });
  }, [storeID]);

  const handleEmploymentStatusChange = (assistantID, newStatus) => {
    const updatedAssistants = assistants.map((assistant) =>
      assistant.DrivingAssistantID === assistantID
        ? { ...assistant, EmploymentStatus: newStatus }
        : assistant
    );
    setAssistants(updatedAssistants);
  };

  const saveAssistantUpdate = (assistant) => {
    axios
      .put(
        `/assistants/addAssistants/${assistant.DrivingAssistantID}`,
        assistant
      )
      .then(() => {
        toast.success("Assistant updated successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      })
      .catch((error) => {
        console.error("Error updating assistant:", error);
        toast.error("Failed to update assistant.");
      });
  };

  const handleDeleteAssistant = (assistantID) => {
    axios
      .delete(`/assistants/addAssistants/${assistantID}`)
      .then(() => {
        toast.success("Assistant removed successfully!", {
          position: "top-right",
          autoClose: 3000,
        });

        setAssistants(
          assistants.filter((a) => a.DrivingAssistantID !== assistantID)
        );
      })
      .catch((error) => {
        console.error("Error removing assistant:", error);
        toast.error("Error removing assistant. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };

  const handleNewAssistantChange = (e) => {
    setNewAssistant({ ...newAssistant, [e.target.name]: e.target.value });
  };

  const handleNewAssistantSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`/assistants/addAssistants/store/${storeID}`, newAssistant)
      .then(() => {
        toast.success("Assistant added successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        setShowAddModal(false);
        axios
          .get(`/assistants/addAssistants/store/${storeID}`)
          .then((response) => {
            setAssistants(response.data);
          })
          .catch((error) => {
            console.error("Error fetching assistants:", error);
          });
      })
      .catch((error) => {
        console.error("Error adding assistant:", error);
        toast.error("Failed to add assistant.");
      });
  };

  const viewWorkingHours = (assistant) => {
    navigate(`/viewWorkingHours?personID=${assistant.DrivingAssistantID}&type=assistant&name=${assistant.Name}`);
  };

  return (
    <Container fluid className="shadow-sm rounded p-4 h-100" style={{ backgroundColor: "#ffffff2f" }}>
      <Row className="mb-4">
        <Col className="d-flex flex-column align-items-center">
          <h2 className="text-center mb-4" style={{ fontWeight: "600", color: "#333" }}>Assistants Management</h2>
          <Button variant="outline-primary" className="rounded-pill px-3 py-2" onClick={() => setShowAddModal(true)}>
            Add Assistant
          </Button>
        </Col>
      </Row>
      <Table striped bordered hover responsive className="shadow-sm rounded bg-white" style={{ borderCollapse: "separate", borderSpacing: "0 10px" }}>
        <thead className="bg-light" style={{ borderBottom: "2px solid #dee2e6" }}>
          <tr style={{ textAlign: "center", fontWeight: "500", color: "#666", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            <th className="text-center align-middle">Assistant ID</th>
            <th className="align-middle">Name</th>
            <th className="align-middle">Employment Status</th>
            <th className="text-center align-middle">Actions</th>
          </tr>
        </thead>
        <tbody>
          {assistants.map((assistant) => (
            <tr key={assistant.DrivingAssistantID}>
              <td className="text-center align-middle p-3">
                {assistant.DrivingAssistantID}
              </td>
              <td className="align-middle p-3">{assistant.Name}</td>
              <td className="align-middle p-3">
                <Form.Control
                  as="select"
                  value={assistant.EmploymentStatus}
                  onChange={(e) =>
                    handleEmploymentStatusChange(
                      assistant.DrivingAssistantID,
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
                  onClick={() => saveAssistantUpdate(assistant)}
                >
                  Save
                </Button>{"  "}
                <Button
                  variant="outline-primary" className="rounded-pill px-3 py-2"
                  onClick={() =>
                    viewWorkingHours(assistant)
                  }
                >
                  Working Hours
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Modal to add a new assistant */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Assistant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleNewAssistantSubmit}>
            <Form.Group>
              <Form.Label>Assistant Name</Form.Label>
              <Form.Control
                type="text"
                name="Name"
                value={newAssistant.Name}
                onChange={handleNewAssistantChange}
                required
                className="form-control-sm"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Employment Status</Form.Label>
              <Form.Control
                as="select"
                name="EmploymentStatus"
                value={newAssistant.EmploymentStatus}
                onChange={handleNewAssistantChange}
                className="form-select-sm"
              >
                <option value="PresentEmployer">PresentEmployer</option>
                <option value="PastEmployer">PastEmployer</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Add Assistant
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      {/* Toast container for notifications */}
      <ToastContainer />
    </Container>
  );
};

export default AddDriverAssistant;
