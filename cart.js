// cart.js - Cart Management System
class Cart {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.cartCountElement = document.getElementById('cart-count');
        this.updateCartCount();
    }

    addItem(product) {
        const existingItem = this.cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({...product, quantity: 1});
        }
        this.saveCart();
        this.updateCartCount();
        this.showNotification(`${product.name} added to cart!`);
    }

    removeItem(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
        this.renderCart();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = parseInt(newQuantity) || 1;
            if (item.quantity <= 0) {
                this.removeItem(productId);
                return;
            }
            this.saveCart();
            this.renderCart();
        }
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    updateCartCount() {
        if (this.cartCountElement) {
            const totalItems = this.cart.reduce((total, item) => total + item.quantity, 0);
            this.cartCountElement.textContent = totalItems;
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    renderCart() {
        const cartContainer = document.getElementById('cart-items');
        if (!cartContainer) return;

        if (this.cart.length === 0) {
            cartContainer.innerHTML = '<p>Your cart is empty</p>';
            return;
        }

        cartContainer.innerHTML = this.cart.map(item => `
            <tr>
                <td><img src="${item.image}" alt="${item.name}"></td>
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <input type="number" value="${item.quantity}" 
                           min="1" 
                           onchange="cart.updateQuantity(${item.id}, this.value)">
                </td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
                <td><i class="fas fa-trash" onclick="cart.removeItem(${item.id})"></i></td>
            </tr>
        `).join('');

        this.updateTotal();
    }

    updateTotal() {
        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.1; // 10% tax
        const total = subtotal + tax;

        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
        document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    }
}

// Initialize cart
const cart = new Cart();

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add click handlers to all "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productElement = e.target.closest('.product');
            const product = {
                id: parseInt(productElement.dataset.id),
                name: productElement.dataset.name,
                price: parseFloat(productElement.dataset.price),
                image: productElement.dataset.image
            };
            cart.addItem(product);
            e.preventDefault();
        });
    });

    // Initialize cart page if we're on the cart page
    if (document.getElementById('cart-items')) {
        cart.renderCart();
    }
});