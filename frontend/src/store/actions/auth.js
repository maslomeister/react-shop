import { AUTH_USER_REQUEST, AUTH_USER_SUCCESS, AUTH_USER_ERROR, AUTH_USER_RESET, LOGOUT_USER } from "./action-types/auth";

export function authUserRequest() {
  return {
    type: AUTH_USER_REQUEST,
  };
}

export function authUserSuccess(data) {
  return {
    type: AUTH_USER_SUCCESS,
    payload: { authToken: data.authToken, userRole: data.userRole, name: data.name },
  };
}

export function authUserError(error) {
  return {
    type: AUTH_USER_ERROR,
    payload: { error },
  };
}

export function authUserRest() {
  return {
    type: AUTH_USER_RESET,
  };
}

export function userLogout() {
  return {
    type: LOGOUT_USER,
  };
}
