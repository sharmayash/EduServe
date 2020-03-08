import { combineReducers } from "redux"
import collegeReducer from "./collegeReducer"
import authReducer from "./authReducer"
import messageReducer from "./messageReducer"

export default combineReducers({
  authReducer,
  collegeReducer,
  messageReducer
})
