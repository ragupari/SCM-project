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

const ProductsByCategory = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    ProductName: "",
    UnitPrice: "",
    CapacityPerUnit: "",
    AvailableStock: "",
    Description: "",
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentCategoryID, setCurrentCategoryID] = useState(null);
  const [currentCategoryName, setCurrentCategoryName] = useState(null);

  useEffect(() => {
    axios.get("/products").then((response) => {
      setProducts(response.data);
    });
    axios.get("/products/categories").then((response) => {
      setCategories(response.data);
    });
  }, []);

  const handleStockChange = (productID, field, newValue) => {
    const updatedProducts = products.map((product) =>
      product.ProductID === productID
        ? { ...product, [field]: newValue }
        : product
    );
    setProducts(updatedProducts);
  };

  const saveProductUpdate = (product) => {
    axios.put(`/products/${product.ProductID}`, product).then(() => {
      toast.success("Product updated successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    });
  };

  const handleNewProductChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleNewProductSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`/products/categories/${currentCategoryID}/products`, newProduct)
      .then(() => {
        toast.success("Product added successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        setShowAddModal(false);
        axios.get("/products").then((response) => {
          setProducts(response.data);
        });
      });
  };

  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.CategoryName]) {
      acc[product.CategoryName] = [];
    }
    acc[product.CategoryName].push(product);
    return acc;
  }, {});

  return (
    <div>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Product Management</Navbar.Brand>
        </Container>
      </Navbar>

      <Container className="mt-5">
        {Object.keys(groupedProducts).map((category) => (
          <div key={category} className="mb-4">
            <Card className="shadow-sm">
              <Card.Body>
                <Row className="align-items-center mb-3">
                  <Col>
                    <h3>{category}</h3>
                  </Col>
                  <Col className="text-end">
                    <Button
                      variant="primary"
                      onClick={() => {
                        const categoryObject = categories.find(
                          (cat) => cat.CategoryName === category
                        );
                        setCurrentCategoryID(categoryObject.CategoryID);
                        setCurrentCategoryName(category);
                        setShowAddModal(true);
                      }}
                    >
                      Add Product
                    </Button>
                  </Col>
                </Row>

                <Table striped bordered hover responsive="md">
                  <thead>
                    <tr>
                      <th>Product ID</th>
                      <th>Product Name</th>
                      <th>Unit Price</th>
                      <th>Capacity Per Unit</th>
                      <th>Available Stock</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedProducts[category].map((product) => (
                      <tr key={product.ProductID}>
                        <td>{product.ProductID}</td>
                        <td>{product.ProductName}</td>
                        <td>
                          <Form.Control
                            type="number"
                            value={product.UnitPrice}
                            onChange={(e) =>
                              handleStockChange(
                                product.ProductID,
                                "UnitPrice",
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td>{product.CapacityPerUnit}</td>
                        <td>
                          <Form.Control
                            type="number"
                            value={product.AvailableStock}
                            onChange={(e) =>
                              handleStockChange(
                                product.ProductID,
                                "AvailableStock",
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td>
                          <Button
                            variant="success"
                            onClick={() => saveProductUpdate(product)}
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
          </div>
        ))}

        {/* Modal to add a new product */}
        <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Product to {currentCategoryName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleNewProductSubmit}>
              <Form.Group>
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  name="ProductName"
                  value={newProduct.ProductName}
                  onChange={handleNewProductChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Unit Price</Form.Label>
                <Form.Control
                  type="number"
                  name="UnitPrice"
                  value={newProduct.UnitPrice}
                  onChange={handleNewProductChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Capacity Per Unit</Form.Label>
                <Form.Control
                  type="number"
                  name="CapacityPerUnit"
                  value={newProduct.CapacityPerUnit}
                  onChange={handleNewProductChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Available Stock</Form.Label>
                <Form.Control
                  type="number"
                  name="AvailableStock"
                  value={newProduct.AvailableStock}
                  onChange={handleNewProductChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="Description"
                  value={newProduct.Description}
                  onChange={handleNewProductChange}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="addbutton mt-2"
              >
                Add Product
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

export default ProductsByCategory;
