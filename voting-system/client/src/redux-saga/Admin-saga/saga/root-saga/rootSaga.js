import {
  DELETE_ELECTION_PENDING,
  GET_ELECTION_PENDING,
  POST_ELECTION_PENDING,
} from "../../create-election/action/action";
import { GET_USER_PENDING, POST_USER_PENDING } from "../../create-user/action/action";
import {
  DELETE_ELECTION_PARTY_PENDING,
  GET_ELECTION_PARTY_PENDING,
  POST_ELECTION_PARTY_PENDING,
} from "../../election-party/action/action";
import {
  handle_add_election_data,
  handle_delete_election_data,
  handle_election_data,
} from "../electionManage/electionManage";
import {
  handle_add_party_data,
  handle_delete_party_data,
  handle_get_party_data,
  }
  from "../electionPartyManage/manageParty";
import { takeLatest } from "redux-saga/effects";
import { handle_add_user_data, handle_user_data } from "../userManage/userManage";

/* ---------------------- GET ELECTION FUN IN ROOTSAGA ---------------------- */
export function* handle_get_election_saga() {
  yield takeLatest(GET_ELECTION_PENDING, handle_election_data);
}
/* ---------------------- POST ELECTION FUN IN ROOTSAGA ---------------------- */

export function* handle_post_election_saga() {
  yield takeLatest(POST_ELECTION_PENDING, handle_add_election_data);
}

/* --------------------------- delete  saga -------------------------- */
export function* handle_delete_election_saga() {
  yield takeLatest(DELETE_ELECTION_PENDING, handle_delete_election_data);
}
/* ------------------------ GET PARTY FUN IN ROOTSAGA ----------------------- */
export function* handle_get_party_saga() {
  yield takeLatest(GET_ELECTION_PARTY_PENDING, handle_get_party_data);
}
/* ----------------------- POST PARTY FUN IN ROOTSAGA ----------------------- */
export function* handle_post_party_saga() {
  yield takeLatest(POST_ELECTION_PARTY_PENDING, handle_add_party_data);
}
/* --------------------------- delete  saga -------------------------- */
export function* handle_delete_paty_saga() {
  yield takeLatest(DELETE_ELECTION_PARTY_PENDING, handle_delete_party_data);
}
/* -------------------------- GET USER FUN IN ROOTSAGA -------------------------- */
export function* handle_get_user_saga(){
  yield takeLatest(GET_USER_PENDING,handle_user_data);
}
/* ------------------------ POST USER FUN IN ROOTSAGA ----------------------- */
export function* handle_post_user_saga(){
  yield takeLatest(POST_USER_PENDING,handle_add_user_data);
}

