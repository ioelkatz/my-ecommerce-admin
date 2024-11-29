import axios from "axios";
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getAllAdmins, deleteAdmin, editAdmin, createAdmin } from "../../redux/adminSlice";
import NavbarTop from "./NavbarTop";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Admins() {
  const dispatch = useDispatch();
  const admins = useSelector((state) => state.admin);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      setTimeout(() => toast.info("You need to login to access the Admins´ section"), 800);
    }
  }, [token]);

  useEffect(() => {
    const getAdmins = async () => {
      const response = await axios({
        method: "GET",
        url: `${import.meta.env.VITE_API_URL}/admins`,
        headers: { authorization: `Bearer ${token}` },
      });
      dispatch(getAllAdmins(response.data));
    };
    getAdmins();
  }, []);

  const [modalEdit, setModalEdit] = useState(false);
  const [modalCreate, setModalCreate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [buscador, setBuscador] = useState("");

  const [firstname, setFirstname] = useState(admin?.firstname);
  const [lastname, setLastname] = useState(admin?.lastname);
  const [email, setEmail] = useState(admin?.email);
  const [password, setPassword] = useState(admin?.email);
  const [typePassword, setTypePassword] = useState("text");

  const handleFirstname = (e) => {
    setFirstname(e.target.value);
  };
  const handleLastname = (e) => {
    setLastname(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const hideModalEdit = () => {
    setModalEdit(false);
  };

  const showModalEdit = (admin) => {
    setAdmin(admin);
    setModalEdit(true);
  };

  const hideModalCreate = () => {
    setModalCreate(false);
  };

  const showModalCreate = () => {
    setModalCreate(true);
  };

  const hideModalDelete = () => {
    setModalDelete(false);
  };

  const showModalDelete = (admin) => {
    setAdmin(admin);
    setModalDelete(true);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const call = await axios({
      method: "PATCH",
      url: `${import.meta.env.VITE_API_URL}/admins/${admin.id}`,
      data: { firstname, lastname, email },
      headers: { authorization: `Bearer ${token}` },
    });
    dispatch(editAdmin(call.data));
    setModalEdit(false);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const call = await axios({
      method: "POST",
      url: `${import.meta.env.VITE_API_URL}/admins`,
      data: { firstname, lastname, email, password },
      headers: { authorization: `Bearer ${token}` },
    });
    dispatch(createAdmin(call.data));
    setModalCreate(false);
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    const call = await axios({
      method: "DELETE",
      url: `${import.meta.env.VITE_API_URL}/admins/${admin?.id}`,
      headers: { authorization: `Bearer ${token}` },
    });
    dispatch(deleteAdmin(admin.id));
    setModalDelete(false);
  };

  return (
    admins && (
      <>
        <div className="container-fluid m-0 p-0">
          <div className="row m-0 p-0">
            <div className="div-navbar background-night-navbar vh-100">
              <NavbarTop />
            </div>
            <div className="div-container mb-4 pt-4 justify-content-center color-text-night saira">
              <div className="container">
                <div className="d-flex mb-4 align-items-center mb-4">
                  {/* Buscador */}
                  <div className="d-flex buscador p-0">
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
                  {/* Boton + */}
                </div>
                <div className="d-flex mb-2 align-items-center">
                  <h1 className="saira-expanded-more-bold m-0">Admins</h1>
                  <div className="ms-auto">
                    <i
                      className="color-text-night bi bi-plus-circle cursor-pointer"
                      onClick={showModalCreate}
                    ></i>
                  </div>
                </div>
                {/* Tabla */}
                <div className="scroll-table">
                  <Table striped bordered hover variant="light">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Email</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {admins
                        ?.filter(
                          (admin) =>
                            admin?.firstname?.toLowerCase().includes(buscador.toLowerCase()) |
                            admin?.lastname?.toLowerCase().includes(buscador.toLowerCase()) |
                            admin?.email?.toLowerCase().includes(buscador.toLowerCase()),
                        )
                        ?.map((admin) => (
                          <tr key={admin?.id}>
                            <td>{admin?.id}</td>
                            <td>{admin?.firstname}</td>
                            <td>{admin?.lastname}</td>
                            <td>{admin?.email}</td>
                            <td>
                              <i
                                onClick={() => showModalEdit(admin)}
                                className="bi bi-pencil-fill me-2 cursor-pointer"
                              ></i>
                              <i
                                onClick={() => showModalDelete(admin)}
                                className="ms-2 bi bi-trash-fill cursor-pointer"
                              ></i>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </div>
              </div>
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
              <label className="mb-1" htmlFor="Name">
                Firstname
              </label>
              <input
                className="form-control mb-3 input-modal-styles rounded-0"
                type="text"
                id="Name"
                name="Name"
                placeholder={admin?.firstname}
                onChange={handleFirstname}
              />
              <label className="mb-1" htmlFor="Name">
                Lastname
              </label>
              <input
                className="form-control mb-3 input-modal-styles rounded-0"
                type="text"
                id="Name"
                name="Name"
                placeholder={admin?.lastname}
                onChange={handleLastname}
              />
              <label className="mb-1" htmlFor="Name">
                Email
              </label>
              <input
                className="form-control mb-3 input-modal-styles rounded-0"
                type="email"
                id="Name"
                name="Name"
                placeholder={admin?.email}
                onChange={handleEmail}
              />
              <label className="mb-1" htmlFor="Name">
                Password
              </label>
              <div className="position-relative">
                <input
                  className="form-control mb-3 input-modal-styles rounded-0"
                  type={typePassword}
                  id="Name"
                  name="Name"
                  placeholder="*****"
                  onChange={handlePassword}
                />
                {typePassword === "text" ? (
                  <i
                    onClick={() => setTypePassword("password")}
                    className="bi bi-eye-slash position-absolute cursor-pointer"
                  ></i>
                ) : (
                  <i
                    onClick={() => setTypePassword("text")}
                    className="bi bi-eye position-absolute cursor-pointer"
                  ></i>
                )}
              </div>
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
        {/*  modal create */} {/* TODO OCULTAR / MOSTRAR CONTRASEÑA */}
        <Modal show={modalCreate} onHide={hideModalCreate}>
          <Modal.Body className="background-night color-text-our-white saira p-4 position-relative">
            <i
              onClick={hideModalCreate}
              className="bi bi-x x-modal-styles position-absolute cursor-pointer"
            ></i>
            <p className="m-0 saira-expanded-bold">Create a new admin</p>
            <hr />
            <form onSubmit={handleCreate} method="PATCH">
              <label className="mb-1" htmlFor="Firstname">
                Firstname
              </label>
              <input
                required
                className="form-control mb-3 input-modal-styles rounded-0"
                type="text"
                id="Firstname"
                name="Firstname"
                onChange={handleFirstname}
              />
              <label className="mb-1" htmlFor="Lastname">
                Lastname
              </label>
              <input
                required
                className="form-control mb-3 input-modal-styles rounded-0"
                type="text"
                id="Lastname"
                name="Lastname"
                onChange={handleLastname}
              />
              <label className="mb-1" htmlFor="Email">
                Email
              </label>
              <input
                required
                className="form-control mb-3 input-modal-styles rounded-0"
                type="email"
                id="Email"
                name="Email"
                onChange={handleEmail}
              />
              <label className="mb-1" htmlFor="Password">
                Password
              </label>
              <div className="position-relative">
                <input
                  required
                  className="form-control mb-3 input-modal-styles rounded-0"
                  type={typePassword}
                  id="Password"
                  name="Password"
                  onChange={handlePassword}
                />
                {typePassword === "text" ? (
                  <i
                    onClick={() => setTypePassword("password")}
                    className="bi bi-eye-slash position-absolute cursor-pointer"
                  ></i>
                ) : (
                  <i
                    onClick={() => setTypePassword("text")}
                    className="bi bi-eye position-absolute cursor-pointer"
                  ></i>
                )}
              </div>
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  onClick={hideModalCreate}
                  className="button-no-modal saira-bold me-2"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  onClick={hideModalCreate}
                  className="button-yes-modal saira-bold ms-2"
                >
                  Save changes
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
        {/* modal Delete */}
        <Modal show={modalDelete} onHide={hideModalDelete}>
          <Modal.Body className="background-night color-text-our-white saira px-4 position-relative">
            <i
              onClick={hideModalDelete}
              className="bi bi-x x-modal-styles position-absolute cursor-pointer"
            ></i>
            <p className="m-0 saira-expanded-bold">
              {`Are you sure you want to eliminate ${admin?.firstname} ${admin?.lastname}?`}
            </p>
            <hr />
            <div className="d-flex justify-content-end">
              <button
                onClick={(event) => handleDelete(event, admin)}
                className="button-yes-modal saira-bold ms-2"
              >
                Yes, I am sure
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </>
    )
  );
}

export default Admins;
