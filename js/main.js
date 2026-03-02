/**
 * WSH Fashion Store - Main JavaScript
 * Core functionality for all pages
 */

// ==========================================
// PRODUCT DATA (Simulated Database)
// ==========================================
const productsData = [
    {
        id: 1,
        name: "Áo Polo Nam Premium",
        category: "ao",
        price: 450000,
        oldPrice: 550000,
        image: "assets/img/product1.webp",
        images: [
            "assets/img/product1.webp",
            "assets/img/product1-2.jpg",
            "assets/img/product1-3.jpg"
        ],
        rating: 4.5,
        reviews: 128,
        badge: "sale",
        description: "Áo polo nam cao cấp với chất liệu cotton 100% thoáng mát, phù hợp cho mọi hoạt động. Thiết kế hiện đại, form dáng chuẩn châu Á.",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["#1e3a5f", "#ffffff", "#2d2d2d"]
    },
    {
        id: 2,
        name: "Áo Thun Oversize Unisex",
        category: "ao",
        price: 299000,
        oldPrice: null,
        image: "assets/img/product2.jpg",
        images: [
            "assets/img/product2.jpg",
            "assets/img/product2-2.jpg",
            "assets/img/product2-3.jpg"
        ],
        rating: 4.8,
        reviews: 256,
        badge: "new",
        description: "Áo thun oversize unisex phong cách Hàn Quốc. Chất liệu cotton cao cấp, form rộng thoải mái, phù hợp với mọi phong cách.",
        sizes: ["M", "L", "XL"],
        colors: ["#ffffff", "#000000", "#c9a86c"]
    },
    {
        id: 3,
        name: "Quần Jeans Slim Fit",
        category: "quan",
        price: 650000,
        oldPrice: 850000,
        image: "assets/img/product3.jpg",
        images: [
            "assets/img/product3.jpg",
            "assets/img/product3-2.jpg",
            "assets/img/product3.jpg"
        ],
        rating: 4.3,
        reviews: 89,
        badge: "sale",
        description: "Quần jeans nam slim fit co giãn nhẹ, dễ vận động. Màu xanh đậm cổ điển, phù hợp với nhiều kiểu áo khác nhau.",
        sizes: ["28", "29", "30", "31", "32", "33", "34"],
        colors: ["#1e3a5f", "#2d2d2d"]
    },
    {
        id: 4,
        name: "Quần Kaki Nam Cao Cấp",
        category: "quan",
        price: 520000,
        oldPrice: null,
        image: "assets/img/product4.jpg",
        images: [
            "assets/img/product4.jpg",
            "assets/img/product4.jpg",
            "assets/img/product4.jpg"
        ],
        rating: 4.6,
        reviews: 156,
        badge: "new",
        description: "Quần kaki nam thiết kế thanh lịch, chất liệu vải kaki cotton mềm mại, thoáng khí. Phù hợp đi làm và dạo phố.",
        sizes: ["29", "30", "31", "32", "33"],
        colors: ["#c9a86c", "#2d2d2d", "#1e3a5f"]
    },
    {
        id: 5,
        name: "Giày Sneaker Classic",
        category: "giay",
        price: 1200000,
        oldPrice: 1500000,
        image: "assets/img/product5.jpg",
        images: [
            "assets/img/product5.jpg",
            "assets/img/product5.jpg",
            "assets/img/product5.jpg"
        ],
        rating: 4.9,
        reviews: 342,
        badge: "sale",
        description: "Giày sneaker nam phong cách thể thao năng động. Đế cao su chống trượt, êm chân, phù hợp đi bộ và chạy bộ nhẹ.",
        sizes: ["39", "40", "41", "42", "43", "44"],
        colors: ["#ff0000", "#ffffff", "#000000"]
    },
    {
        id: 6,
        name: "Giày Lười Nam Da Bò",
        category: "giay",
        price: 980000,
        oldPrice: null,
        image: "assets/img/product6.jpg",
        images: [
            "assets/img/product6.jpg",
            "assets/img/product6.jpg",
            "assets/img/product6.jpg"
        ],
        rating: 4.7,
        reviews: 198,
        badge: null,
        description: "Giày lười nam da bò thật 100%, thiết kế thanh lịch. Đế êm, thoải mái khi di chuyển nhiều, phù hợp công sở.",
        sizes: ["39", "40", "41", "42", "43"],
        colors: ["#8b4513", "#000000"]
    },
    {
        id: 7,
        name: "Áo Sơ Mi Trắng Công Sở",
        category: "ao",
        price: 380000,
        oldPrice: 450000,
        image: "assets/img/product7.jpg",
        images: [
            "assets/img/product7.jpg",
            "assets/img/product7.jpg",
            "assets/img/product7.jpg"
        ],
        rating: 4.4,
        reviews: 167,
        badge: "sale",
        description: "Áo sơ mi nam trắng công sở, chất vải cotton pha không nhăn. Form regular fit thoải mái, dễ phối đồ.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["#ffffff", "#87ceeb", "#f5f5f5"]
    },
    {
        id: 8,
        name: "Quần Short Thể Thao",
        category: "quan",
        price: 280000,
        oldPrice: null,
        image: "assets/img/product8.jpg",
        images: [
            "assets/img/product8.jpg",
            "assets/img/product8.jpg",
            "assets/img/product8.jpg"
        ],
        rating: 4.5,
        reviews: 234,
        badge: "new",
        description: "Quần short thể thao nam chất liệu thun lạnh cao cấp, thấm hút mồ hôi tốt. Thích hợp tập gym và các hoạt động outdoor.",
        sizes: ["M", "L", "XL", "XXL"],
        colors: ["#000000", "#1e3a5f", "#808080"]
    },
    {
        id: 9,
        name: "Giày Thể Thao Running",
        category: "giay",
        price: 1450000,
        oldPrice: 1800000,
        image: "assets/img/product9.jpg",
        images: [
            "assets/img/product9.jpg",
            "assets/img/product9.jpg",
            "assets/img/product9.jpg"
        ],
        rating: 4.8,
        reviews: 412,
        badge: "sale",
        description: "Giày chạy bộ chuyên nghiệp với công nghệ đệm khí, giảm chấn tối ưu. Siêu nhẹ, thoáng khí, bám đường tốt.",
        sizes: ["39", "40", "41", "42", "43", "44"],
        colors: ["#ffffff", "#ff6b35", "#000000"]
    },
    {
        id: 10,
        name: "Áo Hoodie Unisex",
        category: "ao",
        price: 550000,
        oldPrice: null,
        image: "assets/img/product10.jpg",
        images: [
            "assets/img/product10.jpg",
            "assets/img/product10.jpg",
            "assets/img/product10.jpg"
        ],
        rating: 4.6,
        reviews: 289,
        badge: "new",
        description: "Áo hoodie unisex chất liệu nỉ bông cao cấp, giữ ấm tốt. Thiết kế hiện đại với mũ trùm đầu và túi kangaroo.",
        sizes: ["M", "L", "XL", "XXL"],
        colors: ["#000000", "#808080", "#1e3a5f"]
    },
    {
        id: 11,
        name: "Quần Jogger Nam",
        category: "quan",
        price: 420000,
        oldPrice: 500000,
        image: "assets/img/product11.jpg",
        images: [
            "assets/img/product11.jpg",
            "assets/img/product11.jpg",
            "assets/img/product11.jpg"
        ],
        rating: 4.4,
        reviews: 176,
        badge: "sale",
        description: "Quần jogger nam phong cách streetwear, chất liệu thun cotton co giãn. Bo chun ống quần hiện đại, năng động.",
        sizes: ["M", "L", "XL", "XXL"],
        colors: ["#000000", "#808080", "#1e3a5f"]
    },
    {
        id: 12,
        name: "Giày Sandal Nam",
        category: "giay",
        price: 450000,
        oldPrice: null,
        image: "assets/img/product12.jpg",
        images: [
            "assets/img/product12.jpg",
            "assets/img/product12.jpg",
            "assets/img/product12.jpg"
        ],
        rating: 4.3,
        reviews: 98,
        badge: null,
        description: "Sandal nam da tổng hợp chống nước, đế cao su bền bỉ. Thiết kế quai chắc chắn, thoải mái cho mùa hè.",
        sizes: ["39", "40", "41", "42", "43"],
        colors: ["#8b4513", "#000000"]
    }
];

// ==========================================
// CART MANAGEMENT
// ==========================================
let cart = JSON.parse(localStorage.getItem('wsh_cart')) || [];

function saveCart() {
    localStorage.setItem('wsh_cart', JSON.stringify(cart));
    updateCartBadge();
}

function updateCartBadge() {
    const badges = document.querySelectorAll('.cart-badge');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badges.forEach(badge => {
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'flex' : 'none';
    });
}

function addToCart(productId, quantity = 1, size = 'M', color = '#000000') {
    const product = productsData.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => 
        item.id === productId && item.size === size && item.color === color
    );

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity,
            size: size,
            color: color
        });
    }

    saveCart();
    showToast('Thành công!', `${product.name} đã được thêm vào giỏ hàng`, 'success');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
}

function updateCartQuantity(index, quantity) {
    if (quantity <= 0) {
        removeFromCart(index);
    } else {
        cart[index].quantity = quantity;
        saveCart();
    }
}

function getCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function clearCart() {
    cart = [];
    saveCart();
}

// ==========================================
// TOAST NOTIFICATIONS
// ==========================================
function showToast(title, message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <div class="toast-content">
            <h4>${title}</h4>
            <p>${message}</p>
        </div>
        <button class="toast-close">&times;</button>
    `;

    container.appendChild(toast);

    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.remove();
    });

    setTimeout(() => {
        toast.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ==========================================
// SLIDER FUNCTIONALITY
// ==========================================
function initSlider() {
    const slider = document.querySelector('.hero-slider');
    if (!slider) return;

    const wrapper = slider.querySelector('.slider-wrapper');
    const slides = wrapper.querySelectorAll('.slide');
    const dots = slider.querySelectorAll('.slider-dot');
    const prevBtn = slider.querySelector('.slider-arrow.prev');
    const nextBtn = slider.querySelector('.slider-arrow.next');

    let currentSlide = 0;
    const totalSlides = slides.length;

    function goToSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        
        currentSlide = index;
        wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

    // Auto slide
    let autoSlide = setInterval(() => goToSlide(currentSlide + 1), 5000);

    slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
    slider.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => goToSlide(currentSlide + 1), 5000);
    });
}

// ==========================================
// MOBILE NAVIGATION
// ==========================================
function initMobileNav() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navbar = document.querySelector('.navbar');
    const overlay = document.querySelector('.overlay');

    if (!mobileToggle || !navbar) return;

    mobileToggle.addEventListener('click', () => {
        navbar.classList.toggle('active');
        if (overlay) overlay.classList.toggle('active');
        document.body.style.overflow = navbar.classList.contains('active') ? 'hidden' : '';
    });

    if (overlay) {
        overlay.addEventListener('click', () => {
            navbar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => observer.observe(el));
}

// ==========================================
// BACK TO TOP BUTTON
// ==========================================
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ==========================================
// PRODUCT CARD RENDERING
// ==========================================
function renderProductCard(product) {
    const discountPercent = product.oldPrice 
        ? Math.round((1 - product.price / product.oldPrice) * 100) 
        : 0;

    return `
        <div class="product-card" data-id="${product.id}" data-category="${product.category}" data-price="${product.price}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.badge ? `<span class="product-badge ${product.badge}">${product.badge === 'sale' ? `-${discountPercent}%` : 'Mới'}</span>` : ''}
                <div class="product-actions">
                    <button class="product-action-btn" title="Yêu thích">
                        <i class="far fa-heart"></i>
                    </button>
                    <button class="product-action-btn quick-view-btn" title="Xem nhanh" data-id="${product.id}">
                        <i class="far fa-eye"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <span class="product-category">${getCategoryName(product.category)}</span>
                <a href="product-detail.html?id=${product.id}" class="product-name">${product.name}</a>
                <div class="product-rating">
                    ${renderStars(product.rating)}
                    <span>(${product.reviews})</span>
                </div>
                <div class="product-price">
                    <span class="current-price">${formatPrice(product.price)}</span>
                    ${product.oldPrice ? `<span class="old-price">${formatPrice(product.oldPrice)}</span>` : ''}
                </div>
                <div class="product-buttons">
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i>
                        Thêm vào giỏ
                    </button>
                    <a href="product-detail.html?id=${product.id}" class="view-detail-btn">
                        <i class="fas fa-eye"></i>
                        Xem chi tiết
                    </a>
                </div>
            </div>
        </div>
    `;
}

function getCategoryName(category) {
    const names = {
        'ao': 'Áo',
        'quan': 'Quần',
        'giay': 'Giày dép',
        'phukien': 'Phụ kiện'
    };
    return names[category] || category;
}

function renderStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    return stars;
}

function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

// ==========================================
// RENDER FEATURED PRODUCTS (Homepage)
// ==========================================
function renderFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;

    const featuredProducts = productsData.filter(p => p.badge === 'sale').slice(0, 4);
    container.innerHTML = featuredProducts.map(renderProductCard).join('');
}

function renderNewProducts() {
    const container = document.getElementById('new-products');
    if (!container) return;

    const newProducts = productsData.filter(p => p.badge === 'new').slice(0, 4);
    container.innerHTML = newProducts.map(renderProductCard).join('');
}

// ==========================================
// SEARCH FUNCTIONALITY
// ==========================================
function initSearch() {
    const searchForm = document.querySelector('.search-bar');
    if (!searchForm) return;

    const searchInput = searchForm.querySelector('input');
    
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
            window.location.href = `products.html?search=${encodeURIComponent(query)}`;
        }
    });
}

// ==========================================
// INITIALIZE ON DOM LOAD
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    initSlider();
    initMobileNav();
    initScrollAnimations();
    initBackToTop();
    initSearch();
    renderFeaturedProducts();
    renderNewProducts();
});

// Export for use in other files
window.productsData = productsData;
window.cart = cart;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.getCartTotal = getCartTotal;
window.clearCart = clearCart;
window.saveCart = saveCart;
window.formatPrice = formatPrice;
window.renderStars = renderStars;
window.showToast = showToast;
window.getCategoryName = getCategoryName;
window.renderProductCard = renderProductCard;
