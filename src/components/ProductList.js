import React, { useEffect, useState } from "react";
import api from "../api";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await api.get("/products");
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    const token = localStorage.getItem("token");
    await api.post(
      "/cart/add",
      { productId, quantity: 1 },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    alert("Product added to cart");
  };

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <h3>{product.title}</h3>
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
            />
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <button onClick={() => addToCart(product._id)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
