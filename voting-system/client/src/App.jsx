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
import {
  GET_ELECTION_PARTY_PENDING,
  GET_ELECTION_PARTY_REJECTED,
} from "./redux-saga/Admin-saga/election-party/action/action";
import CreateElection from "./components/admin-compo/election/CreateElection";
import ElectionForm from "./components/admin-compo/election/ElectionForm";
import { GET_ELECTION_PENDING, GET_ELECTION_REJECTED } from "./redux-saga/Admin-saga/create-election/action/action";
import { BASE_URL, GET_ELECTION_LIST, GET_PARTY_LIST } from "./redux-saga/constant";
import axios from "axios";
import UserForm from "./components/admin-compo/createUser/UserForm";
import User from "./components/admin-compo/createUser/User";

function App() {
  // const dispatch = useDispatch();
  // const election = useSelector((state) => state.electionReducer)
  // const electionParty = useSelector((state) => state.electionPartyReducer)


  // async function get_party_data() {
  //   await axios.get("http://52.65.47.180:4000/v1/pList").then((res) => {
  //     console.log(res);
  //   })
  // }


  // async function get_election_data() {
  //   await axios.get("http://52.65.47.180:4000/v1/elelist").then((res) => {
  //     console.log(res);
  //   })
  // }


  // useEffect( () => {
  //    dispatch({ type: GET_ELECTION_PENDING });
  //    dispatch({ type: GET_ELECTION_PARTY_PENDING });
  //   // await get_election_data()
  //   // await get_party_data();
  // }, []);
  // console.log(election, electionParty);
  const electionParty = useSelector(
    (state) => state.electionPartyReducer.PartyData.Data
  );
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

  // console.log("electionParty", election, electionParty);


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
            <Route path="/user-form" element={<UserForm/>}/>
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
