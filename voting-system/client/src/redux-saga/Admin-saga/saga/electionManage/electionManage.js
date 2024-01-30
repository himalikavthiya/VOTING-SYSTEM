import {
    call,
    put
} from "redux-saga/effects"
import { get_election_data, post_election_data } from "../../create-election/api/api";
import { GET_ELECTION_FULLFILIED, GET_ELECTION_REJECTED, POST_ELECTION_FULLFILIED, POST_ELECTION_REJECTED } from "../../create-election/action/action";

 /* --------------------------- GET ELECTION MANAGE -------------------------- */
export function* handle_election_data(action) {
    try {
        const res = yield call(get_election_data, action)
        const data = res.data;
        const status = res.status;
        if (status === 200) {
            yield put({
                type: GET_ELECTION_FULLFILIED,
                data
            })
        } else {
            yield put({
                type: GET_ELECTION_REJECTED,
                data
            })
        }
    } catch (error) {
        yield put({
            type: GET_ELECTION_REJECTED,
            error
        })
    }
}

/* ---------------------------- POST ELECTION MANGE --------------------------- */
export function* handle_add_election_data(action) {
    try {
        const res = yield call(post_election_data, action);
        const data = res.data;
        const status = res.status;
        if (status === 200 || status === 201) {
            yield put({
                type: POST_ELECTION_FULLFILIED,
                data
            })
        } else {
            yield put({
                type: POST_ELECTION_REJECTED,
                data
            })
        }
    } catch (error) {
        yield put({
            type: POST_ELECTION_REJECTED,
            error
        })
    }

}