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
} from "./action-types/auth";

export function loginUserRequest(): ILoginUserRequest {
  return {
    type: LOGIN_USER_REQUEST,
  };
}

export function loginUserSuccess(data: IUserData): ILoginUserSuccess {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: { authToken: data.authToken, userRole: data.userRole, name: data.name },
  };
}

export function loginUserError(error: string): ILoginUserError {
  return {
    type: LOGIN_USER_ERROR,
    payload: { error },
  };
}

export function registerUserRequest(): IRegisterUserRequest {
  return {
    type: REGISTER_USER_REQUEST,
  };
}

export function registerUserSuccess(data: IUserData): IRegisterUserSuccess {
  return {
    type: REGISTER_USER_SUCCESS,
    payload: { authToken: data.authToken, userRole: data.userRole, name: data.name },
  };
}

export function registerUserError(error: string): IRegisterUserError {
  return {
    type: REGISTER_USER_ERROR,
    payload: { error },
  };
}

export function authClearError(): IAuthClearError {
  return {
    type: AUTH_CLEAR_ERROR,
  };
}

export function userLogout(): IAuthUserLogout {
  return {
    type: AUTH_LOGOUT_USER,
  };
}

export function authResetState(): IAuthResetState {
  return {
    type: AUTH_RESET_STATE,
  };
}
