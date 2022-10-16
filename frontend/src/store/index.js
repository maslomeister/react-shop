import { combineReducers } from "redux";
import auth from "./reducers/auth";
import shop from "./reducers/shop";

export default combineReducers({
  shop,
  auth,
});
