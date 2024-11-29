import { login } from "../../redux/tokenSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notAuth, setNotAuth] = useState("");
  const [typePassword, setTypePassword] = useState("text");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const createToken = async (e) => {
    e.preventDefault();
    const call = await axios({
      method: "POST",
      url: `${import.meta.env.VITE_API_URL}/login-admin`,
      data: { email, password },
    });
    dispatch(login(call.data.token));
    if (call.data.msg !== "Invalid credentials") {
      navigate("/");
      setTimeout(toast.success("Login successful!"), 800);
    } else {
      setNotAuth("NO");
    }
  };

  return (
    <>
      <div className="position-relative bg-black vh-100 w-100">
        <img
          className="img-login-styles d-none d-sm-block img-fluid vh-100"
          src="lambo-aventador-back.png"
          alt="poster de car red"
        />
        <div className="position-absolute px-5 div-login-styles shadow">
          <div className="d-flex flex-column align-items-center justify-content-center h-100">
            <h2 className="text-center fw-bold pb-3">Welcome</h2>
            <form onSubmit={createToken} method="POST" className="form-styles">
              <label className="mb-2" htmlFor="email">
                Login with your admin credentials:
              </label>
              <input
                required
                value={email}
                onChange={handleEmail}
                className="input-login-styles form-control mb-3 rounded-0"
                type="email"
                name="email"
                id="email"
              />
              <label className=" mb-2" htmlFor="password">
                Password
              </label>
              <div className="position-relative">
                <input
                  required
                  value={password}
                  onChange={handlePassword}
                  className="input-login-styles form-control mb-4 rounded-0"
                  type={typePassword}
                  name="password"
                  id="password"
                />
                {typePassword === "password" ? (
                  <i
                    onClick={() => setTypePassword("text")}
                    className="bi bi-eye position-absolute cursor-pointer"
                  ></i>
                ) : (
                  <i
                    onClick={() => setTypePassword("password")}
                    className="bi bi-eye-slash position-absolute cursor-pointer"
                  ></i>
                )}
              </div>
              {notAuth !== "NO" ? (
                ""
              ) : (
                <div>
                  <p>Invalid Credentials...</p>
                </div>
              )}
              <button className="button-login fw-bold py-2 mb-3 title-responsive">Login</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
