import axios from "axios";
import { ADD_USER, BASE_URL, DELETE_USER, GET_USER_LIST } from "../../../constant";

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
/* --------------------------- user delete api -------------------------- */
export async function delete_user_data(action) {
  return axios
    .delete(BASE_URL + DELETE_USER + action.payload)
    .then((res) => {
      const data = action.payload;
      const status = res.status;
      return {
        data,
        status,
      };
    })
    .catch((err) => {
      console.log(err, "res from 51 line no");
    });
}
