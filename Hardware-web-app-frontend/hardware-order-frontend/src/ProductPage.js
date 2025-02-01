
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Define the getProductById function
function getProductById(id) {
  return axios.get(`/api/products/${id}`); // Replace with actual API endpoint
}

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
      getProductById(id).then(response => setProduct(response.data));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
      <div>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <img src={product.image_url} alt={product.name} />
      </div>
  );
}

export default ProductPage;  //export matches the component name
