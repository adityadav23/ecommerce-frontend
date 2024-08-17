import React, { useState } from "react";
import api from "../api";

const Checkout = () => {
  const [shippingAddress, setShippingAddress] = useState("");
  const [success, setSuccess] = useState("");

  const handleCheckout = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await api.post(
      "/cart/checkout",
      { shippingAddress },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setSuccess("Checkout successful!");
  };

  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={handleCheckout}>
        <textarea
          placeholder="Shipping Address"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          required
        />
        <button type="submit">Checkout</button>
      </form>
      {success && <p>{success}</p>}
    </div>
  );
};

export default Checkout;
