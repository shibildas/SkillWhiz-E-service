import { combineReducers } from "redux";
import adminReducer from "./admin";
import expertReducer from "./expert";
import userReducer from "./user";
import alertReducer from "./alert";

const rootReducer = combineReducers({
  admin: adminReducer,
  expert: expertReducer,
  user: userReducer,
  alert: alertReducer,
});

export default rootReducer;
