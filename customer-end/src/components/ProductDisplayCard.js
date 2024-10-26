import React, { useState, useEffect } from "react";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./Style.css"; // Custom styles, if needed
import Alert from '../components/Alert';

const ProductDisplayCard = ({ id, name, price, description, capacityperunit }) => {
    const [username, setUsername] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [status, setStatus] = useState('');
    const [success, setSuccess] = useState(false);

    // Fetch the username from the token when the component mounts
    useEffect(() => {
        const getUsernameFromToken = async () => {
            try {
                const res = await axios.get('/tokenauth', {
                    headers: {
                        'x-access-token': localStorage.getItem('token')
                    }
                });
                setUsername(res.data.username);
            } catch (error) {
                console.error('Error fetching username from token:', error);
            }
        };
        getUsernameFromToken();
    }, []);

    // Add product to cart
    const addToCart = async () => {
        try {
            await axios.post('/cart2/add', {

                username: username,
                productID: id,
                number: quantity
            });
            setStatus(`${name} has been added to your cart.`);
            setSuccess(true);
        } catch (error) {
            console.error('Error adding product to cart:', error);
            setStatus('An error occurred while adding the product to your cart.');
            setSuccess(false);
        }
    };

    return (
        <div className="container-fluid shadow-sm rounded p-5" style={{ backgroundColor: "#ffffff3f" }}>
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
                <div className="col-md-6 shadow-sm rounded p-5" style={{ backgroundColor: "#ffffff5f" }}>
                    <h1 className="display-5 fw-bolder mb-3">{name}</h1>
                    <div className="fs-5">
                        <span>Unit Price: ${price}</span>
                    </div>
                    <div className="fs-6 mb-4">
                        <span>50 Tea Bags per Pack | 50 Servings | 1.5 Grams per Tea Bag</span>
                    </div>
                    <p className="lead mb-4">{description}</p>
                    <div className="d-flex flex-column flex-sm-row">
                        <input
                            className="form-control text-center me-0 me-sm-3 mb-3 mb-sm-0"
                            id="inputQuantity"
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
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
