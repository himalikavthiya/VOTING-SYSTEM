import {
    GET_ELECTION_PARTY_PANDING
} from "../../election-party/action/action";
import {
    handle_party_data
} from "../partyManage/manageParty";
import {
    takeLatest
} from "redux-saga/effects";
//GET ELECTION FUN IN ROOTSAGA

export function* handle_get_party_Saga() {
    yield takeLatest(GET_ELECTION_PARTY_PANDING, handle_party_data)
}