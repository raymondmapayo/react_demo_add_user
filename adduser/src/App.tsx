import UserList from "./components/UserList";
import { Routes, Route } from "react-router-dom";
import EditUser from "./components/EditUser";
import AddUser from "./components/AddUser"; // Corrected component name to AddUser
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  return (
   
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="userlist" element={<UserList />} />
        <Route path="/add" element={<AddUser />} />
        <Route path="/edit/:id" element={<EditUser />} />
      </Routes>
 
  );
};

export default App;
