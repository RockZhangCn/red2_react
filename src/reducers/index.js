// src/reducers/index.js
import { combineReducers } from "redux";
import userReducer from "./userReducer";
import gameReducer from "./gameReducer";

const rootReducer = combineReducers({
  user: userReducer,
  game: gameReducer,
});

export default rootReducer;
