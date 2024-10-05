import React from "react";
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const storeMap = [
    { storeID: 1, name: 'Colombo ' },
    { storeID: 2, name: 'Negombo ' },
    { storeID: 3, name: 'Galle ' },
    { storeID: 4, name: 'Matara ' },
    { storeID: 5, name: 'Jaffna ' },
    { storeID: 6, name: 'Trinco ' },
    { storeID: 7, name: 'Main - Kandy ' },
  ];

const Header = () => {
    const navigate = useNavigate();
    const storeID = localStorage.getItem('storeID');
    const store = storeMap.find(store => store.storeID === parseInt(storeID));
    const storeName = store ? store.name : '';

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('storeID');
        navigate('/signin');
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary h-100">
            <Container fluid>
                <Navbar.Brand className="gradient-text-0" href="/">
                    SCMS <i className="bi bi-cart-fill"></i> <span className="store-name">{storeName}</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav" className="bg-white w-100 rounded-3 p-3">
                    <Nav className="ms-auto">
                        <NavDropdown title="Account" id="basic-nav-dropdown" drop="start" className="dropdown-menu-end">
                            <NavDropdown.Item href="/profile">
                                <i className="bi bi-person"></i> Profile
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={handleLogout}>
                                <i className="bi bi-box-arrow-right"></i> Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
