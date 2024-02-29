import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  const { cartNum } = useSelector((state) => state.cart);
  const [storedUser, setStoredUser] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setStoredUser(user);
      setUsername(JSON.parse(user).username);
    }
  }, []);

  return (
    <header className="l-header" id="header">
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand href="/home" className="nav__logo">
            Titan
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavLink to="/home" className="nav-link mx-3 nav__link">
                Home
              </NavLink>
              <NavLink to="/about" className="nav-link mx-3 nav__link">
                About
              </NavLink>

              {/* check user in local storage>>if not > register & login show // if in replace them to username */}
              {storedUser ? (
                <span className="mt-2 text-dark">{username}</span>
              ) : (
                <NavLink to="/login" className="nav-link mx-3 nav__link">
                  Login
                </NavLink>
              )}

              {!storedUser && (
                <NavLink to="/register" className="nav-link mx-3 nav__link">
                  Register
                </NavLink>
              )}

              {storedUser && (
                <NavLink to="/cart" className="nav-link mx-3 nav__link">
                  <i className="bx bx-cart bx-sm position-relative px-1">
                    <span
                      className="bg-success text-light rounded-circle position-absolute start-100 translate-middle badge"
                      id="cartNum"
                    >
                      {cartNum}
                    </span>
                  </i>
                </NavLink>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
