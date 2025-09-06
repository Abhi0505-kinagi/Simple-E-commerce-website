import React, { useEffect, useState } from "react";

function Cards() {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState({}); // cart as a dictionary

  useEffect(() => {
    fetch("http://localhost:5000/api/items")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Error fetching items:", err));
  }, []);

  const handleAddToCart = (item) => {
  setCart((prevCart) => {
    const cartCopy = { ...prevCart };
    if (cartCopy[item._id]) {
      cartCopy[item._id].quantity += 1;
    } else {
      cartCopy[item._id] = {
        title: item.title,
        price: item.price,
        quantity: 1,
      };
    }
    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cartCopy));
    return cartCopy;
  });
};


  return (
    <div className="cards-container">
      {items.map((item) => (
        <div className="card" key={item._id}>
          <img
            src={item.imageUrl}
            alt={item.title}
            style={{
              width: "200px",
              height: "200px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
          <h3>{item.title}</h3>
          <p>Price: ₹{item.price}</p>
          <p>Category: {item.category}</p>
          <button className="adbtn"onClick={() => handleAddToCart(item)}>
            Add to Cart
          </button>
        </div>
      ))}

      {/* Optional: Display cart */}
      <div style={{ marginTop: "32px" }}>
        <h2>Cart</h2>
        {Object.keys(cart).length === 0 && <p>No items in cart</p>}
        {Object.entries(cart).map(([id, item]) => (
          <p key={id}>
            {item.title} - ₹{item.price} × {item.quantity} = ₹
            {item.price * item.quantity}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Cards;
