import React, { useEffect, useState } from "react";
import api from "../api";

const Cart = () => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
      const res = await api.get("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data);
    };
    fetchCart();
  }, []);

  return (
    <div>
      <h2>Your Cart</h2>
      {cart ? (
        <ul>
          {cart.items.map((item) => (
            <li key={item.product._id}>
              <h3>{item.product.title}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.product.price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
