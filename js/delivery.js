function checkStockAvailability() {

    if(!cart || Object.keys(cart).length === 0) {
        alert("No items in cart.");
        return false;
    }

    for (let productId in cart) {
        const product = cart[productId];
        // Check if the product is still in stock
        if (product.in_stock < product.quantity) {
            alert(`Sorry, ${product.product_name} is out of stock or insufficient in quantity.`);
            window.location.href = 'carts.html'; // Redirect back to cart
            return false;
        }
    }
    return true;
}

//Validation check
document.getElementById("delivery-form").addEventListener("submit", function(event){
    event.preventDefault();

    const recipientName = document.getElementById("recipient-name").value;
    const street = document.getElementById("street").value;
    const suburb = document.getElementById("suburb").value;
    const state = document.getElementById("state").value;
    const phone = document.getElementById("phone").value
    const email = document.getElementById("email").value

    // Check if all fields are filled
    if(!recipientName || !street || !suburb || !state || !phone || !email) {
        alert("All fields are mandatory");
        return;
    }
    
    //Validate phone number: 10 digits
    const phonePattern = /^\d{10}$/;
    if(!phone.match(phonePattern)) {
        alert("Please enter a valid Australian number");
        return;
    }

     // Validate email format
     const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
     if(!email.match(emailPattern)) {
        alert("Please enter a valid email address");
        return;
     }

     // Check stock availability
     if(!checkStockAvailability()) {
        return;
     }

     const address = `${street}, ${suburb}, ${state}`; 
     
     const orderData = {
        recipientName,
        address,
        phone,
        email,
        cart
     };

     fetch('http://localhost:3001/api/placeOrder', {
        method:"POST",
        headers: {
            "Content-type": "application/json"

        },
        body: JSON.stringify(orderData) 
     })
     .then(response => response.json())
     .then(data => {
        console.log("Server Response:", data);
        if(data.success) {
            localStorage.removeItem("cart");
            window.location.href = "confirmation.html";
     } else {
        alert("Order failed. Please try again.");
     }
    })
    .catch(error => {
        console.error("Error placing order:", error);
    });

});

window.onload = function() {
    loadCart();
    console.log("🛒 loaded cart:", cart);
};