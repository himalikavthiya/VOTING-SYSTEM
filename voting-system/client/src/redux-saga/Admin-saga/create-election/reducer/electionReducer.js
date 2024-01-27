import {
    GET_ELECTION_FULLFILIED,
    GET_ELECTION_PANDING,
    GET_ELECTION_REJECTED,
    POST_ELECTION_FULLFILIED,
    POST_ELECTION_PANDING,
    POST_ELECTION_REJECTED,
} from "../action/action";

const initialState = {
    PartyData: [],
    isLoading: false,
    isError: null,
}

const electionReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_ELECTION_PANDING: {
            return {
                ...state,
                isLoading: true,
                isError: null,
            };
        }
        case GET_ELECTION_FULLFILIED: {
            return {
                ...state,
                isLoading: false,
                PartyData: action.data,
                isError: null,
            };
        }
        case GET_ELECTION_REJECTED: {
            return {
                ...state,
                isLoading: false,
                isError: action.data,
            };
        }

        case POST_ELECTION_PANDING:
            return {
                ...state,
                isLoading: true,
            };
        case POST_ELECTION_FULLFILIED:
            return {
                ...state,
                isError: action.data,
            };
        case POST_ELECTION_REJECTED:
            return {
                ...state,
                isLoading: true,
                    PartyData: state.PartyData.concat(action.data),
                    isLoading: false,
            };
        default: {
            return {
                ...state,
            }
        }
    }
}

export default electionReducer;