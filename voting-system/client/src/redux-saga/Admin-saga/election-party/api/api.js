import axios from "axios"
import {
    BASE_URL,
    GET_PARTY_LIST
} from "../../../constant"

export async function get_party_data() {
    return axios.get(BASE_URL + GET_PARTY_LIST)
        .then((res) => {
            console.log(res)
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

// export async function post_product_data(action) {
//     return axios.post(BASE_URL + POST_PRODUCT_API, action.dataObject)
//         .then((res) => {

//             const data = res.data
//             const status = res.status
//             return {
//                 data,
//                 status
//             }
//         }).catch((err) => {
//             console.log(err)
//         })
// }