import {
    GET_ELECTION_PARTY_PANDING,
    POST_ELECTION_PARTY_PANDING
} from "../../election-party/action/action";
import {
    handle_add_party_data,
    handle_party_data
} from "../partyManage/manageParty";
import {
    takeLatest
} from "redux-saga/effects";

//GET ELECTION FUN IN ROOTSAGA
export function* handle_get_party_Saga() {
    yield takeLatest(GET_ELECTION_PARTY_PANDING, handle_party_data)
}

//POST ELECTION FUN IN ROOTSAGA
export function* handle_post_party_Saga() {
    yield takeLatest(POST_ELECTION_PARTY_PANDING, handle_add_party_data)
}