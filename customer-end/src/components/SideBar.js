import React, { useEffect, useState } from 'react';
import './Style.css';
import axios from 'axios';

const SideBar = ({ active_category_ID }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('/getcategories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []); // Empty dependency array ensures this runs once on mount

  function isActive(category_ID) {


    if (active_category_ID == category_ID) {
      return "active";
    }
    return "";
  }

  return (
    <nav className="nav flex-column p-3" style={{ backgroundColor: '#f8f9fa', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', minWidth: '200px' }}>
      {categories.map((category) => (
        <a
          key={category.category_ID}
          className={`nav-link d-flex align-items-center justify-content-start p-3 mb-2 rounded gradient-text-${isActive(category.category_ID)}`}
          href={`/products?categoryID=${category.category_ID}`}
          style={{
            backgroundColor: '#ffffff',
            transition: 'background-color 0.3s ease, transform 0.3s ease',
            color: '#343a40',
            fontWeight: '500',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(5px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
        >
          {category.category_name} {/* Render the category name inside the link */}
        </a>
      ))}
    </nav>
  );
};

export default SideBar;