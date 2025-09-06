import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" }); // ✅ backend expects email + password
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const res = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        const data = await res.json();
        console.log(data);

        if (res.ok) {
          // ✅ Save token + user in localStorage
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));

          setError("");
          navigate("/"); // go to home after login
        } else {
          // 👇 Check if backend said "Invalid credentials"
          if (data.msg === "Invalid credentials") {
            navigate("/register"); // redirect user to Register page
          } else {
            setError(data.msg || "Login failed");
          }
        }
      } catch (err) {
        console.error("Error:", err);
        setError("Something went wrong, try again.");
      }
    };


  return (
    <div
      className="login-page"
      style={{
        maxWidth: "400px",
        margin: "2rem auto",
        padding: "2rem",
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
      }}
    >
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={{ marginBottom: "1rem", width: "100%" }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={{ marginBottom: "1rem", width: "100%" }}
        />
        <button type="submit" style={{ width: "100%" }}>
          Login
        </button>
      </form>
      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
    </div>
  );
}

export default Login;
