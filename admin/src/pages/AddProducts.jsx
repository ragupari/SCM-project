import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Table,
  Button,
  Form,
  Modal,
  Card,
  Row,
  Col,
  Pagination,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductsByCategory = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  // const [editProduct, setEditProduct] = useState(null);
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

  // Pagination state for categories
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(3); // Adjust the number of categories per page

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

  // Pagination logic for categories: Get current page categories
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container fluid className="shadow-sm rounded p-4 h-100" style={{ backgroundColor: "#ffffff2f" }}>
      <Row className="mb-4">
        <Col className="d-flex flex-column align-items-center">
          <h2 className="text-center mb-4" style={{ fontWeight: "600", color: "#333" }}>Products</h2>
        </Col>
      </Row>
      <Container>
        {currentCategories.map((category) => (
          <div key={category.CategoryID} className="mb-4">
            <Card className="shadow-sm">
              <Card.Body>
                <Row className="align-items-center mb-3">
                  <Col>
                    <h3>{category.CategoryName}</h3>
                  </Col>
                  <Col className="text-end">
                    <Button
                      variant="outline-info" className="rounded-pill px-3 py-2"
                      onClick={() => {
                        setCurrentCategoryID(category.CategoryID);
                        setCurrentCategoryName(category.CategoryName);
                        setShowAddModal(true);
                      }}
                    >
                      Add Product
                    </Button>
                  </Col>
                </Row>

                <Table striped bordered hover responsive className="rounded bg-white" style={{ borderCollapse: "separate", borderSpacing: "0 10px" }}>
                  <thead className="bg-light" style={{ borderBottom: "2px solid #dee2e6" }}>
                    <tr style={{ textAlign: "left", fontWeight: "300", color: "#666", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      <th>Product ID</th>
                      <th>Product Name</th>
                      <th>Unit Price</th>
                      <th>Capacity Per Unit</th>
                      <th>Available Stock</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedProducts[category.CategoryName]?.map((product) => (
                      <tr key={product.ProductID}>
                        <td className="align-middle">{product.ProductID}</td>
                        <td className="align-middle">{product.ProductName}</td>
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
                        <td className="align-middle">{product.CapacityPerUnit}</td>
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
                            variant="outline-primary" className="rounded-pill px-3 py-2"
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

        {/* Pagination controls */}
        <Pagination>
          {[...Array(Math.ceil(categories.length / categoriesPerPage)).keys()].map((page) => (
            <Pagination.Item
              key={page + 1}
              active={page + 1 === currentPage}
              onClick={() => handlePageChange(page + 1)}
            >
              {page + 1}
            </Pagination.Item>
          ))}
        </Pagination>

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
    </Container>
  );
};

export default ProductsByCategory;
