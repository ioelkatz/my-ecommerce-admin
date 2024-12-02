import { NavLink } from "react-router-dom";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <div className="py-5 vh-100 d-flex align-items-center color-text-night">
        <div className="container text-center">
          <h1 className="fw-bold title-error-page m-0">404</h1>
          <p className="fs-4 fw-medium">Page not found</p>
          <div className="d-flex justify-content-center">
            <NavLink
              className="button-error-page p-2 d-flex justify-content-center align-items-center"
              to="/"
            >
              <p className="me-1 m-0">Return Home</p>
              <i className="bi bi-arrow-right-circle ms-1"></i>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
