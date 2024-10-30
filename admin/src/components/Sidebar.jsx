import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  let location = useLocation();
  const role = localStorage.getItem("role");

  const adminNavigation = [
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
      {
          title: "Products",
          href: "/products",
          icon: "bi bi-cup-hot",
      },
      {
        title: "Reports",
        href: "/reports",
        icon: "bi bi-book",
    }
  ];

  const managerNavigation = [
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
      {
          title: "Schedule History",
          href: "/schedule-history",
          icon: "bi bi-clipboard2-check",
      },
      {
          title: "Driver",
          href: "/addDriver",
          icon: "bi bi-person",
      },
      {
          title: "Assistant",
          href: "/addAssistant",
          icon: "bi bi-people",
      },
      {
        title: "Trucks",
        href: "/trucksWorkingHours",
        icon: "bi bi-truck",
      },
      {

        title: "Reports",
        href: "/reports",
        icon: "bi bi-book",
      }
  ];

  // Determine which navigation to use
    const navigation = role === "admin" ? adminNavigation : managerNavigation;

    const linkStyle = {
        transition: "background-color 0.3s ease, transform 0.3s ease",
    };

    const hoverEffect = {
        backgroundColor: "#495057",
        transform: "translateX(5px)",
    };

    return (
        <div className="bg-dark text-light h-100 p-2 shadow-lg">
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
