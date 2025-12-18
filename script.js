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
function addToCart(id, name, price, image, qty = 1) {
    const item = cart.find(p => p.id === id);

    if (item) {
        item.quantity += qty;
    } else {
        cart.push({ id, name, price, image, quantity: qty });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
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
