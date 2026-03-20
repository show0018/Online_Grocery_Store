let products = [];
let currentCategory = "All";
let currentSubcategory = null;

function closeAllDropdowns() {
    document.querySelectorAll(".dropdown.open").forEach(dropdown => {
        dropdown.classList.remove("open");
    });
}

function initDropdownMenus() {
    document.querySelectorAll(".dropdown").forEach(dropdown => {
        const trigger = dropdown.querySelector(".dropbtn");
        const submenuButtons = dropdown.querySelectorAll(".dropdown-content button");

        if (trigger) {
            trigger.addEventListener("click", event => {
                event.preventDefault();
                event.stopPropagation();

                const hasSubmenu = submenuButtons.length > 0;
                if (!hasSubmenu) {
                    closeAllDropdowns();
                    return;
                }

                const shouldOpen = !dropdown.classList.contains("open");
                closeAllDropdowns();

                if (shouldOpen) {
                    dropdown.classList.add("open");
                }
            });
        }

        submenuButtons.forEach(button => {
            button.addEventListener("click", () => {
                closeAllDropdowns();
            });
        });
    });

    document.addEventListener("click", event => {
        if (!event.target.closest(".dropdown")) {
            closeAllDropdowns();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeAllDropdowns();
        }
    });
}

function displayProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    const filteredProducts = products.filter(product =>
        (currentCategory === "All" || product.category === currentCategory) &&
        (currentSubcategory === null || product.subcategory === currentSubcategory )
    );

    filteredProducts.forEach(product => {
        //Display the products
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.innerHTML = `
            <img src="./${product.image_url}" alt="${product.product_name}" width="120" onerror="this.src='logo.jpg'">
            <h3>${product.product_name}</h3>
            <p>Price: $${product.unit_price}</p>
            <p>Stock: ${product.in_stock > 0 ? "In stock" : "Out of stock"}</p>
            <button class="add-cart-btn"
                onclick="addToCart(${product.product_id})"
                ${product.in_stock === 0 ? 'disabled' : ''}>
                ${product.in_stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
        `;
        productList.appendChild(productDiv);
    });
}

function fetchProducts() {
    fetch('http://localhost:3001/api/products')
    .then(response => response.json())
    .then(data => {
        products = data;

        const params = new URLSearchParams(window.location.search);
        if (params.has("category")) {
            currentCategory = params.get("category");
        }
        if (params.has("subcategory")) {
            currentSubcategory = params.get("subcategory");
        } else {
            currentSubcategory = null;
        }

        displayProducts();
    })
    .catch(error => {
        console.error("Failed to fetch products:", error);
    });

}

// Filter products by category
function filterCategory(category) {
    currentCategory = category === "All" ? "All" : category;
    currentSubcategory = null;
    displayProducts();
}

//Filter products by suncategory
function filterSubcategory(category, subcategory) {
    currentCategory = category;
    currentSubcategory = subcategory;

    displayProducts();
}

//Add to the cart
loadCart();

function addToCart(productId) {
    const product = products.find(p => p.product_id === productId);
    if(!product || product.in_stock === 0) return;

    if(cart[productId]) {
        cart[productId].quantity += 1;
    }else {
        cart[productId] = {
            ...product,
            quantity:1
        };
    }

    alert(`${product.product_name} has been added to your cart!`);

    saveCart();
}

function loadCart() {
    const saved = localStorage.getItem("cart");
    if(saved){
        const parsed = JSON.parse(saved);
        const now = Date.now();

        if(now - parsed.timestamp < 20 * 60 * 1000) {
            cart = parsed.data;
            console.log("🛒 loaded cart:", cart);
        }else {
            localStorage.removeItem("cart");
            cart ={};
        }
    }
}


document.getElementById("search").addEventListener("input", function() {
    const keyword = this.value.toLowerCase();

    const searchResult = products.filter(product => 
        product.product_name.toLowerCase().includes(keyword)
    );

    displaySearchResults(searchResult);
});

function displaySearchResults(results) {
    const productList = document.getElementById("product-list");
    productList.innerHTML="";

    if (results.length === 0) {
        productList.innerHTML = "<p>No matching products found.</p>";
        return;
    }

    results.forEach(product => {
        const productDiv =document.createElement("div");
        productDiv.className = "product";
        productDiv.innerHTML = `
         <img src="./${product.image_url}" alt="${product.product_name}" width="120" onerror="this.src='logo.jpg'">
            <h3>${product.product_name}</h3>
            <p>Price: $${product.unit_price}</p>
            <p>Stock: ${product.in_stock > 0 ? "In stock" : "Out of stock"}</p>
            <button class="add-cart-btn"
                onclick="addToCart(${product.product_id})"
                ${product.in_stock === 0 ? 'disabled' : ''}>
                ${product.in_stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
            `;
            productList.appendChild(productDiv);
    });

}

window.addEventListener("DOMContentLoaded", () => {
    initDropdownMenus();

    const currentPage = window.location.pathname.split("/").pop();
    const visiblePages = ["index.html", "products.html"];


    if (!visiblePages.includes(currentPage)) {
        const searchInput = document.getElementById("search");
        if (searchInput) {
            searchInput.remove();
        }
        return;
    }

    fetchProducts();
});



window.filterCategory = filterCategory;
window.filterSubcategory = filterSubcategory;
