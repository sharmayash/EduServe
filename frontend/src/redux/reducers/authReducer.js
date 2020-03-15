import { LOGIN_USER } from "../actionTypes";

const initialState = {
  token: null,
  isAuthenticated: false,
  userEmail: ""
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        userEmail: action.payload.userEmail,
        isAuthenticated: true
      };

    default:
      return state;
  }
}