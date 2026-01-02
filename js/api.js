const API_BASE_URL = 'https://order-to-delivery.onrender.com';

// Function to fetch inventory for a specific SKU
export async function getInventoryItem(sku) {
    try {
        const response = await fetch(`${API_BASE_URL}/inventory/${sku}`);
        if (!response.ok) {
            throw new Error(`Error fetching inventory for SKU ${sku}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching inventory item:', error);
        return null;
    }
}

// Function to fetch all inventory items
export async function getAllInventory() {
    try {
        const response = await fetch(`${API_BASE_URL}/inventory/`);
        if (!response.ok) {
            throw new Error('Error fetching inventory');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching inventory:', error);
        return [];
    }
}

// Function to place an order
export async function placeOrder(orderData) {
    try {
        const response = await fetch(`${API_BASE_URL}/orders/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData)
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Failed to place order');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error placing order:', error);
        throw error;
    }
}

// Function to get order details
export async function getOrderDetails(orderId) {
    try {
        const response = await fetch(`${API_BASE_URL}/orders/${orderId}`);
        if (!response.ok) {
            throw new Error(`Error fetching order ${orderId}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching order details:', error);
        return null;
    }
}
