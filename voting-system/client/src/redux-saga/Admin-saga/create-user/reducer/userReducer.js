import { GET_USER_FULLFILIED, GET_USER_PENDING, GET_USER_REJECTED, POST_USER_FULLFILIED, POST_USER_PENDING, POST_USER_REJECTED } from "../action/action";


const initialState = {
    userData: [],
    isLoading: false,
    isError: null,
}

const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_USER_PENDING: {
            return {
                ...state,
                isLoading: true,
                isError: null,
            };
        }
        case GET_USER_FULLFILIED: {
            return {
                ...state,
                isLoading: false,
                PartyData: action.data,
                isError: null,
            };
        }
        case GET_USER_REJECTED: {
            return {
                ...state,
                isLoading: false,
                isError: action.data,
            };
        }
//POST
        case POST_USER_PENDING:
            return {
                ...state,
                isLoading: true,
            };
        case POST_USER_FULLFILIED:
            return {
                ...state,
                userData: state.userData.concat(action.data),
                isError: action.data,
            };
        case POST_USER_REJECTED:
            return {
                ...state,
                isLoading: true,
                    isLoading: false,
            };
        default: {
            return {
                ...state,
            }
        }
    }
}

export default userReducer;