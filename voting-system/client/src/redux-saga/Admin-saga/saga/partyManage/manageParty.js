import {
    call,
    put
} from "redux-saga/effects"
import {
    GET_ELECTION_PARTY_FULLFILIED,
    GET_ELECTION_PARTY_REJECTED
} from "../../election-party/action/action"
import {
    get_party_data
} from "../../election-party/api/api"

// GET PARTY MANAGE 
export function* handle_party_data(action) {
    try {
        const res = yield call(get_party_data, action)
        console.log(res)
        const data = res.data;
        const status = res.status;
        if (status === 200) {
            yield put({
                type: GET_ELECTION_PARTY_FULLFILIED,
                data
            })
        } else {
            yield put({
                type: GET_ELECTION_PARTY_REJECTED,
                data
            })
        }
    } catch (error) {
        yield put({
            type: GET_ELECTION_PARTY_REJECTED,
            error
        })
    }
}