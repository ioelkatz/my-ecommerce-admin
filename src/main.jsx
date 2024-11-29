import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home.jsx";
import Products from "./components/Products.jsx";
import Brands from "./components/Brands.jsx";
import Admins from "./components/Admins.jsx";
import Orders from "./components/Orders.jsx";
import Login from "./components/Login.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../redux/configStore.js";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorPage from "./components/ErrorPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/brands",
    element: <Brands />,
  },
  {
    path: "/admins",
    element: <Admins />,
  },
  {
    path: "/orders",
    element: <Orders />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <>
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </StrictMode>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={true}
      closeOnClick={true}
      pauseOnHover={false}
      draggable={true}
      progress={undefined}
      theme="dark"
    />
  </>,
);
