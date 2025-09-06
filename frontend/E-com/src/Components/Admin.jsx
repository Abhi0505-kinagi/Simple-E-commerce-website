import { useState } from "react";
import Pic from "../assets/secure.png";

function Admin() {
  const [form, setForm] = useState({
    Title: "",
    Price: "",
    Category: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/items/add-item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          admin: "abhishek",          // from .env
          adminpassword: "1122333",  // from .env
          title: form.Title,
          price: form.Price,
          category: form.Category,
          imageUrl: form.imageUrl
        })
      });
      const data = await res.json();
      alert(data.msg);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-container" style={{ display: "flex", alignItems: "flex-start" }}>
      <div className="admnimg" style={{ marginRight: "32px" }}>
        <img src={Pic} alt="Admin" style={{ width: "150px", borderRadius: "12px" }} />
      </div>
      <div className="adminmenu">
        <label>Title:</label><br />
        <input name="Title" value={form.Title} onChange={handleChange} /><br />
        <label>Price:</label><br />
        <input name="Price" value={form.Price} onChange={handleChange} /><br />
        <label>Category:</label><br />
        <input name="Category" value={form.Category} onChange={handleChange} /><br />
        <label>Image URL:</label><br />
        <input name="imageUrl" value={form.imageUrl} onChange={handleChange} /><br />
        <button onClick={handleSubmit} className="admbtn">Submit</button>
      </div>
    </div>
  );
}

export default Admin;
