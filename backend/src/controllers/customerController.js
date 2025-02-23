const prisma = require("../config/db");

// Get all customers
const getAllCustomers = async (req, res) => {
  try {
    const customers = await prisma.customer.findMany();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch customers" });
  }
};

// Create a new customer
const createCustomer = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    if (!name || !email || !phone || !address) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingCustomer = await prisma.customer.findUnique({
      where: { email },
    });

    if (existingCustomer) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const customer = await prisma.customer.create({
      data: { name, email, phone, address },
    });

    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ error: "Failed to create customer" });
  }
};

// Get customer by ID
const getCustomerById = async (req, res) => {
  try {
    const customer = await prisma.customer.findUnique({
      where: { id: req.params.id },
    });
    if (!customer) return res.status(404).json({ error: "Customer not found" });
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: "Error fetching customer" });
  }
};

// Update customer
const updateCustomer = async (req, res) => {
  try {
    const customer = await prisma.customer.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: "Failed to update customer" });
  }
};

// Delete customer
const deleteCustomer = async (req, res) => {
  try {
    await prisma.customer.delete({ where: { id: req.params.id } });
    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete customer" });
  }
};

module.exports = {
  getAllCustomers,
  createCustomer,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
