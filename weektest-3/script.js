const conversionRate = 1; 
//  A sample list of products with IDs, names, and prices.
const products = [
    { id: 1, name: 'Product-1', price: 100 * conversionRate },
    { id: 2, name: 'Product-2', price: 200 * conversionRate },
    { id: 3, name: 'Product-3', price: 300 * conversionRate },
];

let cart = {};
// renderProducts()  dynamically generate HTML for each product and cart item based on the product list and cart object.
function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '<h2>Products</h2>';
    
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        const quantity = cart[product.id] ? cart[product.id].quantity : 0;
        
        productItem.innerHTML = `
            <span>${product.name} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ₹${product.price}</span>
            <button onclick="addToCart(${product.id}, this)">+</button>
            <span class="quantity" data-id="${product.id}">${quantity}</span>
            <button onclick="removeFromCart(${product.id}, this)">-</button>
        `;
        productList.appendChild(productItem);
    });
}

// renderCart() dynamically generate HTML for each product and cart item based on the product list and cart object.
function renderCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = '<h2>Cart</h2>';
    
    if (Object.keys(cart).length === 0) {
        cartDiv.innerHTML += '<p>No Product added to the cart</p>';
        return;
    }

    let totalPrice = 0;
    Object.values(cart).forEach(item => {
        totalPrice += item.price * item.quantity;
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
        <span>${item.name}</span>
        <span class="price-quantity">₹${item.price} x ${item.quantity}</span>
    `;
    
        cartDiv.appendChild(cartItem);
    });

    cartDiv.innerHTML += `<h3>Total Price: ₹${totalPrice}</h3>`;
}

//addToCart() increments the product quantity in the cart and updates the display.
function addToCart(productId, button) {
    const product = products.find(p => p.id === productId);
    if (!cart[productId]) {
        cart[productId] = { ...product, quantity: 1 };
    } else {
        cart[productId].quantity += 1;
    }
    updateQuantityDisplay(productId);
    renderCart();
}

// removeFromCart() decreases the quantity or removes the item from the cart when quantity reaches zero.
function removeFromCart(productId, button) {
    if (cart[productId]) {
        cart[productId].quantity -= 1;
        if (cart[productId].quantity <= 0) {
            delete cart[productId];
        }
    }
    updateQuantityDisplay(productId);
    renderCart();
}

// The updateQuantityDisplay() function updates the quantity for individual items in the product list.
function updateQuantityDisplay(productId) {
    const quantityDisplay = document.querySelector(`.quantity[data-id="${productId}"]`);
    quantityDisplay.textContent = cart[productId] ? cart[productId].quantity : 0;
}

// Initial rendering
renderProducts();
renderCart();
