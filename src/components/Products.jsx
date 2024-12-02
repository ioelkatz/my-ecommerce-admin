import axios from "axios";
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import Product from "./Product";
import { getAllProducts } from "../../redux/productSlice";
import NavbarTop from "./NavbarTop";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CreateProductModal from "./CreateProductModal";

function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.product);
  const brands = useSelector((state) => state.brand);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      setTimeout(() => toast.info("You need to login to access the Products´ section"), 800);
    }
  }, [token]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios({
        method: "GET",
        url: `${import.meta.env.VITE_API_URL}/products`,
        headers: { authorization: `Bearer ${token}` },
      });
      dispatch(getAllProducts(response.data));
    };
    getProducts();
  }, []);

  const [modalCreate, setModalCreate] = useState(false);
  const [buscador, setBuscador] = useState("");

  const hideModalCreate = () => {
    setModalCreate(false);
  };

  const showModalCreate = () => {
    setModalCreate(true);
  };

  const readBuscador = (e) => {
    setBuscador(e.target.value);
  };

  return (
    products &&
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
                      onChange={readBuscador}
                      className="form-control buscador-styles color-text-our-white border-0 rounded-0 rounded-start"
                      name="carSearcher"
                      id="carSearcher"
                    />
                    <button className="button-search rounded-end fw-bold px-3 m-0 h-100">
                      <i className="bi bi-search color-text-night"></i>
                    </button>
                  </div>
                  {/* Boton + */}
                </div>
                <div className="d-flex mb-2 align-items-center">
                  <h1 className="saira-expanded-more-bold m-0">Products</h1>
                  <div className="ms-auto">
                    <i
                      className="color-text-night bi bi-plus-circle cursor-pointer"
                      onClick={showModalCreate}
                    ></i>
                  </div>
                </div>
                {/* Tabla */}
                <div className="scroll-table">
                  <Table striped bordered hover responsive variant="lig shadow-sm">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Model</th>
                        <th>Brand</th>
                        <th>Stock</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products
                        ?.filter(
                          (car) =>
                            car?.model?.toLowerCase().includes(buscador.toLowerCase()) |
                            car?.brand?.name?.toLowerCase().includes(buscador.toLowerCase()),
                        )
                        ?.sort((a, b) => a.id - b.id)
                        ?.map((car) => (
                          <Product key={car.id} car={car} />
                        ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CreateProductModal
          showModalCreate={showModalCreate}
          hideModalCreate={hideModalCreate}
          modalCreate={modalCreate}
        />
      </>
    )
  );
}

export default Products;
