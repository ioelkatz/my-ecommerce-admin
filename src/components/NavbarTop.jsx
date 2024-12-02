import Nav from "react-bootstrap/Nav";
import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/tokenSlice";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

function NavbarTop() {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);

  const hideModal = () => {
    setModal(false);
  };

  const showModal = () => {
    setModal(true);
  };

  const goodbye = () => {
    dispatch(logout(""));
    setModal(false);
    setTimeout(toast.success("Logout successful"), 800);
  };

  return (
    <>
      <Nav className="saira color-text-our-white navbar-styles d-flex">
        <div className="w-100">
          <NavLink
            className={({ isActive }) =>
              isActive ? "link-active m-0 pb-4" : "link-inactive m-0 pb-4"
            }
            to="/"
          >
            <i className="bi bi-house-gear-fill me-2 me-sm-3"></i>
            <span className="m-0 span-disappear-navbar">Dashboard</span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "link-active m-0 pb-4" : "link-inactive m-0 pb-4"
            }
            to="/products"
          >
            <i className="bi bi-car-front-fill me-2 me-sm-3"></i>
            <span className="m-0 span-disappear-navbar">Products</span>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? "link-active m-0 pb-4" : "link-inactive m-0 pb-4"
            }
            to="/brands"
          >
            <i className="bi bi-shield-fill-check me-2 me-sm-3"></i>
            <span className="m-0 span-disappear-navbar">Brands</span>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? "link-active m-0 pb-4" : "link-inactive m-0 pb-4"
            }
            to="/orders"
          >
            <i className="bi bi-box-seam-fill me-2 me-sm-3"></i>
            <span className="m-0 span-disappear-navbar">Orders</span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "link-active m-0 pb-4" : "link-inactive m-0 pb-4"
            }
            to="/admins"
          >
            <i className="bi bi-person-circle me-2 me-sm-3"></i>
            <span className="m-0 span-disappear-navbar">Admins</span>
          </NavLink>
        </div>

        <div className="w-100 d-flex align-items-center">
          <NavLink onClick={showModal} className="link-inactive mt-auto d-flex align-items-center">
            <i className="me-3 bi bi-box-arrow-right"></i>
            <p className="m-0 span-disappear-navbar">Logout </p>
          </NavLink>
        </div>
      </Nav>

      <Modal show={modal} onHide={hideModal}>
        <Modal.Body className="background-night color-text-our-white saira px-4 position-relative">
          <i
            onClick={hideModal}
            className="bi bi-x x-modal-styles position-absolute cursor-pointer"
          ></i>
          <p className="m-0 saira-expanded-bold">Are you sure you want to logout?</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Link onClick={() => goodbye()} to="/login">
              <button className="button-yes-modal saira-bold ms-2">Yes, I am sure</button>
            </Link>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavbarTop;
