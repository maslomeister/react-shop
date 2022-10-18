import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  AUTH_CLEAR_ERROR,
  AUTH_LOGOUT_USER,
  AUTH_RESET_STATE,
} from "../actions/action-types/auth";
import { Reducer } from "redux";

export interface IAuthInitialState {
  loginLoading: boolean;
  registerLoading: boolean;
  authenticated: boolean;
  userRole: string;
  isUser: boolean;
  userName: string;
  authToken: string;
  loginError: string;
  registerError: string;
}

export const authInitialState = {
  loginLoading: false,
  registerLoading: false,
  authenticated: false,
  userRole: "",
  isUser: false,
  userName: "",
  authToken: "",
  loginError: "",
  registerError: "",
};

export const authReducer: Reducer<IAuthInitialState, TAuthActions> = (state = authInitialState, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        loginLoading: true,
        loginError: "",
      };
    case LOGIN_USER_SUCCESS: {
      let isUser = false;

      if (action.payload.userRole === "user") {
        isUser = true;
      }

      return {
        ...state,
        loginLoading: false,
        authenticated: true,
        authToken: action.payload.authToken,
        userRole: action.payload.userRole,
        userName: action.payload.name,
        isUser,
      };
    }
    case LOGIN_USER_ERROR:
      return {
        ...state,
        loginLoading: false,
        loginError: action.payload.error,
      };
    case REGISTER_USER_REQUEST:
      return {
        ...state,
        registerLoading: true,
        registerError: "",
      };
    case REGISTER_USER_SUCCESS: {
      return {
        ...state,
        registerLoading: false,
        authenticated: true,
        authToken: action.payload.authToken,
        userRole: action.payload.userRole,
        userName: action.payload.name,
        isUser: true,
      };
    }
    case REGISTER_USER_ERROR:
      return {
        ...state,
        registerLoading: false,
        registerError: action.payload.error,
      };

    case AUTH_LOGOUT_USER:
      return {
        ...state,
        authenticated: false,
        authToken: "",
      };
    case AUTH_CLEAR_ERROR: {
      return {
        ...state,
        loginError: "",
        registerError: "",
      };
    }
    case AUTH_RESET_STATE: {
      return authInitialState;
    }
    default:
      return state;
  }
};
