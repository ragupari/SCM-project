import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import axios from "axios";

function AllCategoryCards() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('/getcategories')
      .then(res => {
        if (Array.isArray(res.data)) {
          setCategories(res.data);    // Update state with the fetched categories
        } else {
          console.log("Expected an array but got:", res.data);
          setCategories([]);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);   // Empty dependency array to run once on mount
  
  return (
    <div className="mx-5 mt-4">
      <div className="row row-cols-1 row-cols-md-5 g-4">
      {categories.map((category) => (
      <CategoryCard 
            key={category.category_ID}
            category={category.category_name}
            description={category.category_description}
            category_ID={category.category_ID}
          />
        ))}
      </div>
    </div>
  );
}

export default AllCategoryCards;