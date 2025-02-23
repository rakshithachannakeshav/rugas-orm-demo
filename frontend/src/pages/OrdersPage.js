import React from "react";
import { Table } from "react-bootstrap";

const orders = [
  { id: 101, customer: "John Doe", status: "Shipped" },
  { id: 102, customer: "Jane Smith", status: "Delivered" }
];

function OrdersPage() {
  return (
    <div>
      <h2>Orders</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default OrdersPage;
