import {  Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Login from "./components/auth/Login";
import Sidebar from "./components/Sidebar";
import About from "./components/About";
import Cookies from 'js-cookie';
function App() {
  
     
       const role = ""
      //  Cookies.get("role");

  if (!role || role == "") {
    console.log("role not found");
    return (
      <Routes>
        {/* <Route path="*" element={<UserLogin />} /> */}
        <Route path="/" element={<Login />} />
      </Routes>
    );
  } else if (role === "Admin") {
    return (
      <div className="admin-app">
          <Sidebar>
        <Routes>
           {/* <Route path="/login" element={<Login />} /> */}
           {/* <Route path="/" element={<Dashboard />} /> */}
           <Route path="/dashboard" element={<Dashboard />} />
           <Route path="/about" element={<About />} />
         </Routes>
       </Sidebar>
      
      </div>
    );
  } else if (role === "User") {
    return (
      <div className="user-app">
        <Routes>
           {/* <Route path="/" element={<UserVoting />} /> */}
           {/* <Route path="*" element={<UserVoting />} /> */}
       {/* <Route path="/profile" element={<UserProfile />} /> */}
        </Routes>
      </div>
    );
  }
}

export default App;
