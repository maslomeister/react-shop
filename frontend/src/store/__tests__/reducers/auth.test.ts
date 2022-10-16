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
import { authInitialState } from "../../reducers/auth";
import { store } from "../..";

beforeEach(() => {
  store.dispatch(authResetState());
});

const getAuthState = () => {
  return store.getState().auth;
};

describe("Auth reducer", () => {
  it("Should return initial state", () => {
    store.dispatch({ type: {} });
    expect(getAuthState()).toEqual(authInitialState);
  });

  it("Should handle LOGIN_USER_REQUEST", () => {
    store.dispatch(loginUserRequest());
    expect(getAuthState()).toEqual({ ...authInitialState, loginLoading: true, loginError: "" });
  });

  it("Should handle LOGIN_USER_SUCCESS with user role", () => {
    const data: IUserData = {
      authToken: "token",
      userRole: "user",
      name: "username",
    };

    store.dispatch(loginUserSuccess(data));

    expect(getAuthState()).toEqual({
      ...authInitialState,
      loginLoading: false,
      authenticated: true,
      authToken: data.authToken,
      userRole: data.userRole,
      userName: data.name,
      isUser: true,
    });
  });

  it("Should handle LOGIN_USER_SUCCESS with admin role", () => {
    const data: IUserData = {
      authToken: "token",
      userRole: "admin",
      name: "username",
    };

    store.dispatch(loginUserSuccess(data));

    expect(getAuthState()).toEqual({
      ...authInitialState,
      loginLoading: false,
      authenticated: true,
      authToken: data.authToken,
      userRole: data.userRole,
      userName: data.name,
      isUser: false,
    });
  });

  it("Should handle LOGIN_USER_ERROR", () => {
    const error = "this is an error";

    store.dispatch(loginUserError(error));

    expect(getAuthState()).toEqual({
      ...authInitialState,
      loginLoading: false,
      loginError: error,
    });
  });

  it("Should handle REGISTER_USER_REQUEST", () => {
    store.dispatch(registerUserRequest());

    expect(getAuthState()).toEqual({
      ...authInitialState,
      registerLoading: true,
      registerError: "",
    });
  });

  it("Should handle REGISTER_USER_SUCCESS", () => {
    const data: IUserData = {
      authToken: "token",
      userRole: "user",
      name: "username",
    };

    store.dispatch(registerUserSuccess(data));

    expect(getAuthState()).toEqual({
      ...authInitialState,
      loginLoading: false,
      authenticated: true,
      authToken: data.authToken,
      userRole: data.userRole,
      userName: data.name,
      isUser: true,
    });
  });

  it("Should handle REGISTER_USER_ERROR", () => {
    const error = "this is an error";

    store.dispatch(registerUserError(error));

    expect(getAuthState()).toEqual({
      ...authInitialState,
      registerLoading: false,
      registerError: error,
    });
  });

  it("Should handle AUTH_LOGOUT_USER", () => {
    store.dispatch(userLogout());

    expect(getAuthState()).toEqual({
      ...authInitialState,
      authenticated: false,
      authToken: "",
    });
  });

  it("Should handle AUTH_CLEAR_ERROR", () => {
    store.dispatch(authClearError());

    expect(getAuthState()).toEqual({
      ...authInitialState,
      loginError: "",
      registerError: "",
    });
  });
});
