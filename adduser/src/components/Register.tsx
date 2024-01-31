import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faVenusMars,
  faHeart,
  faBirthdayCake,
} from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      gender: "",
      password: "",
      confirmPassword: "",
      status: "",
      bday: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Name must be at least 3 characters.")
        .required("Name is required."),
      email: Yup.string()
        .email("Invalid Email Address.")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters.")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .min(6, "Password must be at least 6 characters.")
        .required("Confirm password is required"),
      gender: Yup.string().required("Gender is required"),
      status: Yup.string().required("Civil status is required"),
      bday: Yup.date().required("Birth date is required").nullable(),
    }),
    onSubmit: (values) => {
       axios
        .post("http://localhost:8081/add_register", values)  // Replace with your actual registration API endpoint
        .then((response) => {
          alert("Registration successful!");
          // Additional actions after successful registration, if needed
          window.location.href = "/";
        })
        .catch((error) => {
          console.error("Error registering user:", error);
          alert("Error registering user. Please try again.");
        });
    },
  });

  return (
    <div
      className="container"
      style={{
        background: "linear-gradient(to bottom right, #d0ffae, #34ebe9)",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        border: "1px solid #FFFF00",
      }}
    >
      <div className="row justify-content-center">
        <div className="col-lg-9">
          <h2
            className="text-center mb-5"
            style={{
              fontFamily: "Arial, sans-serif",
              display: "inline-block",
              padding: "0 15px",
            }}
          >
            Register Form
          </h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-floating mb-4">
              <div className="input-group">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faUser} />
                </span>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  placeholder="Enter Name"
                />
              </div>
              {formik.touched.name && formik.errors.name && (
                <div className="text-danger mt-2">{formik.errors.name}</div>
              )}
            </div>

            <div className="form-floating mb-4">
              <div className="input-group">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  placeholder="Enter Email"
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <div className="text-danger mt-2">{formik.errors.email}</div>
              )}
            </div>

            <div className="form-floating mb-4">
              <div className="input-group">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faLock} />
                </span>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  placeholder="Enter Password"
                />
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="text-danger mt-2">{formik.errors.password}</div>
              )}
            </div>

            <div className="form-floating mb-4">
              <div className="input-group">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faLock} />
                </span>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  placeholder="Confirm Password"
                />
              </div>
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <div className="text-danger mt-2">
                    {formik.errors.confirmPassword}
                  </div>
                )}
            </div>

            <div className="form-floating mb-4">
              <div className="input-group">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faVenusMars} />
                </span>
                <select
                  id="gender"
                  name="gender"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.gender}
                >
                  <option value="" label="Select Gender" />
                  <option value="male" label="Male" />
                  <option value="female" label="Female" />
                  <option value="other" label="Other" />
                </select>
              </div>
              {formik.touched.gender && formik.errors.gender && (
                <div className="text-danger mt-2">{formik.errors.gender}</div>
              )}
            </div>

            <div className="form-floating mb-4">
              <div className="input-group">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faHeart} />
                </span>
                <select
                  id="status"
                  name="status"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.status}
                >
                  <option value="" label="Select Civil Status" />
                  <option value="single" label="Single" />
                  <option value="married" label="Married" />
                  <option value="divorced" label="Divorced" />
                  <option value="widowed" label="Widowed" />
                </select>
              </div>
              {formik.touched.status && formik.errors.status && (
                <div className="text-danger mt-2">
                  {formik.errors.status}
                </div>
              )}
            </div>

            <div className="form-floating mb-4">
              <div className="input-group">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faBirthdayCake} />
                </span>
                <input
                  type="date"
                  id="bday"
                  name="bday"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.bday}
                />
              </div>
              {formik.touched.bday && formik.errors.bday && (
                <div className="text-danger mt-2">
                  {formik.errors.bday}
                </div>
              )}
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary btn-lg">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
