import axios from "axios"
import {
    ADD_ELECTION,
    BASE_URL,
    GET_ELECTION_LIST,
} from "../../../constant"

/* ------------------------- get election data ------------------------- */
export async function get_election_data() {
    return axios.get(BASE_URL + GET_ELECTION_LIST)
        .then((res) => {
            const data = res.data
            const status = res.status
            return {
                data,
                status
            }
        }).catch((err) => {
            console.log(err)
        })
}

/* ----------------------------- add election data ----------------------------- */
export async function post_election_data(action) {
    // console.log(action, "from api election")
    return axios.post(BASE_URL + ADD_ELECTION, action.payload)
        .then((res) => {
            // console.log(res, "res------election---------");

            const data = res.data
            const status = res.status
            return {
                data,
                status
            }
        }).catch((err) => {
            console.log(err)
        })
}