import "./Style.css";

function CategoryCard({ category_ID, category, description }) {
  return (
    <div className="col">
      <a 
        href={`/products?categoryID=${category_ID}`} 
        className="card product-card"
        style={{ textDecoration: 'none' }}
      >
        <img 
          src="https://static.vecteezy.com/system/resources/thumbnails/002/539/942/small/dark-purple-smart-blurred-pattern-abstract-illustration-with-gradient-blur-design-new-design-for-applications-vector.jpg" 
          className="card-img-top" 
          alt={'Card img displayed here'} 
        />
        <div className="card-body gradient-text-">
          <h5 className="card-title">{category}</h5>
          <p className="card-text">
            {description}
          </p>
        </div>
      </a>
    </div>
  );
}

export default CategoryCard;
