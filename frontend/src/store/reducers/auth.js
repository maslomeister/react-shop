import { AUTH_USER_REQUEST, AUTH_USER_SUCCESS, AUTH_USER_ERROR, AUTH_USER_RESET, LOGOUT_USER } from "../actions/action-types/auth";

let initialState = {
  loading: false,
  authenticated: false,
  userRole: "",
  authToken: "",
  error: "",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER_REQUEST:
      return {
        ...state,
        authLoading: true,
        error: "",
      };
    case AUTH_USER_SUCCESS:
      return {
        ...state,
        authLoading: false,
        authenticated: true,
        authToken: action.payload.authToken,
        userRole: action.payload.userRole,
      };
    case AUTH_USER_ERROR:
      return {
        ...state,
        authLoading: false,
        authenticated: false,
        authToken: "",
        error: action.payload.error,
      };
    case LOGOUT_USER:
      return {
        ...state,
        authenticated: false,
        authToken: "",
      };
    case AUTH_USER_RESET:
      return {
        ...state,
        authLoading: false,
        error: "",
      };
    default:
      return state;
  }
}

export default reducer;
