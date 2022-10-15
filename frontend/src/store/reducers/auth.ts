import { AUTH_USER_REQUEST, AUTH_USER_SUCCESS, AUTH_USER_ERROR, AUTH_LOGOUT_USER } from "../actions/action-types/auth";
import { Reducer } from "redux";

interface IInitialState {
  loading: boolean;
  authenticated: boolean;
  userRole: string;
  isUser: boolean;
  userName: string;
  authToken: string;
  error: string;
}

let initialState = {
  loading: false,
  authenticated: false,
  userRole: "",
  isUser: false,
  userName: "",
  authToken: "",
  error: "",
};

const reducer: Reducer<IInitialState, TAuthActions> = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case AUTH_USER_SUCCESS:
      let isUser = false;

      if (action.payload.userRole === "user") {
        isUser = true;
      }

      return {
        ...state,
        loading: false,
        authenticated: true,
        authToken: action.payload.authToken,
        userRole: action.payload.userRole,
        userName: action.payload.name,
        isUser,
      };
    case AUTH_USER_ERROR:
      return {
        ...state,
        loading: false,
        authenticated: false,
        authToken: "",
        error: action.payload.error,
      };
    case AUTH_LOGOUT_USER:
      return {
        ...state,
        authenticated: false,
        authToken: "",
      };
    // case AUTH_USER_RESET:
    //   return {
    //     ...state,
    //     authLoading: false,
    //     error: "",
    //   };
    default:
      return state;
  }
};

export default reducer;
