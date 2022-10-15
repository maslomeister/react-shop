interface IAuthActionTypes {
  AUTH_USER_REQUEST: "AUTH_USER_REQUEST";
  AUTH_USER_SUCCESS: "AUTH_USER_SUCCESS";
  AUTH_USER_ERROR: "AUTH_USER_ERROR";
  AUTH_LOGOUT_USER: "LOGOUT_USER";
}

interface IAuthUserRequest {
  type: IAuthActionTypes["AUTH_USER_REQUEST"];
}

interface IAuthUserSuccess {
  type: IAuthActionTypes["AUTH_USER_SUCCESS"];
  payload: IUserData;
}

interface IAuthUserError {
  type: IAuthActionTypes["AUTH_USER_ERROR"];
  payload: { error: string };
}

interface IAuthUserLogout {
  type: IAuthActionTypes["AUTH_LOGOUT_USER"];
}

type TAuthActions = IAuthUserRequest | IAuthUserSuccess | IAuthUserError | IAuthUserLogout;
