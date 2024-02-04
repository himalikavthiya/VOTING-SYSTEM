import axios from "axios";
import {
  ADD_PARTY,
  BASE_URL,
  DELETE_PARTY,
  GET_PARTY_LIST,
} from "../../../constant";

/* ------------------------- get list of party data ------------------------- */
export async function get_party_data() {
  return axios
    .get(BASE_URL + GET_PARTY_LIST)
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

/* ----------------------------- add party data ----------------------------- */
export async function post_party_data(action) {
  return axios
    .post(BASE_URL + ADD_PARTY, action.payload)
    .then((res) => {
      console.log(action.payload);
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

/* ---------------------------- delete party data --------------------------- */
export async function delete_party_data(action) {
  return axios
    .delete(BASE_URL + DELETE_PARTY + action.payload)
    .then((res) => {
      const data = action.payload;
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
