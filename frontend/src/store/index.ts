import { combineReducers } from "redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { useSelector, TypedUseSelectorHook, useDispatch } from "react-redux";

import { authReducer as auth } from "./reducers/auth";
import { shopReducer as shop } from "./reducers/shop";

export const rootReducer = combineReducers({
  auth,
  shop,
});

export const store = createStore(rootReducer, composeWithDevTools());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
