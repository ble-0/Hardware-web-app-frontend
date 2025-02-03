
import React, { useState, useEffect } from 'react';
import ProductList from '../../src/components/ProductList';
import AddProductForm from '../../src/components/AddProductForm';
import Auth from '../../src/components/Auth';
import './App.css';

const App = () => {
    const [products, setProducts] = useState([]);
    const [authToken, setAuthToken] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleAddProduct = async (product) => {
        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify(product),
            });

            if (response.ok) {
                fetchProducts();
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleLogin = (token) => {
        setAuthToken(token);
    };

    return (
        <div>
            <header>
                <h1>Hardware Web App</h1>
            </header>
            <main>
                <Auth onLogin={handleLogin} />
                <ProductList products={products} />
                <AddProductForm onAddProduct={handleAddProduct} />
            </main>
        </div>
    );
};

export default App;