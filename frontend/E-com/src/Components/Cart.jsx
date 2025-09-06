import React, { useState } from "react";

function Cart() {
  const [cartItems, setCartItems] = useState({});

  const handleGenerateBill = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    setCartItems(cart);
  };

  const total = Object.values(cartItems).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="billing">
      <h1>Billing Cart</h1>
      <button  className="billbtn" onClick={handleGenerateBill}>Generate Bill</button>

      {Object.keys(cartItems).length > 0 && (
        <div style={{ marginTop: "20px" }}>
          {Object.entries(cartItems).map(([id, item]) => (
            <p key={id}>
              {item.title} - ₹{item.price} × {item.quantity} = ₹
              {item.price * item.quantity}
            </p>
          ))}
          <h2>Total: ₹{total}</h2>
        </div>
      )}
    </div>
  );
}

export default Cart;
