
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CatalogPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div className="catalog-page">
      <h1>Product Catalog</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/product/${product.id}`}>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p><strong>${product.price}</strong></p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CatalogPage;
