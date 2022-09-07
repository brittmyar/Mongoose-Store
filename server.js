// Dependencies
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/products.js');
const methodOverride = require("method-override")

// Database Connection/Configuration
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));



// Middleware
// Body parser middleware: give us access to req.body
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"))


// Routes....(INDUCE)

// INDEX ROUTE
app.get('/products', (req, res) => {
    Product.find({}, (error, allProducts) => {
        res.render('index.ejs', {
            products: allProducts,
        });
    });
});

// NEW ROUTE
app.get('/products/new', (req, res) => {
    res.render('new.ejs');
});


// DELETE ROUTE


app.delete("/products/:id", (req, res) => {
    res.send("deleting...")
  })

// UPDATE ROUTE


// CREATE 
app.post("/products", (req, res) => {
    Product.create(req.body, (error, createdProduct) => {
      res.redirect("/products");
    });
});


// EDIT ROUTE
app.get('/products/:id/edit', (req, res) => {
    Product.findById(req.params.id, function(err, product) {
      res.render('products-edit', {product: product});
    })
  })
  

// SHOW ROUTE
app.get("/products/:id", (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        res.render("show.ejs", {
            product: foundProduct,
        });
    });
});



// Listener
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`));
