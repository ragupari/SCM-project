import React from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const navigation = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: "bi bi-speedometer2",
    },
    {
        title: "Orders",
        href: "/orders",
        icon: "bi bi-calendar-event",
    },
];

const Sidebar = () => {
    let location = useLocation();

    const linkStyle = {
        transition: "background-color 0.3s ease, transform 0.3s ease",
    };

    const hoverEffect = {
        backgroundColor: "#495057",
        transform: "translateX(5px)",
    };

    return (
        <div className="bg-dark text-light vh-100 p-2 shadow-lg">
            <div className="pt-4">
                <Nav className="flex-column">
                    {navigation.map((navi, index) => (
                        <Nav.Item key={index}>
                            <Nav.Link
                                as={Link}
                                to={navi.href}
                                className={`d-flex align-items-center py-3 px-3 rounded ${location.pathname === navi.href ? "bg-primary text-white" : "text-light"}`}
                                style={linkStyle}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = hoverEffect.backgroundColor;
                                    e.target.style.transform = hoverEffect.transform;
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = "";
                                    e.target.style.transform = "";
                                }}
                            >
                                <i className={navi.icon}></i>
                                <span className="ms-3">{navi.title}</span>
                            </Nav.Link>
                        </Nav.Item>
                    ))}
                </Nav>
            </div>
        </div>
    );
};

export default Sidebar;
