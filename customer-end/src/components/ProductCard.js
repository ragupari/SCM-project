import "./Style.css";

function ProductCard({ product_ID, product_name, price }) {
  return (
    <div className="col">
      <a 
        href="#"
        className="card"
        style={{ textDecoration: 'none' }}
      >
        <img 
          src="https://images.pexels.com/photos/7135037/pexels-photo-7135037.jpeg" 
          className="card-img-top" 
          alt={'Card img displayed here'} 
        />
        <div className="card-body gradient-text-">
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
