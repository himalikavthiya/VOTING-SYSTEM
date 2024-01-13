import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/admin-compo/Dashboard";
import Login from "./components/auth/Login";
import Sidebar from "./components/Sidebar";
import Cookies from "js-cookie";
import Userprofile from "./components/user-compo/Userprofile";
import Navbar from "./components/admin-compo/Navbar";
import CreateElection from "./components/admin-compo/CreateElection";
import ElectionParty from "./components/admin-compo/ElectionParty";
function App() {
  const role = Cookies.get("role");

  if (!role || role == "") {
    return (
      <Routes>
        <Route path="/" element={<Login/>} />
      </Routes>
    );
  } else if (role === "Admin") {
    return (
      <div className="admin-app">
        <Sidebar>
          <Navbar/>
          <Routes>
            <Route path="/create-election" element={<CreateElection/>}/>
            <Route path="/election-party" element={<ElectionParty/>} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Sidebar>
      </div>
    );
  } else if (role === "User") {
    return (
      <div className="user-app">
        <Routes>
          <Route path="/user-profile" element={<Userprofile />} />
        </Routes>
      </div>
    );
  }
}

export default App;
