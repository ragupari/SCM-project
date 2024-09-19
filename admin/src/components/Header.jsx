import React, { useState } from "react";
import { Navbar, Button, Dropdown } from "react-bootstrap";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => setIsOpen(!isOpen);
    const showMobileMenu = () => {
        document.getElementById("sidebarArea").classList.toggle("showSidebar");
    };

    return (
        <Navbar bg="primary" variant="dark" expand="md">
            <div className="d-flex align-items-center">
                <Navbar.Brand href="/" className="d-lg-none">
                    SCMS
                    <i className="bi bi-cart-fill"></i>
                </Navbar.Brand>
                <Button variant="primary" className="d-lg-none" onClick={showMobileMenu}>
                    <i className="bi bi-list"></i>
                </Button>
            </div>
            <div className="hstack gap-2">
                <Button variant="primary" size="sm" className="d-sm-block d-md-none" onClick={handleToggle}>
                    {isOpen ? (
                        <i className="bi bi-x"></i>
                    ) : (
                        <i className="bi bi-three-dots-vertical"></i>
                    )}
                </Button>
            </div>

            <Navbar.Collapse in={isOpen}>
                <Dropdown align="end">
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        <img
                            src={'https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg'}
                            alt="profile"
                            className="rounded-circle"
                            width="30"
                        />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Header>Info</Dropdown.Header>
                        <Dropdown.Item>My Account</Dropdown.Item>
                        <Dropdown.Item>Edit Profile</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>My Balance</Dropdown.Item>
                        <Dropdown.Item>Inbox</Dropdown.Item>
                        <Dropdown.Item href="/signin">Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;
