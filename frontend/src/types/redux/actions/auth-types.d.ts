interface IAuthActionTypes {
  LOGIN_USER_REQUEST: "LOGIN_USER_REQUEST";
  LOGIN_USER_SUCCESS: "LOGIN_USER_SUCCESS";
  LOGIN_USER_ERROR: "LOGIN_USER_ERROR";
  REGISTER_USER_REQUEST: "REGISTER_USER_REQUEST";
  REGISTER_USER_SUCCESS: "REGISTER_USER_SUCCESS";
  REGISTER_USER_ERROR: "REGISTER_USER_ERROR";
  AUTH_CLEAR_ERROR: "AUTH_CLEAR_ERROR";
  AUTH_LOGOUT_USER: "LOGOUT_USER";
  AUTH_RESET_STATE: "AUTH_RESET_STATE";
}

interface ILoginUserRequest {
  type: IAuthActionTypes["LOGIN_USER_REQUEST"];
}

interface ILoginUserSuccess {
  type: IAuthActionTypes["LOGIN_USER_SUCCESS"];
  payload: IUserData;
}

interface ILoginUserError {
  type: IAuthActionTypes["LOGIN_USER_ERROR"];
  payload: { error: string };
}

interface IRegisterUserRequest {
  type: IAuthActionTypes["REGISTER_USER_REQUEST"];
}

interface IRegisterUserSuccess {
  type: IAuthActionTypes["REGISTER_USER_SUCCESS"];
  payload: IUserData;
}

interface IRegisterUserError {
  type: IAuthActionTypes["REGISTER_USER_ERROR"];
  payload: { error: string };
}

interface IAuthClearError {
  type: IAuthActionTypes["AUTH_CLEAR_ERROR"];
}

interface IAuthUserLogout {
  type: IAuthActionTypes["AUTH_LOGOUT_USER"];
}

interface IAuthResetState {
  type: IAuthActionTypes["AUTH_RESET_STATE"];
}

type TAuthActions =
  | { type: Record<string, never> }
  | ILoginUserRequest
  | ILoginUserSuccess
  | ILoginUserError
  | IAuthUserLogout
  | IAuthClearError
  | IRegisterUserRequest
  | IRegisterUserSuccess
  | IRegisterUserError
  | IAuthResetState;
