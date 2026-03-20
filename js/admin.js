const email = "admin@admin.com"; 
const phone = "1234567890";

fetch("http://localhost:3001/api/purchases", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ email, phone }) 
})

.then(response => response.json())
.then(data => {
    const container = document.getElementById("history-container");
    if(data.length === 0) {
        container.innerHTML = "<p>No purchases found.</p>";
        return;
    }

    data.forEach(purchase => {
        const div = document.createElement("div");
        div.className = "purchase-item";
        div.innerHTML = `
        <h3>${purchase.product_name}</h3>
        <p><strong>Quantity:</strong> ${purchase.quantity}</p>
        <p><strong>Buyer:</strong> ${purchase.recipient_name}</p>
        <p><strong>Email:</strong> ${purchase.email}</p>
        <p><strong>Phone:</strong> ${purchase.phone}</p>
        <p><strong>Address:</strong> ${purchase.address}</p>
        <p><strong>Ordered at:</strong> ${new Date(purchase.timestamp).toLocaleString()}</p>
        <hr>
        `;
        container.appendChild(div);
    });
})

.catch(error => {
    console.error("Error fetching purchase history:", error);
  });