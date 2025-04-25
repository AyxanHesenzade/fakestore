import React, { useState, useEffect } from 'react';

export default function MyFake() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // API-dən məhsulları alırıq
    fetch('http://localhost:5000/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);

        // Kategoriyaları təyin edirik
        const allCategories = ['all', ...new Set(data.map(product => product.category))];
        setCategories(allCategories);
      });
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };


  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  return (
    <>
      <div>MyFakeProducts</div>

      
      <div>
        {categories.map((category) => (
          <button key={category} onClick={() => handleCategoryChange(category)}>
            {category}
          </button>
        ))}
      </div>


      {filteredProducts.map((product) => (
        <div key={product.id}>
          <h2>Product</h2>
          <img src={product.image} alt={product.title} />
          <p>{product.description}</p>
          <p>{product.price} AZN</p>
          <p>{product.category}</p>
        </div>
      ))}
    </>
  );
}
