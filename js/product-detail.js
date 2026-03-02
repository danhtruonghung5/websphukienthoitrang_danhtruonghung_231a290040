/**
 * WSH Fashion Store - Product Detail Page JavaScript
 * Handles product detail display and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    initProductDetail();
});

let currentProduct = null;
let selectedSize = null;
let selectedColor = null;
let quantity = 1;

function initProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    if (!productId) {
        showError('Không tìm thấy sản phẩm');
        return;
    }

    currentProduct = window.productsData.find(p => p.id === productId);

    if (!currentProduct) {
        showError('Sản phẩm không tồn tại');
        return;
    }

    renderProductDetail();
    renderRelatedProducts();
    setupEventListeners();
}

function renderProductDetail() {
    // Update page title
    document.title = `${currentProduct.name} - WSH Fashion`;

    // Main image
    const mainImage = document.getElementById('main-product-image');
    if (mainImage) {
        mainImage.src = currentProduct.images[0];
        mainImage.alt = currentProduct.name;
    }

    // Thumbnails
    const thumbnailsContainer = document.getElementById('thumbnail-images');
    if (thumbnailsContainer) {
        thumbnailsContainer.innerHTML = currentProduct.images.map((img, index) => `
            <div class="thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">
                <img src="${img}" alt="${currentProduct.name} - ${index + 1}">
            </div>
        `).join('');
    }

    // Product name
    const productName = document.getElementById('product-name');
    if (productName) {
        productName.textContent = currentProduct.name;
    }

    // Rating
    const ratingContainer = document.getElementById('product-rating');
    if (ratingContainer) {
        ratingContainer.innerHTML = `
            <div class="stars">${window.renderStars(currentProduct.rating)}</div>
            <span class="rating-count">(${currentProduct.reviews} đánh giá)</span>
        `;
    }

    // Price
    const priceContainer = document.getElementById('product-price');
    if (priceContainer) {
        const discountPercent = currentProduct.oldPrice 
            ? Math.round((1 - currentProduct.price / currentProduct.oldPrice) * 100) 
            : 0;

        priceContainer.innerHTML = `
            <span class="detail-current-price">${window.formatPrice(currentProduct.price)}</span>
            ${currentProduct.oldPrice ? `
                <span class="detail-old-price">${window.formatPrice(currentProduct.oldPrice)}</span>
                <span class="discount-badge">-${discountPercent}%</span>
            ` : ''}
        `;
    }

    // Description
    const descriptionContainer = document.getElementById('product-description');
    if (descriptionContainer) {
        descriptionContainer.innerHTML = `
            <h3>Mô tả sản phẩm</h3>
            <p>${currentProduct.description}</p>
        `;
    }

    // Sizes
    const sizeContainer = document.getElementById('size-options');
    if (sizeContainer && currentProduct.sizes) {
        sizeContainer.innerHTML = currentProduct.sizes.map(size => `
            <button class="size-btn" data-size="${size}">${size}</button>
        `).join('');
        
        // Select first size by default
        const firstSizeBtn = sizeContainer.querySelector('.size-btn');
        if (firstSizeBtn) {
            firstSizeBtn.classList.add('active');
            selectedSize = firstSizeBtn.dataset.size;
        }
    }

    // Colors
    const colorContainer = document.getElementById('color-options');
    if (colorContainer && currentProduct.colors) {
        colorContainer.innerHTML = currentProduct.colors.map(color => `
            <button class="color-btn" data-color="${color}" style="background: ${color}; ${color === '#ffffff' ? 'border: 1px solid #ddd;' : ''}"></button>
        `).join('');
        
        // Select first color by default
        const firstColorBtn = colorContainer.querySelector('.color-btn');
        if (firstColorBtn) {
            firstColorBtn.classList.add('active');
            selectedColor = firstColorBtn.dataset.color;
        }
    }

    // Update breadcrumb
    const breadcrumb = document.querySelector('.breadcrumb');
    if (breadcrumb) {
        breadcrumb.innerHTML = `
            <a href="index.html">Trang chủ</a>
            <span>/</span>
            <a href="products.html">Sản phẩm</a>
            <span>/</span>
            <a href="products.html?category=${currentProduct.category}">${window.getCategoryName(currentProduct.category)}</a>
            <span>/</span>
            <span>${currentProduct.name}</span>
        `;
    }
}

function renderRelatedProducts() {
    const container = document.getElementById('related-products');
    if (!container) return;

    // Get products from same category, excluding current product
    const relatedProducts = window.productsData
        .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
        .slice(0, 4);

    if (relatedProducts.length === 0) {
        // If no products in same category, show random products
        const randomProducts = window.productsData
            .filter(p => p.id !== currentProduct.id)
            .sort(() => Math.random() - 0.5)
            .slice(0, 4);
        
        container.innerHTML = randomProducts.map(p => window.renderProductCard(p)).join('');
    } else {
        container.innerHTML = relatedProducts.map(p => window.renderProductCard(p)).join('');
    }
}

function setupEventListeners() {
    // Thumbnail click
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.addEventListener('click', () => {
            const index = thumb.dataset.index;
            const mainImage = document.getElementById('main-product-image');
            
            if (mainImage) {
                mainImage.src = currentProduct.images[index];
                
                // Update active thumbnail
                document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            }
        });
    });

    // Size selection
    document.querySelectorAll('#size-options .size-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#size-options .size-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedSize = btn.dataset.size;
        });
    });

    // Color selection
    document.querySelectorAll('#color-options .color-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#color-options .color-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedColor = btn.dataset.color;
        });
    });

    // Quantity controls
    const qtyInput = document.getElementById('qty-input');
    const qtyMinus = document.getElementById('qty-minus');
    const qtyPlus = document.getElementById('qty-plus');

    if (qtyMinus) {
        qtyMinus.addEventListener('click', () => {
            if (quantity > 1) {
                quantity--;
                qtyInput.value = quantity;
            }
        });
    }

    if (qtyPlus) {
        qtyPlus.addEventListener('click', () => {
            if (quantity < 99) {
                quantity++;
                qtyInput.value = quantity;
            }
        });
    }

    if (qtyInput) {
        qtyInput.addEventListener('change', (e) => {
            let val = parseInt(e.target.value);
            if (isNaN(val) || val < 1) val = 1;
            if (val > 99) val = 99;
            quantity = val;
            qtyInput.value = quantity;
        });
    }

    // Add to cart button
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            if (!selectedSize) {
                window.showToast('Lỗi', 'Vui lòng chọn kích thước', 'error');
                return;
            }
            if (!selectedColor) {
                window.showToast('Lỗi', 'Vui lòng chọn màu sắc', 'error');
                return;
            }

            window.addToCart(currentProduct.id, quantity, selectedSize, selectedColor);
            
            // Button animation
            addToCartBtn.classList.add('added');
            addToCartBtn.innerHTML = '<i class="fas fa-check"></i> Đã thêm';
            
            setTimeout(() => {
                addToCartBtn.classList.remove('added');
                addToCartBtn.innerHTML = '<i class="fas fa-cart-plus"></i> Thêm vào giỏ hàng';
            }, 2000);
        });
    }

    // Buy now button
    const buyNowBtn = document.getElementById('buy-now-btn');
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', () => {
            if (!selectedSize) {
                window.showToast('Lỗi', 'Vui lòng chọn kích thước', 'error');
                return;
            }
            if (!selectedColor) {
                window.showToast('Lỗi', 'Vui lòng chọn màu sắc', 'error');
                return;
            }

            window.addToCart(currentProduct.id, quantity, selectedSize, selectedColor);
            window.location.href = 'checkout.html';
        });
    }

    // Image zoom on hover (optional enhancement)
    const mainImage = document.getElementById('main-product-image');
    const imageContainer = document.querySelector('.main-image');
    
    if (mainImage && imageContainer) {
        imageContainer.addEventListener('mousemove', (e) => {
            const rect = imageContainer.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width * 100;
            const y = (e.clientY - rect.top) / rect.height * 100;
            
            mainImage.style.transformOrigin = `${x}% ${y}%`;
            mainImage.style.transform = 'scale(1.5)';
        });

        imageContainer.addEventListener('mouseleave', () => {
            mainImage.style.transform = 'scale(1)';
        });
    }
}

function showError(message) {
    const container = document.querySelector('.product-detail');
    if (container) {
        container.innerHTML = `
            <div class="container">
                <div class="no-products" style="padding: 100px 20px;">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>${message}</h3>
                    <p>Vui lòng quay lại trang sản phẩm</p>
                    <a href="products.html" class="btn btn-blue" style="margin-top: 20px;">
                        <i class="fas fa-arrow-left"></i> Quay lại
                    </a>
                </div>
            </div>
        `;
    }
}
