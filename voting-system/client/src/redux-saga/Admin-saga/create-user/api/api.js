import axios from "axios";
import { ADD_USER, BASE_URL, GET_USER_LIST } from "../../../constant";

/* -------------------------- get list of user data ------------------------- */
export async function get_user_data() {
  return axios
    .get(BASE_URL + GET_USER_LIST)
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

/* ----------------------------- add user data ----------------------------- */
export async function post_user_data(action) {
  return axios
    .post(BASE_URL + ADD_USER, action.payload)
    .then((res) => {
      console.log(res);
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
