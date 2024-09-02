import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Style.css"; // Custom styles, if needed

const ProductDisplayCard = ({ name, price, description, image }) => {
    return (
        <div className="container my-4">
            <div className="row gx-4 gx-lg-5 align-items-center">
                <div className="col-md-6 mb-4 mb-md-0">
          
                    <div className="image-wrapper">
      
                        <img
                            className="card-img-top mb-5 mb-md-0"
                            src={image}
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
                            defaultValue="1"
                            style={{ maxWidth: "5rem" }}
                        />
                        <button className="btn btn-outline-dark" type="button">
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDisplayCard;
