
document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('productList');
    const addProductForm = document.getElementById('addProductForm');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');

    let authToken = null;

    // Fetch and display products
    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products');
            const products = await response.json();
            productList.innerHTML = products.map(product => `
                <div class="productCard">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p>Price: $${product.price}</p>
                    <p>Category: ${product.category}</p>
                    <p>Supplier: ${product.supplier}</p>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // Add a new product
    addProductForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const product = {
            name: document.getElementById('name').value,
            description: document.getElementById('description').value,
            price: parseFloat(document.getElementById('price').value),
            category: document.getElementById('category').value,
            supplier_id: parseInt(document.getElementById('supplierId').value),
        };

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
                alert('Product added successfully!');
                fetchProducts();
            } else {
                alert('Failed to add product.');
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    });

    // Login
    loginBtn.addEventListener('click', async () => {
        const username = prompt('Enter your username:');
        const password = prompt('Enter your password:');

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                authToken = data.access_token;
                alert('Login successful!');
            } else {
                alert('Login failed.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    });

    // Register
    registerBtn.addEventListener('click', async () => {
        const username = prompt('Enter a username:');
        const email = prompt('Enter your email:');
        const password = prompt('Enter a password:');

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (response.ok) {
                alert('Registration successful!');
            } else {
                alert('Registration failed.');
            }
        } catch (error) {
            console.error('Error registering:', error);
        }
    });

    // Initial fetch of products
    fetchProducts();
});