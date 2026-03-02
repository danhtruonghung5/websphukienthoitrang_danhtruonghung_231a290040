/**
 * WSH Fashion Store - Products Page JavaScript
 * Filter and display products
 */

document.addEventListener('DOMContentLoaded', () => {
    initProductsPage();
});

function initProductsPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFilter = urlParams.get('category');
    const badgeFilter = urlParams.get('badge');
    const searchQuery = urlParams.get('search');

    // Set initial checkbox states based on URL params
    if (categoryFilter) {
        const checkbox = document.querySelector(`input[data-category="${categoryFilter}"]`);
        if (checkbox) checkbox.checked = true;
    }

    // Render all products initially
    renderProducts();

    // Apply URL filters
    if (categoryFilter || badgeFilter || searchQuery) {
        filterProducts();
    }

    // Setup filter event listeners
    setupFilters();
}

function setupFilters() {
    // Category checkboxes
    const categoryCheckboxes = document.querySelectorAll('.category-filter');
    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });

    // Price range inputs
    const priceMin = document.getElementById('price-min');
    const priceMax = document.getElementById('price-max');
    const priceSlider = document.getElementById('price-slider');

    if (priceMin) {
        priceMin.addEventListener('input', debounce(filterProducts, 300));
    }
    if (priceMax) {
        priceMax.addEventListener('input', debounce(filterProducts, 300));
    }
    if (priceSlider) {
        priceSlider.addEventListener('input', (e) => {
            if (priceMax) priceMax.value = e.target.value;
            filterProducts();
        });
    }

    // Sort select
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', filterProducts);
    }

    // Apply filter button
    const applyFilterBtn = document.getElementById('apply-filter');
    if (applyFilterBtn) {
        applyFilterBtn.addEventListener('click', filterProducts);
    }

    // Reset filter button
    const resetFilterBtn = document.getElementById('reset-filter');
    if (resetFilterBtn) {
        resetFilterBtn.addEventListener('click', resetFilters);
    }
}

function filterProducts() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    const badgeFilter = urlParams.get('badge');

    // Get selected categories
    const selectedCategories = Array.from(document.querySelectorAll('.category-filter:checked'))
        .map(cb => cb.dataset.category);

    // Get price range
    const priceMin = parseInt(document.getElementById('price-min')?.value) || 0;
    const priceMax = parseInt(document.getElementById('price-max')?.value) || 10000000;

    // Get sort option
    const sortSelect = document.getElementById('sort-select');
    const sortBy = sortSelect?.value || 'default';

    // Filter products
    let filteredProducts = [...window.productsData];

    // Apply search filter
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query)
        );
    }

    // Apply badge filter from URL
    if (badgeFilter) {
        filteredProducts = filteredProducts.filter(p => p.badge === badgeFilter);
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
        filteredProducts = filteredProducts.filter(p => 
            selectedCategories.includes(p.category)
        );
    }

    // Apply price filter
    filteredProducts = filteredProducts.filter(p => 
        p.price >= priceMin && p.price <= priceMax
    );

    // Apply sorting
    switch (sortBy) {
        case 'price-asc':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        default:
            // Keep original order
            break;
    }

    // Render filtered products
    renderProducts(filteredProducts);
}

function renderProducts(products = window.productsData) {
    const container = document.getElementById('products-container');
    const countElement = document.getElementById('products-count');

    if (!container) return;

    if (products.length === 0) {
        container.innerHTML = `
            <div class="no-products">
                <i class="fas fa-box-open"></i>
                <h3>Không tìm thấy sản phẩm</h3>
                <p>Vui lòng thử lại với bộ lọc khác</p>
            </div>
        `;
    } else {
        container.innerHTML = products.map(product => window.renderProductCard(product)).join('');
        
        // Add animation to product cards
        const cards = container.querySelectorAll('.product-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }

    // Update product count
    if (countElement) {
        countElement.innerHTML = `Hiển thị <strong>${products.length}</strong> sản phẩm`;
    }
}

function resetFilters() {
    // Uncheck all category filters
    document.querySelectorAll('.category-filter').forEach(cb => {
        cb.checked = false;
    });

    // Reset price inputs
    const priceMin = document.getElementById('price-min');
    const priceMax = document.getElementById('price-max');
    const priceSlider = document.getElementById('price-slider');

    if (priceMin) priceMin.value = 0;
    if (priceMax) priceMax.value = 2000000;
    if (priceSlider) priceSlider.value = 2000000;

    // Reset sort
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) sortSelect.value = 'default';

    // Clear URL params and redirect
    window.history.pushState({}, '', 'products.html');

    // Re-render all products
    renderProducts();
}

// Debounce helper function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
