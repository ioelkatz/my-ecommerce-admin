import axios from "axios";
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, deleteOrder, editOrder, createOrder } from "../../redux/orderSlice";
import NavbarTop from "./NavbarTop";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Orders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      setTimeout(() => toast.info("You need to login to access the Orders´ section"), 800);
    }
  }, [token]);

  const totalPurchase = (order) => {
    let sum = 0;
    order.productList.map((car) => {
      sum += car.price * car.qty;
    });
    return sum;
  };

  useEffect(() => {
    const getOrders = async () => {
      const response = await axios({
        method: "GET",
        url: `${import.meta.env.VITE_API_URL}/orders`,
        headers: { authorization: `Bearer ${token}` },
      });
      dispatch(getAllOrders(response.data));
    };
    getOrders();
  }, []);

  const [modalEdit, setModalEdit] = useState(false);
  const [order, setOrder] = useState(null);
  const [buscador, setBuscador] = useState("");

  const [status, setStatus] = useState(order?.status);
  const [address, setAddress] = useState(order?.address);

  const handleStatus = (e) => {
    setStatus(e.target.value);
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  const formatNumber = (num, fixed) => {
    const array = Math.floor(num).toString().split("");
    let index = -3;
    while (array.length + index > 0) {
      array.splice(index, 0, ".");
      index -= 4;
    }
    if (fixed > 0) {
      const decimalPart = num.toFixed(fixed).split(".")[1];
      return array.join("") + "," + decimalPart;
    }
    return array.join("");
  };

  const hideModalEdit = () => {
    setModalEdit(false);
  };

  const showModalEdit = (order) => {
    setOrder(order);
    setModalEdit(true);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const call = await axios({
      method: "PATCH",
      url: `${import.meta.env.VITE_API_URL}/orders/${order.id}`,
      data: { status, address },
      headers: { authorization: `Bearer ${token}` },
    });
    dispatch(editOrder(call.data));
  };

  const handleDelete = async (order, event) => {
    event.preventDefault();
    const call = await axios({
      method: "DELETE",
      url: `${import.meta.env.VITE_API_URL}/orders/${order.id}`,
      headers: { authorization: `Bearer ${token}` },
    });
    dispatch(deleteOrder(order.id));
  };

  return (
    orders && (
      <>
        <div className="container-fluid m-0 p-0">
          <div className="row m-0 p-0">
            <div className="div-navbar background-night-navbar vh-100">
              <NavbarTop />
            </div>
            <div className="div-container mb-4 pt-4 justify-content-center color-text-night saira">
              {orders.length === 0 ? (
                <div className="container">
                  <p className="fs-5 text-start fw-medium">
                    Orders will be displayed when our costumers start to purchase.
                  </p>
                </div>
              ) : (
                <div className="container">
                  <div className="d-flex mb-4 align-items-center">
                    {/* Buscador */}
                    <div className="d-flex buscador rounded p-0">
                      <label hidden htmlFor="carSearcher">
                        hey
                      </label>
                      <input
                        value={buscador}
                        onChange={(e) => setBuscador(e.target.value)}
                        className="form-control buscador-styles color-text-our-white border-0 rounded-0 rounded-start"
                        name="carSearcher"
                        id="carSearcher"
                      />
                      <button className="button-search rounded-end fw-bold px-3 m-0 h-100">
                        <i className="bi bi-search"></i>
                      </button>
                    </div>
                  </div>
                  <h1 className="saira-expanded-more-bold mb-2">Orders</h1>

                  {/* Tabla */}
                  <div className="scroll-table">
                    <Table striped bordered hover responsive variant="light">
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>User</th>
                          <th>Status</th>
                          <th>Address</th>
                          <th>List</th>
                          <th>Total</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders
                          ?.filter(
                            (order) =>
                              order?.user?.firstname
                                ?.toLowerCase()
                                .includes(buscador.toLowerCase()) |
                              order?.user?.lastname
                                ?.toLowerCase()
                                .includes(buscador.toLowerCase()) |
                              order?.status?.toLowerCase().includes(buscador.toLowerCase()) |
                              order?.address?.toLowerCase().includes(buscador.toLowerCase()),
                          )
                          ?.map((order) => (
                            <tr key={order?.id}>
                              <td>{order?.id}</td>
                              <td>
                                {order?.user?.firstname} {order?.user?.lastname}
                              </td>
                              <td>{order?.status}</td>
                              <td>{order?.address}</td>
                              <td>
                                {order?.productList?.map((car) =>
                                  car.qty < 2 ? (
                                    <li className="list-order-styles" key={car?.nanoId}>
                                      {car?.brand?.name} {car?.model} - 1 unit
                                    </li>
                                  ) : (
                                    <li className="list-order-styles" key={car?.nanoId}>
                                      {car?.brand?.name} {car?.model} - {car?.qty} units
                                    </li>
                                  ),
                                )}
                              </td>
                              <td>${formatNumber(totalPurchase(order), 0)} </td>
                              <td>
                                <i
                                  onClick={() => showModalEdit(order)}
                                  className="bi bi-pencil-fill me-2 cursor-pointer"
                                ></i>
                                <i onClick={(event) => handleDelete(order, event)}></i>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* modal edit */}

        <Modal show={modalEdit} onHide={hideModalEdit}>
          <Modal.Body className="background-night color-text-our-white saira p-4 position-relative">
            <i
              onClick={hideModalEdit}
              className="bi bi-x x-modal-styles position-absolute cursor-pointer"
            ></i>
            <p className="m-0 saira-expanded-bold">Make the changes you desire</p>
            <hr />
            <form onSubmit={handleEdit} method="PATCH">
              <label className="mb-1" htmlFor="status">
                Status
              </label>
              <select
                className="form-select mb-3 input-modal-styles rounded-0"
                /* placeholder={order?.status} */
                id="status"
                name="status"
                onChange={handleStatus}
              >
                <option selected disabled>
                  Choose an option
                </option>
                <option className="background-darkBlue" value="Pending">
                  Pending
                </option>
                <option className="bg-primary" value="On track">
                  On track
                </option>
                <option className="bg-success" value="Delivered">
                  Delivered
                </option>
              </select>
              <label className="mb-1" htmlFor="address">
                Address
              </label>
              <input
                className="form-control mb-3 input-modal-styles rounded-0"
                type="text"
                id="address"
                name="address"
                placeholder={order?.address}
                onChange={handleAddress}
              />
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  onClick={hideModalEdit}
                  className="button-no-modal saira-bold me-2"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  onClick={hideModalEdit}
                  className="button-yes-modal saira-bold ms-2"
                >
                  Save changes
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </>
    )
  );
}

export default Orders;
