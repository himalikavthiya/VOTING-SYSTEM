import axios from "axios";
import {
  ADD_PARTY_CONNECTION,
  BASE_URL,
  GET_PARTY_CONNECTION_LIST,
} from "../../../constant";

/* ------------------------- get election data ------------------------- */
export async function get_partyConnect_data() {
  return axios
    .get(BASE_URL + GET_PARTY_CONNECTION_LIST)
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
export async function post_partyConnect_data(action) {
  console.log(action, "from api election");
  return axios
    .post(BASE_URL + ADD_PARTY_CONNECTION, action.payload)
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
