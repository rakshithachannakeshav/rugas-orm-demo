// routes/customers.js
const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

// Create a new customer
router.post("/", async (req, res) => {
  const { name, address, phone, email } = req.body;

  try {
    const newCustomer = await prisma.customer.create({
      data: {
        name,
        address,
        phone,
        email,
      },
    });
    res.status(201).json(newCustomer);
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).json({ error: "Failed to create customer" });
  }
});

// Get all customers
router.get("/", async (req, res) => {
  try {
    const customers = await prisma.customer.findMany();
    res.status(200).json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ error: "Failed to fetch customers" });
  }
});

// Get a single customer by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const customer = await prisma.customer.findUnique({
      where: { id: Number(id) },
    });

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.status(200).json(customer);
  } catch (error) {
    console.error("Error fetching customer:", error);
    res.status(500).json({ error: "Failed to fetch customer" });
  }
});

// Update a customer
// routes/customers.js

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, address, phone, email } = req.body;
  
    try {
      // Check if the email already exists (excluding the current customer)
      const existingCustomer = await prisma.customer.findUnique({
        where: {
          email: email,
        },
      });
  
      if (existingCustomer && existingCustomer.id !== id) {
        return res.status(400).json({ error: "Email is already in use" });
      }
  
      // Update the customer
      const updatedCustomer = await prisma.customer.update({
        where: {
          id: id,
        },
        data: {
          name,
          address,
          phone,
          email,
        },
      });
  
      res.status(200).json(updatedCustomer);
    } catch (error) {
      console.error("Error updating customer:", error);
      res.status(500).json({ error: "Failed to update customer" });
    }
  });
  
  
  

// routes/customers.js
router.delete("/:id", async (req, res) => {
    const { id } = req.params;  // Getting the id from URL params
  
    try {
      const deletedCustomer = await prisma.customer.delete({
        where: {
          id: id,  // UUID as string
        },
      });
  
      res.status(200).json({ message: "Customer deleted successfully", deletedCustomer });
    } catch (error) {
      console.error("Error deleting customer:", error);
      res.status(500).json({ error: "Failed to delete customer" });
    }
  });
  
  module.exports = router;
