import React, { useState, useEffect } from 'react';

export default function MyFake() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isEditing, setIsediting] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [newProduct, setNewProduct] = useState({
    id: '',
    title: '',
    description: '',
    price: '',
    category: '',
    image: ''
  });

  const generateNewProductId = () => {
    const lastProductId = products.length > 0 ? Math.max(...products.map(product => parseInt(product.id))) : 0;
    return lastProductId + 1;
  }

  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    const newProductWithId = {
      ...newProduct,
      id: generateNewProductId().toString() // Yeni id təyin edirik
    };

    fetch('http://localhost:5000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProductWithId), // newProductWithId göndəririk
    })
      .then(response => response.json())
      .then(data => {
        setProducts([...products, data]); // Yeni məhsul əlavə edirik
        setNewProduct({
          title: '',
          description: '',
          price: '',
          category: 'all',
          image: ''
        });
      })
      .catch(error => console.error('Error adding product:', error));
  }

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    updateProduct(editingProductId, newProduct);
    setIsediting(false);
    setEditingProductId(null);
    setNewProduct({
      title: '',
      description: '',
      price: '',
      category: '',
      image: ''
    });
  }

  const updateProduct = (id, updateProduct) => {
    fetch(`http://localhost:5000/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateProduct),
    })
      .then(response => response.json())
      .then(data => {
        setProducts(products.map(product => product.id === id ? data : product));
      });
  }

  const handleEditProduct = (product) => {
    setIsediting(true);
    setEditingProductId(product.id);
    setNewProduct({
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image
    });
  };

  const handleDeleteProduct = (id) => {
    fetch(`http://localhost:5000/products/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setProducts(products.filter(product => product.id !== id));
      });
  }

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

      <div className='productStyle'>
        {filteredProducts.map((product) => (
          <div key={product.id}>
            <h2>Product</h2>
            <img src={product.image} alt={product.title} />
            <p>{product.description}</p>
            <p>{product.price} AZN</p>
            <p>{product.category}</p>
            <button onClick={() => handleEditProduct(product)}>Edit</button>
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </div>
        ))}
      </div>

      <h2>Add a new product</h2>
      <form onSubmit={isEditing ? handleUpdateSubmit : handleAddProduct}>
        <input
          type="text"
          name="title"
          placeholder="Product Title"
          value={newProduct.title}
          onChange={handleInputChange}
        />
        <br />
        <textarea
          name="description"
          placeholder="Product Description"
          value={newProduct.description}
          onChange={handleInputChange}
        />
        <br />
        <input
          type="number"
          name="price"
          placeholder="Product Price"
          value={newProduct.price}
          onChange={handleInputChange}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Product Image URL"
          value={newProduct.image}
          onChange={handleInputChange}
        />
        <br />
        <select
          name="category"
          value={newProduct.category}
          onChange={handleInputChange}
        >
          <option value="all">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <br />
        <button type="submit">Add Product</button>
      </form>
    </>
  );
}
