// dependencies
const express = require("express");
const productRouter = express.Router();
const Product = require('../models/products.js');
const productSeed = require("../models/productSeed.js");

// Seed Data
productRouter.get("/seed", (req, res) => {
    Product.deleteMany({}, (error, allProducts) => {});  
    
    Product.create(productSeed, (error, data) => {
        res.redirect("/products");
        }
    );
});

// INDEX ROUTE
productRouter.get("/", (req, res) => {
    Product.find({}, (error, allProducts) => {
        res.render("index.ejs", {
            products: allProducts,
        });
    });
});

// NEW ROUTE
productRouter.get("/new", (req, res) => {
    res.render("new.ejs");
});


// DELETE ROUTE
productRouter.delete("/:id", (req, res) => {
	Product.findByIdAndDelete(req.params.id, (err, data) => {
		res.redirect("/products")
	});
});

// UPDATE ROUTE
productRouter.put("/:id", (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, (error, updatedProduct) => {
        res.redirect(`/products/${req.params.id}`);
    });
});

productRouter.put("/:id/buy", (req, res) => {
    Product.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        {
            new: true
        }, 
        (error, updatedProduct) => {
            updatedProduct.qty -=1
            updatedProduct.save()
            res.redirect(`/products/${req.params.id}`);
    });
});

// CREATE 
productRouter.post("/", (req, res) => {
    Product.create(req.body, (error, createdProduct) => {
      res.redirect("/products");
    });
});


// EDIT ROUTE
productRouter.get("/:id/edit", (req, res) => {
    Product.findById(req.params.id, (error, foundProduct) => {
        res.render("edit.ejs", {
            product: foundProduct
        });
    }); 
})

// SHOW ROUTE
productRouter.get("/:id", (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        res.render("show.ejs", {
            product: foundProduct,
        });
    });
});

module.exports = productRouter;

