import React from "react";
import { Table } from "react-bootstrap";

const products = [
  { id: 1, name: "Laptop", price: "$999" },
  { id: 2, name: "Phone", price: "$699" }
];

function ProductsPage() {
  return (
    <div>
      <h2>Products</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ProductsPage;
