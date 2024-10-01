import React from "react";
import axios from 'axios';
import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Style.css"; // Custom styles, if needed
import Alert from '../components/Alert';


const ProductDisplayCard = ({ id, name, price, description, capacityperunit }) => {

    const [quantity, setQuantity] = useState(1);
    const [status, setStatus] = useState('');
    const [success, setSuccess] = useState('');

    const addToCart = async () => {
        try {
            await axios.post('/cart', {
                id: id,
                productName: name,
                quantity: quantity,
                price: price,
                CapacityPerUnit: capacityperunit
            }).then(res => {
                setStatus(`${name} has been added to your cart.`);
                setSuccess(true);
            });
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    return (
        <div className="container my-4">
            <div className="row gx-4 gx-lg-5 align-items-center">
                <div className="col-md-6 mb-4 mb-md-0">
          
                    <div className="image-wrapper">
      
                        <img
                            className="card-img-top mb-5 mb-md-0"
                            src={`/assets/Products/${name}.jpg`}
                            alt={name}
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <h1 className="display-5 fw-bolder mb-3">{name}</h1>
                    <div className="fs-5 mb-4">
                        <span>Unit Price: ${price}</span>
                    </div>
                    <p className="lead mb-4">{description}</p>
                    <div className="d-flex flex-column flex-sm-row">
                        <input
                            className="form-control text-center me-0 me-sm-3 mb-3 mb-sm-0"
                            id="inputQuantity"
                            type="number"
                            min="1"
                            defaultValue="1"
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                            style={{ maxWidth: "5rem" }}
                        />
                        <button className="btn btn-outline-dark" type="button" onClick={addToCart}>
                            Add to cart
                        </button>
                    </div>
                    <br></br>
                    <Alert message={status} success={success} />
                </div>
            </div>
        </div>
    );
};

export default ProductDisplayCard;
