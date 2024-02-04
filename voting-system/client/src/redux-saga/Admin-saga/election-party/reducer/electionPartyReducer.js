import {
    DELETE_ELECTION_PARTY_FULLFILIED,
    DELETE_ELECTION_PARTY_PENDING,
    DELETE_ELECTION_PARTY_REJECTED,
    GET_ELECTION_PARTY_FULLFILIED,
    GET_ELECTION_PARTY_PENDING,
    GET_ELECTION_PARTY_REJECTED,
    POST_ELECTION_PARTY_FULLFILIED,
    POST_ELECTION_PARTY_PENDING,
    POST_ELECTION_PARTY_REJECTED
} from "../action/action";

const initialState = {
    PartyData: [],
    isLoading: false,
    isError: null,
}

const electionPartyReducer = (state = initialState, action) => {
       switch (action.type) {
     // get data
        case GET_ELECTION_PARTY_PENDING: {
            return {
                ...state,
                isLoading: true,
                isError: null,
            };
        }
        case GET_ELECTION_PARTY_FULLFILIED: {
            return {
                ...state,
                isLoading: false,
                PartyData: action.data.Data,
                isError: null,
            };
        }
        case GET_ELECTION_PARTY_REJECTED: {
            return {
                ...state,
                isLoading: false,
                isError: action.data,
            };
    }

    //post
        case POST_ELECTION_PARTY_PENDING: {
            return {
                ...state,
                isLoading: true,
            };
        };
        case POST_ELECTION_PARTY_FULLFILIED: {
            return {
                // ...state,
                PartyData: state.PartyData.concat(action.data.Data),
                //     isLoading: false,
                // isError: action.data,
            };
        };
        case POST_ELECTION_PARTY_REJECTED: {
            return {
                ...state,
                isLoading: true,
                isError: action.data,
            };
        };

    //delete
        case DELETE_ELECTION_PARTY_PENDING: {
            return {
                ...state,
                isLoading: true,
                isError: null,
            };
        }
        case DELETE_ELECTION_PARTY_FULLFILIED: {
            const deleteData = state.PartyData.filter((item) => item._id !== action.data)
            return {
                ...state,
                isLoading: false,
                PartyData: deleteData,
                isError: null,
            };
        }
        case DELETE_ELECTION_PARTY_REJECTED: {
            return {
                ...state,
                isLoading: false,
                isError: action.payload,
            };
        }
        default: {
            return {
                ...state,
            }
        }
    }
}

export default electionPartyReducer;