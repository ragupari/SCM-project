import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/SideBar';
import SearchBar from '../components/SearchBar';
import DisplayCard from '../components/PageTitleCard'; 
import NavBar from '../components/NavBar';
import ProductDisplayCard from '../components/ProductDisplayCard';

const ViewProduct = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const productID = query.get('productID');

  const [details, setDetails] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      if (!productID) {
        window.location.href = '/notfound';
        return;
      }

      try {
        const response = await axios.post('/getproductdetails', { productID });
        setDetails(response.data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        window.location.href = '/notfound';
      }
    };

    fetchProducts();
  }, [productID]);

  return (
    <div>
      <NavBar currentPage={'Products'} />
      <DisplayCard title={details.product_name || 'Product Details'} />
      <SearchBar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-3 mb-4">
            <Sidebar active_category_ID={details.category_ID}/> 
          </div>
          <div className="col-12 col-md-9">
            <div className="container-fluid">
              {!details.product_name ? (
                <p>No products found for this category.</p>
              ) : (
                <div className="row">
                  <ProductDisplayCard
                      id={details.product_ID}
                      name={details.product_name}
                      price={details.unit_price}
                      description={details.Description}
                      capacityperunit={details.CapacityPerUnit}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
