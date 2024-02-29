import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Signin from "./components/Auth/Signin";
import Register from "./components/Auth/Register";
import Cart from "./components/Cart/Cart";
import ProductDetails from "./components/Home/Products/ProductDetails";
import NotFound from "./components/NotFound";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:name" element={<ProductDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
