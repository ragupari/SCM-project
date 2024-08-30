import "./Style.css";
function CategoryCard({ category, description }) {
    
    return (
      <div className="col">
        <div className="card">
          <img 
            src="https://static.vecteezy.com/system/resources/thumbnails/002/539/942/small/dark-purple-smart-blurred-pattern-abstract-illustration-with-gradient-blur-design-new-design-for-applications-vector.jpg" 
            className="card-img-top" 
            alt={`Image for ${category}`} 
          />
          <div className="card-body gradient-text-">
            <h5 className="card-title">{category}</h5>
            <p className="card-text">
              {description}
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  export default CategoryCard;