import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavbarPage from './NavbarPage';
import { faTrash,
faPencil,
faPlusCircle
 } from "@fortawesome/free-solid-svg-icons";
 import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const UserList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/login")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

function handleDeleteItem(id: string) {
    axios.delete(`http://localhost:8081/login/${id}`).then((response) => {
        console.log("response:" + response.data);
        window.location.reload();
    });
}

 return (
    <>
      {/* Include the NavbarPage component here */}
      <NavbarPage />

      {/* Rest of the UserList component */}
      <div className="container mt-3">
        <div className="row">
          <div className="col-sm-12">
            <h1></h1>
            <Link className="btn btn-success btn-sm mb-3" to="/add">
              Add User &nbsp;
              <FontAwesomeIcon icon={faPlusCircle} />
            </Link>
            <table className="table table-hover table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Status</th>
                  <th>Birthdate</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((data, key) => (
                  <tr key={key}>
                    <td>{data["id"]}</td>
                    <td>{data["name"]}</td>
                    <td>{data["email"]}</td>
                    <td>{data["gender"]}</td>
                    <td>{data["status"]}</td>
                    <td>{data["bday"]}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteItem(data["id"])}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                        &nbsp;Delete
                      </button>
                      &nbsp;
                      <Link
                        className="btn btn-warning btn-sm"
                        to={`/edit/${data["id"]}`}
                      >
                        <FontAwesomeIcon icon={faPencil} />
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserList;