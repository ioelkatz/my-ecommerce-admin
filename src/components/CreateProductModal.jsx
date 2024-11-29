import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { createProduct } from "../../redux/productSlice";

function CreateProductModal({ modalCreate, hideModalCreate, showModalCreate }) {
  const brands = useSelector((state) => state.brand);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const [brandId, setBrandId] = useState("");
  const [description, setDescription] = useState("");
  const [model, setModel] = useState("");
  const [featured, setFeatured] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [year, setYear] = useState("");
  const [engine, setEngine] = useState("");
  const [images, setImages] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("brandId", brandId);
    formData.append("description", description);
    formData.append("model", model);
    formData.append("featured", featured);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("year", year);
    formData.append("engine", engine);
    formData.append("images", images);
    const call = await axios({
      method: "POST",
      url: `${import.meta.env.VITE_API_URL}/products`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data", authorization: `Bearer ${token}` },
    });
    dispatch(createProduct(call.data));
  };

  return (
    <>
      {/*  modal create */}
      <Modal show={modalCreate} onHide={hideModalCreate}>
        <Modal.Body className="background-night color-text-our-white saira p-4 position-relative">
          <i
            onClick={hideModalCreate}
            className="bi bi-x x-modal-styles position-absolute cursor-pointer"
          ></i>
          <p className="m-0 saira-expanded-bold">Create a new product</p>
          <hr />
          <form onSubmit={handleCreate} method="POST">
            <label className="mb-1" htmlFor="brandId">
              Brand
            </label>
            <select
              className="form-select mb-3 input-modal-styles rounded-0"
              id="brandId"
              name="brandId"
              onChange={(e) => setBrandId(e.target.value)}
              value={brandId}
            >
              <option value="" disabled selected>
                Choose a brand
              </option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
            <label className="mb-1" htmlFor="model">
              Model
            </label>
            <input
              className="form-control mb-3 input-modal-styles rounded-0"
              type="text"
              id="model"
              name="model"
              onChange={(e) => setModel(e.target.value)}
              value={model}
            />
            <label className="mb-1" htmlFor="images">
              Images
            </label>
            <input
              className="form-control mb-3 input-modal-styles rounded-0"
              type="file"
              id="images"
              name="images"
              onChange={(e) => setImages(e.target.files[0])}
            />
            <label className="mb-1" htmlFor="description">
              Description
            </label>
            <input
              className="form-control mb-3 input-modal-styles rounded-0"
              type="text"
              id="description"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
            <label className="mb-1" htmlFor="featured">
              Featured
            </label>
            <select
              className="form-select mb-3 input-modal-styles rounded-0"
              id="featured"
              name="featured"
              onChange={(e) => setFeatured(e.target.value)}
              value={featured}
            >
              <option disabled>Choose an option</option>
              <option value="0">False</option>
              <option value="1">True</option>
            </select>
            <label className="mb-1" htmlFor="price">
              Price
            </label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              className="form-control mb-3 input-modal-styles rounded-0"
              type="text"
              id="price"
              name="price"
            />
            <label className="mb-1" htmlFor="stock">
              Stock
            </label>
            <input
              onChange={(e) => setStock(e.target.value)}
              value={stock}
              className="form-control mb-3 input-modal-styles rounded-0"
              type="text"
              id="stock"
              name="stock"
            />
            <label className="mb-1" htmlFor="year">
              Year
            </label>
            <input
              onChange={(e) => setYear(e.target.value)}
              value={year}
              className="form-control mb-3 input-modal-styles rounded-0"
              type="text"
              id="year"
              name="year"
            />
            <label className="mb-1" htmlFor="engine">
              Engine
            </label>
            <input
              onChange={(e) => setEngine(e.target.value)}
              value={engine}
              className="form-control mb-3 input-modal-styles rounded-0"
              type="text"
              id="engine"
              name="engine"
            />
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
    </>
  );
}

export default CreateProductModal;
