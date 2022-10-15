import { combineReducers } from "redux";
import { useSelector as useReduxSelector, TypedUseSelectorHook } from "react-redux";
import auth from "./reducers/auth";
import shop from "./reducers/shop";

type RootState = ReturnType<typeof rootReducer>;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export const rootReducer = combineReducers({
  shop,
  auth,
});
