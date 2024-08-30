import React, { useEffect, useState } from 'react';
import './Style.css'; 
import axios from 'axios';

const VerticalNav = () => {
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

  return (
          <nav className="nav flex-column">
            {categories.map((category) => (
              <a
                key={category.category_ID} // Assuming each category has a unique 'id'
                className="nav-link gradient-text- gradient-oval-border "
                href={`#${category.category_name.toLowerCase()}`}
              >
              
                {category.category_name}
              </a>
            ))}
          </nav>
  );
};

export default VerticalNav;
