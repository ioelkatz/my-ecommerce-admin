import React, { useEffect } from "react";
import NavbarTop from "./NavbarTop";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getAllBrands } from "../../redux/brandSlice";
import axios from "axios";

function Home() {
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getBrands = async () => {
      const response = await axios({
        method: "GET",
        url: `${import.meta.env.VITE_API_URL}/brands`,
        headers: { authorization: `Bearer ${token}` },
      });
      dispatch(getAllBrands(response.data));
    };
    getBrands();
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      setTimeout(() => toast.info("You need to login to access Home"), 800);
    }
  }, [token]);

  return (
    <>
      <div className="container-fluid m-0 p-0">
        <div className="row m-0 p-0">
          <div className="div-navbar">
            <NavbarTop />
          </div>
          <div className="div-container d-flex pt-4 mb-4 justify-content-center color-text-night saira">
            <div className="container">
              {/* first 4 rectangles */}
              <div className="row g-4 mb-4 ">
                <div className="col-sm-6 col-lg-3">
                  <div className="rectangle-1-home rounded">
                    <div className="d-flex">
                      <p className="subtitle-home-styles m-0 saira-expanded-more-bold me-1">$79M</p>
                      <div className="h-25">
                        <span className="span-rectangle">
                          (+12.4% <i className="bi bi-arrow-up"></i>)
                        </span>
                      </div>
                    </div>

                    <p className="p-home-styles m-0">Revenue</p>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-3">
                  <div className="rectangle-2-home rounded">
                    <div className="d-flex">
                      <p className="subtitle-home-styles m-0 saira-expanded-more-bold me-1">52K</p>
                      <div className="h-25">
                        <span className="span-rectangle">
                          (+27.9% <i className="bi bi-arrow-up"></i>)
                        </span>
                      </div>
                    </div>

                    <p className="p-home-styles">Costumers</p>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-3">
                  <div className="rectangle-3-home rounded">
                    <div className="d-flex">
                      <p className="subtitle-home-styles m-0 saira-expanded-more-bold me-1">
                        43.7%
                      </p>
                      <div className="h-25">
                        <span className="span-rectangle">
                          (+3.3% <i className="bi bi-arrow-up"></i>)
                        </span>
                      </div>
                    </div>
                    <p className="p-home-styles">Conversion Rate</p>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-3">
                  <div className="rectangle-4-home rounded">
                    <div className="d-flex">
                      <p className="subtitle-home-styles m-0 saira-expanded-more-bold me-1">
                        97.8%
                      </p>
                      <div className="h-25">
                        <span className="span-rectangle">
                          (-1.3% <i className="bi bi-arrow-down"></i>)
                        </span>
                      </div>
                    </div>
                    <p className="p-home-styles">Satisfaction Rate</p>
                  </div>
                </div>
              </div>
              {/* 2 middle-row */}
              <div className="row">
                <div className="col-lg-7">
                  <div className="background-night p-3 h-100">
                    <p className="saira-expanded-more-bold text-center color-text-our-white">
                      Market trend
                    </p>
                    <div className="d-flex justify-content-center">
                      <img
                        className="img-fluid img-graph-styles"
                        src="graph.png"
                        alt="Graph image"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-lg-5 d-none d-lg-block">
                  <div className="background-night p-3 h-100">
                    <p className="saira-expanded-more-bold text-center mb-lg-5 mb-xl-4 color-text-our-white">
                      Sales
                    </p>
                    <div className="d-flex justify-content-center">
                      <img
                        className="img-fluid img-chart-styles"
                        src="chart.png"
                        alt="Graph image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
