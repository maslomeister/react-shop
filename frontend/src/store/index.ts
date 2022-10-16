import { combineReducers } from "redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { useSelector as useReduxSelector, TypedUseSelectorHook } from "react-redux";

import { authReducer as auth } from "./reducers/auth";
import { shopReducer as shop } from "./reducers/shop";

export const rootReducer = combineReducers({
  auth,
  shop,
});

type RootState = ReturnType<typeof rootReducer>;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export const store = createStore(rootReducer, composeWithDevTools());
