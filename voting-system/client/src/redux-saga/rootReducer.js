import {
    combineReducers
} from "redux";
import electionReducer from "./Admin-saga/create-election/reducer/electionReducer";
import electionPartyReducer from "./Admin-saga/election-party/reducer/electionPartyReducer";
import userReducer from "./Admin-saga/create-user/reducer/userReducer";
import PartyConnectReducer  from "./Admin-saga/party-connection/reducer/partyConnectReducer";

const rootReducer = combineReducers({
    electionReducer,
    electionPartyReducer,
    userReducer,
    PartyConnectReducer
})

export default rootReducer;