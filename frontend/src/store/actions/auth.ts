import { AUTH_USER_REQUEST, AUTH_USER_SUCCESS, AUTH_USER_ERROR, AUTH_LOGOUT_USER } from "./action-types/auth";

export function authUserRequest(): IAuthUserRequest {
  return {
    type: AUTH_USER_REQUEST,
  };
}

export function authUserSuccess(data: IUserData): IAuthUserSuccess {
  return {
    type: AUTH_USER_SUCCESS,
    payload: { authToken: data.authToken, userRole: data.userRole, name: data.name },
  };
}

export function authUserError(error: string): IAuthUserError {
  return {
    type: AUTH_USER_ERROR,
    payload: { error },
  };
}

export function userLogout(): IAuthUserLogout {
  return {
    type: AUTH_LOGOUT_USER,
  };
}
