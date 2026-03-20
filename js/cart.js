function toggleCart() {
    const cartContainer = document.getElementById("cart-container");
    cartContainer.style.display = 
        cartContainer.style.display === "none" ? "block" : "none";
}


let cart = {};

function displayCart() {
    const cartList = document.getElementById("cart-list");
    const totalPriceTag = document.getElementById("total-price");
    const orderBtn = document.getElementById("order-btn");

    if (!cartList || !totalPriceTag || !orderBtn) return;
    cartList.innerHTML="";
    let total = 0;

    Object.values(cart).forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "cart-item";
        itemDiv.innerHTML = `
            <img src="./${item.image_url}" alt="${item.product_name}" width="120" onerror="this.src='logo.jpg'">
            <h3>${item.product_name}</h3>
            <p>Price: $${item.unit_price} x ${item.quantity}</p>
            <p>
              Quantity:
              <input type='number' min='1' value='${item.quantity}'
                     onchange="updateQuantity(${item.product_id}, this.value)">
            </p>
            <p>Subtotal: $${(item.unit_price * item.quantity).toFixed(2)}</p>
            <button onclick="removeItem(${item.product_id})">Remove</button>
        `;
        
    cartList.appendChild(itemDiv);
    total += item.unit_price * item.quantity;
    });

    totalPriceTag.innerText = `Total: $${total.toFixed(2)}`;

    orderBtn.disabled = Object.keys(cart).length === 0;
}

function updateQuantity(productId, newquantity) {
    const quantity = parseInt(newquantity);
    if(quantity < 1) return;

    if(cart[productId]) {
        cart[productId].quantity = quantity;
        saveCart();
        displayCart();
    }
}

function removeItem(productId) {
    delete cart[productId];
    saveCart();
    displayCart();
}

function clearCart() {
    if(confirm("Are you sure you want to clear the cart?")) {
        cart ={};
        localStorage.removeItem("cart");
        displayCart();
    }
}

function saveCart() {
    const cartWithTimestamp = {
        data: cart,
        timestamp: Date.now()
    };

    localStorage.setItem("cart", JSON.stringify(cartWithTimestamp));
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

function placeOrder(){
    window.location.href = "delivery.html";
}

window.onload = function() {
    loadCart();
    console.log("🛒 loaded cart:", cart);
    displayCart();

    const clearBtn = document.getElementById("clear-cart-btn");

    if (clearBtn) {
    clearBtn.addEventListener("click", clearCart);
    }

    const orderBtn = document.getElementById("order-btn")
    if(orderBtn){
    orderBtn.addEventListener("click", placeOrder);
    }
};