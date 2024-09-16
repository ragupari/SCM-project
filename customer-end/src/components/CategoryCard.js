import "./Style.css";

function CategoryCard({ category_ID, category, description }) {
  return (
    <div className="col">
      <a
        href={`/products?categoryID=${category_ID}`}
        className="card product-card shadow-sm text-center"
        style={{
          textDecoration: 'none',
          borderRadius: '15px',
          overflow: 'hidden',
          width: '100%',
          height: '350px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <img
          src={`/assets/Product Category/${category}.jpg`}
          className="card-img-top"
          alt={category}
          style={{
            objectFit: 'cover',
            height: '200px',
            borderTopLeftRadius: '15px',
            borderTopRightRadius: '15px'
          }}
        />
        <div className="card-body d-flex flex-column justify-content-between" style={{ padding: '20px' }}>
          <h5 className="card-title gradient-text-" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{category}</h5>
          <p className="card-text text-muted" style={{ fontSize: '0.9rem' }}>
            {description}
          </p>
        </div>
      </a>
    </div>
  );
}

export default CategoryCard;