import { getInventoryItem, getAllInventory } from './api.js';

// Product data with consistent structure
let products = [
    // Chairs
    { 
        id: 1, 
        name: 'Wooden Chair', 
        category: 'Chairs', 
        stock: 'Loading...', 
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800',
        sku: 'FUR001',
        quantity: 0
    },
    { 
        id: 2, 
        name: 'Office Chair', 
        category: 'Chairs', 
        stock: 'Loading...', 
        price: 249.99,
        image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&q=80&w=800',
        sku: 'FUR002',
        quantity: 0
    },
    { 
        id: 3, 
        name: 'Recliner Chair', 
        category: 'Chairs', 
        stock: 'Loading...', 
        price: 349.99,
        image: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&q=80&w=800',
        sku: 'FUR003',
        quantity: 0
    },
    { 
        id: 4, 
        name: 'Sofa 3-Seater', 
        category: 'Chairs', 
        stock: 'Loading...', 
        price: 599.99,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800',
        sku: 'FUR004',
        quantity: 0
    },
    { 
        id: 5, 
        name: 'Bar Stool', 
        category: 'Chairs', 
        stock: 'Loading...', 
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=800',
        sku: 'FUR005',
        quantity: 0
    },
    { 
        id: 6, 
        name: 'Armchair', 
        category: 'Chairs', 
        stock: 'Loading...', 
        price: 279.99,
        image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=800',
        sku: 'FUR006',
        quantity: 0
    },
    { 
        id: 7, 
        name: 'Sectional Sofa', 
        category: 'Chairs', 
        stock: 'Loading...', 
        price: 899.99,
        image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=800',
        sku: 'FUR007',
        quantity: 0
    },
    { 
        id: 8, 
        name: 'Chesterfield Sofa', 
        category: 'Chairs', 
        stock: 'Loading...', 
        price: 1299.99,
        image: 'https://images.unsplash.com/photo-1550254478-ead40cc54513?auto=format&fit=crop&q=80&w=800',
        sku: 'FUR008',
        quantity: 0
    },
    
    // Tables
    { 
        id: 13, 
        name: 'Coffee Table', 
        category: 'Tables', 
        stock: 'Loading...', 
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800',
        sku: 'FUR013',
        quantity: 0
    },
    { 
        id: 14, 
        name: 'Study Desk', 
        category: 'Tables', 
        stock: 'Loading...', 
        price: 299.99,
        image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=800',
        sku: 'FUR014',
        quantity: 0
    },
    { 
        id: 18, 
        name: 'Standing Desk', 
        category: 'Tables', 
        stock: 'Loading...', 
        price: 399.99,
        image: 'https://standingdesktopper.com/wp-content/uploads/2020/09/SHW-electric-height-adjustable-computer-desk-review.jpg',
        sku: 'FUR018',
        quantity: 0
    },
    { 
        id: 19, 
        name: 'Dining Table', 
        category: 'Tables', 
        stock: 'Loading...', 
        price: 599.99,
        image: 'https://images-cdn.ubuy.co.in/633ac8be0e1d1b7e59248e8c-dining-table-set-kitchen-dining-table.jpg?auto=format&fit=crop&q=80&w=800',
        sku: 'FUR019',
        quantity: 0
    },
    
    // Storage
    { 
        id: 20, 
        name: 'Wardrobe', 
        category: 'Storage', 
        stock: 'Loading...', 
        price: 499.99,
        image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800',
        sku: 'FUR020',
        quantity: 0
    },
    { 
        id: 21, 
        name: 'Wine Rack', 
        category: 'Storage', 
        stock: 'Loading...', 
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800',
        sku: 'FUR021',
        quantity: 0
    },
    { 
        id: 22, 
        name: 'Shoe Cabinet', 
        category: 'Storage', 
        stock: 'Loading...', 
        price: 179.99,
        image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800',
        sku: 'FUR022',
        quantity: 0
    },
    
    // Beds
    { 
        id: 24, 
        name: 'Bunk Bed', 
        category: 'Beds', 
        stock: 'Loading...', 
        price: 499.99,
        image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&q=80&w=800',
        sku: 'FUR024',
        quantity: 0
    },
    { 
        id: 25, 
        name: 'Canopy Bed', 
        category: 'Beds', 
        stock: 'Loading...', 
        price: 899.99,
        image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800',
        sku: 'FUR025',
        quantity: 0
    },
    { 
        id: 26, 
        name: 'Adjustable Bed', 
        category: 'Beds', 
        stock: 'Loading...', 
        price: 1299.99,
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800',
        sku: 'FUR026',
        quantity: 0
    },
    { 
        id: 27, 
        name: 'Platform Bed', 
        category: 'Beds', 
        stock: 'Loading...', 
        price: 699.99,
        image: 'https://tse2.mm.bing.net/th/id/OIP.jgjQHOXwl1ltxmGUe5ZyxwHaJb?rs=1&pid=ImgDetMain&o=7&rm=3',
        sku: 'FUR027',
        quantity: 0
    }
];

// Function to update product stock status from API
async function updateProductStockStatus() {
    try {
        // First, try to get all inventory at once
        const allInventory = await getAllInventory();
        
        if (allInventory && allInventory.length > 0) {
            // Create a map of SKU to inventory for faster lookup
            const inventoryMap = new Map(allInventory.map(item => [item.sku, item]));
            
            // Update each product with inventory data
            products = products.map(product => {
                const inventory = inventoryMap.get(product.sku) || { stock: 0, status: 'unavailable' };
                return {
                    ...product,
                    stock: getStockStatus(inventory),
                    quantity: inventory.stock || 0,
                    status: inventory.status || 'unavailable'
                };
            });
        } else {
            // Fallback to individual API calls if bulk fetch fails
            console.warn('Bulk inventory fetch failed, falling back to individual calls');
            await updateStockIndividualCalls();
        }
    } catch (error) {
        console.error('Error updating stock status:', error);
        await updateStockIndividualCalls(); // Fallback to individual calls
    }
}

// Fallback function to update stock with individual API calls
async function updateStockIndividualCalls() {
    for (const product of products) {
        try {
            const inventory = await getInventoryItem(product.sku);
            if (inventory) {
                product.stock = getStockStatus(inventory);
                product.quantity = inventory.stock || 0;
                product.status = inventory.status || 'unavailable';
            } else {
                product.stock = 'Unknown';
                product.quantity = 0;
                product.status = 'unavailable';
            }
        } catch (error) {
            console.error(`Error updating stock for ${product.name}:`, error);
            product.stock = 'Error';
            product.quantity = 0;
            product.status = 'error';
        }
    }
}

// Helper function to determine stock status
function getStockStatus(inventory) {
    if (!inventory) return 'Unknown';
    if (inventory.status === 'available') {
        return inventory.stock > 5 ? 'In Stock' : 'Few Left';
    }
    return 'Out of Stock';
}

// Function to render products on the shop page
function renderProducts(productsToRender, containerId = 'product-container') {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = productsToRender.map(product => `
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
                <h4>$${product.price ? product.price.toFixed(2) : '0.00'}</h4>
                <span class="stock ${product.stock.toLowerCase().includes('out') ? 'out' : 'in'}">
                    ${product.stock}${product.quantity > 0 ? ` (${product.quantity} left)` : ''}
                </span>
            </div>
            <a href="#" class="cart" onclick="addToCart(${product.id}, '${product.name.replace("'", "\\'")}', ${product.price || 0}, '${product.image}'); return false;">
                <i class="fas fa-shopping-cart"></i>
            </a>
        </div>
    `).join('');
}

// Initialize the shop page
async function initShopPage() {
    try {
        // Show loading state
        const container = document.getElementById('product-container');
        if (container) {
            container.innerHTML = '<div class="loading">Loading products...</div>';
        }
        
        // Update stock status
        await updateProductStockStatus();
        
        // Render products with updated stock
        renderProducts(products);
    } catch (error) {
        console.error('Error initializing shop page:', error);
        const container = document.getElementById('product-container');
        if (container) {
            container.innerHTML = '<div class="error">Failed to load products. Please try again later.</div>';
        }
    }
    renderProducts(products);
}

// Add CSS for stock status
const style = document.createElement('style');
style.textContent = `
    .stock {
        display: block;
        margin-top: 5px;
        font-weight: 500;
    }
    .stock.in {
        color: #28a745;
    }
    .stock.out {
        color: #dc3545;
    }
    .pro {
        position: relative;
        transition: 0.3s;
    }
    .pro .cart {
        position: absolute;
        bottom: 20px;
        right: 20px;
        background: #e8f6ea;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #088178;
        transition: 0.3s;
    }
    .pro .cart:hover {
        background: #088178;
        color: #fff;
    }
    .pro .cart:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;
document.head.appendChild(style);

// Initialize when the DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initShopPage);
} else {
    initShopPage();
}

// Make functions available globally
window.productModule = {
    products,
    fetchInventoryStatus,
    updateProductStockStatus,
    renderProducts,
    initShopPage
};