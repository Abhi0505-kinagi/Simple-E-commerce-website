import React from "react";
import "../index.css";

function Header() {
    return (
        <header>
            <nav className="navbar">
                <div className="navbar-logo">E-Commerce</div>
                <ul className="navbar-links">
                    <li><a href="/">Home</a></li>
                    <li><a href="/cart">Cart</a></li>
                    <li><a href="/additems">Add Items</a></li>
                    <li><a href="/login">Login</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;