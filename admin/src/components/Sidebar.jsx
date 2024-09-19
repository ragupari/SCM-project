import React from "react";
import { Button, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const navigation = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: "bi bi-speedometer2",
    },
    {
        title: "Orders",
        href: "/alerts",
        icon: "bi bi-calendar-event",
    },
];

const Sidebar = () => {
    const showMobileMenu = () => {
        document.getElementById("sidebarArea").classList.toggle("showSidebar");
    };

    let location = useLocation();

    return (
        <div className="p-3">
            <div className="d-flex align-items-center">
                <span className="ms-auto d-lg-none">
                    <Button variant="light" size="sm" className="ms-auto d-lg-none" onClick={showMobileMenu}>
                        <i className="bi bi-x"></i>
                    </Button>
                </span>
            </div>
            <div className="pt-4 mt-2">
                <Nav className="flex-column sidebarNav">
                    {navigation.map((navi, index) => (
                        <Nav.Item key={index} className="sidenav-bg">
                            <Nav.Link
                                as={Link}
                                to={navi.href}
                                className={ location.pathname === navi.href ? "text-primary py-3" : "text-secondary py-3"}>
                                <i className={navi.icon}></i>
                                <span className="ms-3 d-inline-block">{navi.title}</span>
                            </Nav.Link>
                        </Nav.Item>
                    ))}
                </Nav>
            </div>
        </div>
    );
};

export default Sidebar;
