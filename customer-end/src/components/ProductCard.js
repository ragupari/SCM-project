import './Style.css'; // Custom styles, if needed

function ProductCard({ product_ID, product_name, price }) {
  return (
    <div className="col">
      <a 
        href={`/viewproduct?productID=${product_ID}`}
        className="card text-decoration-none rounded-3 shadow-sm product-card"
      >
        <img 
          src="https://images.pexels.com/photos/7135037/pexels-photo-7135037.jpeg" 
          className="card-img-top rounded-top" 
          alt="Card img displayed here" 
        />
        <div className="card-body">
          <h5 className="card-title">{product_name}</h5>
          <p className="card-text">
            Unit price: {price} $
          </p>
        </div>
      </a>
    </div>
  );
}

export default ProductCard;
