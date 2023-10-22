import userApi from "../api/userApi";
import { useNavigate } from "react-router-dom";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { UserContext } from "../index";
import Auth from "../router/Auth";
import Load from "../components/Load";

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const { email, password } = formData;
  const { currentUser, setCurrentUser } = useContext(UserContext);

  //Is logged in
  useEffect(() => {
    if (currentUser) navigate("/home");
  }, [currentUser]);

  const onSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setIsLoading(true);
      const res = await userApi.login(email, password);
      console.log(res);
      localStorage.setItem("token", res.token);

      //Update UserContext
      Auth.toUpdateCurrentUser().then((u) => {
        u.password = password;
        setCurrentUser(u);
        navigate("/home");
      });
    } catch (err) {
      console.error(err);
      setErrorMessage(err);
    }
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  if (isLoading) return <Load />;

  return (
    <Fragment>
      {errorMessage && (
        <Error
          message={errorMessage.message}
          onClose={() => {
            setErrorMessage("");
            navigate("/login");
          }}
        />
      )}
      <div style={{ zIndex: "-" }}>
        <div className="main-wrap">
          <div className="nav-header bg-transparent shadow-none border-0">
            <div className="nav-top w-100">
              <span className="justify-content-center align-items-center d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0">
                <img
                  src="/assets/images/Logo Minassa1.png"
                  alt="avater"
                  className=" p-1 w-25"
                />
              </span>
              <button className="nav-menu me-0 ms-auto"></button>

              <a
                href="/login"
                className="header-btn d-none d-lg-block bg-dark fw-500 text-white font-xsss p-3 ms-auto w100 text-center lh-20 rounded-xl"
              >
                Login
              </a>
              <a
                href="/register"
                className="header-btn d-none d-lg-block bg-current fw-500 text-white font-xsss p-3 ms-2 w100 text-center lh-20 rounded-xl"
              >
                Register
              </a>
            </div>
          </div>
          <div className="row">
            <div
              className="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat"
              style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/login-bg.jpg)`,
              }}
            />
            <div className="col-xl-7 vh-100 align-items-center d-flex bg-white rounded-3 overflow-hidden">
              <div className="card shadow-none border-0 ms-auto me-auto login-card">
                <div className="card-body rounded-0 text-left">
                  <h2 className="fw-700 display1-size display2-md-size mb-3">
                    Login into <br />
                    your account
                  </h2>
                  <form onSubmit={onSubmit}>
                    <div className="form-group icon-input mb-3">
                      <i className="font-sm ti-email text-grey-500 pe-0"></i>
                      <input
                        type="Email"
                        name="email"
                        className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                        placeholder="Your Email Address"
                        defaultValue={email}
                        onChange={onChange}
                      />
                    </div>
                    <div className="form-group icon-input mb-1">
                      <input
                        type="Password"
                        name="password"
                        className="style2-input ps-5 form-control text-grey-900 font-xss ls-3"
                        placeholder="Password"
                        onChange={onChange}
                        defaultValue={password}
                      />
                      <i className="font-sm ti-lock text-grey-500 pe-0"></i>
                    </div>
                    <div className="form-check text-left mb-3">
                      <input
                        type="checkbox"
                        className="form-check-input mt-2"
                        id="exampleCheck5"
                      />
                      <label className="form-check-label font-xsss text-grey-500">
                        Remember me
                      </label>
                      <a
                        href="/forgot"
                        className="fw-600 font-xsss text-grey-700 mt-1 float-right"
                      >
                        Forgot your Password?
                      </a>
                    </div>
                    <div className="form-group mb-1">
                      <button
                        type="submit"
                        className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 "
                      >
                        Login
                      </button>
                    </div>
                  </form>

                  <div className="col-sm-12 p-0 text-left">
                    <h6 className="text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32">
                      Dont have account{" "}
                      <a href="/register" className="fw-700 ms-1">
                        Register
                      </a>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div
              className="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat"
              style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/login-bg.jpg)`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

function Error({ message, onClose }) {
  return (
    <Modal show={message !== ""} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Important!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
    </Modal>
  );
}

export default Login;
