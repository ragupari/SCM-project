import React, { useEffect, useState } from 'react';
import './Style.css'; 
import axios from 'axios';

const SideBar = ({active_category_ID}) => {
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

  function isActive(category_ID){

    
    if (active_category_ID == category_ID){
      return "active";
    }
    return "";
  }

  return (
          <nav className="nav flex-column">
            {categories.map((category) => (
              <a
  key={category.category_ID} // Assuming each category has a unique 'id'
  className={`nav-link gradient-oval-border gradient-text-${isActive(category.category_ID)}`}
  href={`/products?categoryID=${category.category_ID}`}
>
  {category.category_name} {/* Render the category name inside the link */}
</a>
            ))}
          </nav>
  );
};

export default SideBar;
