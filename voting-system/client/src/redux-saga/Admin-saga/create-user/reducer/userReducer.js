import { DELETE_USER_FULLFILIED, DELETE_USER_PENDING, DELETE_USER_REJECTED, GET_USER_FULLFILIED, GET_USER_PENDING, GET_USER_REJECTED, POST_USER_FULLFILIED, POST_USER_PENDING, POST_USER_REJECTED } from "../action/action";


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
                userData: action.data,
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
            //delete
            case DELETE_USER_PENDING: {
                return {
                  ...state,
                  isLoading: true,
                  isError: null,
                };
              }
              case DELETE_USER_FULLFILIED: {
                const deleteData = state.userData.filter((item) => item._id !== action.data);
                return {
                  ...state,
                  isLoading: false,
                  userData: deleteData,
                  isError: null,
                };
              }
              case DELETE_USER_REJECTED: {
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

export default userReducer;