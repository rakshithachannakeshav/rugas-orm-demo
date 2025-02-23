// routes/products.js
const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

// Create a new product
router.post("/", async (req, res) => {
  const { name, description, price, category, imageUrl } = req.body;

  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        category,
        imageUrl,
      },
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Failed to create product" });
  }
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Get a single product by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await prisma.product.findUnique({
      where: { id: id },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});


// Update a product by ID
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, description, price, category, imageUrl } = req.body;

    try {
        const updatedProduct = await prisma.product.update({
            where: { id: id },
            data: { name, description, price, category, imageUrl },
        });

        res.json(updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "Product update failed" });
    }
});


// Delete a product
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await prisma.product.delete({
      where: { id: id },
    });

    res.status(200).json({ message: "Product deleted successfully", deletedProduct });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

module.exports = router;
