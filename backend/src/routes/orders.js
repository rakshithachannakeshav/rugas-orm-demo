// routes/orders.js
const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

// Create an order
router.post("/", async (req, res) => {
    try {
      const { customerId, products } = req.body;
  
      // Ensure customerId and products array exist
      if (!customerId || !Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ error: "customerId and products array are required." });
      }
  
      const newOrder = await prisma.order.create({
        data: {
          customerId,
          products: {
            create: products.map((product) => ({
              productId: product.productId,
              quantity: product.quantity || 1,
            })),
          },
        },
        include: { products: true },
      });
  
      res.status(201).json(newOrder);
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        customer: true,   // Include customer details
        products: true,   // Include product details
      },
    });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// Get a single order by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const order = await prisma.order.findUnique({
      where: { id: id },
      include: {
        customer: true,
        products: true,
      },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ error: "Failed to fetch order" });
  }
});

// Update an order status
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await prisma.order.update({
      where: { id: id },
      data: { status },
    });

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ error: "Failed to update order" });
  }
});

// Delete an order by ID
router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      // Check if the order exists
      const existingOrder = await prisma.order.findUnique({
        where: { id },
        include: { products: true }, // Fetch associated products (if using a join table)
      });
  
      if (!existingOrder) {
        return res.status(404).json({ error: "Order not found" });
      }
  
      // Delete associated order items first (if applicable)
      if (existingOrder.products.length > 0) {
        await prisma.orderItem.deleteMany({
          where: { orderId: id },
        });
      }
  
      // Delete the order itself
      await prisma.order.delete({
        where: { id },
      });
  
      res.json({ message: "Order deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting order", details: error.message });
    }
  });

module.exports = router;
