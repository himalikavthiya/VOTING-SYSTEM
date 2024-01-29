import {
    combineReducers
} from "redux";
import electionReducer from "./Admin-saga/create-election/reducer/electionReducer";
import electionPartyReducer from "./Admin-saga/election-party/reducer/electionPartyReducer";
import userReducer from "./Admin-saga/create-user/reducer/userReducer";

const rootReducer = combineReducers({
    electionReducer,
    electionPartyReducer,
    userReducer
})

export default rootReducer;