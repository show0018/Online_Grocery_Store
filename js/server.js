const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app =express();
const PORT =3001;

app.use(cors());
app.use(express.json());

//Database connection
const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password:"",
    database: "assignment1",
    port: 3307
});

db.connect(err => {
    if(err){
        console.error("Connection error", err);
    }else{
        console.log("Successfully connection with database")
    }
});

app.get("/api/products", (req, res) => {
    db.query("SELECT * FROM products", (err, results) => {
        if (err){
            console.error("Query Error");
            res.status(500).json({ error: "Database error" });
        }else{
            res.json(results);
        }
    });
});

app.post("/api/placeOrder", (req, res) => {
    console.log("Received request to place order");
    console.log("Order Data:", req.body);
    
    const { recipientName, address, phone, email, cart } = req.body;

    // Update the stock for each product in the cart
    let queries =[];
    for (let productId in cart) {
        const product = cart[productId];
        const newStock = product.in_stock - product.quantity;

        if(newStock >= 0) {
            queries.push(new Promise((resolve, reject) => {
                const query = 'UPDATE products SET in_stock = ? WHERE product_id = ?';
                db.query(query, [newStock, productId], (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                });
            }));
        }else {
            return res.json({ success: false, message: `${product.product_name} is out of stock` });
        }
    }

      // Once all stock updates are complete, return success
      Promise.all(queries)
      .then(() => {
        const insertQueries = [];

        for (let productId in cart) {
            const product = cart[productId];
            const insertQuery = `
                INSERT INTO orders (product_id, quantity, recipient_name, email, phone, address)
                VALUES (?, ?, ?, ?, ?, ?)
            `;
            insertQueries.push(new Promise((resolve, reject) => {
                db.query(insertQuery, [
                    productId,
                    product.quantity,
                    recipientName,
                    email,
                    phone,
                    address
                ], (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                });
            }));
        }

        return Promise.all(insertQueries);
    })
    .then(() => {
        res.json({ success: true });
    })
    .catch(error => {
        console.error("Error placing order:", error);
        res.json({ success: false, message: "An error occurred while processing the order" });
    });
});

app.post("/api/purchases", (req, res) => {
    const {email, phone} = req.body;

    const sql = `
        SELECT o.order_id, o.recipient_name, o.address, o.timestamp,
        p.product_name, o.quantity, o.email, o.phone
        FROM orders o
        JOIN products p ON o.product_id = p.product_id
        ORDER BY o.timestamp DESC
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Failed to fetch purchase history:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(results);
    });
});


//Server satrt
app.listen(PORT, ()=> {
    console.log(`http://localhost:${3001}`);
});