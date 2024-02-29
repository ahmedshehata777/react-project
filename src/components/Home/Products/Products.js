import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Modal from "react-bootstrap/Modal";
import { modalClose } from "../../../redux/cartSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filterdProducts, setFilterdProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // fetch Data
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://dummyjson.com/products");
      // console.log(response.data.products);
      const responseData = response.data;

      setProducts(responseData.products);
      setFilterdProducts(responseData.products);

      setLoading(false);
    };

    // Call the fetchData function
    fetchData();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilterdProducts(filtered);
  };

  const allcategories = [
    "all",
    ...new Set(products.map((product, index) => product.category)),
  ];
  // console.log(allcategories);

  const filter = (category) => {
    if (category === "all") {
      setFilterdProducts(products);
      return;
    }
    setFilterdProducts(
      products.filter((product) => product.category === category)
    );
  };

  // ======== Modal Alert ===========
  const { showModal } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const handleClose = () => dispatch(modalClose());

  return (
    <>
      <section className="menu my-5 bd-container" id="menu">
        <span className="section-subtitle">Special</span>
        <h2 className="section-title">Menu of the week</h2>

        <div className="col-10 m-auto d-flex justify-content-evenly py-2">
          {allcategories.map((category, index) => (
            <button
              className="btn btn-outline-success fw-bold text-capitalize"
              onClick={() => filter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearch}
          className="my-4 d-block m-auto form-control w-50"
        />

        <div className="menu__container bd-grid">
          {loading ? (
            <p>Loading...</p>
          ) : (
            filterdProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </section>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>This Item is Already in Your Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-success">
          Hope you enjoy Shoping with us
        </Modal.Body>
        <Modal.Footer>
          <Link to="/cart">
            <button className="btn btn-outline-success" onClick={handleClose}>
              Your Cart
            </button>
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
}
