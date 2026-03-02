/**
 * WSH Fashion Store - Checkout Page JavaScript
 * Handles cart display and checkout process
 */

document.addEventListener('DOMContentLoaded', () => {
    initCheckoutPage();
});

const SHIPPING_FEE = 30000;
const FREE_SHIPPING_THRESHOLD = 500000;
const VAT_RATE = 0.1; // 10%

function initCheckoutPage() {
    renderCartItems();
    updateOrderSummary();
    setupEventListeners();
    setupFormValidation();
}

function renderCartItems() {
    const container = document.getElementById('cart-items');
    if (!container) return;

    const cart = window.cart || JSON.parse(localStorage.getItem('wsh_cart')) || [];

    if (cart.length === 0) {
        document.querySelector('.checkout-grid').innerHTML = `
            <div class="empty-cart" style="grid-column: 1 / -1;">
                <i class="fas fa-shopping-cart"></i>
                <h3>Giỏ hàng trống</h3>
                <p>Bạn chưa có sản phẩm nào trong giỏ hàng</p>
                <a href="products.html" class="btn btn-blue">
                    <i class="fas fa-shopping-bag"></i> Tiếp tục mua sắm
                </a>
            </div>
        `;
        return;
    }

    container.innerHTML = cart.map((item, index) => `
        <div class="cart-item" data-index="${index}">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-info">
                <h4 class="cart-item-name">${item.name}</h4>
                <p style="color: var(--text-muted); font-size: 13px;">
                    Size: ${item.size} | 
                    <span style="display: inline-block; width: 14px; height: 14px; background: ${item.color}; border-radius: 50%; vertical-align: middle; border: 1px solid #ddd;"></span>
                </p>
                <div style="display: flex; align-items: center; gap: 15px; margin-top: 10px;">
                    <div class="quantity-mini">
                        <button class="qty-mini-btn" onclick="changeItemQuantity(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-mini-btn" onclick="changeItemQuantity(${index}, 1)">+</button>
                    </div>
                    <span class="cart-item-price">${window.formatPrice(item.price * item.quantity)}</span>
                </div>
            </div>
            <button class="cart-item-remove" onclick="removeItem(${index})">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>
    `).join('');
}

function changeItemQuantity(index, change) {
    const cart = window.cart || JSON.parse(localStorage.getItem('wsh_cart')) || [];
    
    if (cart[index]) {
        cart[index].quantity += change;
        
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        
        localStorage.setItem('wsh_cart', JSON.stringify(cart));
        window.cart = cart;
        
        renderCartItems();
        updateOrderSummary();
        window.updateCartBadge?.();
    }
}

function removeItem(index) {
    const cart = window.cart || JSON.parse(localStorage.getItem('wsh_cart')) || [];
    
    if (cart[index]) {
        const itemName = cart[index].name;
        cart.splice(index, 1);
        
        localStorage.setItem('wsh_cart', JSON.stringify(cart));
        window.cart = cart;
        
        renderCartItems();
        updateOrderSummary();
        window.updateCartBadge?.();
        window.showToast?.('Đã xóa', `${itemName} đã được xóa khỏi giỏ hàng`, 'success');
    }
}

function updateOrderSummary() {
    const cart = window.cart || JSON.parse(localStorage.getItem('wsh_cart')) || [];
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
    const vat = Math.round(subtotal * VAT_RATE);
    const total = subtotal + shipping + vat;

    // Update subtotal
    const subtotalEl = document.getElementById('subtotal');
    if (subtotalEl) subtotalEl.textContent = window.formatPrice(subtotal);

    // Update shipping
    const shippingEl = document.getElementById('shipping');
    if (shippingEl) {
        shippingEl.textContent = shipping === 0 ? 'Miễn phí' : window.formatPrice(shipping);
        shippingEl.style.color = shipping === 0 ? 'var(--success-color)' : '';
    }

    // Update VAT
    const vatEl = document.getElementById('vat');
    if (vatEl) vatEl.textContent = window.formatPrice(vat);

    // Update total
    const totalEl = document.getElementById('grand-total');
    if (totalEl) totalEl.textContent = window.formatPrice(total);

    // Show free shipping progress
    const progressEl = document.getElementById('free-shipping-progress');
    if (progressEl) {
        if (subtotal >= FREE_SHIPPING_THRESHOLD) {
            progressEl.innerHTML = `
                <div style="color: var(--success-color); display: flex; align-items: center; gap: 8px;">
                    <i class="fas fa-check-circle"></i>
                    <span>Bạn được miễn phí vận chuyển!</span>
                </div>
            `;
        } else {
            const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
            const progress = (subtotal / FREE_SHIPPING_THRESHOLD) * 100;
            progressEl.innerHTML = `
                <p style="font-size: 14px; margin-bottom: 8px;">
                    Mua thêm <strong style="color: var(--primary-color);">${window.formatPrice(remaining)}</strong> để được miễn phí vận chuyển
                </p>
                <div style="background: var(--bg-gray); border-radius: 10px; height: 8px; overflow: hidden;">
                    <div style="background: var(--primary-color); height: 100%; width: ${progress}%; transition: width 0.3s ease;"></div>
                </div>
            `;
        }
    }
}

function setupEventListeners() {
    // Province/City change - load districts
    const provinceSelect = document.getElementById('province');
    if (provinceSelect) {
        provinceSelect.addEventListener('change', (e) => {
            // In a real app, this would load districts based on selected province
            console.log('Province selected:', e.target.value);
        });
    }
}

function setupFormValidation() {
    const form = document.getElementById('checkout-form');
    const submitBtn = document.getElementById('submit-order');

    if (!form || !submitBtn) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate form
        if (!validateForm()) return;

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<div class="loading-spinner"></div> Đang xử lý...';

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Success
        const orderNumber = 'WSH' + Date.now().toString().slice(-8);
        
        // Clear cart
        localStorage.removeItem('wsh_cart');
        window.cart = [];

        // Show success message
        showOrderSuccess(orderNumber);
    });
}

function validateForm() {
    const requiredFields = [
        { id: 'fullname', name: 'Họ và tên' },
        { id: 'phone', name: 'Số điện thoại' },
        { id: 'email', name: 'Email' },
        { id: 'address', name: 'Địa chỉ' },
        { id: 'province', name: 'Tỉnh/Thành phố' }
    ];

    let isValid = true;

    requiredFields.forEach(field => {
        const input = document.getElementById(field.id);
        if (input) {
            const value = input.value.trim();
            const errorEl = input.parentElement.querySelector('.error-message');
            
            // Remove existing error
            if (errorEl) errorEl.remove();
            input.style.borderColor = '';

            if (!value) {
                isValid = false;
                showFieldError(input, `${field.name} không được để trống`);
            } else if (field.id === 'phone' && !/^[0-9]{10,11}$/.test(value)) {
                isValid = false;
                showFieldError(input, 'Số điện thoại không hợp lệ');
            } else if (field.id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                isValid = false;
                showFieldError(input, 'Email không hợp lệ');
            }
        }
    });

    // Check if cart is empty
    const cart = window.cart || JSON.parse(localStorage.getItem('wsh_cart')) || [];
    if (cart.length === 0) {
        window.showToast?.('Lỗi', 'Giỏ hàng trống!', 'error');
        isValid = false;
    }

    return isValid;
}

function showFieldError(input, message) {
    input.style.borderColor = 'var(--danger-color)';
    
    const errorEl = document.createElement('span');
    errorEl.className = 'error-message';
    errorEl.style.cssText = 'color: var(--danger-color); font-size: 13px; margin-top: 5px; display: block;';
    errorEl.textContent = message;
    
    input.parentElement.appendChild(errorEl);
}

function showOrderSuccess(orderNumber) {
    const checkoutGrid = document.querySelector('.checkout-grid');
    if (checkoutGrid) {
        checkoutGrid.innerHTML = `
            <div class="order-success" style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
                <div style="width: 100px; height: 100px; background: var(--success-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 30px;">
                    <i class="fas fa-check" style="font-size: 50px; color: white;"></i>
                </div>
                <h2 style="font-size: 28px; margin-bottom: 15px; color: var(--success-color);">Đặt hàng thành công!</h2>
                <p style="font-size: 18px; color: var(--text-light); margin-bottom: 10px;">
                    Cảm ơn bạn đã mua hàng tại WSH Fashion
                </p>
                <p style="font-size: 16px; margin-bottom: 30px;">
                    Mã đơn hàng của bạn: <strong style="color: var(--primary-color);">${orderNumber}</strong>
                </p>
                <p style="color: var(--text-muted); margin-bottom: 30px;">
                    Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất để xác nhận đơn hàng.
                </p>
                <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
                    <a href="index.html" class="btn btn-outline" style="border-color: var(--primary-color); color: var(--primary-color);">
                        <i class="fas fa-home"></i> Về trang chủ
                    </a>
                    <a href="products.html" class="btn btn-blue">
                        <i class="fas fa-shopping-bag"></i> Tiếp tục mua sắm
                    </a>
                </div>
            </div>
        `;
    }
}

// Make functions globally available
window.changeItemQuantity = changeItemQuantity;
window.removeItem = removeItem;
