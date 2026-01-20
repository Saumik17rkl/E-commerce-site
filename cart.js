// cart.js — SINGLE SOURCE OF TRUTH

class Cart {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem("cart")) || [];
        this.notification = document.getElementById("notification");
        this.updateCartCount();
    }

    /* ---------- CORE ACTIONS ---------- */

    addItem(product) {
        const item = this.cart.find(p => p.id === product.id);
        if (item) {
            item.quantity += 1;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }
        this.persist("Item added to cart");
    }

    removeItem(id) {
        this.cart = this.cart.filter(item => item.id !== id);
        this.persist("Item removed");
    }

    updateQuantity(id, qty) {
        const item = this.cart.find(i => i.id === id);
        if (!item) return;

        item.quantity = Math.max(1, parseInt(qty) || 1);
        this.persist("Quantity updated");
    }

    /* ---------- STORAGE ---------- */

    persist(message) {
        localStorage.setItem("cart", JSON.stringify(this.cart));
        this.updateCartCount();
        this.renderCart();
        this.notify(message);
    }

    /* ---------- UI UPDATES ---------- */

    updateCartCount() {
        const count = this.cart.reduce((sum, i) => sum + i.quantity, 0);
        document.querySelectorAll(".cart-count, #cart-count, #mobile-cart-count")
            .forEach(el => {
                if (!el) return;
                el.textContent = count;
                el.style.display = count ? "flex" : "none";
            });
    }

    notify(text) {
        if (!this.notification) return;
        this.notification.textContent = text;
        this.notification.style.display = "block";
        setTimeout(() => this.notification.style.display = "none", 2000);
    }

    /* ---------- CART PAGE ONLY ---------- */

    renderCart() {
        const table = document.getElementById("cart-items");
        const subtotalEl = document.getElementById("subtotal");
        const taxEl = document.getElementById("tax");
        const totalEl = document.getElementById("total");

        if (!table || !subtotalEl || !taxEl || !totalEl) return;

        if (this.cart.length === 0) {
            table.innerHTML = `<tr><td colspan="6">Your cart is empty</td></tr>`;
            subtotalEl.textContent = "$0.00";
            taxEl.textContent = "$0.00";
            totalEl.textContent = "$0.00";
            return;
        }

        let subtotal = 0;

        table.innerHTML = this.cart.map(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;

            return `
                <tr>
                    <td><img src="${item.image}" width="60"></td>
                    <td>${item.name}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td>
                        <input type="number" min="1" value="${item.quantity}"
                               data-id="${item.id}" class="qty-input">
                    </td>
                    <td>$${itemTotal.toFixed(2)}</td>
                    <td>
                        <button class="remove-btn" data-id="${item.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join("");

        const tax = subtotal * 0.1;

        subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
        taxEl.textContent = `$${tax.toFixed(2)}`;
        totalEl.textContent = `$${(subtotal + tax).toFixed(2)}`;

        this.bindCartEvents();
    }

    bindCartEvents() {
        document.querySelectorAll(".qty-input").forEach(input => {
            input.addEventListener("change", e => {
                this.updateQuantity(
                    e.target.dataset.id,
                    e.target.value
                );
            });
        });

        document.querySelectorAll(".remove-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                this.removeItem(btn.dataset.id);
            });
        });
    }
}

/* ---------- INIT ---------- */

document.addEventListener("DOMContentLoaded", () => {
    window.cart = new Cart();
    cart.renderCart();
});
