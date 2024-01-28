import {
    call,
    put
} from "redux-saga/effects"
import {
    GET_ELECTION_PARTY_FULLFILIED,
    GET_ELECTION_PARTY_REJECTED,
    POST_ELECTION_PARTY_FULLFILIED,
    POST_ELECTION_PARTY_REJECTED
} from "../../election-party/action/action"
import {
    get_party_data,
    post_party_data
} from "../../election-party/api/api"

// GET PARTY MANAGE 
export function* handle_party_data(action) {
    try {
        const res = yield call(get_party_data, action)
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

// post party manage
export function* handle_add_party_data(action) {
    try {
        const res = yield call(post_party_data, action);
        const data = res.data;
          console.log(data);
        const status = res.status;
        if (status === 200 || status === 201) {
            yield put({
                type: POST_ELECTION_PARTY_FULLFILIED,
                data
            })
        } else {
            yield put({
                type: POST_ELECTION_PARTY_REJECTED,
                data
            })
          
        }
    } catch (error) {
        yield put({
            type: POST_ELECTION_PARTY_REJECTED,
            error
        })
    }

}