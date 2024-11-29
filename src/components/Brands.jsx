import axios from "axios";
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteBrand, editBrand, createBrand } from "../../redux/brandSlice";
import NavbarTop from "./NavbarTop";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Brands() {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.brand);

  const token = useSelector((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      setTimeout(() => toast.info("You need to login to access the Brands´ section"), 800);
    }
  }, [token]);

  const [modalEdit, setModalEdit] = useState(false);
  const [modalCreate, setModalCreate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [brand, setBrand] = useState(null);
  const [buscador, setBuscador] = useState("");

  const [name, setName] = useState(brand?.name);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const hideModalEdit = () => {
    setModalEdit(false);
  };

  const hideModalCreate = () => {
    setModalCreate(false);
  };

  const showModalCreate = () => {
    setModalCreate(true);
  };

  const showModalEdit = (brand) => {
    setBrand(brand);
    setModalEdit(true);
  };

  const hideModalDelete = () => {
    setModalDelete(false);
  };

  const showModalDelete = (brand) => {
    setBrand(brand);
    console.log(brand);
    setModalDelete(true);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const call = await axios({
      method: "PATCH",
      url: `${import.meta.env.VITE_API_URL}/brands/${brand.id}`,
      data: { name },
      headers: { authorization: `Bearer ${token}` },
    });
    dispatch(editBrand(call.data));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const call = await axios({
      method: "POST",
      url: `${import.meta.env.VITE_API_URL}/brands`,
      data: { name },
      headers: { authorization: `Bearer ${token}` },
    });
    dispatch(createBrand(call.data));
  };

  const handleDelete = async (brand, event) => {
    event.preventDefault();
    const call = await axios({
      method: "DELETE",
      url: `${import.meta.env.VITE_API_URL}/brands/${brand.id}`,
      headers: { authorization: `Bearer ${token}` },
    });
    dispatch(deleteBrand(brand.id));
    setModalDelete(false);
  };

  return (
    brands && (
      <>
        <div className="container-fluid m-0 p-0">
          <div className="row m-0 p-0">
            <div className="div-navbar background-night-navbar vh-100">
              <NavbarTop />
            </div>
            <div className="div-container mb-4 pt-4 justify-content-center color-text-night saira">
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
                  {/* Boton + */}
                </div>

                <div className="d-flex mb-2 align-items-center">
                  <h1 className="saira-expanded-more-bold m-0">Brands</h1>
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
                        <th>Brand</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {brands
                        ?.filter((brand) =>
                          brand?.name?.toLowerCase().includes(buscador.toLowerCase()),
                        )
                        ?.map((brand) => (
                          <tr key={brand.id}>
                            <td>{brand?.id}</td>
                            <td>{brand?.name}</td>
                            <td>
                              <i
                                onClick={() => showModalEdit(brand)}
                                className="bi bi-pencil-fill me-2 cursor-pointer"
                              ></i>
                              <i
                                onClick={(event) => showModalDelete(brand, event)}
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
                Brand Name
              </label>
              <input
                className="form-control mb-3 input-modal-styles rounded-0"
                type="text"
                id="Name"
                name="Name"
                placeholder={brand?.name}
                onChange={handleName}
              />{" "}
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

        {/*  modal create */}

        <Modal show={modalCreate} onHide={hideModalCreate}>
          <Modal.Body className="background-night color-text-our-white saira p-4 position-relative">
            <i
              onClick={hideModalCreate}
              className="bi bi-x x-modal-styles position-absolute cursor-pointer"
            ></i>
            <p className="m-0 saira-expanded-bold">Create a new brand</p>
            <hr />
            <form onSubmit={handleCreate} method="POST">
              <label className="mb-1" htmlFor="Power">
                Name
              </label>
              <input
                onChange={handleName}
                className="form-control mb-3 input-modal-styles rounded-0"
                type="text"
                id="Name"
                name="Name"
                placeholder={brand?.Name}
              />{" "}
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
            <p className="m-0 saira-expanded-bold">{`Are you sure you want to eliminate ${brand?.name}?`}</p>
            <hr />
            <div className="d-flex justify-content-end">
              <button
                onClick={(event) => handleDelete(brand, event)}
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

export default Brands;
