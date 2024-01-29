import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/admin-compo/Dashboard";
import Login from "./components/auth/Login";
import Sidebar from "./components/admin-compo/Sidebar"
import Cookies from "js-cookie";
import Userprofile from "./components/user-compo/Userprofile";
import Navbar from "./components/admin-compo/Navbar";
import CreateElection from "./components/admin-compo/CreateElection";
import ElectionParty from "./components/admin-compo/electionparty/ElectionParty";
import PartyConnection from "./components/admin-compo/PartyConnection";
import User from "./components/admin-compo/User";
import ElectionPartyForm from "./components/admin-compo/electionparty/ElectionPartyForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { GET_ELECTION_PARTY_PENDING, GET_ELECTION_PARTY_REJECTED } from "./redux-saga/Admin-saga/election-party/action/action";

function App() {
  const electionParty = useSelector((state) => state.electionPartyReducer.PartyData.Data);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
         await dispatch({ type: GET_ELECTION_PARTY_PENDING });
    } catch (error) {
        dispatch({ type: GET_ELECTION_PARTY_REJECTED, payload: error.message });
    }
  };
     useEffect(() => {
         fetchData();
    }, []);
    
  const role = Cookies.get("Role");

  if (!role || role == "") {
    return (
      <Routes>
        <Route path="/" element={<Login/>} />
      </Routes>
    );
  } else if (role === "admin") {
    return (
      <div className="admin-app">
        <Sidebar>
          <Navbar/>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-election" element={<CreateElection/>}/>
            <Route path="/election-party" element={<ElectionParty/>} />
            <Route path="/election-party-form" element={<ElectionPartyForm/>} />
            <Route path="/party-connection" element={<PartyConnection/>} />
            <Route path="/user" element={<User/>}/>
          </Routes>
        </Sidebar>
      </div>
    );
  } else if (role === "user") {
    return (
      <div className="user-app">
        <Routes>
           <Navbar/>
          <Route path="/user-profile" element={<Userprofile />} />
        </Routes>
      </div>
    );
  }
}

export default App;
