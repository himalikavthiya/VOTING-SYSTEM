import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/admin-compo/Dashboard";
import Login from "./components/auth/Login";
import Sidebar from "./components/admin-compo/Sidebar";
import Cookies from "js-cookie";
import Userprofile from "./components/user-compo/Userprofile";
import Navbar from "./components/admin-compo/Navbar";
import ElectionParty from "./components/admin-compo/electionparty/ElectionParty";
import PartyConnection from "./components/admin-compo/PartyConnection";
import ElectionPartyForm from "./components/admin-compo/electionparty/ElectionPartyForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { GET_ELECTION_PARTY_PENDING } from "./redux-saga/Admin-saga/election-party/action/action";
import CreateElection from "./components/admin-compo/election/CreateElection";
import ElectionForm from "./components/admin-compo/election/ElectionForm";
import { GET_ELECTION_PENDING } from "./redux-saga/Admin-saga/create-election/action/action";
import UserForm from "./components/admin-compo/createUser/UserForm";
import User from "./components/admin-compo/createUser/User";
import { GET_USER_PENDING } from "./redux-saga/Admin-saga/create-user/action/action";

function App() {
  const dispatch = useDispatch();
  const election = useSelector((state) => state.electionReducer);
  const electionParty = useSelector((state) => state.electionPartyReducer);

  useEffect(() => {
    dispatch({ type: GET_ELECTION_PENDING });
    dispatch({ type: GET_ELECTION_PARTY_PENDING });
    dispatch({ type: GET_USER_PENDING });
  }, []);
  
  const role = Cookies.get("Role");
  if (!role || role == "") {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    );
  } else if (role === "admin") {
    return (
      <div className="admin-app">
        <Sidebar>
          <Navbar />
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-election" element={<CreateElection />} />
            <Route path="/election-form" element={<ElectionForm />} />
            <Route path="/election-party" element={<ElectionParty />} />
            <Route path="/user" element={<User />} />
            <Route path="/user-form" element={<UserForm />} />
            <Route
              path="/election-party-form"
              element={<ElectionPartyForm />}
            />
            <Route path="/party-connection" element={<PartyConnection />} />
          </Routes>
        </Sidebar>
      </div>
    );
  } else if (role === "user") {
    return (
      <div className="user-app">
        <Routes>
          <Navbar />
          <Route path="/user-profile" element={<Userprofile />} />
        </Routes>
      </div>
    );
  }
}

export default App;
