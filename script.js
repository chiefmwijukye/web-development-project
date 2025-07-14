// Sample product data
const products = [
    {
        id: 1,
        title: "Dell 24\" Monitor",
        price: "KSh 19,800",
        seller: "Lydia Wambui – 0711223344",
        specs: ["🖥️ Monitor", "⚡ 24 Inch", "📍 Nairobi"],
        condition: "New",
        badge: "Monitor Deal",
        imageBg: "linear-gradient(45deg, #333, #666)"
    },
    {
        id: 2,
        title: "Kindle Paperwhite",
        price: "KSh 15,000",
        seller: "Alex Mwenda – 0712340000",
        specs: ["📚 E-Reader", "⚡ Waterproof", "📍 Nairobi"],
        condition: "Used - Like New",
        badge: "E-Reader",
        imageBg: "linear-gradient(45deg, #667eea, #764ba2)"
    },
    {
        id: 3,
        title: "TP-Link Wi-Fi Router",
        price: "KSh 4,800",
        seller: "Carol Kimani – 0799002211",
        specs: ["📡 Router", "⚡ Wi-Fi 6", "📍 Nairobi"],
        condition: "New",
        badge: "",
        imageBg: "linear-gradient(45deg, #ed8936, #dd7724)"
    },
    {
        id: 4,
        title: "Garmin Fitness Watch",
        price: "KSh 28,500",
        seller: "Tony Kibe – 0733004455",
        specs: ["⌚ Fitness", "⚡ GPS", "📍 Nairobi"],
        condition: "Used - Good",
        badge: "Fitness",
        imageBg: "linear-gradient(45deg, #48bb78, #38a169)"
    }
];

// DOM Elements
const productGrid = document.getElementById('productGrid');
const productForm = document.getElementById('productForm');

// Modal functionality
function openModal() {
    document.getElementById('loginModal').classList.add('active');
}

function closeModal() {
    document.getElementById('loginModal').classList.remove('active');
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('loginModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Tab functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tab functionality
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Filter products based on tab selection
            const tabText = this.textContent.toLowerCase();
            filterProducts(tabText);
        });
    });

    // Category badge interactions
    const categoryBadges = document.querySelectorAll('.category-badge');
    categoryBadges.forEach(badge => {
        badge.addEventListener('click', function() {
            const category = this.textContent.trim();
            const searchInput = document.querySelector('.search-input[type="text"]');
            if (searchInput) {
                searchInput.value = category;
                searchInput.focus();
                performSearch(category);
            }
        });
    });

    // Search functionality
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input[type="text"]');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                performSearch(searchTerm);
            }
        });
    }

    // Enter key search
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.trim();
                if (searchTerm) {
                    performSearch(searchTerm);
                }
            }
        });
    }

    // Product form submission
    if (productForm) {
        productForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const productName = document.getElementById('product-name').value;
            const productPrice = document.getElementById('product-price').value;
            const productCategory = document.getElementById('product-category').value;
            const productCondition = document.getElementById('product-condition').value;
            const productDescription = document.getElementById('product-description').value;
            const sellerName = document.getElementById('seller-name').value;
            const sellerPhone = document.getElementById('seller-phone').value;
            const productImage = document.getElementById('product-image').files[0];
            
            // Create new product object
            const newProduct = {
                id: products.length + 1,
                title: productName,
                price: `KSh ${productPrice}`,
                seller: `${sellerName} – ${sellerPhone}`,
                specs: [`⚡ ${productCategory}`, `⚡ ${productCondition}`, "📍 Nairobi"],
                condition: productCondition,
                badge: "New Listing",
                imageBg: "linear-gradient(45deg, #0077cc, #005fa3)"
            };
            
            // Add to products array
            products.push(newProduct);
            
            // Clear the form
            this.reset();
            
            // Show success message
            alert(`Thank you for listing your ${productName}! Your item will be reviewed and posted soon.`);
            
            // Refresh product display
            displayProducts(products);
        });
    }

    // Initial display of products
    displayProducts(products);
});

// Display products in the grid
function displayProducts(productsToDisplay) {
    productGrid.innerHTML = '';
    
    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            ${product.badge ? `<div class="price-badge">${product.badge}</div>` : ''}
            <div class="product-image" style="background: ${product.imageBg}; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
                ${product.title}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">${product.price}</div>
                <div class="product-seller">Seller: ${product.seller}</div>
                <div class="product-specs">
                    ${product.specs.map(spec => `<div class="spec-item">${spec}</div>`).join('')}
                </div>
                <button class="purchase-btn">Purchase</button>
                <button class="view-details-btn">View Details →</button>
            </div>
        `;
        
        productGrid.appendChild(productCard);
    });
    
    // Add event listeners to new product cards
    addProductCardInteractions();
}

// Filter products based on condition
function filterProducts(condition) {
    if (condition === 'all') {
        displayProducts(products);
        return;
    }
    
    const filteredProducts = products.filter(product => {
        return product.condition.toLowerCase().includes(condition);
    });
    
    displayProducts(filteredProducts);
}

// Search function
function performSearch(searchTerm) {
    const filteredProducts = products.filter(product => {
        return (
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.specs.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    });
    
    displayProducts(filteredProducts);
    
    // Update section title with results
    const sectionTitle = document.querySelector('.section-title');
    if (sectionTitle) {
        sectionTitle.textContent = `Search Results (${filteredProducts.length} found)`;
    }
    
    // Show message if no products found
    if (filteredProducts.length === 0) {
        showNoResultsMessage();
    }
}

// Show no results message
function showNoResultsMessage() {
    productGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--dark-blue);">
            <h3>No products found</h3>
            <p>Try adjusting your search terms or browse our categories.</p>
            <button onclick="resetSearch()" style="background: var(--accent-blue); color: white; padding: 0.8rem 2rem; border: none; border-radius: 25px; margin-top: 1rem; cursor: pointer;">Show All Products</button>
        </div>
    `;
}

// Reset search and show all products
function resetSearch() {
    const searchInput = document.querySelector('.search-input[type="text"]');
    if (searchInput) {
        searchInput.value = '';
    }
    
    const sectionTitle = document.querySelector('.section-title');
    if (sectionTitle) {
        sectionTitle.textContent = 'Page 4 - Final Collection';
    }
    
    displayProducts(products);
}

// Add interactions to product cards
function addProductCardInteractions() {
    // Product card interactions
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        // Add click effect
        card.addEventListener('click', function(e) {
            // Don't trigger if button was clicked
            if (e.target.tagName === 'BUTTON') {
                return;
            }
            
            // Add a subtle click effect
            this.style.transform = 'translateY(-5px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Purchase button functionality
    const purchaseBtns = document.querySelectorAll('.purchase-btn');
    purchaseBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Get product info
            const productCard = this.closest('.product-card');
            const productTitle = productCard.querySelector('.product-title').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            
            // Show confirmation
            if (confirm(`Purchase ${productTitle} for ${productPrice}?`)) {
                // Add to cart logic here
                alert('Product added to cart!');
                
                // Visual feedback
                this.textContent = 'Added to Cart!';
                this.style.background = '#48bb78';
                
                setTimeout(() => {
                    this.textContent = 'Purchase';
                    this.style.background = '';
                }, 2000);
            }
        });
    });

    // View details button functionality
    const viewDetailsBtns = document.querySelectorAll('.view-details-btn');
    viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const productCard = this.closest('.product-card');
            const productTitle = productCard.querySelector('.product-title').textContent;
            
            // Navigate to product details
            alert(`Viewing details for ${productTitle}`);
        });
    });
}
