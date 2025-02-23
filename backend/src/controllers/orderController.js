const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({ include: { customer: true, product: true } });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

// Create an order
exports.createOrder = async (req, res) => {
  try {
    const { customerId, productId, quantity, status } = req.body;
    const newOrder = await prisma.order.create({
      data: { customerId, productId, quantity, status },
    });
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await prisma.order.findUnique({ where: { id: Number(id) } });

    if (!order) return res.status(404).json({ error: "Order not found" });

    res.json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ error: "Failed to fetch order" });
  }
};

// Update order
exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedOrder = await prisma.order.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ error: "Failed to update order" });
  }
};

// Delete order
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.order.delete({ where: { id: Number(id) } });
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: "Failed to delete order" });
  }
};
