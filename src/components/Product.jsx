import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProduct, deleteProduct } from "../../redux/productSlice";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

function Product({ car }) {
  const dispatch = useDispatch();
  const [modalEdit, setModalEdit] = useState(false);
  const brands = useSelector((state) => state.brand);
  const token = useSelector((state) => state.token);

  const [brandId, setBrandId] = useState(car?.brandId);
  const [description, setDescription] = useState(car?.description);
  const [model, setModel] = useState(car?.model);
  const [featured, setFeatured] = useState(car?.featured);
  const [price, setPrice] = useState(car?.price);
  const [stock, setStock] = useState(car?.stock);
  const [year, setYear] = useState(car?.year);
  const [engine, setEngine] = useState(car?.engine);
  const [images, setImages] = useState(car?.image);

  const handleEdit = async (e) => {
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
    console.log(e.target);
    console.log({ formData });
    const call = await axios({
      method: "PATCH",
      url: `${import.meta.env.VITE_API_URL}/products/${car.id}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data", authorization: `Bearer ${token}` },
    });
    dispatch(editProduct(call.data));
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

  const handleDelete = async (car, event) => {
    event.preventDefault();
    const call = await axios({
      method: "DELETE",
      url: `${import.meta.env.VITE_API_URL}/products/${car.id}`,
      headers: { authorization: `Bearer ${token}` },
    });
    dispatch(deleteProduct(car.id));
  };

  const hideModalEdit = () => {
    setModalEdit(false);
  };

  const showModalEdit = () => {
    setModalEdit(true);
  };

  return (
    <>
      <tr key={car.id}>
        <td>{car?.id}</td>
        <td>{car?.model}</td>
        <td>{car?.brand?.name}</td>
        <td>{car?.stock}</td>
        <td>
          <i
            onClick={() => showModalEdit(car)}
            className="bi bi-pencil-fill me-2 cursor-pointer"
          ></i>
          <i
            onClick={(event) => handleDelete(car, event)}
            className="ms-2 bi bi-trash-fill cursor-pointer"
          ></i>
        </td>
      </tr>

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
              value={model}
              placeholder={car?.model}
              onChange={(e) => setModel(e.target.value)}
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
              value={description}
              placeholder={car?.description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label className="mb-1" htmlFor="featured">
              Featured
            </label>
            <select
              className="form-select mb-3 input-modal-styles rounded-0"
              id="featured"
              name="featured"
              value={featured}
              onChange={(e) => setFeatured(e.target.value)}
            >
              {car?.featured ? (
                <option value="1">True</option>
              ) : (
                <option selected value="0">
                  False
                </option>
              )}
              {car?.featured ? <option value="0">False</option> : <option value="1">True</option>}
            </select>
            <label className="mb-1" htmlFor="price">
              Price
            </label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              className="form-control mb-3 input-modal-styles rounded-0"
              type="text"
              id="price"
              name="price"
              value={price}
              placeholder={formatNumber(car?.price, 0)}
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
              placeholder={car?.stock}
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
              placeholder={car?.year}
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
              placeholder={car?.engine}
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
    </>
  );
}

export default Product;
