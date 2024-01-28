import {
  GET_ELECTION_PENDING,
  POST_ELECTION_PENDING,
} from "../../create-election/action/action";
import {
  GET_ELECTION_PARTY_PENDING,
  POST_ELECTION_PARTY_PENDING,
} from "../../election-party/action/action";
import {
  handle_add_election_data,
  handle_election_data,
} from "../electionManage/electionManage";
import {
  handle_add_party_data,
  handle_party_data,
} from "../electionPartyManage/manageParty";
import { takeLatest } from "redux-saga/effects";

/* ---------------------- GET ELECTION FUN IN ROOTSAGA ---------------------- */
export function* handle_get_election_Saga() {
  yield takeLatest(GET_ELECTION_PENDING, handle_election_data);
}
/* ---------------------- POST ELECTION FUN IN ROOTSAGA ---------------------- */

export function* handle_post_election_Saga() {
  yield takeLatest(POST_ELECTION_PENDING, handle_add_election_data);
}

/* ------------------------ GET PARTY FUN IN ROOTSAGA ----------------------- */
export function* handle_get_party_Saga() {
  yield takeLatest(GET_ELECTION_PARTY_PENDING, handle_party_data);
}

/* ----------------------- POST PARTY FUN IN ROOTSAGA ----------------------- */
export function* handle_post_party_Saga() {
  yield takeLatest(POST_ELECTION_PARTY_PENDING, handle_add_party_data);
}
