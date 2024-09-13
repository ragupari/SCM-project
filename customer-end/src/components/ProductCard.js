import './Style.css'; // Custom styles, if needed

function ProductCard({ product_ID, product_name, price }) {
  return (
    <div className="col">
      <a
        href={`/viewproduct?productID=${product_ID}`}
        className="card text-decoration-none rounded-3 shadow-sm product-card"
        style={{
          width: '100%',
          height: '300px',
          overflow: 'hidden',
          transition: 'transform 0.3s ease',
          border: 'none'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <img
          src="https://images.pexels.com/photos/7135037/pexels-photo-7135037.jpeg"
          className="card-img-top"
          alt="Product image"
          style={{
            objectFit: 'cover',
            height: '180px',
            width: '100%',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px'
          }}
        />
        <div className="card-body d-flex flex-column justify-content-between" style={{ padding: '20px' }}>
          <h5 className="card-title gradient-text-" style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '10px' }}>{product_name}</h5>
          <p className="card-text text-muted" style={{ fontSize: '1rem', marginBottom: '0' }}>
            Unit price: {price} $
          </p>
        </div>
      </a>
    </div>
  );
}

export default ProductCard;
