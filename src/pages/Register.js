import React, { Fragment, useState } from "react";
import userApi from "../api/userApi";
import "mdi-icons/css/materialdesignicons.min.css";
import { Navigate, redirect } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "male",
    dateOfBirth: "1999-10-27",
  });

  const [firstName, setFirstName] = useState(formData.firstName);
  const [lastName, setLastName] = useState(formData.lastName);
  const [username, setUsername] = useState(formData.firstName);
  const [email, setEmail] = useState(formData.email);
  const [password, setPassword] = useState(formData.password);
  const [confirmPassword, setConfirmPassword] = useState(formData.password);
  const [gender, setGender] = useState(formData.gender);
  const [dateOfBirth, setDateOfBirth] = useState(formData.dateOfBirth);

  const handleSubmitForm = async (event) => {
    event.preventDefault(); // to prevent the default form submission behavior
    event.stopPropagation();

    await handleSubmit(); //checkAllValidIfHandleSubmit();
  };

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    console.log(formData);
    try {
      const user = await userApi.createUser(formData);
      console.log(user);
      setTimeout(() => {
        window.location.href = "http://localhost:5000/login";
      }, 4000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUsernameChange = (e) => {
    let username = e.target.value;
    let isValid = !validateEmptiness(username);
    if (isValid) {
      handleChange("username", username);
      setUsername(username);
    }
    checkInputValidity(isValid, e.target);
  };

  const handleFirstNameChange = (e) => {
    let firstName = e.target.value;
    let isValid = !validateEmptiness(firstName);
    if (isValid) {
      handleChange("firstName", firstName);
      setFirstName(firstName);
    }
    checkInputValidity(isValid, e.target);
  };

  const handleLastNameChange = (e) => {
    let lastName = e.target.value;
    let isValid = !validateEmptiness(lastName);
    if (isValid) {
      handleChange("lastName", lastName);
      setLastName(lastName);
    }
    checkInputValidity(isValid, e.target);
  };

  const handleEmailChange = (e) => {
    let email = e.target.value;
    let isValid = validateEmail(email);
    if (isValid) {
      handleChange("email", email);
      setEmail(email);
    }
    checkInputValidity(isValid, e.target);
  };

  const handlePasswordChange = (e) => {
    let password = e.target.value;
    let isValid = validatePassword(password);
    if (isValid) {
      handleChange("password", password);
      setPassword(password);
    }
    checkInputValidity(isValid, e.target);
  };

  const handleConfirmPasswordChange = (e) => {
    let confirmPassword = e.target.value;
    let isEqualToPassword = validateConfirmPassword(password, confirmPassword);
    if (isEqualToPassword) {
      setConfirmPassword(e.target.value);
    }
    checkInputValidity(isEqualToPassword, e.target);
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword;
  };

  const validateEmail = (email) => {
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateEmptiness = (name) => {
    return name === "";
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return passwordRegex.test(password);
  };

  const checkInputValidity = (isValid, inputTargeted) => {
    if (isValid) {
      inputTargeted.classList.remove("is-invalid");
      inputTargeted.classList.add("is-valid");
      inputTargeted.style.borderColor = "#10d876";
    } else {
      inputTargeted.classList.remove("is-valid");
      inputTargeted.classList.add("is-invalid");
      inputTargeted.style.borderColor = "#E50202";
    }
  };

  const checkAllValidIfHandleSubmit = async () => {
    let firstNameInput = document.getElementById("firstName");
    let lastNameInput = document.getElementById("lastName");
    let emailInput = document.getElementById("email");
    let passwordInput = document.getElementById("password");
    let confirmPasswordInput = document.getElementById("confirmPassword");
    let genderInput = document.getElementById("gender");
    let dateOfBirthInput = document.getElementById("dateOfBirth");

    checkInputValidity(firstNameInput.checkValidity(), firstNameInput);
    checkInputValidity(lastNameInput.checkValidity(), lastNameInput);
    checkInputValidity(validateEmail(emailInput.value), emailInput);
    checkInputValidity(validatePassword(passwordInput.value), passwordInput);
    if (validatePassword(passwordInput.value)) {
      checkInputValidity(
        validateConfirmPassword(
          passwordInput.value,
          confirmPasswordInput.value
        ),
        confirmPasswordInput
      );
    }
    checkInputValidity(genderInput.checkValidity(), genderInput);
    checkInputValidity(dateOfBirthInput.checkValidity(), dateOfBirthInput);

    if (
      firstNameInput.checkValidity() &&
      lastNameInput.checkValidity() &&
      validateEmail(emailInput.value) &&
      validatePassword(passwordInput.value) &&
      validateConfirmPassword(
        passwordInput.value,
        confirmPasswordInput.value
      ) &&
      genderInput.checkValidity() &&
      dateOfBirthInput.checkValidity()
    ) {
      handleSubmit();
    }
  };

  const styles = `select option:not(:first-child) {
      // background-color: lightblue;
      color: #212529!important;
    }
    .style2-select.colors option:not(:first-child) {
      //color: blue!important;
    }
    select option:(:first-child) {
      // background-color: lightblue;
      color: #adb5bd!important;
    }
    .style2-select.colors {
      color: #212529!important;
    }
    `;

  return (
    <Fragment>
      <div className="main-wrap">
        <div className="nav-header bg-transparent shadow-none border-0">
          <div className="nav-top w-100">
            <a href="/">
              <i className="feather-zap text-success display1-size me-2 ms-0"></i>
              <span className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0">
                Sociala.{" "}
              </span>
            </a>
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
                {/* <h2 className="fw-700 display1-size display2-md-size mb-4">
                  Create <br />
                  your account
                </h2> */}
                <form onSubmit={handleSubmitForm} noValidate>
                  <div className="d-flex justify-content-between mb-3">
                    <div className="form-group icon-input col-sm-5 col-md-6">
                      <i className="font-sm ti-user text-grey-500 pe-0" />
                      <input
                        id="firstName"
                        type="text"
                        className="form-control style2-input ps-5  text-grey-900 font-xsss fw-600"
                        placeholder="First name"
                        style={{ width: "95%" }}
                        defaultValue={firstName}
                        onChange={(e) => handleFirstNameChange(e)}
                        required
                      />
                    </div>
                    <div className="form-group icon-input col-sm-5 col-md-6 me-2">
                      <i className="font-sm ti-user text-grey-500 pe-0" />
                      <input
                        id="lastName"
                        type="text"
                        className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                        placeholder="Last name"
                        style={{ width: "100%" }}
                        defaultValue={lastName}
                        onChange={(e) => handleLastNameChange(e)}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group icon-input mb-3">
                    <i className="font-sm ti-face-smile text-grey-500 pe-0" />
                    <input
                      id="username"
                      className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                      placeholder="Your username"
                      defaultValue={username}
                      onChange={(e) => handleUsernameChange(e)}
                      required
                    />
                    <div className="invalid-feedback" id="usernameError">
                      Invalid username
                    </div>
                  </div>
                  <div className="form-group icon-input mb-3">
                    <i className="font-sm ti-email text-grey-500 pe-0" />
                    <input
                      id="email"
                      type="email"
                      className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                      placeholder="Your Email Address"
                      defaultValue={email}
                      onChange={(e) => handleEmailChange(e)}
                      required
                    />
                    <div className="invalid-feedback" id="emailError">
                      Invalid email
                    </div>
                  </div>
                  <div className="form-group icon-input mb-3">
                    <i className="font-sm ti-lock text-grey-500 pe-0" />
                    <input
                      id="password"
                      type="password"
                      className="style2-input ps-5 form-control text-grey-900 font-xss ls-3"
                      autoComplete="on"
                      placeholder="Password"
                      defaultValue={password}
                      onChange={(e) => handlePasswordChange(e)}
                      required
                    />
                    <div className="invalid-feedback">
                      Password should have at least on uppercase, one number and
                      6 characters
                    </div>
                  </div>
                  <div className="form-group icon-input mb-3">
                    <input
                      id="confirmPassword"
                      type="password"
                      autoComplete="on"
                      className="form-control style2-input ps-5 text-grey-900 font-xss ls-3"
                      placeholder="Confirm Password"
                      onChange={(e) => handleConfirmPasswordChange(e)}
                      defaultValue={confirmPassword}
                      required
                    />
                    <div className="invalid-feedback">
                      Password and confirmPassword should be identic
                    </div>
                    <i className="font-sm ti-lock text-grey-500 pe-0" />
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <div className="form-group icon-input col-6">
                      <select
                        id="gender"
                        className="style2-select form-select ps-5 text-grey-900 font-xss ls-3 pt-0 colors"
                        style={{ width: "95%" }}
                        onChange={(e) => handleChange("gender", e.target.value)}
                        required
                        defaultValue={gender || "male"}
                      >
                        <option disabled value="">
                          Select your gender
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="others">others</option>
                      </select>
                      <i
                        className="font-sm mdi mdi-gender-transgender text-grey-500 colors"
                        style={{ top: "12px" }}
                      />
                    </div>
                    <div className="form-group icon-input mb-3 col-6">
                      <input
                        id="dateOfBirth"
                        type="Date"
                        min="1920-01-01"
                        max="2010-01-01"
                        defaultValue={dateOfBirth || "1999-10-27"}
                        className="style2-input ps-5 form-control text-grey-900 font-xss ls-3"
                        onChange={(e) =>
                          handleChange("dateOfBirth", e.target.value)
                        }
                        required
                      />
                      <i
                        className="font-sm mdi mdi-cake-variant text-grey-500 pe-0"
                        style={{ top: "12px" }}
                      />
                    </div>
                  </div>
                  <div className="form-check text-left mb-3">
                    <input
                      type="checkbox"
                      className="form-check-input mt-2"
                      id="exampleCheck2"
                    />
                    <label className="form-check-label font-xsss text-grey-500">
                      Accept Term and Conditions
                    </label>
                  </div>
                  <div className="col-sm-12 p-0 text-left">
                    <div className="form-group mb-1">
                      <button
                        href="/register"
                        type="submit"
                        className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 "
                      >
                        Register now
                      </button>
                    </div>
                    <h6 className="text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32">
                      Already have account{" "}
                      <a href="/login" className="fw-700 ms-1">
                        Login
                      </a>
                    </h6>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
