import axios from "axios";
import {
  ADD_ELECTION,
  BASE_URL,
  DELETE_ELECTION,
  GET_ELECTION_LIST,
  UPDATE_ELECTION,
} from "../../../constant";

/* ------------------------- get election data ------------------------- */
export async function get_election_data() {
  return axios
    .get(BASE_URL + GET_ELECTION_LIST)
    .then((res) => {
      const data = res.data;
      const status = res.status;
      return {
        data,
        status,
      };
    })
    .catch((err) => {
      console.log(err);
    });
}

/* ----------------------------- add election data ----------------------------- */
export async function post_election_data(action) {
  console.log(action, "from api election");
  return axios
    .post(BASE_URL + ADD_ELECTION, action.payload)
    .then((res) => {
      // console.log(res, "res------election---------");

      const data = res.data;
      const status = res.status;
      return {
        data,
        status,
      };
    })
    .catch((err) => {
      console.log(err);
    });
}
/* --------------------------- election delete api -------------------------- */
export async function delete_election_data(action) {
  return axios
    .delete(BASE_URL + DELETE_ELECTION + action.payload)
    .then((res) => {
      const data = action.payload;
      const status = res.status;
      return {
        data,
        status,
      };
    })
    .catch((err) => {
      console.log(err, "res from 59 line no");
    });
}

/* --------------------------- election update api -------------------------- */
export async function update_election_data(action) {
  console.log(action.payload._id, "sdssdsddsdsdsd")
  return axios
    .put(BASE_URL + UPDATE_ELECTION + action.payload._id, action.payload)
    .then((res) => {
      const data = res.data;
      const status = res.status;
      return {
        data,
        status
      };
    })
    .catch((err) => {
      console.log(err);
    });
}