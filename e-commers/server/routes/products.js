const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

//PRODUCTS
router.get("/product", async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) {
      return res.status(404).json({ message: "No products found!" });
    }
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});
router.post("/product", async (req, res) => {
  try {
    const newProduct = await new Product(req.body);
    await newProduct.save();

    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(500).json({ message: "[PRODUCTS_POST]" });
  }
});
// PRODUCTS_DETAİLS
router.get("/product/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      return res.status(400).json({ error: "Product ID is required." });
    }
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "[PRODUCTS_GET_ID]" });
  }
});
router.put("/product/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const updates = req.body;

    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found." });
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, {
      new: true,
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});
router.delete("/product/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      return res.status(400).json({ error: "Product ID is required." });
    }
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found." });
    }
    return res
      .status(200)
      .json(deletedProduct, { message: "Product deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: "[PRODUCTS_DELETE]" });
  }
});
router.get("/product/search/:productName", async (req, res) => {
  try {
    const { productName } = req.params;
    const products = await Product.find({
      name: { $regex: productName, $options: "i" },
    });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: "[GET_PRODUCTNAME]" });
  }
});
/* 
 Örnek data:
 
 {
     "name": "Ürün Adı",
     "img": [
         "https://e-commerce-udemy.netlify.app/img/products/product1/1.png",
         "https://e-commerce-udemy.netlify.app/img/products/product1/2.png",
         "https://e-commerce-udemy.netlify.app/img/products/product1/3.png",
         "https://e-commerce-udemy.netlify.app/img/products/product1/2.png"
     ],
     "reviews": [
         {
             "text": "Bu ürün harika!",
             "rating": 5,
             "user": "5fbc7c318f4e3d4e9c53b27e"
         },
         {
             "text": "Fiyatı çok yüksek.",
             "rating": 2,
             "user": "5fbc7c318f4e3d4e9c53b27e"
         }
     ],
     "description": "Ürün açıklaması",
     "colors": [
         "Mavi",
         "Kırmızı",
         "Yeşil"
     ],
     "sizes": [
         "S",
         "M",
         "L"
     ],
     "price": {
         "current": 50,
         "discount": 40
     },
     "category": "650cb032054382a2c88bf42e"
 }
 
 */

module.exports = router;
