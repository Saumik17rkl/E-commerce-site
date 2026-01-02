/* =========================
   CART STATE
========================= */
let cart = JSON.parse(localStorage.getItem('cart')) || [];

/* =========================
   CART COUNT
========================= */
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document
        .querySelectorAll('#cart-count, #mobile-cart-count')
        .forEach(el => el && (el.textContent = count));
}

/* =========================
   ADD TO CART
========================= */
// Add to cart function
function addToCart(id, name, price, image, quantity = 1) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ id, name, price, image, quantity });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Show added to cart notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = `${name} added to cart!`;
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Update cart count in the header
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    let cartCount = document.querySelector('.cart-count');
    
    if (!cartCount) {
        // Create cart count element if it doesn't exist
        const cartLink = document.querySelector('a[href="cart.html"]');
        if (cartLink) {
            cartCount = document.createElement('span');
            cartCount.className = 'cart-count';
            cartLink.appendChild(cartCount);
        }
    }
    
    if (cartCount) {
        cartCount.textContent = count;
        cartCount.style.display = count > 0 ? 'flex' : 'none';
    }
}

// Call this when the page loads
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});
window.addToCart = function(id, name, price, image, qty = 1) {
    const item = cart.find(p => p.id === id);

    if (item) {
        item.quantity += qty;
    } else {
        cart.push({ id, name, price, image, quantity: qty });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Show a small notification
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = `${name} added to cart!`;
    document.body.appendChild(notification);
    
    // Remove notification after 2 seconds
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

/* =========================
   MOBILE MENU
========================= */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-toggle');
    const navbar = document.getElementById('navbar');
    if (!menuBtn || !navbar) return;

    menuBtn.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });

    document.addEventListener('click', e => {
        if (!e.target.closest('#navbar') && !e.target.closest('#mobile-menu-toggle')) {
            navbar.classList.remove('active');
        }
    });
}

/* =========================
   IMAGE ZOOM (PRODUCT PAGE)
========================= */
function initImageZoom() {
    const images = document.querySelectorAll('.product-img img');
    if (!images.length) return;

    images.forEach(img => {
        img.addEventListener('mousemove', e => {
            const r = img.getBoundingClientRect();
            const x = ((e.clientX - r.left) / r.width) * 100;
            const y = ((e.clientY - r.top) / r.height) * 100;
            img.style.transformOrigin = `${x}% ${y}%`;
            img.style.transform = 'scale(2)';
        });

        img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });
    });
}

/* =========================
   SEARCH
========================= */
function initSearch() {
    const btn = document.getElementById('search-btn');
    const input = document.getElementById('search-input');
    if (!btn || !input) return;

    const search = () => {
        const q = input.value.trim();
        if (!q) return;
        window.location.href = `search-results.html?q=${encodeURIComponent(q)}`;
    };

    btn.addEventListener('click', search);
    input.addEventListener('keydown', e => e.key === 'Enter' && search());
}

/* =========================
   ACTIVE NAV
========================= */
function highlightActiveNav() {
    const page = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('#navbar a').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === page);
    });
}
 function renderFeaturedProducts() {
        const container = document.getElementById('featured-products');
        if (!container) return;
        
        // Get the first 8 products as featured
        const featuredProducts = window.productModule.products.slice(0, 8);
        
        // Render the products
        container.innerHTML = featuredProducts.map(product => `
            <div class="pro">
                <img src="${product.image}" alt="${product.name}">
                <div class="des">
                    <span>${product.category}</span>
                    <h5>${product.name}</h5>
                    <div class="star">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <h4>$${product.price.toFixed(2)}</h4>
                    <span class="stock ${product.stock.toLowerCase().includes('out') ? 'out' : 'in'}">
                        ${product.stock}
                    </span>
                </div>
                <a href="#" class="cart" 
                   onclick="addToCart(${product.id}, '${product.name.replace("'", "\\'")}', ${product.price || 0}, '${product.image}'); return false;">
                    <i class="fas fa-shopping-cart"></i>
                </a>
            </div>
        `).join('');
    }
    // Initialize when the DOM is fully loaded
    document.addEventListener('DOMContentLoaded', async () => {
        // Wait for products to load
        if (typeof productModule !== 'undefined') {
            await productModule.updateProductStockStatus();
            renderFeaturedProducts();
        }
    });
/* =========================
   CHECKOUT VALIDATION
========================= */
function validateCheckoutForm() {
    const form = document.getElementById('checkout-form');
    if (!form) return true;

    let valid = true;

    form.querySelectorAll('[required]').forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = 'red';
            valid = false;
        } else {
            field.style.borderColor = '#e2e9e1';
        }
    });

    // Simple email validation - just check for @ and .
    const email = document.getElementById('email');
    if (email && (!email.value.includes('@') || !email.value.includes('.'))) {
        email.style.borderColor = 'red';
        valid = false;
    }

    return valid;
}

/* =========================
   CHECKOUT HANDLER
========================= */
function handleCheckout() {
    if (!cart.length) {
        alert('Your cart is empty.');
        return false;
    }

    alert('Thank you! Your order has been placed.');
    localStorage.removeItem('cart');
    cart = [];
    updateCartCount();
    window.location.href = 'thank-you.html';
    return false;
}

/* =========================
   CART NOTIFICATION STYLES
========================= */
const cartNotificationStyle = document.createElement('style');
cartNotificationStyle.textContent = `
    .cart-notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #088178;
        color: white;
        padding: 12px 24px;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    }
    
    @keyframes slideIn {
        from { transform: translateY(100px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
`;
document.head.appendChild(cartNotificationStyle);

/* =========================
   INIT
========================= */
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    initMobileMenu();
    initImageZoom();
    initSearch();
    highlightActiveNav();

    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', e => {
            if (!validateCheckoutForm()) {
                e.preventDefault();
                alert('Please fix the form errors.');
            }
        });
    }
});
