import { loginUserDataMock } from "../../../../__jest__/api-mocks";
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
} from "../../actions/action-types/auth";

import {
  loginUserRequest,
  loginUserSuccess,
  loginUserError,
  registerUserRequest,
  registerUserSuccess,
  registerUserError,
  authClearError,
  userLogout,
  authResetState,
} from "../../actions/auth";

describe("Auth action creators ", () => {
  it("loginUserRequest", () => {
    const action = loginUserRequest();

    expect(action.type).toEqual(LOGIN_USER_REQUEST);
  });

  it("loginUserSuccess", () => {
    const action = loginUserSuccess(loginUserDataMock);

    expect(action.type).toEqual(LOGIN_USER_SUCCESS);
    expect(action.payload).toEqual(loginUserDataMock);
  });

  it("loginUserError", () => {
    const action = loginUserError("This is an error");

    expect(action.type).toEqual(LOGIN_USER_ERROR);
    expect(action.payload.error).toEqual("This is an error");
  });

  it("registerUserRequest", () => {
    const action = registerUserRequest();

    expect(action.type).toEqual(REGISTER_USER_REQUEST);
  });

  it("registerUserSuccess", () => {
    const action = registerUserSuccess(loginUserDataMock);

    expect(action.type).toEqual(REGISTER_USER_SUCCESS);
    expect(action.payload).toEqual(loginUserDataMock);
  });

  it("registerUserError", () => {
    const action = registerUserError("This is an error");

    expect(action.type).toEqual(REGISTER_USER_ERROR);
    expect(action.payload.error).toEqual("This is an error");
  });

  it("authClearError", () => {
    const action = authClearError();

    expect(action.type).toEqual(AUTH_CLEAR_ERROR);
  });

  it("userLogout", () => {
    const action = userLogout();

    expect(action.type).toEqual(AUTH_LOGOUT_USER);
  });

  it("authResetState", () => {
    const action = authResetState();

    expect(action.type).toEqual(AUTH_RESET_STATE);
  });
});
