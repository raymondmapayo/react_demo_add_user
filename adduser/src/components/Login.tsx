import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid Email Address.")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters.")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      axios
        .post("http://localhost:8081/login", values)
        .then((response) => {
          if (response.data.success) {
            localStorage.setItem("logged", "true");
            localStorage.setItem("username", values.email); // Store the username
            setIsLoggedIn(true);
            window.location.href = "/UserList";
          } else {
            alert("Invalid login credentials. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Error logging in:", error);
          alert("Error logging in. Please try again.");
        });
    },
  });

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div
            className="card p-4"
            style={{
              background: "linear-gradient(to bottom right, #d0ffae, #34ebe9)",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.10)",
              borderRadius: "10px",
            }}
          >
            <h2 className="text-center mb-3">Login</h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter Email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <div className="text-danger mt-2">{formik.errors.email}</div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FontAwesomeIcon icon={faLock} />
                  </span>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter Password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                </div>
                {formik.touched.password && formik.errors.password && (
                  <div className="text-danger mt-2">
                    {formik.errors.password}
                  </div>
                )}
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </form>
          </div>
          <div className="text-center mt-3">
            <button
              type="submit"
              style={{
                backgroundColor: "green",
                color: "white",
                borderColor: "green",
              }}
              className="btn"
              onClick={() => {
                window.location.href = "/register";
              }}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;