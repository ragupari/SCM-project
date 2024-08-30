// src/pages/products.js

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard'; // Adjust the path if needed

const Products = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  
  // Extract categoryID from query params
  const query = new URLSearchParams(location.search);
  const categoryID = query.get('categoryID');

  useEffect(() => {
    // Fetch products based on categoryID
    const fetchProducts = async () => {
      try {
        // Replace with your API endpoint
        const response = await fetch(`/api/products?categoryID=${categoryID}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [categoryID]);

return (
    <div className="container">
        <h1>Products</h1>
        {categoryID}

    </div>
);
};

export default Products;
