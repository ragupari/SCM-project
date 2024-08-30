import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/SideBar';
import SearchBar from '../components/SearchBar';
import DisplayCard from '../components/DisplayCard'; 
import NavBar from '../components/NavBar';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const categoryID = query.get('categoryID');

  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!categoryID) {
        setError('Category ID is missing.');
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await axios.post('/getproducts', { categoryID });
        setProducts(response.data.products);
        console.log(response.data.category_name); 
        setCategoryName(response.data.category_name);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('An error occurred while fetching products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryID]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-danger">Error: {error}</div>;

  return (
    <div>
      <NavBar currentPage={'Products'} />
      <DisplayCard title ={categoryName} />
      <SearchBar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-3">
            <Sidebar />
          </div>
          <div className="col-12 col-md-9">
            <div className="container">
              <h1 className="my-4">Products</h1>
              {products.length === 0 ? (
                <p>No products found for this category.</p>
              ) : (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                  {products.map(product => (
                    <div className="col" key={product.product_ID}>
                      <ProductCard
                        product_ID={product.product_ID}
                        product_name={product.product_name}
                        price={product.price}
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
