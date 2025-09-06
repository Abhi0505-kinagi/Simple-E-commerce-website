import React, { useEffect, useState } from "react";

function Cards() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/items")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Error fetching items:", err));
  }, []);

    const handleAddToCart = async (itemId) => {
      try {
        const res = await fetch("http://localhost:5000/api/add/add-item", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token") // if using auth
          },
          body: JSON.stringify({ itemId, quantity: 1 })
        });

        const data = await res.json();
        if (res.ok) {
          alert(data.msg);
        } else {
          alert(data.error || data.msg);
        }
      } catch (err) {
        console.error(err);
      }
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
          <button onClick={() => handleAddToCart(item._id)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default Cards;
