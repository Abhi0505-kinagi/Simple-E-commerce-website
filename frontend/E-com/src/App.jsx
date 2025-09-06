import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Cards from "./Components/Cards";
import Admin from "./Components/Admin";
import Cart from "./Components/Cart";
import Login from "./Components/Login";
import Register from "./Components/Register";

function App() {
  // check if user is authenticated
  const isAuth = !!localStorage.getItem("token");

  return (
    <>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Cards />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/admin"
          element={isAuth ? <Admin /> : <Navigate to="/login" />}
        />
        <Route
          path="/cart"
          element={isAuth ? <Cart /> : <Navigate to="/login" />}
        />
        <Route
          path="/additems"
          element={isAuth ? <Admin /> : <Navigate to="/login" />}
        />

        {/* fallback: redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
