import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/SideBar';
import SearchBar from '../components/SearchBar';
import DisplayCard from '../components/PageTitleCard'; 
import NavBar from '../components/NavBar';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const categoryID = query.get('categoryID');

  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      if (!categoryID) {
        window.location.href = '/notfound';
        return;
      }

      try {
        const response = await axios.post('/getproducts', { categoryID });
        setProducts(response.data.products);
        setCategoryName(response.data.category_name);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        window.location.href = '/notfound';
      }
    };

    fetchProducts();
  }, [categoryID]);

  return (
    <div>
      <NavBar currentPage={'Products'} />
      <DisplayCard title={categoryName} />
      <SearchBar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-3">
            <Sidebar active_category_ID={categoryID}/> 
          </div>
          <div className="col-12 col-md-9">
            <div className="container">
              {products.length === 0 ? (
                <p>No products found for this category.</p>
              ) : (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                  {products.map(product => (
                    <div className="col" key={product.product_ID}>
                      <ProductCard
                        product_ID={product.product_ID}
                        product_name={product.product_name}
                        price={product.unit_price}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
