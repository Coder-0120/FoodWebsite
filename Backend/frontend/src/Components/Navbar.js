import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../Screens/Cart';
import { useCart } from './ContextReducer';

const Navbar = () => {
  const [cartview, setcartview] = useState(false);
  const data = useCart();

  const logouthandle = () => {
    localStorage.removeItem("token");
    window.location.href = "/createuser";
  };
  const handleGoFoodClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top shadow-sm" style={{ zIndex: 1030 }}>
      <div className="container-fluid px-4">
      <Link
          className="navbar-brand fs-2 " style={{ color: "#ff7043", fontWeight: "900" }}
          to="/"
          onClick={handleGoFoodClick}
        >
          GoFood
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link"
                style={{ fontSize: "18px", fontWeight: "600" }}
                to="/"
              >
                Home
              </Link>
            </li>

            {localStorage.getItem("token") && (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={{ fontSize: "18px", fontWeight: "600" }}
                  to="/MyOrder"
                >
                  My Orders
                </Link>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-2">
            {!localStorage.getItem("token") ? (
              <>
                <Link
                  className="btn btn-outline-success"
                  style={{ fontSize: "16px", fontWeight: "500" }}
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-success"
                  style={{ fontSize: "16px", fontWeight: "500" }}
                  to="/createuser"
                >
                  Signup
                </Link>
              </>
            ) : (
              <>
                <button
                  className="btn btn-outline-warning position-relative"
                  style={{ fontSize: "16px", fontWeight: "500" }}
                  onClick={() => setcartview(true)}
                >
                  My Cart
                  <Badge pill bg="danger" className="ms-2">
                    {data.length}
                  </Badge>
                </button>

                {cartview && (
                  <Modal onClose={() => setcartview(false)}>
                    <Cart />
                  </Modal>
                )}

                <button
                  className="btn btn-danger"
                  style={{ fontSize: "16px", fontWeight: "500", color: "white" }}
                  onClick={logouthandle}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
